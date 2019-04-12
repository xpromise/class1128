/*
  用来创建action对象的工厂函数模块
  action对象 --> {type: xxx, data: xxx}
    type 用来决定reducers最终对数据执行什么操作
    data 用来决定数据怎么修改
 */

import { INCREMENT, DECREMENT } from './action-types';

// action creators 工厂函数
export const increment = (data) => ({type: INCREMENT, data});

export const decrement = (data) => ({type: DECREMENT, data});

