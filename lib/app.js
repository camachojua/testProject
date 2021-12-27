'use strict';

const express = require('express');
const router = express.Router();
const R = require('ramda');
const body_parser = require('body-parser');

const isNullOrEmpty = (a) => {
  return R.isNil(a) || R.isEmpty(a);
};

const server = express();
server.use(body_parser.json({ limit: '50mb' }));

const port = 3000;
const hostname = 'localhost';

server.use('/', router);

router.get('/first', (req, res) => {
  console.log(`/first`);
  const data = R.propOr({}, 'data')(req.body);

  if (isNullOrEmpty(data))
    return res.status(404).json({
      message: 'Missing data on body',
      missing: ['data'],
    });
  const { param1, param2 } = data;

  if (isNullOrEmpty(param1) || isNullOrEmpty(param2))
    return res.status(404).json({
      message: 'Missing parameters on body',
      missing: ['param1', 'param2'],
    });

  return res.status(200).json({ result: `You give me a ${param1}-${param2}.` });
});

router.get('/second', ({}, res) => {
  console.log('/second');
  return res
    .status(200)
    .json({ result: "I'm the response of the second endpoint." });
});

server.listen(port, hostname, () => {
  console.log(`Server listening on: ${hostname}:${port}`);
});
