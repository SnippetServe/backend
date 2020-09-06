import express from 'express';

import createRouter from './createSnippet';
import updateRouter from './editSnippet';
import deleteRouter from './deleteSnippet';
import viewSnippetRouter from './viewSnippet';

const router = express.Router();

router.use(viewSnippetRouter);
router.use(createRouter);
router.use(updateRouter);
router.use(deleteRouter);

module.exports = router;
