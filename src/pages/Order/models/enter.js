/**
 * Created by zhy on 2019/3/20.
 */
import
{
  userLoginPhone,hospitalProject,thirdCategory
}
  from '@/services/order'
import { message } from 'antd';

export default {
  namespace: 'enter',
  state:{
    user:null,
    visible:true,
    project:{},
    thridProject:[],
  },
  effects:{
    *submitUserPhone({ payload }, { call, put }){
      const response = yield call(userLoginPhone,payload);
      if(response.messageCode==900){
        yield put({
          type:'save',
          payload:{
            data:response.data,
            visible:false,
          }
        })
      } else {
        message.error(response.message?response.message:'该用户异常');
      }
    },
    *getHospitalProject(_, { call, put }){
      const response = yield call(hospitalProject);
      if(response.messageCode==900){
        yield put({
          type:'saveHospitalProject',
          payload:{
            project:response.data,
          }
        })
      } else {
        message.error(response.message?response.message:'该用户异常');
      }
    },
    *getThirdSelect({payload},{call,put}){
      const response = yield call(thirdCategory,{categoryPid:payload[1]});
      if(response.messageCode==900 || response.messageCode==902){
          yield put({
            type:'saveThirdSelect',
            payload:{data:response.data?response.data:[]}
          })
      } else{
        message.error(response.message?response.message:'无法获取该项目的数据');
      }
    }
  },
  reducers: {
    save(state,{payload}){
      return {
        ...state,
        user:payload.data,
        visible:payload.visible,
      }
    },
    saveHospitalProject(state,{payload}){
      return{
        ...state,
        project:payload.project
      }
    },
    saveThirdSelect(state,{payload}){
      console.log(payload)
      return{
        ...state,
        thridProject:payload.data
      }
    },
    open(state){
      return{
        ...state,
        visible:true,
      }
    },
    close(state){
      return{
        ...state,
        visible:false,
      }
    },
  }
}
