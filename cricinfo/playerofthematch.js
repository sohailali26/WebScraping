let request=require("request");  // request is use give request from the browser and receive response from server from the browser
let cheerio=require("cheerio"); //  is node liberary work like browser engine to load html in node environment
const chalk=require("chalk");


request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",callback);

function callback(err,res, html){
    const $=cheerio.load(html);   // load htnl in $ const using cheerio
    console.log($(".playerofthematch-name").length);  // using class selector extract the data of player of match & series
    console.log(chalk.bgBlue('Player of the match :'),chalk.bgRed($($(".playerofthematch-name")[0]).text()));  //player of match is at 0 index so we use one $ to extract arr and 2nd $ to fetch index
    console.log(chalk.bgBlue('Player of the Series :'),chalk.bgGreen($($(".playerofthematch-name")[1]).text())); //player of series is at 1 index
}