
import * as express from 'express';
var router = express.Router();


// get route
router.get('/', function (req: express.Request, res: express.Response) {
  res.send('signup route');
})

module.exports = router;