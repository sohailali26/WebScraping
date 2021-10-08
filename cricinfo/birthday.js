let request=require("request");
let cheerio=require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",callback);

let batsmanProfileUrls=[]; //created arr to store all url of profile

function callback(err,res, html){
    const $=cheerio.load(html);
    const batsmanAnchorTags=$(".batsman-cell a");  //class selector which store all anchor tag of batman table in an array
    
    //let data =['name','URL','Run','Balls','4s','6s','Strike Rate']

    const runs=$("")





    for(let i=0;i<batsmanAnchorTags.length;i++){   // traverse on achor tag arr
        batsmanProfileUrls.push({                  // pushing batsman name and profile url in form of an object in an array batsmanProfileUrls                                      
            name:$(batsmanAnchorTags[i]).text(),   // first key name store name of player  in arr of objs
            url:"https://www.espncricinfo.com"+$(batsmanAnchorTags[i]).attr("href")  // second key store profile irl of player in arr of objs
        })
    }

    for(let j in batsmanProfileUrls){     //now we are traversing over the array of obj which store batsman name and profile url
        request(batsmanProfileUrls[j].url, fetchDOB.bind(this,j))  //writing  a callback fn to fetch DOB using profile link
    }
    
}

// NOW WE START WORKING ON THE PROFILE LINK TO THE NAME IN TABLE

let count =0; // maintain a counter because callback is async fn

function fetchDOB(index,err,res,html) {  
    count++;
    const $=cheerio.load(html); //LOADING PROFILE URL
    const playerDOB= $($("h5.player-card-description.gray-900")[1]).text(); // DOB CSS SELECTOR
    batsmanProfileUrls[index]['D.O.B']=playerDOB.split(" ")[1] + " "+playerDOB.split(" ")[0]+" " + playerDOB.split(" ")[2]; //PUSH DOB IN PROFILE ULS ARRAY IN ORDERED DD/MM/YYYY BY SPLITING ON THE BASICS OF" "//

    if(count==batsmanProfileUrls.length){ //PRINT ONLY OF ALL THE URLS HAS BEEN PASSED//
        console.log(batsmanProfileUrls);
    }  
}