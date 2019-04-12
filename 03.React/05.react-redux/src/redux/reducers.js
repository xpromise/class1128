/*
  用来根据之前的状态数据和action对象来生成新的状态
  新的状态会交给store对象管理
 */
import { INCREMENT, DECREMENT } from './action-types';

// 函数名一般与要操作的状态数据一致
function number(previousState = 0, action) {
  console.log('reducers函数调用了：', previousState, action);
  switch (action.type) {
    case INCREMENT :
      return previousState + +action.data;
    case DECREMENT :
      return previousState - +action.data;
    // 都没有命中执行的。读取初始化状态值的时候
    default :
      return previousState;
  }
}

// 暴露出去
export default number;