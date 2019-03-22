/**
 * Created by zhy on 2019/3/21.
 */
import React from 'react';
import {
  Table, Input, Button, Popconfirm, Form,Row,Col
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

function Footer() {
  return(
    <div>
      <Row>
        <Col span={8}>
          <div>订单总价：100000</div>
        </Col>
        <Col span={8}>
          <div>使用免费额度：90900</div>
        </Col>
        <Col span={8}>
          <div style={{textAlign:'right'}}>实际支付金额：80080</div>
        </Col>
      </Row>
    </div>
  )
}


const EditableTable = Form.create()(EditableRow);
class EnterFormList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '项目名称',
      dataIndex: 'title',
      width: '20%',
    }, {
      title: '一级分类',
      dataIndex: 'first',
    },{
      title: '二级分类',
      dataIndex: 'second',
    },
      {
      title: '订单价格',
      dataIndex: 'price',
    },
      {
      title: '操作',
      width: '16%',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.dataSource.length >= 1
          ? (
          <Popconfirm title="是否要删除该服务项目" onConfirm={() => this.handleDelete(record.key)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        ) : null
      ),
    }];

    this.state = {
      dataSource: [{
        key: '0',
        title: 'Edward King 0',
        first: '32',
        price: 'London, Park Lane no. 0',
      }, {
        key: '1',
        title: 'Edward King 1',
        service: '3288',
        price: 'London, Park Lane no. 1',
      }],
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  render() {

    const components = {
      body: {
        row: EditableTable,
      },
    };

    const {tableList} = this.props;

    const dataSource = tableList.map((item,key)=>{
      return {
        key: item.id,
        title: item.title,
        first: item.category,
        second:item.secondcategory,
        price: item.discountPrice,
      }
    });


    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={this.columns}
          footer={() => Footer()}
        />
        <div style={{textAlign:'right',paddingTop:'20px'}}>
          <Button type="primary" size="large" >确认并保存</Button>
        </div>
      </div>
    );
  }
}

export default EnterFormList;
