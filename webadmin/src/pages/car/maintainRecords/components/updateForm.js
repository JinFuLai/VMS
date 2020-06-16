import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
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

const AddUser = () => {
    const onFinish = values => {
        console.log(values);
    };

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="1" label="车牌号码" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="维修原因" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="修理厂" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="维修费用" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="经手人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="维修状态" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;