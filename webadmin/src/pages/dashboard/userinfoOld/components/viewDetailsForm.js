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

// class ViewDetails extends React.Component {
const ViewDetails = (props) => {
    const onFinish = values => {
        console.log(values);
    };
    const [form] = Form.useForm();
    form.setFieldsValue()
    const [formVals, setFormVals] = useState({
        created_date: props.data.created_date,
        gender: props.data.gender,
        // key: props.data.key,
        nickname: props.data.nickname,
        number: props.data.number,
        // status: props.data.status,
        username: props.data.username
    });
   console.log(props)
    // const handleReset=()=>{
    //     this.props.form.resetFields();
    //   }
    return (
       
            <Form initialValues={{
                username: formVals.username,
                nickname: formVals.nickname,
                gender: formVals.gender,
                number: formVals.number,
                // created_date: formVals.created_date,
            }} form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="username" label="用户账号" rules={[{ required: true, },]} >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="userPhoto" label="用户头像" rules={[{ required: true, }]}>
                            <UploadPhoto  ></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="nickname" label="用户昵称" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="gender" label="用户性别" rules={[{ required: true, }]}>
                            <Select disabled >
                                <Select.Option value="男">男</Select.Option>
                                <Select.Option value="女">女</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="jurisdiction" label="所在权限组" rules={[{ required: true, }]}>
                            <Select disabled >
                                <Select.Option value="小组一">小组一</Select.Option>
                                <Select.Option value="小组二">小组二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="number" label="拥有权限数" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="created_date" label="注册时间" rules={[{ required: true, }]}>
                            <DatePicker disabled style={{ width: 178 }} />
                        </Form.Item>
                    </Col>
                </Row>
            
            </Form>
       
    );

};


export default ViewDetails;