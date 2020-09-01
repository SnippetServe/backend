import * as express from 'express';
import  Snippet from '../../entities/Snippet';
import User from '../../entities/User';
import { userInfo } from 'os';
import { Connection, getRepository, getConnection } from 'typeorm';
const router = express.Router();

router.post('/create', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const description = body.description
  const isPrivate = body.private 
  const tags = body.tags 
  const lang = body.lang
  const code = body.code 
  const userUUID = body.creatorId
  const downvotes = 0
  const upvotes = 0
  /*&hi */

  const snippet = await Snippet.create({userUUID, description, private: isPrivate, tags, lang, code, downvotes, upvotes}).save()
  
  //console.log all snippets from the user
  const snippetRepo = await getConnection().getRepository(Snippet);
  const users = await snippetRepo.find({where: {userUUID}, relations: ['user']})
  users.forEach(user => {
    console.log(user)
  })
  // const user1 = await User.findOne({id: creatorId})
  // user.snippets = [...user.snippets, snippet]
  // user.save()
  // const result = await User.findOne({id: 1})
  // await Snippet.delete({})
  res.send(snippet)
})

module.exports = router;
