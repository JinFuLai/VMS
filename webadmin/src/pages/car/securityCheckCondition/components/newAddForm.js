import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import titleStyles from '../styles.css';
import InspectionItemTabs from './tabs';
const layout = {
    labelCol: {
        span: 11,
    },
    wrapperCol: {
        span: 26,
    },
};
const layout_ = {
    labelCol: {
        span: 11,
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
                        <Form.Item name="1" label="车牌号码" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="所属部门" rules={[{ required: true, },]} >
                            <Select>
                                <Select.Option value="demo1">部门一</Select.Option>
                                <Select.Option value="demo2">部门二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="检测人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="检测时间" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 158 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <InspectionItemTabs></InspectionItemTabs>
        </div>
    );
};

export default Add;