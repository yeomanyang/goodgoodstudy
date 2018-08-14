setTimeout(() => console.log('setTimeout1'), 0);
setTimeout(() => {
    console.log('setTimeout2');
    Promise.resolve().then(() => {
        console.log('promise3');
        Promise.resolve().then(() => {
            console.log('promise4');
        })
        console.log(5)
    })
    setTimeout(() => console.log('setTimeout4'), 0);
}, 0);
setTimeout(() => console.log('setTimeout3'), 0);
Promise.resolve().then(() => {
    console.log('promise1');
})


// process.nextTick(() => {
//     console.log('nextTick1');
// });
// setImmediate(() => {
    // console.log('immediate1');
    // process.nextTick(() => {
    //     console.log('nextTick2');
    // });
// });
// setImmediate(() => {
//     console.log('immediate2');
// });
// setTimeout(() => {
//     console.log('timeout');
// });

// const fs = require('fs');

// function someAsyncOperation(callback) {
//   // Assume this takes 95ms to complete
//   fs.readFile('/Users/yeoman/Desktop/task.key', callback);
// }

// const timeoutScheduled = Date.now();

// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;

//   console.log(`${delay}ms have passed since I was scheduled`);
// }, 4);


// do someAsyncOperation which takes 95 ms to complete
// someAsyncOperation(() => {
//     console.log('read finish')
// });


// function someAsyncApiCall(callback) { process.nextTick(callback); }

// // the callback is called before `someAsyncApiCall` completes.
// someAsyncApiCall(() => {
//   // since someAsyncApiCall has completed, bar hasn't been assigned any value
//   console.log('bar', bar); // undefined
// });

// var bar = 1;
