## 1、tree shaking
* tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码。
* 它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。
* 配置：
  * 模块化语法使用 ES2015 模块化 (注意不能让babel将ES6的模块化语法转化成commonjs了)
  * 使用模式 production ，会自动使用 UglifyJSPlugin 压缩 js 代码
  ```
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              "modules": false  //关掉babel将ES6模块化转化为commonjs，webpack自带了这个功能
            }
          ]
        ]
      }
    }
  }
  ```
* 此时代码环境已经能够去除未引用代码了~

## 2、懒加载 
* 让特定的js文件不要一上来就加载
* 下载babel相关的包
  * npm i @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime @babel/runtime -D
  * `@babel/plugin-syntax-dynamic-import` 允许解析import()语法
  * `@babel/plugin-transform-runtime` 用于语法转换
  * `@babel/runtime` 用于解决 `Module not found: Error: Can't resolve '@babel/runtime/regenerator'` 这个错误，需要下载当前包
* 下载eslint相关的包
  * npm i babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D  
  * `babel-eslint` 用于支持eslint不支持的语法或实验性功能
  * `eslint-config-airbnb` airbnb的配置，其他包都是其相关的依赖
* eslint的package.json配置 
  ```
  "eslintConfig": {
    "extends": "airbnb",   //著名的eslint标准
    "parser": "babel-eslint", // 替代 eslint 默认的解析库以支持还未标准化的语法。比如 import()。
    "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module"
    },
    "rules": {
      "linebreak-style": [0, "error", "windows"]  //忽略换行符 CRLF 的错误
    },
    "env": {
      "browser": true  //支持浏览器的全局变量
    }
  },
  ```
* 修改loader
  ```
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [...],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",   //解析import()
          [
            require.resolve("@babel/plugin-transform-runtime"),  //帮助解析regenerator的错误
            {
              "absoluteRuntime": false,
              "corejs": false,
              "helpers": false,  //只需要修改这个，其他都是默认配置，可以不加
              "regenerator": true,
              "useESModules": false
            }
          ]
        ]
      }
    }
  },
  ```
* 修改output
  ```
  output: {
    filename: 'js/[name].[hash:8].js',   //添加了hash值, 实现静态资源的长期缓存
    chunkFilename: 'js/[name].bundle.js', // 非入口 chunk 的名称
    publicPath: '/'  //所有输出资源的公共路径
  },
  ```
* 使用  
  ```
  async function getComponent() {
    const element = document.createElement('div');
    /*
      webpackChunkName: "模块名称"
      '模块路径'
    */
    const module = await import(/* webpackChunkName: "module2" */ './module2');  
    const Person = module.default;
    const { name, age } = new Person('jack', 18);
    element.innerHTML = `name: ${name}  age: ${age}`;
    return element;
  }
  /*
    只有触发了onclick事件才会动态加载module2文件，从而执行其中代码
  */
  document.getElementById('box1').onclick = () => {
    getComponent().then((component) => {
      document.body.appendChild(component);
    });
  };
  ```

## 3、code split
* 代码分割，提取公共代码成单独模块。方便缓存。
* 配置
  ```
  optimization: {
    /*
    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: true, 
    splitChunks: {
      chunks: 'all'  // 默认 entry 的 chunk 不会被拆分, 配置成 all, 就可以了
    }
  }
  ```
> 因为是单入口文件配置，所以没有考虑多入口的情况，多入口是应该分别进行处理。

## 4、缓存
* `hash`: hash 是整个编译过程产生的一个总的 hash 值，而不是单个文件的 hash 值，项目中任何一个文件的改动，都会造成这个 hash 值的改变。 占位符 [hash] 是始终存在的，但我们不希望修改一个文件导致所有输出的文件 hash 都改变，这样就无法利用浏览器缓存了。因此这个 [hash] 意义不大。
* `chunk`: 代码中引用的文件（js、css、图片等）会根据配置合并为一个或多个包，我们称一个包为 chunk。每个 chunk 包含多个 modules。无论是否是 js，webpack 都将引入的文件视为一个 module。
* `chunkhash`: 这个 chunk 的 hash 值，文件发生变化时该值也会变。使用 [chunkhash] 作为文件名可以防止浏览器读取旧的缓存文件。
* 配置插件
  ```
  /*
    使用文件路径的 hash 作为 moduleId。
    虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
  */
  new webpack.HashedModuleIdsPlugin()
  ```   
* 修改文件输出路径
  * `js/[name].[hash:8].js` --> `js/[name].[chunkhash:8].js`
  * `css/[name].[hash:8].css` --> `css/[name].[chunkhash:8].css`

## 5、渐进式网络应用程序
* 渐进式网络应用程序(PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。
* PWA 可以用来做很多事。其中最重要的是，在离线时应用程序能够继续运行功能。
* 下载插件
  * npm i workbox-webpack-plugin -D
* 引入插件
  * const WorkboxPlugin = require('workbox-webpack-plugin');
* 配置插件
  ```
  new WorkboxPlugin.GenerateSW({
    // 这些选项帮助 ServiceWorkers 快速启用
    // 不允许遗留任何“旧的” ServiceWorkers
    // 更多配置详见：https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    clientsClaim: true,
    skipWaiting: true,
    importWorkboxFrom: 'local',  //打包到本地， 默认值是'cdn' 访问的是国外cdn需要翻墙
    include: [/\.html$/, /\.js$/, /\.css$/],  //包含资源
    exclude: [/\.(png|jpg|gif|svg)/]  //排除资源
  })
  ```
* 入口文件配置
  ```
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('SW registered: ', registration);
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
  ```  
* 运行指令
  * npm run build
  * serve -s dist

> 此时在浏览器控制台就能看到 service worker 注册成功，你可以尝试关掉服务器或者断开网络，这时神奇的事就发生了，我们网页还能正常浏览~
> 这就是PWA的魔力，还有关于PWA的详细应用，大家可以点开这篇 [文章](https://zoumiaojiang.com/article/amazing-workbox-3/) 看看~


