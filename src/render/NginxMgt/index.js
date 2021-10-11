/*
 * @Date: 2021-09-24 10:51:22
 * @LastEditors: Timothy
 * @LastEditTime: 2021-10-11 11:44:28
 * @Description: 
 */
import {useState} from 'react';
import {CaretRightOutlined, PauseOutlined} from '@ant-design/icons';
import './index.css';
import nginx from '../../main/nginx.service';

import MapHost from './components/MapHost/index.jsx';
export function NginxMgt (props) {
  const [status, setStatus] = useState (false);
  const changeStatusCallback = async () => {
    setStatus (!status);
    !status ? await nginx.start () : await nginx.stop ();
  };
  return (
    <div className="nginx-mgt">
      <div className="header">
        <span>Nginx</span>
        {status
          ? <CaretRightOutlined
              onClick={changeStatusCallback}
              className="icon"
              style={{color: 'green'}}
            />
          : <PauseOutlined
              onClick={changeStatusCallback}
              className="icon"
              style={{color: 'rgb(255, 1, 1)'}}
            />}
      </div>
      <div className="content">
        <MapHost />
      </div>
    </div>
  );
}
