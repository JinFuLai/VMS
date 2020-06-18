import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import UploadFiles from './uploadFiles';
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
                            label="设备名称"
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
                            label="生产厂家"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option value="demo1">生产厂家一</Select.Option>
                                <Select.Option value="demo2">生产厂家二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="3" label="发布日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 170 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="停产日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 170 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="质保" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="默认端口" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="d1">端口一</Select.Option>
                                <Select.Option value="d2">端口二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="设置指令" rules={[{ required: true, }]}>
                            <UploadFiles></UploadFiles>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="说明书" rules={[{ required: true, }]}>
                            <UploadFiles></UploadFiles>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="通讯协议" rules={[{ required: true, }]}>
                            <UploadFiles></UploadFiles>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={2}>
                        <Form.Item name="2" label="图标" rules={[{ required: true, }]}>
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

export default Add;