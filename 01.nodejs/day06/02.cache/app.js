const express = require('express');
const {resolve} = require('path');
const {readFile, stat, watch} = require('fs');
const createETag = require('etag');
const app = express();
/*
  缓存的流程：
    1. 强制缓存：通常不修改的文件  不会访问服务器
      - http1.1 cache-control
      - http1.0 expires
      命中强制缓存 200
        from memory cache  来自内存缓存
        from disk cache   来自磁盘缓存
    2. 协商缓存：经常修改的文件  一定会访问服务器
      请求头
        if-modified-since  if-none-match
      响应头
        last-modified   etag
        
      etag/if-none-match  代表文件有没有被修改
      if-modified-since/last-modified 代表文件修改时间
      - 首先看etag有没有变化，
        如果没有没变化，直接走协商缓存，返回状态码为304
        如果有变化（说明文件被修改了）
          再去看last-modified的值，与当前时间进行对比
            如果当前时间小于last-modified的值，说明没有过期，直接走协商缓存，返回状态码为304
            反之，就过期了，返回新的资源文件，状态码为200
 */

let ETag = '';
//初始化生成文件默认ETag
function updateETag() {
  stat('./public/js/test2.js', (err, stat) => {
    if (!err) {
      // console.log(stat); //文件信息
      ETag = createETag(stat);
      console.log(ETag); // W/"25-16984956e8a"
    } else {
      console.log(err);
    }
  })
}
updateETag()

watch('./public/js/test2.js', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    updateETag();
  }
});

app.get('/', (req, res) => {
  // res.sendFile(resolve(__dirname, 'public/index.html'));
  
  readFile('./public/index.html', (err, data) => {
    if (!err) {
      res.end(data);
    } else {
      console.log(err);
    }
  })
  
})

app.get('/js/test1.js', (req, res) => {
  //设置强制缓存
  res.set('cache-control', 'public, max-age=3600'); //单位是秒
  res.set('expires', new Date(Date.now() + 3600000).toGMTString());
  
  readFile('./public/js/test1.js', (err, data) => {
    if (!err) {
      res.end(data);
    } else {
      console.log(err);
    }
  })
})

app.get('/js/test2.js', (req, res) => {
  //设置协商缓存
  /*
    etag/if-none-match  代表文件有没有被修改
      if-modified-since/last-modified 代表文件修改时间
      - 首先看etag有没有变化，
        如果没有没变化，直接走协商缓存，返回状态码为304
        如果有变化（说明文件被修改了）
          再去看last-modified的值，与当前时间进行对比
            如果当前时间小于last-modified的值，说明没有过期，直接走协商缓存，返回状态码为304
            反之，就过期了，返回新的资源文件，状态码为200
   */
  const ifModifiedSince = req.headers['if-modified-since'];
  const ifNoneMatch = req.headers['if-none-match'];
  //判断ETag有没有变化
  if (ifNoneMatch !== ETag) {
    //如果有变化，还得看last-modified的值，与当前时间进行对比
    if (Date.now() < ifModifiedSince) {
      //说明没有过期, 走协商缓存
      res.status(304).end();
    } else {
      //过期了，返回200新资源，并且重新设置etag和last-modified
      //初次设置协商缓存的配置
      res.set('cache-control', 'no-cache'); // 走协商缓存
      res.set('etag', ETag);
      res.set('last-modified', new Date(Date.now() + 3600000).toGMTString());  //过期时间1个小时
      
      readFile('./public/js/test2.js', (err, data) => {
        if (!err) {
          res.end(data);
        } else {
          console.log(err);
        }
      })
      
    }
  } else {
    //如果没有变化, 走协商缓存
    res.status(304).end();
  }
  
})

app.get('/js/test3.js', (req, res) => {
  //设置强缓存和协商缓存
  /*
    etag/if-none-match  代表文件有没有被修改
      if-modified-since/last-modified 代表文件修改时间
      - 首先看etag有没有变化，
        如果没有没变化，直接走协商缓存，返回状态码为304
        如果有变化（说明文件被修改了）
          再去看last-modified的值，与当前时间进行对比
            如果当前时间小于last-modified的值，说明没有过期，直接走协商缓存，返回状态码为304
            反之，就过期了，返回新的资源文件，状态码为200
   */
  const ifModifiedSince = req.headers['if-modified-since'];
  const ifNoneMatch = req.headers['if-none-match'];
  //判断ETag有没有变化
  if (ifNoneMatch !== ETag) {
    //如果有变化，还得看last-modified的值，与当前时间进行对比
    if (Date.now() < ifModifiedSince) {
      //说明没有过期, 走协商缓存
      res.status(304).end();
    } else {
      //过期了，返回200新资源，并且重新设置etag和last-modified
      //设置强制缓存
      res.set('cache-control', 'public, max-age=3600'); //单位是秒
      res.set('expires', new Date(Date.now() + 3600000).toGMTString());
      //初次设置协商缓存的配置
      res.set('etag', ETag);
      res.set('last-modified', new Date(Date.now() + 3600000).toGMTString());  //过期时间1个小时
      
      readFile('./public/js/test2.js', (err, data) => {
        if (!err) {
          res.end(data);
        } else {
          console.log(err);
        }
      })
      
    }
  } else {
    //如果没有变化, 走协商缓存
    res.status(304).end();
  }
  
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})