var pch = require('./lib/promise-chain');

if (Promise) {
  if (Promise.first) {
    throw new Error('Promises API already has "first" method. Aborting.');
  } else {
    Promise.first = pch.first;
  }
} else {
  throw new Error('Promises API not available. Aborting.');
}

module.exports = pch;
