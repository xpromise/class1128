import { ADD_COMMENT, DEL_COMMENT } from './action-types';

export const addComment = (data) => ({type: ADD_COMMENT, data});

export const delComment = (data) => ({type: DEL_COMMENT, data});