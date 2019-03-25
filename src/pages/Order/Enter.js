/**
 * Created by zhy on 2019/3/20.
 */
import React,{Component} from 'react';
import EnterModal from '@/components/Order/EnterModal';
import EnterHeader from '@/components/Order/EnterHeader';
import EnterFromModal from './components/EnterFormModal';
import EnterFormList from '@/components/Order/EnterFormList'
import {connect} from 'dva';
import {
  Button, Modal, Form, Input,message,Spin,Divider
} from 'antd';


@connect(({enter,loading})=>({
  enter,
  userPhoneLoading:loading.effects['enter/submitUserPhone'],
}))
class Enter extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      tableList:[],
      confirmLoading:false,
      addStatus:false,
    };
  }

  componentDidMount(){
    this.props.dispatch({
      type:'enter/getHospitalProject'
    })
  }

  showModal = () => {
    const {dispatch} = this.props;
    dispatch({
      type:'enter/open'
    })
  }

  handleCancel = () => {
    const {dispatch} = this.props;
    dispatch({
      type:'enter/close'
    })
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const {dispatch} = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type:'enter/submitUserPhone',
        payload: {
          phone:values.phone,
        },
      })
      dispatch({
        type:'enter/close'
      })
      form.resetFields();
    });
  }

  thirdSelectHandle = (firstId,secondId) => {
    if(firstId&&secondId){
      const {dispatch} = this.props;
      dispatch({
        type:'enter/getThirdSelect',
        payload:[firstId,secondId]
      })
    }else {
      message.error(`参数出错啦!${firstId}或${secondId}`);
    }
  }

  handleCreateOrder = () =>{
    const form = this.formRefOrder.props.form;
    const {thridProject,project} = this.props.enter;
    const {dispatch} = this.props;
    let tableList = this.state.tableList;
    form.validateFields((err, values) => {
      if(err) return;
      if(values.select_3!==0){
        const third = thridProject.filter((item,key)=>item.id==values.select_3);
        tableList.push(third[0]);
        this.setState({
          tableList:tableList,
          visible:false,
          addStatus:true,
        })
        form.resetFields();
        this.setState({
          addStatus:false,
        })
      }else {
        this.setState({
          confirmLoading:true
        })
        dispatch({
          type:'enter/addNewProject',
          payload:{
            categoryPid:values.select_2,
            categoryId:values.select_1,
            title:values.shop,
            discountPrice:values.price,
            callback:(res)=>{
              if(res){
                tableList.push(res);
                this.setState({
                  tableList:tableList,
                  visible:false,
                  confirmLoading:false,
                })
              }
              form.resetFields();
            }
          }
        })
      }
    })
  }

  saveFormRefOrder = (formRef)=>{
    this.formRefOrder = formRef;
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  addOrderStatus = () => {
    this.setState({
        visible:true,
    })
  }
  closeOderStatus = () => {
    this.setState({
      visible:false,
    })
  }


  render() {
    const {visible,user,project,thridProject} = this.props.enter;
    const {userPhoneLoading,hospitalCateLoading} = this.props;
    return (
      <div >
        {user?
          (<div style={{background:'#ffffff'}}>
              <EnterHeader user={user} />
              <Divider/>
              <div style={{boxSize:'border-box',padding:'0 20px'}}>
                <Button size="large" onClick={this.addOrderStatus} loading={hospitalCateLoading} type="primary">添加服务类目</Button>
              </div>
              <Divider/>
              <div style={{boxSize:'border-box',padding:'0 20px 40px'}}>
                <EnterFormList tableList={[]}  />
              </div>
              <EnterFromModal
                visible={this.state.visible}
              />
            </div>
          )
          :(<div>
            <Button type="primary" onClick={this.showModal}>开始录入服务订单</Button>
            <EnterModal
              wrappedComponentRef={this.saveFormRef}
              visible={visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          </div>)
        }
      </div>
    );
  }
}

export default Enter;
