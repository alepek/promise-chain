module.exports = {
  first: function(promises) {
    var run = function(resolve, reject) {
      var promise = promises.shift();

      if (typeof(promise) === 'function') {
        promise = promise();
      }

      if (promise && promise.then) {
        promise
          .then(function(res) {
            return resolve(res);
          }, function() {
            return run(resolve, reject);
          });
      } else if (promise) {
        return reject('non-promise was provided');
      } else {
        return reject();
      }
    };

    return new Promise(run);
  }
};
