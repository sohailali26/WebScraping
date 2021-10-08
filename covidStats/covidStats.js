const request=require("request");
const cheerio=require("cheerio");

request('https://www.worldometers.info/coronavirus/',cb);

function cb(error , response , html) {
    if(error){
        console.error('error:',error)   //print error code if occur
    }
    else{
        extractHTML(html);
    }
};  

function extractHTML(html) {
    let $=cheerio.load(html);
    let statsArr=$('.maincounter-number');
    console.log('Total length :',statsArr.length);
    for(let i=0;i<statsArr.length;i++){
        let data = $(statsArr[i]).text();
        console.log(data);
    }
}