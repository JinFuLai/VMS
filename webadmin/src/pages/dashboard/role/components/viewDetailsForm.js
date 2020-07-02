import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker,Radio } from 'antd';
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
};

const AddUser = (props) => {
    const onFinish = values => {
        console.log(values);
    };
    const [form] = Form.useForm();
    const [formVals, setFormVals] = useState({
        name: props.data.name,
        company: props.data.company,
        describe: props.data.describe,
        jurisdiction: props.data.jurisdiction,
    });
    return (
        <div>
            <Form initialValues={{
                name: formVals.name,
                company: formVals.company,
                describe: formVals.describe,
                jurisdiction: formVals.jurisdiction,
            }} form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="name" label="小组名称" rules={[{ required: true, },]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="describe" label="小组描述" rules={[{ required: true, },]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="公司一">公司一</Select.Option>
                                <Select.Option value="公司二">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={16}>
                        <Form.Item name="jurisdiction" label="权限赋予">
                            <Radio.Group>
                                <Radio disabled value="权限一">权限一</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;