/*
 * @Date: 2021-09-23 17:17:06
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-23 21:09:04
 * @Description: 
 */
import fs from 'fs';
import { useEffect,useState } from 'react';
import {
  IP_REG,
  getHostPath,
  splitChar
} from "./utils";
import { List,Switch,Tabs } from 'antd';
import "./index.css";
const { TabPane } = Tabs;
export function HostContent() {
  // 读取配置文件地址
  const configPath = getHostPath();
  const prevHost = fs.readFileSync(configPath, 'utf8');
  console.log("🚀 ~ file: index.js ~ line 19 ~ HostContent ~ prevHost", prevHost)
  const [hosts,setHosts] = useState([]);
  useEffect(()=>{
    const prevHostArr = [];
    prevHost.split(splitChar()).map(line=>line.split('\n')).map(lineArr=>prevHostArr.push(...lineArr))
     const hosts = prevHostArr.map((item, index) => {
         //  匹配所有ip，返回数组
         const targetIps = item.match(IP_REG) || []
         //  根据目标ip,通常是首个，分裂行内容
         const splitRes = item.split(targetIps[0]);
         const first = splitRes[0].trim();
         const isValid = splitRes.length >= 2 && first.length <= 1;
         if (isValid) {
             return {
                 isValid, //  是否是符合语法的映射
                 index,//  对应原始文件的第几行
                 objIndex: 0,//  是数组中的第几个，后面会修改
                 able: first.length === 0,//  映射是否激活
                 ip: targetIps[0],//  对应的ip
                 domain: splitRes[1].split('#')[0].trim()//  对应的域名
             }
         } else {
             return {
                 index,
                 isValid
             };
         }
     })
     setHosts(hosts)
     console.log("🚀 ~ file: index.js ~ line 47 ~ hosts ~ hosts", hosts)
  },[prevHost]);
  const onChange = () => {

  };
  const onSaveFile = ()=>{

  }
  return <div className="host-wrap">
     <Tabs >
      <TabPane tab="host文件配置" key="1">
        <List
          bordered
          dataSource={hosts.filter(h=>h.ip && h.domain)}
          renderItem={item => (
          <List.Item>
            <div className="item-wrap">
              <span>
              {item.ip}
              </span>
              <span>
              {item.domain}
              </span>
              <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={item.isValid} size="small"/>
            </div>
          </List.Item>
        )}
      />
      </TabPane>
      <TabPane tab="host源文件" key="2">
       <pre>
         {prevHost}
       </pre>
      </TabPane>
    </Tabs>

      {/* <CodeMirror
          value={prevHost}
          options={{
            mode: 'shell',
          }}
          onChange={onChange}
          onSave={onSaveFile}
        /> */}
  </div>
}