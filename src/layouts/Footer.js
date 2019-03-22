import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '首页',
          title: '首页',
          href: '/home',
          blankTarget: false,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/ZouHuaYi',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 广州美上美网络科技有限公司技术部出品
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
