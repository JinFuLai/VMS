import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import React, { useState } from 'react';
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

const AddUser = (props) => {
    const onFinish = values => {
        console.log(values);
    };
    
    const [formVals, setFormVals] = useState({
        created_date: props.data.created_date,
        gender: props.data.gender,
        nickname: props.data.nickname,
        number: props.data.number,
        username: props.data.username
    });
    const [form] = Form.useForm();
    return (
        <div>
            <Form
                initialValues={{
                    username: formVals.username,
                    nickname: formVals.nickname,
                    gender: formVals.gender,
                    number: formVals.number,
                }} form={form}
                {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="username" label="用户账号" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="userPhoto" label="用户头像" rules={[{ required: true, }]}>
                            <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="nickname" label="用户昵称" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="gender" label="用户性别" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="男">男</Select.Option>
                                <Select.Option value="nv">女</Select.Option>
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
                        <Form.Item name="number" label="拥有权限数" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="registrationDate" label="注册时间" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 178 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;