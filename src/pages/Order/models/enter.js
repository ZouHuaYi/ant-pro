/**
 * Created by zhy on 2019/3/20.
 */
import
{
  userLoginPhone,hospitalProject,thirdCategory,addProject
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
      yield  put({
        type:'clearThirdSelect'
      });
      const response = yield call(thirdCategory,{categoryPid:payload[0]});
      if(response.messageCode==900 || response.messageCode==902){
          yield put({
            type:'saveThirdSelect',
            payload:{data:response.data?response.data:[]}
          })
      } else{
        message.error(response.message?response.message:'无法获取该项目的数据');
      }
    },
    *addNewProject({payload},{call,put}){
      const callback =  payload['callback'];
      delete payload['callback'];
      const response = yield call(addProject,{...payload});
      if(response.messageCode==900){
        callback&&callback(response.data);
      }else {
        callback&&callback(false);
        message.error(response.message?response.message:'添加项目失败');
      }
    },
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
      return{
        ...state,
        thridProject:payload.data
      }
    },
    clearThirdSelect(state){
      return{
        ...state,
        thridProject:[]
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
