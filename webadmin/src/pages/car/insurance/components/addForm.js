import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import TabsBillsList from './tabsBillsList';
const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 26,
    },
};
const layout_ = {
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
                                <Select.Option value="1">公司一</Select.Option>
                                <Select.Option value="2">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item name="3" label="保险种类" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">商业保险</Select.Option>
                                <Select.Option value="4">交强险</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="保险公司" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">公司一</Select.Option>
                                <Select.Option value="6">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="保险金额" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="生效日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 182 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="生效日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 182 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="更新日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 182 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="当下保险状态" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="7">正常</Select.Option>
                                <Select.Option value="8">脱保</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={10}>
                        <Form.Item name="10" label="理赔次数" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <Form.Item name="11" label="单据上传" rules={[{ required: true, }]}>
                            <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <Form.Item name="12" label="历史单据">
                            <TabsBillsList></TabsBillsList>
                        </Form.Item>
                    </Col>  
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={16} key={1}>
                        <Form.Item name="13" label="备注" rules={[{ required: true, }]}>
                          <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;