async function m1(next) {
    console.log('m1');
    await next();
    console.log('m6');
}

async function m2(next) {
    console.log('m2');
    await next();
    console.log('m5');
}

async function m3(next) {
    console.log('m3');
    await next();
    console.log('m4');
}

// let next1 = async function() {
//     await m3();
// }

// let next2 = async function() {
//     await m2(next1);
// }

// m1(next2);
let middlewares = [m1, m2, m3];

function createNext(middleware, oldNext) {
    return async function() {
        await middleware(oldNext)
    }
}

let next = async function() {
    return Promise.resolve();
}
for (let i = middlewares.length - 1; i >=0; i--) {
    next = createNext(middlewares[i], next);
}

next();
