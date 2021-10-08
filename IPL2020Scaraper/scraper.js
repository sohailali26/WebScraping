const request = require('request');
const cheerio = require('cheerio');
const fs      = require('fs');


let matchID= "ipl-2020-21-1210595";
let matches=[];

let url= 'https://www.espncricinfo.com/series/' + matchID + '/match-results';
console.log(url);
request(url,fixture);

function fixture(err,res,html) {
    let $ =cheerio.load(html);
    
    // fetch teams name 
    let teamNamesArr= $('.col-md-8.col-16 p.name');

    //score card link class selector
    let scorecardAnchorTags =$('[data-hover="Scorecard"]');

    for (let i = 0 , j=0 ; i < scorecardAnchorTags.length && j < teamNamesArr.length; i++ ,j=j+2) {
        let matchName = $(teamNamesArr[j]).text() + " VS " + $(teamNamesArr[j+1]).text();
        let ScorecardUrl = "https://www.espncricinfo.com/"+ $(scorecardAnchorTags[i]).attr("href");

        // storing complete like of each match score card 
        matches.push({
            'MatchName': matchName,
            'ScoreCardURL': ScorecardUrl,
            'Matchdata' :[]            
        })
        request(ScorecardUrl,fetchtables(this,i));
        
    }
    console.log(matches);   
    
}
let inningsCount=0;
function fetchtables(index,err,res,html) {
    inningsCount++;
    const $=cheerio.load(html);

    for(let i=0;i<2;i++){
        matches[index].Matchdata.push({
            'FirstInning':[],
            'SecondInning':[]
        })

    }
    fs.writeFileSync('matchData.json',JSON.stringify(matches)); 
    // let batingInnings=$('[style="width: 25%;"]');
    // let bolwingInnings=$('table bowler');
    
}
