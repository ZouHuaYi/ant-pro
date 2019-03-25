/**
 * Created by zhy on 2019/3/25.
 */
import React from 'react';
import {
  Row,Col,Avatar,Tag
} from 'antd'
import styles from './index.less';
import classNames from 'classnames';
import {changeLetter} from '@/utils/utils';

const Header = (props)=>{
  const {user} = props;
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
    </div>
  )
}
export default Header;
