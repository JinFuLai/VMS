import { queryDepartmentList } from '@/services/basic';

export default {
  namespace: 'department',
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
      const response = yield call(queryDepartmentList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
};
