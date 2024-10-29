let express = require('express');
let app = express();
let ytdl = require('ytdl-core');

let cors = require('cors');

app.use(cors());
app.listen('4000', function () {
  console.log('listening on 4000');
});

app.get('/download', function (req, res) {
  try {
    let link = req.query.url;
    let format = req.query.format;
    let quality = req.query.quality;

    video = ytdl(link, {
      format: format,
      quality: quality,
    });
    video.pipe(res);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});
