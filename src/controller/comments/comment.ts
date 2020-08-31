import * as express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('comment route');
});

module.exports = router;
