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
                            label="申请单号"
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
                            label="部门"
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
                        <Form.Item name="3" label="申请人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="车牌号码" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="申请用车时间" rules={[{ required: true, }]}>
                        <DatePicker style={{ width: 173 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="申请收车时间" rules={[{ required: true, }]}>
                        <DatePicker style={{ width: 173 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="用车时长" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="用车里程" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="目的地" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="1" label="事由" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Add;