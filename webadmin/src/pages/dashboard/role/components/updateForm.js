import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker, Radio } from 'antd';
import React, { useState } from 'react';
import { queryUpdata } from '../service';
import styles from '../style.css';
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

const Update = (props) => {
    const onSubmit = (values) => {
        if (values.jurisdiction) {
            values.accessNumber = 1
        } else {
            values.accessNumber = 0
        }
        values.id = props.data._id,
            queryUpdata(values).then(res => {
                props.search()
                props.hideUpdate()
            })
    };
    const [formVals, setFormVals] = useState({
        name: props.data.name,
        company: props.data.company,
        describe: props.data.describe,
        jurisdiction: props.data.jurisdiction,
    });
    const hideUpdate = () => {
        props.hideUpdate()
    }
    const [form] = Form.useForm();
    return (
        <div>
            <Form initialValues={{
                name: formVals.name,
                company: formVals.company,
                describe: formVals.describe,
                jurisdiction: formVals.jurisdiction,
            }} form={form} {...layout} onFinish={onSubmit} name="nest-messages" validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="name" label="小组名称" rules={[{ required: true, },]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="describe" label="小组描述" rules={[{ required: true, },]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="公司一">公司一</Select.Option>
                                <Select.Option value="公司二">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={16}>
                        <Form.Item name="jurisdiction" label="权限赋予">
                            <Radio.Group>
                                <Radio value="权限一">权限一</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                    </Col>
                    <Col span={16} key={9}>
                    </Col>
                    <div className={styles.butLayout}>
                        <Button onClick={() => hideUpdate()} >取消</Button>
                        <span className={styles.butConfirm}>
                            <Button type="primary" htmlType="submit" >确定</Button>
                        </span>
                    </div>
                </Row>
            </Form>
        </div>
    );
};

export default Update;