let express = require('express');
let app = express();
let ytdl = require('@distube/ytdl-core');
// const cors = require('cors');

// app.use(cors());
app.listen('4000', function(){
	console.log("listening on 4000");
});

app.get('/download', function(req, res) {
	let link = req.query.url;
	let format = req.query.format;
	let quality = req.query.quality;

	video = ytdl(link,{
		format:format,
		quality:quality,
	});

	res.header('Content-Disposition', `attachment; filename="video.${format}"`);
	
	video.pipe(res);
	console.log(res)
});