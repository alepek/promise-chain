var pch = require('./lib/promise-chain');

if (!Promise) {
  throw new Error('Promises API not available. Aborting.');
}
else {
  if (!Promise.first) {
    Promise.first = pch.first;
  }
  else {
    throw new Error('Promises API already has "first" method. Aborting.')
  }
}

module.exports = pch;
