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

    render() {
      const {
        visible,
        form,
        project,
        confirmLoading,
        secend_select,
        secend_status,
        third_select,
        third_status,
        show_input,
        onCreate,
        changeSecond,
        changeFirst,
        changeThird,
        onCancel,
      } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

      return (
        <Modal
          visible={visible}
          title="服务订单录入"
          okText="完成"
          confirmLoading={confirmLoading}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="第一项">
              {getFieldDecorator('select_1', {
                rules: [
                  { required: true, message: '第一项不能为空' },
                ],
              })(
                <Select placeholder="请输入第一项" onChange={changeFirst}>
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
                <Select placeholder="请输入第二项" onChange={changeSecond} disabled={secend_status}>
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
                  <Select placeholder="请输入第三项" disabled={third_status} onChange={changeThird}>
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
                  <Form.Item label="项目名称">
                    {getFieldDecorator('shop',{
                      rules:[
                        { required: show_input, message: '项目名称不能为空' },
                      ],
                    })(
                      <Input placeholder="请输入项目名称" />
                    )}
                  </Form.Item>
                  <Form.Item label="项目价格">
                    {getFieldDecorator('price',{
                      rules:[
                        { required: show_input, message: '项目价格不能为空，并且只能输入数字' },
                      ],
                    })(
                      <Input placeholder="请输入项目价格" />
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
