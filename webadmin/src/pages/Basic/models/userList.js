import { queryUserList } from '@/services/basic';
export default {
  namespace: 'userList',

  state: {
    data: {
      dataList: [],
      pagination: {},
    },
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'refresh',
        payload: response.data,
      });
    },
  },

  reducers: {
    refresh(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
