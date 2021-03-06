import { queryList,queryDelete,queryCreate } from '../service';

export default {
  namespace: 'roleList',

  state: {
    data: {
      dataList: [],
      pagination: {},
    },
  },

  effects: {
    *search({ payload,callback }, { call, put }) {
      const response = yield call(queryList, payload);
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
    *create({ payload,callback }, { call, put }) {
      const response = yield call(queryCreate, payload);
      console.log(response,"add456")
      console.log({ payload,callback },"{ payload,callb123ack }")
    },
    *delete({ payload,callback }, { call, put }) {
      const response = yield call(queryDelete, payload);
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
