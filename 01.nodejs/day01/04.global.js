/*
  浏览器中js包含内容：
    1. DOM  文档对象模块  document  CRUD
    2. BOM  浏览器对象模块 window history location...
    3. ES  ECMAScript规范  语法规范
      ES5 / 6 / 7 / 8 / 9 / 10
  服务器中nodejs中js包含内容：
    1. 不存在DOM
    2. 绝大部分BOM不存在，不存在window对象，通过global取代window
      console
      setTimeout
      setInterval
      setImmediate 立即执行函数
      Buffer
      process.nextTick
    3. 绝大部分ES全部实现
 */

// console.log(global);

setTimeout(() => {
  console.log(1);
}, 0)

setImmediate(() => {
  console.log(2);
})

process.nextTick(() => {
  console.log(3);
})

console.log(4);
/*
  nodejs中事件轮询机制， 借助c/c++写的libuv实现的
  
  1. 定时器：
    本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。
  2. 待定回调：
    执行延迟到下一个循环迭代的 I/O 回调。
    TCP错误回调函数
  3. idle, prepare：
    仅系统内部使用。
  4. 轮询：
    轮询（回调）队列：需要将来执行的回调函数
    轮询轮询（回调）队列，看是否由回调函数要执行
      - 轮询（回调）队列有内容
        依次取出、同步执行
        直到轮询（回调）队列为空，或者达到系统最大限制（崩溃了）
      - 轮询（回调）队列没有内容
        如果之前设置过setImmediate函数，就去下一个阶段
        如果没有设置过，就在当前阶段等待（等待新的回调函数被添加进来）
        特例：如果定时器到点了，也会去下一个阶段
  5. 检测：
    setImmediate() 回调函数在这里执行。
  6. 关闭的回调函数：
    一些准备关闭的回调函数，如：socket.on('close', ...)。
    end / close 事件
    
  事件轮询是无限的死循环，如果到了第六阶段又会返回第一阶段
  
  process.nextTick函数会在任意阶段，优先执行
 */