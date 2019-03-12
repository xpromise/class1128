/*setTimeout(() => {
  console.log(1);
}, 0)

setImmediate(() => {
  console.log(2);
})

Promise.resolve()  //返回一个promise对象， 状态为成功的状态
  .then(() => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
    }, 0)
  
    setImmediate(() => {
      console.log(5);
    })
  
    process.nextTick(() => {
      console.log(6);
    })
  })
  .then(() => {
    console.log(7);
  })

process.nextTick(() => {
  console.log(8);
})

console.log(9);*/

/*
  宏任务
    setImmediate setTimeout setInterval
  微任务
    process.nextTick  Promise.then().catch()
    
  执行异步任务时，
    先检查是否有微任务，如果有就执行，
    如果没有就检查是否有宏任务，如果有就执行，执行完后又检查是否微任务，如果又就执行，如果没有才去检查宏任务
    微任务：同一层先执行，下一层后面执行
 */

setTimeout(() => {
  console.log(1);
  
  setTimeout(() => {
    console.log(2);
  }, 0)
  
  setImmediate(() => {
    console.log(3);
  })
  
}, 0)

setImmediate(() => {
  console.log(4);
})

for (var i = 0; i < 100000; i++) {
  var arr = []
}