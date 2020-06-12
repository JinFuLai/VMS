import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox,DatePicker  } from 'antd';
import UploadPhoto from './uploadPhoto';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 26,
    },
};
const validateMessages = {
    required: '${label}不能为空!',
    types: {
        email: '请输入正确得邮箱号',
        number: '请输入正确得数字',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
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
                    <Form.Item name="userNumber" label="用户账号" rules={[{required: true, },]} >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8} key={2}>
                    <Form.Item name="userPhoto" label="用户头像" rules={[{ required: true, }]}>
                        <UploadPhoto></UploadPhoto>
                    </Form.Item>
                </Col>
                <Col span={8} key={3}>
                    <Form.Item name="userNickname" label="用户昵称" rules={[{ required: true, }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8} key={4}>
                    <Form.Item name="gender" label="用户性别" rules={[{ required: true, }]}>
                        <Select>
                            <Select.Option value="man">男</Select.Option>
                            <Select.Option value="woman">女</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={5}>
                    <Form.Item name="jurisdiction" label="所在权限组" rules={[{ required: true, }]}>
                        <Select>
                            <Select.Option value="demo1">小组一</Select.Option>
                            <Select.Option value="demo2">小组二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={6}>
                    <Form.Item name="jurisdictionNumber" label="拥有权限数" rules={[{ required: true, }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8} key={7}>
                    <Form.Item name="registrationDate" label="注册时间" rules={[{ required: true, }]}>
                         <DatePicker style={{width:178}}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </div>
    );
};

export default AddUser;