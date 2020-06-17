import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import UploadPhoto from './uploadPhoto';
import titleStyles from '../styles.css';
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
const layout__ = {
    labelCol: {
        span: 15,
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
            <Form {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>安全措施:</div>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="安全锤" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="安全带" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="车辆静电带" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">合格</Select.Option>
                                <Select.Option value="6">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={5}>
                        <Form.Item name="5" label="防火帽" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">合格</Select.Option>
                                <Select.Option value="6">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="灭火器" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">合格</Select.Option>
                                <Select.Option value="6">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout__} name="nest-messages__" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item name="1" label="危险品车辆紧急切断阀" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout__} name="nest-messages__" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>传动系统:</div>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="检查传动机构链接状况" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="检查传动轴支架" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={4}>
                        <Form.Item name="4" label="目测检查自动变速器、液力缓速器密封性" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">合格</Select.Option>
                                <Select.Option value="6">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>轮胎:</div>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="轮胎规格和花纹" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={3}>
                        <Form.Item name="3" label="轮胎花纹深度" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={4}>
                        <Form.Item name="4" label="轮胎及半轴螺栓、螺母" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="5">合格</Select.Option>
                                <Select.Option value="6">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={5}>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="6" label="轮胎气压" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="7">合格</Select.Option>
                                <Select.Option value="8">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="轮胎外观" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="9">合格</Select.Option>
                                <Select.Option value="10">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>摄像头:</div>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item name="2" label="摄像头" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>外观:</div>
                    </Col>
                    <Col span={12} key={2}>
                        <Form.Item name="2" label="查看车辆前后牌照及危险标识" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={3}>
                        <Form.Item name="3" label="车身外观及车内环境" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="4" label="车体" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={5}>
                        <Form.Item name="5" label="发动机、水箱、漏油、液情况" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={8} key={6}>
                       
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="7" label="阀门与管线" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={8}>
                        <Form.Item name="8" label="刮水器各挡位工作情况" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
            <Form {...layout_} name="nest-messages_" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={1}>
                        <div className={titleStyles.titleText}>悬架系统:</div>
                    </Col>
                    <Col span={12} key={2}>
                        <Form.Item name="2" label="钢板弹簧的U型螺栓螺母" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="1">合格</Select.Option>
                                <Select.Option value="2">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={14} key={3}>
                        <Form.Item name="3" label="钢板弹簧的吊耳销(套)、锁销等部件" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} key={4}>
                        <Form.Item name="4" label="检查空气弹簧的气密性" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                    <Col span={12} key={5}>
                        <Form.Item name="5" label="悬架的弹性元件" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="3">合格</Select.Option>
                                <Select.Option value="4">不合格</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <UploadPhoto></UploadPhoto>
                </Row>
            </Form>
        </div>
    );
};

export default AddUser;