# promise-chain
A small extension to the Promises interface for ES6.

## Description
Extends the `Promise` object with a `first` function that takes an array of promises as an argument. Returns a promise that resolves with the result of the first resolving promise in the array of promises provided, or rejects if none of the promises resolves.

## Usage
To get started, simply `require('index.js');` and `Promise` will be extended with a `first` function. If you do not want to extend the `Promise` interface, you can `require('/lib/promise-chain.js')` and use the provided `first` function.

## Example

```
Promise.first([p1, p2])
  .then(function(data) {
    // p1 or p2 resolved with data
  }, function() {
    // neither p1 nor p2 resolved
  });
```
