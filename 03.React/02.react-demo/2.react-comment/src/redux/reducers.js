import { ADD_COMMENT, DEL_COMMENT } from './action-types';

const initState = [
  {username: 'jack', content: 'I Love Rose', id: 1},
  {username: 'rose', content: 'I Love Jack', id: 2}
]

function comments(previousState = initState, action) {
  switch (action.type) {
    case ADD_COMMENT :
      return [action.data, ...previousState];
    case DEL_COMMENT :
      return previousState.filter((comment) => comment.id !== action.data);
    default :
      return previousState;
  }
}

export default comments;