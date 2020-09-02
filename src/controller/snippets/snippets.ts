import * as express from 'express';
import { getConnection } from 'typeorm';
import Snippet from '../../entities/Snippet';

const router = express.Router();

router.post('/create', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { description } = body;
  const isPrivate = body.private;
  const { tags } = body;
  const { lang } = body;
  const { code } = body;
  const userUUID = body.creatorId;
  const downvotes = 0;
  const upvotes = 0;
  /* &hi */
  // TODO check if user is logged in

  const snippet = await Snippet.create({
    userUUID,
    description,
    private: isPrivate,
    tags,
    lang,
    code,
    downvotes,
    upvotes
  }).save();

  // console.log all snippets from the user

  const snippetRepo = await getConnection().getRepository(Snippet);
  const users = await snippetRepo.find({
    where: { userUUID },
    relations: ['user']
  });
  users.forEach((user) => {
    console.log(user);
  });
  // const user1 = await User.findOne({id: creatorId})
  // user.snippets = [...user.snippets, snippet]
  // user.save()
  // const result = await User.findOne({id: 1})
  // await Snippet.delete({})
  res.send(snippet);
});

router.post('/update', async (req: express.Request, res: express.Response) => {
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
    res.send('Snipet not found');
  } else {
    snippet.description = description;
    snippet.private = isPrivate;
    snippet.tags = tags;
    snippet.lang = lang;
    snippet.code = code;
    snippet.save();

    res.send(snippet);
  }
});

router.post('/delete', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { uuid } = body;

  const snippet = await Snippet.findOne(uuid);
  if (!snippet) {
    res.send('Snippet not found');
  } else {
    await Snippet.delete(uuid);
    res.send('snippet deleted');
  }
});

module.exports = router;
