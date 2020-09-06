import express from 'express';
import Snippet from '../../entities/Snippet';

const updateRouter = express.Router();

updateRouter.put('/', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { uuid } = body;
  const { description } = body;
  const { isPrivate } = body;
  const { tags } = body;
  const { lang } = body;
  const { code } = body;

  // TODO check if user is logged in
  const snippet = await Snippet.findOne(uuid);
  if (!snippet) {
    res.json({ error: 'Snipet not found' });
  } else {
    snippet.description = description;
    snippet.private = isPrivate;
    snippet.tags = tags;
    snippet.lang = lang;
    snippet.code = code;
    snippet.save();

    res.json({ snippet });
  }
});

export default updateRouter;
