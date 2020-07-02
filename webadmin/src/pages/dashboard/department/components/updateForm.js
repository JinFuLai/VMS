import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import styles from '../styles.css';
import CarTabs from './tabs';
import { queryUpdate } from '../service';
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

const Update = (props) => {
    const onFinish = values => {
        console.log(values);
    };
    const onSubmit = (values) => {
        values.id = props.data._id,
            queryUpdate(values).then(res => {
                props.search()
                props.hideUpdate()
            })
    };
    const hideUpdate = () => {
        props.hideUpdate()
    }
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
                {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="belong_to_company" label="所属公司" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="name" label="部门名称" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="department_principal" label="部门负责人" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="张三">张三</Select.Option>
                                <Select.Option value="李四">李四</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="comment" label="备注" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} key={5}>
                        <CarTabs  data={props.data} ></CarTabs>
                    </Col>
                    <Col span={16} key={6}>
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