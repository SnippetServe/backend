
import * as express from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../../entities/User';
import argon2 from 'argon2';
const router = express.Router();

// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const username = body.username 
  const password = body.password

  const user = await User.findOne({username: username})
  if (!user) {
    res.send("User not found")
  } 
  const verifyPass = await argon2.verify(user.password, password)
  if (!verifyPass) {
    res.send("Incorrect Username/Password")
  }
  

  // TODO uncomment once front end is able to make request (this is will create a session for the user)
  // req.session.userId = user.id

  // TODO delete once front end is able to make request (dont want the front end to access the user obv)
  res.send(user)

})

module.exports = router;