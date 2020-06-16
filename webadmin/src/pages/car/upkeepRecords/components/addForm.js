import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import MaintainList from './maintainList';
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
        span: 5,
    },
    wrapperCol: {
        span: 21,
    },
};
const layout__ = {
    labelCol: {
        span: 3,
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
                        <Form.Item name="3" label="保养项目" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="b1">快保</Select.Option>
                                <Select.Option value="b2">常规保养</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="修理厂" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="c1">厂一</Select.Option>
                                <Select.Option value="c2">厂二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="保养费用" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="预计保养日期/里程" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="当前里程" rules={[{ required: true, }]}>
                        <Input />
                         
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="经手人" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="最后保养时间" rules={[{ required: true, }]}>
                              <DatePicker style={{ width: 158 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout__} name="nest-messages__" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <Form.Item name="1" label="保养项目" rules={[{ required: true, }]}>
                            <MaintainList></MaintainList>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="2" label="单据上传" rules={[{ required: true, }]}>
                            <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={16} key={2}>
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