
import * as express from 'express';
import {User} from '../../entities/User'
import argon2 from 'argon2'
import { appendFileSync } from 'fs';
import { getConnection, getRepository } from 'typeorm';
var router = express.Router();


// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const username = body.username
  const password = body.password
  const desc = body.description
  const email = body.email
  const unique = body.unique

  if (password.length <= 2) {
    res.send("Password too short")
  } 

  const hashedPassword = await argon2.hash(password)
  let user;
  try {
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: username,
          email: email,
          password: hashedPassword,
          uniqueid: unique,
          description: desc
        })
        .returning("*")
        .execute();
    user = result.raw[0]
  } catch (err) {
    if (err.code === "23505") {
      res.send("Username taken")
    }
  }
  
  //uncomment once front end is able to make request (this is will create a session for the user)
  // req.session.userId = user.id

  //delete once front end is able to make request (dont want the front end to access the user obv)
  res.send(user)
  //^^again this is for dev env ONLYYY
})

module.exports = router;