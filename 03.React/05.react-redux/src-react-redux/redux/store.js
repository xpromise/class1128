/*
  用来集中性的存储所有redux管理的状态数据
 */
import { createStore } from 'redux';

// 引入reducers函数
import reducers from './reducers';

// 创建store对象
// 传入参数为reducers函数，这样store对象就和reducers函数绑定在一起
// 所以reducers函数调用时才有previousState，并且调用完返回的newState会交给store管理
const store = createStore(reducers);

// 暴露出去
export default store;