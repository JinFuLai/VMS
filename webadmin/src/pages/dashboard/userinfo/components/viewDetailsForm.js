import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker,Radio } from 'antd';
import UploadPhoto from './uploadPhoto';
import React, { useState } from 'react';
import moment from 'moment';
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
const ViewDetails = (props) => {
    const onFinish = values => {

    };
    const [form] = Form.useForm();
    const [formVals, setFormVals] = useState({
        gender: props.data.gender,
        email: props.data.email,
        phoneNumber: props.data.phoneNumber,
        username: props.data.username,
        password: props.data.password,
        QQNumber: props.data.QQNumber,
        company: props.data.company,
        department: props.data.department,
        province: props.data.province,
        city: props.data.city,
        town: props.data.town,
        street: props.data.street,
        state: props.data.state,
        role: props.data.role,
    });
    return (
       
        <Form initialValues={{
            username: formVals.username,
            password: formVals.password,
            email: formVals.email,
            gender: formVals.gender,
            phoneNumber: formVals.phoneNumber,
            QQNumber: formVals.QQNumber,
            company: formVals.company,
            department: formVals.department,
            province: formVals.province,
            city: formVals.city,
            town: formVals.town,
            street: formVals.street,
            state: formVals.state,
            role: formVals.role,
        }} form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Row gutter={24}>
                <Col span={8} key={1}>
                    <Form.Item
                        name="username"
                        label="用户名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={8} key={2}>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password disabled />
                    </Form.Item>
                </Col>
                <Col span={8} key={3}>
                    <Form.Item name="email" label="邮箱" rules={[{  required: true, }]}>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={8} key={4}>
                    <Form.Item name="phoneNumber" label="手机号" rules={[{ required: true, }]}>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={8} key={5}>
                    <Form.Item name="QQNumber" label="QQ" rules={[{ required: true, }]}>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={8} key={6}>
                    <Form.Item name="gender" label="性别" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={7}>
                    <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="公司一">公司一</Select.Option>
                            <Select.Option value="公司二">公司二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={8}>
                    <Form.Item name="department" label="所属部门" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="部门一">部门一</Select.Option>
                            <Select.Option value="部门二">部门二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={9}>
                    <Form.Item name="province" label="省份" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="省份一">省份一</Select.Option>
                            <Select.Option value="省份二">省份二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={10}>
                    <Form.Item name="city" label="城市" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="城市一">城市一</Select.Option>
                            <Select.Option value="城市二">城市二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={11}>
                    <Form.Item name="town" label="乡镇" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="乡镇一">乡镇一</Select.Option>
                            <Select.Option value="乡镇二">乡镇二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={12}>
                    <Form.Item name="street" label="街道" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="街道一">街道一</Select.Option>
                            <Select.Option value="街道二">街道二</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={13}>
                    <Form.Item name="state" label="状态" rules={[{ required: true, }]}>
                        <Select disabled>
                            <Select.Option value="启用">启用</Select.Option>
                            <Select.Option value="禁用">禁用</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={14}>
                    <Form.Item name="photo" label="头像" >
                        <UploadPhoto></UploadPhoto>
                    </Form.Item>
                </Col>
                <Col span={8} key={15}>
                </Col>
                <Col span={8} key={16}>
                    <Form.Item name="role" label="角色">
                        <Radio.Group>
                            <Radio disabled  value="超级管理员">超级管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                {/* <Col span={8} key={7}>
                    <Form.Item name="created_date" label="注册时间" rules={[{ required: true, }]}>
                        <DatePicker disabled defaultValue={moment(props.data.created_date)} style={{ width: 178 }} />
                    </Form.Item>
                </Col>  */}
            </Row>
        </Form>
    );
};


export default ViewDetails;