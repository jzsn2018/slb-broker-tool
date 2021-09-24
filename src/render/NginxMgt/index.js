import {useState} from "react"
import {
  CaretRightOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import "./index.css";
import nginx from "../../main/nginx.service";
export function NginxMgt(props) {
  const [status, setStatus] = useState(false);
  const changeStatusCallback = async ()=> {
    setStatus(!status);
    !status ? await nginx.start() : await nginx.stop();
  }
  return <div className="nginx-mgt">
      <div className="header">
      <span>Nginx</span>
      {
          status ? <CaretRightOutlined onClick={changeStatusCallback} className="icon" style={{color:'green'}}/> : <PauseOutlined onClick={changeStatusCallback} className="icon" style={{color:'rgb(255, 1, 1)'}}/>
      }
      </div>
  </div>
}