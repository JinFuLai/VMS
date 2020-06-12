import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox } from 'antd';
import UploadPhoto from './uploadPhoto';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 26,
    },
};
const layout_ = {
    labelCol: {
        span: 2.5,
    },
    wrapperCol: {
        span: 21,
    },
};
const validateMessages = {
    required: '${label}不能为空!',
};

const AddUser = () => {
    const onFinish = values => {
        console.log(values);
    };

    return (
        <div>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Row gutter={24}>
                <Col span={8} key={1}>
                    <Form.Item
                        name="groupName"
                        label="小组名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8} key={2}>
                    <Form.Item
                        name="groupDescribe"
                        label="小组描述"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            
                <Col span={8} key={3}>
                    <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                        <Select>
                            <Select.Option value="demo1">公司一</Select.Option>
                            <Select.Option value="demo2">公司二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
              
            
            </Row>
        </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
            <Row gutter={24}>
                <Col span={24} key={4}>
                    <Form.Item name="checkbox-group" label="权限赋予" rules={[{ required: true, }]}>
                        <Checkbox.Group style={{ width: '100%' }} >
                            <Row gutter={24}>
                                <Col span={5}>
                                    <Checkbox value="A"  style={{ lineHeight: '32px' }}>权限一</Checkbox>
                                </Col>
                                <Col span={5}>
                                    <Checkbox value="B"  style={{ lineHeight: '32px' }}>权限二</Checkbox>
                                </Col>
                                <Col span={5}>
                                    <Checkbox value="c"  style={{ lineHeight: '32px' }}>权限三</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>,
                     </Form.Item>
                </Col>
            </Row>
        </Form>
        </div>
    );
};

export default AddUser;