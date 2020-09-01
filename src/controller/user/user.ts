import * as express from 'express';
import { User } from '../../entities/User';
import { Snippet } from '../../entities/Snippet';
var router = express.Router();

import argon2 from 'argon2'

// get route
router.get('/', async (req: express.Request, res: express.Response) => {
  // temporary code to retrieve current user since user session cant be stored in postman
  const { body } = req;
  const { uuid } = body;
  //TOO uncomment once front end is able to make request
  // if(!req.session.userId) {
  //   res.send("User not logged in")
  // }
  // const user = await User.findOne(req.session.userId);
  const user = await User.findOne({uniqueid: uuid})
  if (!user) {
    res.send('User not found');
  }
  res.send(user);

  // TODO uncomment once front end is able to make request
  // if(req.session.userId == user.uniqueid) {
  //   res.send(user)
  // }
});

router.get('/id', async (req: express.Request, res: express.Response) => {
  const body = req.body 
  const uuid = body.uuid 
  const user = await User.findOne({uniqueid: uuid}) 
  const snippets = await Snippet.find({creator: uuid, private: false})

  if (!user) {
    res.send('user not found');
  }
  res.send({
    username: user.username,
    snippets: user.snippets
  });

  // TODO uncomment once front end is able to make request
  // if(req.session.userId == user.uniqueid) {
  //   res.send(user)
  // }
});

// Edit User
router.put('/', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { uuid } = body;
  const user = await User.findOne({ uniqueid: uuid });

  if (!user) {
    res.send('user not found');
  }

  const { username } = body;
  const { password } = body;
  const { description } = body;
  const { email } = body;

  if (password.length <= 2) {
    res.send('Password too short');
  }

  const hashedPassword = await argon2.hash(password);
  // c48d4fa5-e147-4651-b4e5-c5bbc21b5d9b

  user.username = username;
  user.description = description;
  user.password = hashedPassword;
  user.email = email;
  user.save();

  res.send('updated');

  // TODO uncomment once front end is able to make request
  // if(req.session.userId == user.uniqueid) {
  //   res.send(user)
  // }
});

module.exports = router;
