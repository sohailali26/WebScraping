const request=require('request');
const cheerio=require('cheerio');
const chalk=require('chalk')

const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

request(url,callback);

function callback(err , response , html) {
    if(err){
        console.log(err);
    }else{
        extractHTML(html)
    }
}

function extractHTML(html) {
    
    const $=cheerio.load(html);
    let CommentaryArr=$('.match-comment-wrapper p');  //loed all the comentary in an array
    let lastballcom=$(CommentaryArr[0]).text();       // printed the last ball commentary
    console.log(chalk.bgGreen(lastballcom));          // used chalk to beautify the text
}