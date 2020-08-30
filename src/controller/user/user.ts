import * as express from 'express';
import { Users } from '../../entities/User';
var router = express.Router();


// get route
router.get('/', async (req: express.Request, res: express.Response) => {
  //temporary code to retrieve current user since user session cant be stored in postman
  const body = req.body 
  const uuid = body.uuid
  const user = await Users.findOne({uniqueid: uuid})
  if(!user) {
    res.send("User not found")
  }
  res.send(user)

  //TODO uncomment once front end is able to make request
  // if(req.session.userId == user.uniqueid) {
  //   res.send(user)
  // }
})

router.get('/id', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const uuid = body.uuid 
  const user = await Users.findOne({uniqueid: uuid}) 
  if (!user) {
    res.send("user not found")
  }
  res.send({
    username: user.username,
    snippets: user.snippets
  })

  //TODO uncomment once front end is able to make request
})

module.exports = router;