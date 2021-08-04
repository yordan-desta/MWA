const fibunacci = require('./fibonacci_calculator');

console.log('About to start computation');

//console.log("synchronously calculating", fibunacci.calculateSync(30));

fibunacci.calculate(30).then(result => console.log("Ayncronously calculating", result));

fibunacci.calculateWithPromise(30).then(result => console.log("Ayncronously calculating", result));

console.log('Computation underway for fib of 30 and -10....');