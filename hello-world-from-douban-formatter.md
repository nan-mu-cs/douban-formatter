# Hello World From Douban-Formatter
Douban-Formatter是一个命令行工具。使用可以用Markdow格式来写日记，或者将已经有的Markdow文件发布到豆瓣日记。具体使用方法和代码可以去到GitHub: [Douban-Formatter](https://github.com/yangkai2g7k/douban-formatter)
## Why
现有的豆瓣日记和读书笔记功能对富文本的支持很不完善。只支持通过在线的文本编辑器手动选择样式，而且支持的样式也不是很完善，仅有加粗、小标题、链接等。如果想要将已经写好的markdown直接发布到日记上，则需要全部手动更改，很不方便。

使用Douban-Formatter工具，可以直接将已经写好的Markdown格式的富文本发布到豆瓣日记。并且支持列表等在线文本编辑器不支持的样式。
* 这是列表的第一项
* 这是列表的第二项
* ...

现在豆瓣前端对于Markdown的渲染支持的也不是很完善，比如会自动过滤掉code block，所有标题都渲染为h2等等。

## TODO
* 支持发布HTML格式的日记
* 支持Markdown中的图片和视频
* 支持对验证码识别的支持。现在如果发布很频繁，豆瓣会要求通过验证码认证
* 优化系统认证的过程。现在是需要手动输入Cookie来做身份认证

## 开发过程
首先是想到使用豆瓣开放给开发者的API。豆瓣涉及到登录的API都需要申请API Key。而豆瓣15年开始就关闭了面向个人的API Key申请。
好不容易通过各种途径搞到了API Key，然后发现豆瓣提供的开放API中发表日记的内容不会做任何渲染解析，只会当成全部当成plain text输出，遂作罢。

然后尝试使用豆瓣自用的私有API。第一步首先要解决的是用户认证的问题，做了一番尝试之后，发现豆瓣是使用Cookie中的dbcl2字段来做用户身份认证。使用ck字段来做CROS表单提交的认证。
接着尝试通过模拟用户名、密码登录来得到后端Response的Header中的Set-Cookie字段，但是发现得到的Set-Cookie中并没有dbcl2字段，并没有找到原因，所以暂时搁置了。所以现在只支持从浏览器中找到Cookie，然后手动输入Cookie。

接下来的步骤是讲文本格式化为豆瓣使用的富文本编码格式，这一步实际上比我想象中要简单很多。原本的想法是仔细研究豆瓣使用的富文本编码格式，然后将Markdown转换为对应的格式。仔细研究后发现，豆瓣文本编辑器使用的是facebook开源的基于React的[draftjs](https://draftjs.org/)。
数据持久化的方法也是[Draft-js - Saving data to the server](https://reactrocket.com/post/draft-js-persisting-content/)这篇文章中提供的，使用draftjs中提供的convertToRaw函数转换为json的方法。这就让我很好奇，因为现在豆瓣使用的技术方案是完全可以支持样式更加丰富的富文本的，是因为对于产品的克制所以没有提供给用户更多的选择么？

最后是使用了command-line-args做命令行参数的解析，和一些收尾的工作。
