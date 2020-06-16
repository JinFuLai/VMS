import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import TabsOilParametersList from './tabsOilParametersList';
import TabsDriverList from './tabsDriverList';
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
                        <Form.Item name="1" label="车辆编号" rules={[{ required: true, },]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="车牌号码" rules={[{ required: true, },]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="所属公司" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">公司一</Select.Option>
                                <Select.Option value="2">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="车辆类型" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">自有车辆</Select.Option>
                                <Select.Option value="4">外援车辆</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="车辆品牌" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">品牌1</Select.Option>
                                <Select.Option value="6">品牌2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="发动机编号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="车架号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="8" label="购买日期" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 163 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="9" label="车辆颜色" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="7">颜色一</Select.Option>
                                <Select.Option value="8">颜色二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={10}>
                        <Form.Item name="10" label="车辆轮胎数" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="9">4</Select.Option>
                                <Select.Option value="10">6</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={11}>
                        <Form.Item name="11" label="车辆长宽高" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="11">4.2*1.8*1.9</Select.Option>
                                <Select.Option value="12">5.2*2.2*2.2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={12}>
                        <Form.Item name="12" label="百公里油耗" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={13}>
                        <Form.Item name="13" label="SIM卡号" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="13">123</Select.Option>
                                <Select.Option value="14">456</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={14}>
                        <Form.Item name="14" label="GPS设备" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="15">设备1</Select.Option>
                                <Select.Option value="16">设备2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={15}>
                        <Form.Item name="15" label="安装时间" rules={[{ required: true, }]}>
                            <DatePicker style={{ width: 163 }} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={16}>
                        <Form.Item name="16" label="安装人员" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <Form.Item name="oilNumber" label="油量参数">
                            <TabsOilParametersList></TabsOilParametersList>
                        </Form.Item>
                    </Col>
                    <Col span={24} key={2}>
                        <Form.Item name="oilNumber" label="驾驶员">
                            <TabsDriverList></TabsDriverList>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="1" label="可行驶区域" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">围栏1</Select.Option>
                                <Select.Option value="2">围栏2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="不可行驶区域" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">围栏1</Select.Option>
                                <Select.Option value="4">围栏2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form  {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <Form.Item name="1" label="车辆照片" rules={[{ required: true, }]}>
                            <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={16} key={2}>
                        <Form.Item name="2" label="备注" rules={[{ required: true, }]}>
                           <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;