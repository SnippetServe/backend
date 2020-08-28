
import * as express from 'express';
var post = express.Router();


// get route
post.get('/', function (req: express.Request, res: express.Response) {
  res.send('Post');
})

module.exports = post;