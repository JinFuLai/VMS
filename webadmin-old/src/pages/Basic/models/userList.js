import { queryUserList,queryUserDelete } from '@/services/user';

export default {
  namespace: 'userList',

  state: {
    data: {
      dataList: [],
      pagination: {},
    },
  },

  effects: {
    *search({ payload,callback }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'refresh',
        payload: {
          data: response != null ? response.data : {
            dataList: [],
            pagination: {},
          }
        }
      });
      if (callback) callback(response);
    },
    *delete({ payload,callback }, { call, put }) {
      const response = yield call(queryUserDelete, payload);
      // const ids = payload.id;
      // yield put({
      //   type: 'delete',
      //   deleteIds: ids,
      // });
      if (callback) callback(response);
    }
  },

  reducers: {
    refresh(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // delete(state, action) {
    //   // this.state.data.dataList
    //   console.log(action.deleteIds);
    //   return {
    //     ...state,
    //   };
    // },
  },
};
