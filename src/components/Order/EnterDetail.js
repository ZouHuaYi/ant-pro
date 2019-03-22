/**
 * Created by zhy on 2019/3/21.
 */
import React,{Component} from 'react';
import styles from './index.less';
import {
  Avatar,
  Row,
  Col,
  Tag,
  Divider,
  Button,
} from 'antd';
import classNames from 'classnames';
import EnterFormList from './EnterFormList'
import {changeLetter} from '@/utils/utils'




class EnterDetail extends Component{

  render(){
    const {user,onAddStatus,tableList} = this.props;
    return (
      <div className={classNames('enter', styles.enter)}>
        <Row gutter={16}>
          <Col className="gutter-row" span={2}>
            <Avatar size={100} src={user.avatar} icon={user.avatar?user.avatar:'user'} />
          </Col>
          <Col className="gutter-row" span={6}>
            <div className={styles.name}>
              <span>用户昵称：{user.nickname}</span>
            </div>
            <div className={styles.phone}>
              <span>用户电话：{user.phone}</span>
            </div>
            <div className={styles.tag}>
              <Tag color="#108ee9">{changeLetter(user.pageType)}等级</Tag>
            </div>
          </Col>
        </Row>
        <Divider />
        <div>
          <Button size="large" onClick={()=>onAddStatus()} type="primary">添加服务类目</Button>
        </div>
        <div className={styles.list}>
          <EnterFormList tableList={tableList}  />
        </div>
      </div>
    )
  }
}

export default EnterDetail;
