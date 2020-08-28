
import * as express from 'express';
var get = express.Router();


// get route
get.get('/', function (req: express.Request, res: express.Response) {
  res.send('get');
})

module.exports = get;