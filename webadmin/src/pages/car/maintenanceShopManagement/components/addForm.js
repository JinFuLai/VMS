import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
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

const Add = () => {
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
                            label="公司"
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
                            label="名称"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                               <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="3" label="省份" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="s1">四川省</Select.Option>
                                <Select.Option value="s2">云南省</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="城市" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="c1">成都市</Select.Option>
                                <Select.Option value="c2">广元市</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="乡镇" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="1">乡镇一</Select.Option>
                                <Select.Option value="2">乡镇二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="街道" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="法人" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="开户银行" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="y1">工商银行</Select.Option>
                                <Select.Option value="y2">建设银行</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="1" label="开户银行账号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="1" label="税号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="联系人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="联系人电话" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Add;