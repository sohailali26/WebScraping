let request=require('request');
let cheerio=require('cheerio');
let fs= require('fs');

let url='https://github.com/topics';

request(url,requestCallback);
let gitTopics=[];

function requestCallback(err , response , html) {
    const $=cheerio.load(html);
    let topicUrlAnchorTags= $('.no-underline.d-flex.flex-column.flex-justify-center');
    
    for(let i=0;i<topicUrlAnchorTags.length;i++){
        let topicUrl= "https://github.com" + $(topicUrlAnchorTags[i]).attr('href');
        gitTopics.push({
            'topicUrl':topicUrl,
            'repos':[],
        });
        
        // request for the click on box and fetch the repos page
        request(topicUrl,fetchrepos.bind(this,i));
    }
    // topics url and repos empty array
    //console.log(gitTopics);
}
let topicCount=0;
let repoCounts=0;
let totalRepos=0;
function fetchrepos(index, err , res , html) {
    topicCount++
    const $=cheerio.load(html);
    let repoAnchorTagsArr= $('a.text-bold.wb-break-word');

    totalRepos+= repoAnchorTagsArr.length<8? repoAnchorTagsArr.length:8;

    for (let i = 0; i<8 && i < repoAnchorTagsArr.length; i++) {
        let repoUrl = 'https://www.github.com'+ $(repoAnchorTagsArr[i]).attr('href');
        gitTopics[index].repos.push({
            'repoUrl':repoUrl,
            'issues': [],
        });       
       //request to click on the issues tab of git repo.
        request(repoUrl + '/issues' ,fetchIssues.bind(this,index,i));
    }
    
}

function fetchIssues(topicIndex,repoIndex , err, res , html) {
    repoCounts++;
    const $ = cheerio.load(html);
    let issueAnchorTags= $('.Link--primary.v-align-middle.no-underline.h4');
    for (let i = 0;i<8 && i < issueAnchorTags.length; i++) {
        gitTopics[topicIndex].repos[repoIndex].issues.push({
            'issueName' : $(issueAnchorTags[i]).text(),
            'issueURL' :  'https://www.github.com'+ $(issueAnchorTags[i]).attr('href')
        })
        
    }

    if(topicCount==3 && repoCounts==totalRepos){
        fs.writeFileSync('ScrapData.json',JSON.stringify(gitTopics));
    }

}