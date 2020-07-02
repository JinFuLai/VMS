import { queryUserList,queryUserDelete,queryUserCreate} from '../service';

export default {
  namespace: 'userListOld',

  state: {
    data: {
      dataList: [],
      pagination: {},
    },
  },

  effects: {
    *search({ payload,callback }, { call, put }) {
      const response = yield call(queryUserList, payload);
      // console.log(response,"fanhui")
      // console.log({ payload,callback },"{ payload,callback }")
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
      const response = yield call(queryUserCreate, payload);
      // console.log(response,"add1")
      // console.log({ payload,callback },"{ payload,callback }")
    },
    *delete({ payload,callback }, { call, put }) {
      const response = yield call(queryUserDelete, payload);
      // console.log(response,"delete")
      // console.log({ payload,callback },"{ delete}")
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
