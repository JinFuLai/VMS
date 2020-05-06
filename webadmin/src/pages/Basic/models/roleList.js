import { queryRoleList } from '@/services/basic';

export default {
  namespace: 'roleList',

  state: {
    data: {
      dataList: [],
      pagination: {},
    },
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(queryRoleList, payload);
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