import * as express from 'express';

const router = express.Router();

// get route
router.get('/', (req: express.Request, res: express.Response) => {
  res.json({ error: 'To be implemented' });
});

module.exports = router;
