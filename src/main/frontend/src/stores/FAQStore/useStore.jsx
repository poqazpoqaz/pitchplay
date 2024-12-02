import { useReducer } from 'react';
import reducer, { initialState } from './reducer';  // `reducer`를 default import

import {
  changepost,
  changecomment
} from './action';

// useStore 훅: StoreContext로부터 상태와 액션을 가져옴
export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    changepost: (content) => dispatch(changepost(content)),
    
    changecomment: (comment) => dispatch(changecomment(comment)),

  };

  return { state, actions };
};
