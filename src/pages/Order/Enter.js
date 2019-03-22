/**
 * Created by zhy on 2019/3/20.
 */
import React,{Component} from 'react';
import EnterModal from '@/components/Order/EnterModal';
import EnterDetail from '@/components/Order/EnterDetail';
import EnterFromModal from '@/components/Order/EnterFormModal';
import {connect} from 'dva';
import {
  Button, Modal, Form, Input,message
} from 'antd';


@connect(({enter,loading})=>({
  enter,
  // loading: loading.effects['enter/getHospitalProject'],
}))
class Enter extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      tableList:[]
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
    const {thridProject} = this.props.enter;
    let tableList = this.state.tableList;
    console.log(this.state)
    form.validateFields((err, values) => {
      console.log(values)
      if(values!==0){
        const third = thridProject.filter((item,key)=>item.id==values.select_3);
        tableList.push(third[0]);
        this.setState({
          tableList:tableList,
          visible:false,
        })
        form.resetFields();
      }else {

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
    return (
      <div >
        {user?
          (<div style={{background:'#ffffff'}}>
              <EnterDetail
                user={user}
                onAddStatus={this.addOrderStatus}
                tableList={this.state.tableList}
              />
              <EnterFromModal
                wrappedComponentRef={this.saveFormRefOrder}
                visible={this.state.visible}
                onCancel={this.closeOderStatus}
                onCreate={this.handleCreateOrder}
                project={project}
                thridProject={thridProject}
                thirdSelectHandle={this.thirdSelectHandle}
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
