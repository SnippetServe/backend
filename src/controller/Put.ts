
import * as express from 'express';
var put = express.Router();


// get route
put.get('/', function (req: express.Request, res: express.Response) {
  res.send('put');
})

module.exports = put;