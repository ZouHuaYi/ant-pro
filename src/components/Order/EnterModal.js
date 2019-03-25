/**
 * Created by zhy on 2019/3/20.
 */
import React,{Component} from 'react';
import {
  Button, Modal, Form, Input,
} from 'antd';


const EnterModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="输入用户手机号进行服务订单录入"
          okText="下一步"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="用户手机号">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '电话号码不能为空' },
                  { pattern: /^\d{11}$/, message:  '电话号码格式不正确'},
                ],
              })(
                <Input placeholder="请输入手机号" onPressEnter={e => {
                  e.preventDefault();
                  onCreate();
                }}  />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default EnterModal;
