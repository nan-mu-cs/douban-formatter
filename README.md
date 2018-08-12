# Douban-Formatter
Douban-Formatter is a command line tool to publish rich text format (markdown,etc) on [douban](https://douban.com). Currently it only support markdown file format.

## Prerequisite
node >= 10.8.0
## Install
```
npm i -g douban-formatter
```
## Usage
```
douban-formatter --title <title> \
    --article_path <path to article> \
    --ck <cookie ck value> \
    --dbcl2 <cookie dbcl2 value>
```
Or
```
douban-formatter --config <config.json>
```

| options           | description                                                                               |
|-------------------|-------------------------------------------------------------------------------------------|
| --title,-t        | article title. Requried                                                                   |
| --article_path,-a | path to article file. Requried                                                            |
| --introduction,-i | article introduction. Optional                                                            |
| --privacy,-p      | article privacy setting.  Possible value: public, friend, self Default value is public    |
| --reply, -r       | Readers could reply the article or not. Possible value: true, false Default value is true |
| --original,-o     | Is the article original or not. Possible value: true, false Default value is true         |
| --ck,-c           | Cookie item ck's value. Required.                                                         |
| --dbcl2, -d       | Cookie item dbcl2's value. Required.                                                      |

## How to get Cookie in Chrome
After login into [douban](https://www.douban.com). Go to Settings->More Tools->Developer Tools. Select Application Tab and In storage section, find Cookie. find the value of dbcl2 and ck in Cookie.
## Why
Douban currently provided very limit support (only Bold, Quote, Subheader, Link) for rich text format and has to use its online editor. If one wants to publish
an exisiting article on douban, it have to use douban's online editor to reformat its article which is very painful.

## Todo
* Add support for HTML format
* Add support for image and video
* Add support for captcha. (If publish too frequently douban may ask for captcha verifcation)
* Optimize Authoriztion process (Try to use username and password to login and get cookie)


