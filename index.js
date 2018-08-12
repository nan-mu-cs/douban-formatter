/**
 * Created by kai on 2018/8/11.
 */
const FormData = require('form-data');
const fetch = require('node-fetch');
const {stateFromMarkdown} = require('draft-js-import-markdown');
const {convertToRaw} = require('draft-js');
const fs = require('fs');
const process = require('process');
const commandLineArgs = require('command-line-args');


const optionDefinitions = [
  {name: 'title', alias: 't', type: String,},
  {name: 'article_path', alias: 'a', type: String},
  {name: 'introduction', alias: 'i', type: String, defaultValue: ''},
  {name: 'privacy', alias: 'p', type: String, defaultValue: 'public'},
  {name: 'reply', alias: 'r', type: Boolean, defaultValue: true},
  {name: 'original', alias: 'o', type: Boolean, defaultValue: true},
  {name: 'ck', alias: 'c', type: String},
  {name: 'dbcl2', alias: 'd', type: String},
  {name: 'config',type: String}
];



function argsValidate(options) {

  if (!options.title) {
    console.log('Must have a title');
    process.exit();
  }
  if (!options.article_path) {
    console.log('Must providede a valid path to article');
    process.exit();
  }
  if (!fs.existsSync(options.article_path)) {
    console.log('Article not existed');
    process.exit();
  }
  if (!options.ck || !options.dbcl2) {
    console.log('ck and dbcl2 must be provided');
    process.exit();
  }
}

function convertMarkDown(markDownPath) {
  let mdContent = fs.readFileSync(markDownPath, 'utf8');
  let contentState = stateFromMarkdown(mdContent);
  let raw = convertToRaw(contentState);
  return raw;
}

/*
 privacy: P - public
 S - friend
 X - self
 canot_reply - on / ''
 is_original - on
 */
function makeForm(options) {
  let form = new FormData();
  form.append("is_rich", "1");
  form.append("note_title", options.title);
  form.append("note_text", JSON.stringify(convertMarkDown(options.article_path)));
  form.append("introduction", options.introduction);
  let privacy = "P";
  if (options.privacy === 'friend')
    privacy = 'S';
  else if (options.privacy === 'self')
    privacy = 'X';
  form.append("note_privacy", privacy);
  form.append("cannot_reply", `${options.privacy ? '' : 'on'}`);
  form.append("author_tags", "");
  form.append("accept_donation", "0");
  form.append("donation_notice", "");
  form.append("is_original", `${options.original ? 'on' : ''}`);
  form.append("ck", options.ck);
  form.append("action", "new");
  return form;
}

(function publishArticle() {
  let options = commandLineArgs(optionDefinitions);
  if(options.config){
    if(!fs.existsSync(options.config)){
      console.log("Config file not found.");
      process.exit();
    }
    const config = fs.readFileSync(options.config);
    options = JSON.parse(config);
  }
  argsValidate(options);
  let form = makeForm(options);
  let headers = {...form.getHeaders(), Cookie: `dbcl2=${options.dbcl2}`};
  fetch('https://www.douban.com/j/note/publish',
    {
      method: 'POST',
      body: form,
      headers: headers
    }).then(res => res.json())
    .then(data => {
      if (data.url) {
        console.log(`new article is published at ${data.url}`);
      }
    })
    .catch(error => {
      console.log("Could not publish the article, probably because ck and dbcl2 not correct");
      console.log(error);
    })
})();




