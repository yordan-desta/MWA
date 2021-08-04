const findFibonacci = function(num) {
    if (num <= 0) {
        return 0;
    }
    if (num <= 2) {
        return 1;
    }

    return (findFibonacci(num - 1) + findFibonacci(num - 2));
}

function calculateSync(num) {
    return findFibonacci(num);
}

async function calculate(num) {
    return findFibonacci(num);
}

function calculateWithPromise(num) {
    return new Promise((resolve) => {
        resolve(findFibonacci(num))
    })
}

module.exports = {
    calculateSync: calculateSync,
    calculate: calculate,
    calculateWithPromise: calculateWithPromise
};