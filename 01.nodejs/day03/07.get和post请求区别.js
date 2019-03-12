/*
  面试题： get请求和post请求的区别：
    1. GET参数通过URL传递，POST放在Request body中。
    2. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
    3. GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
    4. GET请求在URL中传送的参数是有长度限制的，而POST么有。
    5. GET请求会被浏览器主动cache，而POST不会，除非手动设置。
  
  https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4
 */