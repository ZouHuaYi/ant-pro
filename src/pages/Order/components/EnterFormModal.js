/**
 * Created by zhy on 2019/3/25.
 */
import  React from 'react';
import EM from '@/components/Order/EnterFormModal';
import {connect} from 'dva';


@connect(({loading,enter})=>({
  enter,
  thirdSelectLoading:loading.effects['enter/getThirdSelect']
}))
class EnterFormModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secend_select:[],
      third_select:[],
      secend_status:true,
      third_status:true,
      show_input:false,
      confirmLoading:false,
      project:[],
    }
  }

  changeFirst = (value)=>{
    const secend = this.props.enter.project.filter(item=>item.id==value);
    const form = this.formRef.props.form;
    const {dispatch} = this.props;
    this.setState({
      secend_select:secend[0].pCategoryList,
      secend_status:false,
      show_input:false,
    })
    form.setFieldsValue({
      select_2: undefined
    });
    form.setFieldsValue({
      select_3: undefined
    });
    dispatch({
      type:'enter/clearThirdSelect'
    })
    this.firstValue = value;
  }

  changeSecond = (value) => {
    const form = this.formRef.props.form;
    const {dispatch} = this.props;
    form.setFieldsValue({
      select_3: undefined
    });
    this.setState({
      third_status:false,
      show_input:false,
      third_select:[],
    })
    dispatch({
      type:'enter/getThirdSelect',
      payload:[value]
    })
  }

  changeThird = (value) => {

  }

  onCreate = () => {

  }

  onCancel = () => {

  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  componentWillReceiveProps(nextProps){

  }

  componentDidMount(){
      const {dispatch} = this.props;
      dispatch({
        type:'enter/getHospitalProject',
      })
  }

  render() {
    const {
      confirmLoading,show_input,secend_select,third_select,secend_status,third_status
    } = this.state;

    const {
      hospitalCate,
      visible,
      thirdSelectLoading,
    } = this.props;

    const {project,thridProject} = this.props.enter;

    console.log(thirdSelectLoading);

    return (
      <div>
        <EM
          wrappedComponentRef={this.saveFormRef}
          onCancel={this.onCancel}
          onCreate={this.onCreate}
          changeSecond={this.changeSecond}
          changeFirst={this.changeFirst}
          changeThird={this.changeThird}
          changeFirst={this.changeFirst}
          visible={visible}
          confirmLoading={confirmLoading}
          project={project}
          show_input={show_input}
          secend_select={secend_select}
          third_select={thridProject}
          secend_status={secend_status}
          third_status={!thirdSelectLoading&&thridProject.length==0}
        />
      </div>
    );
  }
}

export default EnterFormModal;
