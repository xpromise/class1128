/*
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise1');
    reject('promise1');
  }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise2');
    resolve('promise2');
  }, 2000)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise3');
    resolve('promise3');
  }, 3000)
})

Promise.resolve(123)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })

Promise.reject(456)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log('err', err);
  })


//等待传入的promise对象的状态都变成成功状态时，触发成功的回调
//只要其中一个变成失败的状态，就立即触发失败回调
//需求：请求多个数据，保证数据都时Ok
Promise.all([promise1, promise2, promise3])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })

  */


//async函数内部没办法处理异常
(async () => {
  try { //放置可能出错的代码
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promise1');
        reject('promise11111');
      }, 1000)
    })
  
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promise2');
        resolve('promise2');
      }, 2000)
    })
  
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promise3');
        resolve('promise3');
      }, 3000)
    })
  } catch (e) {
    //一旦try出了问题，中断try的执行，直接来到catch处理异常
    // console.log(e);
  }
})()