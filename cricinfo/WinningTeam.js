const request=require("request");
const cheerio=require("cheerio");
const chalk=require('chalk')

//page link
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard",
requestCallback);

function requestCallback(err,res,html) {
    const $=cheerio.load(html);
    const losingTeam=$(".team-gray .name-link p").text();  // find loosing team using gray class
    
    const bothTeamsObject=$(".name-link p");  //both team name in object
    const bothTeamScoreObject=$(".match-info.match-info-MATCH .score");  //score of both team in an object

    //CHECK IF VALUE AT OBJ[0]==LOSING team if yes the ojj[1] = winner or vise-versa
    const winningTeamNameScoreArray=$(bothTeamsObject[0]).text()==losingTeam? [$(bothTeamsObject[1]).text(),$(bothTeamScoreObject[1]).text()]:[$(bothTeamsObject[0]).text(),$(bothTeamScoreObject[0]).text()];
    
    //print winner with color using chalk for colorful background
    console.log(chalk.bgRed(winningTeamNameScoreArray));    
}