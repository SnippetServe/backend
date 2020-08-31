import * as express from 'express';
import { Snippet } from '../../entities/Snippet';
import { User } from '../../entities/User';
import { userInfo } from 'os';
const router = express.Router();

router.post('/create', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const description = body.description
  const isPrivate = body.private 
  const tags = body.tags 
  const lang = body.lang
  const code = body.code 
  const creatorId = "93526963-2aa6-4f66-b25b-fb9ce3473ed0"
  const downvotes = 0
  const upvotes = 0
  

  const snippet = await Snippet.create({description, private: isPrivate, tags, lang, code, creatorId: 1, downvotes, upvotes}).save()
  const user = await User.findOne({id: 1})
  User.merge(user, {snippets: [...user.snippets, snippet]}).save()
  // const result = await User.findOne({id: 1})
  // await Snippet.delete({})
  res.send(snippet)
})

module.exports = router;