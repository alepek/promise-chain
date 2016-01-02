var tape = require('tape');
var pch = require('../index.js');

var resolver = function(data) {
  return new Promise(function(resolve, reject) { //eslint-disable-line
    setTimeout(function() {
      return resolve(data);
    }, Math.random() * 100);
  });
};
var rejector = function(data) {
  return new Promise(function(resolve, reject) { //eslint-disable-line
    setTimeout(function() {
      return reject(data);
    }, Math.random() * 100);
  });
};

tape('no parameters', function(t) {
  Promise.first([])
    .then(function() {
      t.end('should reject');
    }, function() {
      t.end();
    });
});

tape('junk data', function(t) {
  Promise.first(['asd'])
    .then(function() {
      t.end('should reject');
    }, function(err) {
      t.equal(err, 'non-promise was provided');
      t.end();
    });
});

tape('single resolve', function(t) {
  Promise.first([resolver()])
    .then(function() {
      t.end();
    }, function() {
      t.end('incorrect rejection');
    });
});

tape('multiple resolves', function(t) {
  var a = resolver('first');
  var b = resolver('second');

  pch.first([a, b])
    .then(function(data) {
      t.equal(data, 'first');
      t.end();
    }, function() {
      t.end('incorrect rejection');
    });
});

tape('single reject', function(t) {
  Promise.first([rejector()])
    .then(function() {
      t.end('incorrect resolve');
    }, function() {
      t.end();
    });
});

tape('single reject, single resolve', function(t) {
  Promise.first([rejector(), resolver('data')])
    .then(function(data) {
      t.equal(data, 'data');
      t.end();
    }, function() {
      t.end('incorrect rejection');
    });
});

tape('mulitple reject, multiple resolve', function(t) {
  Promise.first([rejector(), rejector(),
      resolver('data'), resolver('later'), rejector()])
    .then(function(data) {
      t.equal(data, 'data');
      t.end();
    }, function() {
      t.end('incorrect rejection');
    });
});
