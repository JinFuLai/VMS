import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import styles from '../styles.css';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 26,
    },
};

const validateMessages = {
    required: '${label}不能为空!',
};

class Add extends React.Component {
    render() {
        return (
            <div>
                <Form {...layout} name="nest-messages" ref="addForm" onFinish={this.onSubmit} validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={24} key={1}>
                            <Form.Item name="equipment_erialNumber" label="设备编号" rules={[{ required: true, },]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={2}>
                            <Form.Item name="equipment_tyle" label="设备类型" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={3}>
                            <Form.Item name="sim_card" label="SIM卡" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={4}>
                            <Form.Item name="production_date" label="生产日期" rules={[{ required: true, }]}>
                                <DatePicker  />
                            </Form.Item>
                        </Col>
                        <div className={styles.contactsButLayout}>
                            <Button onClick={() => this.hideAdd()} >取消</Button>
                            <span className={styles.contactsButConfirm}>
                                <Button type="primary" htmlType="submit" >确定</Button>
                            </span>
                        </div>
                    </Row>
                </Form>
            </div>
        );
    }
    onSubmit = (values) => {
        values.key = values.equipment_erialNumber
        let data = []
        data.push(values.equipment = JSON.parse(JSON.stringify(values))) //添加设备
        this.props.hideAddEquipmentForm()
        // console.log(data,"车辆数据")
        this.toParent(data)
        this.refs.addForm.resetFields()
    };
    hideAdd = () => {
        this.props.hideAddEquipmentForm()
        this.refs.addForm.resetFields()
    }
    toParent = (data) => {
        this.props.getChildrenMsg(this, data) //向父组件传递数据
    }
};

export default Add;