import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox } from 'antd';
import UserTabs from './tabs';
const layout = {
    labelCol: {
        span: 8,
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
        span: 26,
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
                        <Form.Item name="companyName" label="公司名称" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="companyClasses" label="公司类别" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">类别一</Select.Option>
                                <Select.Option value="demo2">类别二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="province" label="省份" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">省份一</Select.Option>
                                <Select.Option value="demo2">省份二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="city" label="城市" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">城市一</Select.Option>
                                <Select.Option value="demo2">城市二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="town" label="乡镇" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">乡镇一</Select.Option>
                                <Select.Option value="demo2">乡镇二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="street" label="街道" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="legalPerson" label="法人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="bank" label="开户银行" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">银行一</Select.Option>
                                <Select.Option value="demo2">银行二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="dutyParagraph" label="税号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="bankNumber" label="开户银行账号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16} key={2}>
                        <Form.Item name="remark" label="备注" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        <UserTabs></UserTabs>
        </div>
    );
};

export default AddUser;