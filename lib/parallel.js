'use strict';

const axios = require('axios');
const R = require('ramda');

const myGet = async (endpoint) => {
  try {
    return await axios.get(`localhost:3000${endpoint}`).data;
  } catch (err) {
    console.error(err);
  }
};

const getInParallel = async (endpoints) => {
  return await Promise.alle(R.map(myGet)(endpoints));
};

getInParallel(['/first', '/second'])
  .then((out) => {
    console.log(out);
  })
  .catch((err) => {
    console.error(err);
  });
