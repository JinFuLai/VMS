import { queryAccountList } from '@/services/basic';

export default {
  namespace: 'account',
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
      const response = yield call(queryAccountList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
};
