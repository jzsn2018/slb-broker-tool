/*
 * @Date: 2021-09-10 16:19:39
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-23 17:19:32
 * @Description:
 */

import './App.css';
import { Layout,Menu } from 'antd';
import {NginxMgt,HostContent} from "./render/index"
const { Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className='App'>
        <Layout className='app-layout'>
          <Sider theme="light">
            <Menu  defaultSelectedKeys={['host']}>
                <Menu.Item key="host">host</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Sider>
          <Content>
            {/* <HostContent/> */}
            <NginxMgt/>
          </Content>
        </Layout>
    </div>
  );
}

export default App;
