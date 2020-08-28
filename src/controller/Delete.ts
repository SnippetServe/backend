
import * as express from 'express';
var delet = express.Router();


// get route
delet.get('/', function (req: express.Request, res: express.Response) {
  res.send('delete');
})

module.exports = delet;