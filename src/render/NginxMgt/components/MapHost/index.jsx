/*
 * @Date: 2021-10-11 10:42:33
 * @LastEditors: Timothy
 * @LastEditTime: 2021-10-11 15:39:42
 * @Description: host映射
 */
import { Form, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DoubleRightOutlined } from '@ant-design/icons';
import "./index.css";
import HostInput from "./HostInput"

const MapHost = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };
  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="hostMapRelation">
        {(fields, { add, remove }) => (
          <>
          {console.log("fields",fields)}
            {fields.map((field,index) => (
              <Space key={field.key} align="center" className="slb-space-wrap">
                <Form.Item
                  {...field}
                  name={[field.name, 'originHost']}
                  fieldKey={[field.fieldKey, 'originHost']}
                  rules={[{ required: true, message: '请输入原始Host地址' }]}
                >
                  <HostInput placeholder="请输入原Host地址" field={field} index={index} />
                </Form.Item>
                <DoubleRightOutlined />
                <Form.Item
                  {...field}
                  name={[field.name, 'mapHost']}
                  fieldKey={[field.fieldKey, 'mapHost']}
                  rules={[{ required: true, message: '请输入映射Host地址' }]}
                >
                  <HostInput placeholder="请输入映射Host地址" field={field} index={index} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                添加域名映射
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新映射关系
        </Button>
      </Form.Item>
    </Form>
  );
};


export default MapHost