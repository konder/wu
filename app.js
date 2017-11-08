const express = require('express')
const app = express()
const request = require('request');

app.get('/', function (req, res) {
	console.log(req.query);
	request({
		url: "http://www.tuling123.com/openapi/api",
		method: "POST",
		json: true,
		body: {"key":"7774b01eefe745ff8427cc7939e6affc", "info":req.query.word.replace(/小美/, '')}
	}, function (error, response, body) {
		console.log(body);
		var word = "听不懂";
		if (body){
                	if (body.code == 100000){
                        	word = body.text;
                	}else if (body.code == 200000){
                        	word = body.url;
                	}else if (body.code == 302000){
                        	body.list.forEach(x=>{
                                	word += x.article + "(" + x.detailurl+ "),"
                        	})
                	}
		}
		res.send({"success": true, "errorCode": "200", "errorMsg": "", "fields": {"回话": word}});
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
