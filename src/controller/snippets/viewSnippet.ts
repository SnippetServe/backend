import express from 'express';

// import User from '../../entities/User';
import Snippet from '../../entities/Snippet';

const viewSnippetRouter = express.Router();

viewSnippetRouter.get(
  '/',
  async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { uuid } = body;

    const snippet = await Snippet.findOne(uuid);
    if (!snippet) {
      res.json({ error: 'Snippet not found' });
    } else {
      res.json({ snippet });
    }
  }
);

export default viewSnippetRouter;
