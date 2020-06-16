import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 22,
    },
};

const validateMessages = {
    required: '${label}不能为空!',
};

const ExamineHistory = () => {
    const onFinish = values => {
        console.log(values);
    };

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12} key={1}>
                        <Form.Item name="1" label="车牌号码" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={2}>
                        <Form.Item name="2" label="保单号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={3}>
                        <Form.Item name="3" label="保单种类" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={4}>
                        <Form.Item name="4" label="投保金额" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={5}>
                        <Form.Item name="5" label="保险公司" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={6}>
                        <Form.Item name="6" label="生效日期" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={7}>
                        <Form.Item name="7" label="保单照片" rules={[{ required: true, }]}>
                            <Button>点击查看</Button>
                        </Form.Item>
                    </Col>
                    <Col span={12} key={8}>
                        <Form.Item name="8" label="到期时间" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} key={9}>
                        <Form.Item name="9" label="备注" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ExamineHistory;