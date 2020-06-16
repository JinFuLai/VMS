import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 26,
    },
};
const layout_ = {
    labelCol: {
        span: 5,
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
                            name="1"
                            label="车牌号码"
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
                            name="2"
                            label="所属部门"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option value="demo1">部门一</Select.Option>
                                <Select.Option value="demo2">部门二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="3" label="责任认定书编号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="保单编号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="保险公司" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="1">公司一</Select.Option>
                                <Select.Option value="2">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="理赔金额" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="报案日期" rules={[{ required: true, }]}>
                        <DatePicker style={{ width: 170 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="审核状态" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">审核通过</Select.Option>
                                <Select.Option value="2">审核中</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="理赔状态" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">理赔款到账</Select.Option>
                                <Select.Option value="4">理赔款未到账</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={10}>
                        <Form.Item name="10" label="经办人" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={11}>
                        <Form.Item name="11" label="修理厂" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">修理厂1</Select.Option>
                                <Select.Option value="6">修理厂2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="1" label="理赔款收款账号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16} key={2}>
                        <Form.Item name="2" label="照片档案" rules={[{ required: true, }]}>
                          <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={16} key={3}>
                        <Form.Item name="3" label="备注" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;