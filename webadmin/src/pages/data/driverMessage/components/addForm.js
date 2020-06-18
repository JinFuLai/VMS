import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 26,
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
                            label="驾驶员编号"
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
                            label="驾驶员姓名"
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
                        <Form.Item name="3" label="生日" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="邮箱" rules={[{ required: true, }]}>
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="省份" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">四川省</Select.Option>
                                <Select.Option value="2">云南省</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="城市" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="c1">成都市</Select.Option>
                                <Select.Option value="c2">昆明市</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="乡镇" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="x1">乡镇一</Select.Option>
                                <Select.Option value="x2">乡镇二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="街道" rules={[{ required: true, }]}>
                        <Select>
                                <Select.Option value="j1">街道一</Select.Option>
                                <Select.Option value="j2">街道二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="电话" rules={[{ required: true, }]}>
                           <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={11}>
                        <Form.Item name="11" label="QQ" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={12}>
                        <Form.Item name="12" label="驾驶证" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Add;