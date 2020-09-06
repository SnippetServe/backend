import express from 'express';
import Snippet from '../../entities/Snippet';

const deleteRouter = express.Router();

deleteRouter.delete(
  '/',
  async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { uuid } = body;

    const snippet = await Snippet.findOne(uuid);
    if (!snippet) {
      res.json({ error: 'Snippet not found' });
    } else {
      await Snippet.delete(uuid);
      res.json({ msg: 'snippet deleted' });
    }
  }
);

export default deleteRouter;
