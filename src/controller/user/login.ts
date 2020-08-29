
import * as express from 'express';
const router = express.Router();

// get route
router.get('/', (req: express.Request, res: express.Response) => {
  res.send('login route');
})

module.exports = router;