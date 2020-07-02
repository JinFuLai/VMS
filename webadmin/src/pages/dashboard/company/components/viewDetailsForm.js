import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UserTabs from './tabs';
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
    // console.log(props,"chuandeshuju")
    // console.log(props.data.car,"chuandeshuju")
    const onFinish = values => {
        console.log(values);
    };
    const [form] = Form.useForm();
    const [formVals, setFormVals] = useState({
        name: props.data.name,
        company_type: props.data.company_type,
        province: props.data.province,
        city: props.data.city,
        town: props.data.town,
        street: props.data.street,
        juridical_person: props.data.juridical_person,
        bank_name: props.data.bank_name,
        tax_number: props.data.tax_number,
        bank_account: props.data.bank_account,
        comment: props.data.comment,
    });
    return (
        <div>
            <Form
                initialValues={{
                    name: formVals.name,
                    company_type: formVals.company_type,
                    province: formVals.province,
                    city: formVals.city,
                    town: formVals.town,
                    street: formVals.street,
                    juridical_person: formVals.juridical_person,
                    bank_name: formVals.bank_name,
                    tax_number: formVals.tax_number,
                    bank_account: formVals.bank_account,
                    comment: formVals.comment,
                }} form={form}
                {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="name" label="公司名称" rules={[{ required: true, },]} >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="company_type" label="公司类别" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="类别一">类别一</Select.Option>
                                <Select.Option value="类别二">类别二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="province" label="省份" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="省份一">省份一</Select.Option>
                                <Select.Option value="省份二">省份二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="city" label="城市" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="城市一">城市一</Select.Option>
                                <Select.Option value="城市二">城市二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="town" label="乡镇" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="乡镇一">乡镇一</Select.Option>
                                <Select.Option value="乡镇二">乡镇二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="street" label="街道" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="juridical_person" label="法人" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="bank_name" label="开户银行" rules={[{ required: true, }]}>
                            <Select disabled>
                                <Select.Option value="银行一">银行一</Select.Option>
                                <Select.Option value="银行二">银行二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="tax_number" label="税号" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={11} key={10}>
                        <Form.Item name="bank_account" label="开户银行账号" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={11} key={11}>
                    </Col>
                    <Col span={11} key={12}>
                        <Form.Item name="comment" label="备注" rules={[{ required: true, }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24} key={13}>
                        <UserTabs data={props.data}></UserTabs>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ViewDetails;