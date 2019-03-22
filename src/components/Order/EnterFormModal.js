/**
 * Created by zhy on 2019/3/21.
 */
import React,{Component} from 'react';
import {
  Button, Modal, Form, Input,Select,
} from 'antd';

const { Option } = Select;
const EnterFromModal = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        secend_select:[],
        third_select:props.thridProject,
        secend_status:true,
        third_status:true,
        show_input:false,
      }
    }

    changeFirst = (value)=>{
      const secend = this.props.project.filter(item=>item.id==value);
      this.setState({
        secend_select:secend[0].pCategoryList,
        secend_status:false,
        third_status:true,
        show_input:false,
      })
      this.props.form.setFieldsValue({
        select_2: undefined
      });
      this.props.form.setFieldsValue({
        select_3: undefined
      });
      this.firstValue = value;
    }

    changeSecond = (value) => {
      this.props.form.setFieldsValue({
        select_3: undefined
      });
      this.setState({
        third_status:false,
        show_input:false,
        third_select:[],
      })
      this.props.thirdSelectHandle(this.firstValue,value);
    }

    changeThird = (value) => {
        this.setState({
          show_input:value==0
        })
    }

    onCreate = () => {
      this.setState ({
        secend_select:[],
        third_select:[],
        secend_status:true,
        third_status:true,
        show_input:false,
      })
      this.props.onCreate();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.thridProject!==this.state.third_select){
        this.setState({
          third_select:nextProps.thridProject
        })
      }
    }

    render() {
      const {
        visible, onCancel,form,project
      } = this.props;

      const { getFieldDecorator } = form;

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

      const {secend_select,secend_status,third_status,show_input,third_select} = this.state;

      return (
        <Modal
          visible={visible}
          title="服务订单录入"
          okText="完成"
          onCancel={onCancel}
          onOk={this.onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="第一项">
              {getFieldDecorator('select_1', {
                rules: [
                  { required: true, message: '第一项不能为空' },
                ],
              })(
                <Select placeholder="请输入第一项" onChange={this.changeFirst}>
                  {
                    project.map((item,key)=>{
                      return (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                      )
                    })
                  }

                </Select>
              )}
            </Form.Item>
            <Form.Item label="第二项" >
              {getFieldDecorator('select_2', {
                rules: [
                  { required: true, message: '第二项不能为空' },
                ],
              })(
                <Select placeholder="请输入第二项" onChange={this.changeSecond} disabled={secend_status}>
                  {
                    secend_select.map((item, key)=> {
                      return (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                      )
                    })
                  }

                </Select>
                    )}
            </Form.Item>
            <Form.Item label="第三项" >
                {getFieldDecorator('select_3', {
                  rules: [
                    { required: true, message: '第三项不能为空' },
                  ],
                })(
                  <Select placeholder="请输入第三项" disabled={third_status} onChange={this.changeThird}>
                    {
                      third_select.map((item,key)=>{
                        return (<Option key={item.id}  value={item.id} >{item.shortTitle}</Option>)
                      })
                    }
                    <Option  value={0}>添加其他项目</Option>
                  </Select>
              )}
            </Form.Item>
            {
              show_input?(
                <div>
                  <Form.Item label="商品名称">
                    {getFieldDecorator('shop',{
                      rules:[],
                    })(
                      <Input placeholder="请输入商品名称" />
                    )}
                  </Form.Item>
                  <Form.Item label="商品价格">
                    {getFieldDecorator('price',{
                      rules:[],
                    })(
                      <Input placeholder="请输入商品价格" />
                    )}
                  </Form.Item>
                </div>
              ):''
            }
          </Form>
        </Modal>
      );
    }
  }
);

export default EnterFromModal;
