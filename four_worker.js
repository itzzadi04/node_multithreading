const { parentPort, workerData } = require('worker_threads');

const sumof = (start, end) => {

let sum = 0;
    
for (let i = start; i <= end; i++) {
        sum = sum + i;
}

return sum;
};

const { start, end } = workerData;
parentPort.postMessage(sumof(start, end));
