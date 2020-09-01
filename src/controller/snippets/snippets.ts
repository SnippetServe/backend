import * as express from 'express';
import  {Snippet} from '../../entities/Snippet';
import { User } from '../../entities/User';
import { userInfo } from 'os';
import { Connection, getRepository } from 'typeorm';
const router = express.Router();

router.post('/create', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const description = body.description
  const isPrivate = body.private 
  const tags = body.tags 
  const lang = body.lang
  const code = body.code 
  const creatorId = body.creatorId
  const downvotes = 0
  const upvotes = 0
  /*&hi */

  const snippet = await Snippet.create({description, private: isPrivate, tags, lang, code, downvotes, upvotes}).save()
  const user = await User.findOne({id: creatorId})
  snippet.creator = user
  snippet.save()
  const user1 = await User.findOne({id: creatorId})
  console.log(`users - ${user1.snippets}`)
  // user.snippets = [...user.snippets, snippet]
  // user.save()
  // const result = await User.findOne({id: 1})
  // await Snippet.delete({})
  res.send(snippet)
})

module.exports = router;
