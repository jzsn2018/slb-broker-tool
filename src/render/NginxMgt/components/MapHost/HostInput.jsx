import {Select, Divider, Input, Tag} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {getLanIpAddress} from '../../../../utils/index';
const {Option, OptGroup} = Select;
console.log ('本地ip', getLanIpAddress ()); // 本地ip

let index = 0;

function HostInput (props) {
  const [state, setState] = useState ({
    items: [
      {
        origin: '局域网',
        list: [
          {
            host: 'http://192.168.214.67:9000',
            label: 'Lan-赵善添',
            origin: '局域网',
          },
        ],
      },
      {
        origin: '中介系统接口地址',
        list: [
          {
            host: 'https://broker-gateway-sit.zhuanxinbaoxian.com',
            label: 'Mgt-Sit-Api',
            origin: '中介系统接口地址',
          },
          {
            host: 'https://broker-gateway-dev.zhuanxinbaoxian.com',
            label: 'Mgt-Dev-Api',
            origin: '中介系统接口地址',
          },
          {
            host: 'https://broker-gateway.zhuanxinbaoxian.com',
            label: 'Mgt-Prod-Api',
            origin: '中介系统接口地址',
          },
        ],
      },
      {
        origin: '中介后台管理系统访问地址',
        list: [
          {
            host: 'http://' + getLanIpAddress () + ':8888',
            label: '本机',
            origin: '中介后台管理系统访问地址',
          },
          {
            host: 'https://broker-sit.zhuanxinbaoxian.com',
            label: 'Mgt-Sit-Host',
            origin: '中介后台管理系统访问地址',
          },
          {
            host: 'https://broker-dev.zhuanxinbaoxian.com',
            label: 'Mgt-Dev-Host',
            origin: '中介后台管理系统访问地址',
          },
          {
            host: 'https://broker.zhuanxinbaoxian.com',
            label: 'Mgt-Prod-Host',
            origin: '中介后台管理系统访问地址',
          },
        ],
      },
      {
        origin: '中介H5访问地址',
        list: [
          {
            host: 'http://' + getLanIpAddress () + ':9999',
            label: '本机',
            origin: '中介H5访问地址',
          },
          {
            host: 'https://sit.zhuanxinbaoxian.com/insurance/homepage',
            label: 'Mgt-Sit-Host',
            origin: '中介H5访问地址',
          },
          {
            host: 'https://dev.zhuanxinbaoxian.com/insurance/homepage',
            label: 'Mgt-Dev-Host',
            origin: '中介H5访问地址',
          },
          {
            host: 'https://zhuanxinbaoxian.com/insurance/homepage',
            label: 'Mgt-Prod-Host',
            origin: '中介H5访问地址',
          },
        ],
      },
    ],
    addItem: {
      name: '',
      label: '',
    },
  });
  const selectBefore = (
    <Select defaultValue="https://" className="select-before">
      <Option value="https://">https://</Option>
      <Option value="http://">http://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com" className="select-after">
      {['.com', '.cn', '.com.cn', '.cc', '.net'].map (item => (
        <Option key={item} value={item}>{item}</Option>
      ))}
    </Select>
  );
  const onNameChange = event => {
    setState ({
      name: event.target.value,
    });
  };
  const onSelectChange = (...rest)=>{
  console.log("🚀 ~ file: HostInput.jsx ~ line 118 ~ onSelectChange ~ rest", rest)

  }
  const addItem = () => {
    console.log ('addItem');
    const {items, name} = state;
    setState ({
      items: [...items, name || `New item ${index++}`],
      name: '',
    });
  };
  return (
    <Select
      onChange={onSelectChange}
      dropdownMatchSelectWidth={false}
      placeholder={props.placeholder || 'placeholder'}
      dropdownRender={menu => (
        <div key={menu.host}>
          {menu}
          <Divider style={{margin: '4px 0'}} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'column',
              padding: 8,
            }}
          >
            <Input
              style={{flex: 'auto', marginBottom: '8px'}}
              value={state.addItem.name}
              onChange={onNameChange}
              addonBefore={selectBefore}
              addonAfter={selectAfter}
            />
            <Input
              placeholder="请输入设置的别名"
              style={{flex: 'auto'}}
              value={state.addItem.label}
              onChange={onNameChange}
            />
            <a
              href="void(0)"
              style={{
                flex: 'none',
                padding: '8px',
                display: 'block',
                cursor: 'pointer',
              }}
              onClick={addItem}
            >
              确定
            </a>
          </div>
        </div>
      )}
    >
      {state.items.map (item => (
        <OptGroup label={item.origin}>
          {item.list.map (li => (
            <Option key={li.host}>
              {li.host}
              {' '}
              <Tag color="#108ee9">{li.label}</Tag>
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
}

export default HostInput;
