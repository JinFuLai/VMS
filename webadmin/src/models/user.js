import { queryUserList } from '@/services/basic';

export default {
  namespace: 'user',
  state: {
    data: [],
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
};
