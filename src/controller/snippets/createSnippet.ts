import express from 'express';
import { getConnection } from 'typeorm';
import Snippet from '../../entities/Snippet';
import User from '../../entities/User';

const createRouter = express.Router();

createRouter.post('/', async (req: express.Request, res: express.Response) => {
  const currentUser: User = req.user as User;

  const { body } = req;
  const { description } = body;
  const isPrivate = body.private;
  const { tags } = body;
  const { lang } = body;
  const { code } = body;
  const userUUID = currentUser.uuid;
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
  res.json({ snippet });
});

export default createRouter;
