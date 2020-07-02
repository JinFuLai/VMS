import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import CarTabs from './tabs';
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

const ViewDetails = (props) => {
    const onFinish = values => {
        console.log(values);
    };
    const [form] = Form.useForm();
    const [formVals, setFormVals] = useState({
        name: props.data.name,
        belong_to_company: props.data.belong_to_company,
        department_principal: props.data.department_principal,
        comment: props.data.comment,
    });
    return (
        <div>
            <Form
                initialValues={{
                    name: formVals.name,
                    belong_to_company: formVals.belong_to_company,
                    department_principal: formVals.department_principal,
                    comment: formVals.comment,
                }} form={form}
                {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                <Col span={8} key={1}>
                        <Form.Item name="belong_to_company" label="所属公司" rules={[{ required: true, },]} >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="name" label="部门名称" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="department_principal" label="部门负责人" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="张三">张三</Select.Option>
                                <Select.Option value="李四">李四</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="comment" label="备注" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24} key={5}>
                        <CarTabs data={props.data}></CarTabs>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ViewDetails;