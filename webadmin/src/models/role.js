import { queryRoleList } from '@/services/basic';

export default {
  namespace: 'role',
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
      const response = yield call(queryRoleList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
};
