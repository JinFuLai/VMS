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
                <Form {...layout} name="nest-messages" ref="addForm" onFinish={this.onSubmit}  validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={24} key={1}>
                            <Form.Item name="name" label="姓名" rules={[{ required: true, },]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={2}>
                            <Form.Item name="phone" label="联系电话" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={3}>
                            <Form.Item name="QQ" label="QQ" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={4}>
                            <Form.Item name="email" label="邮箱" rules={[{ required: true, }]}>
                                <Input />
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
        values.key = values.phone
        let data = []
        data.push(values.driver = JSON.parse(JSON.stringify(values))) //添加驾驶员
        this.props.hideAddDriverForm()
        // console.log(data,"车辆数据")
        this.toParent(data)
        this.refs.addForm.resetFields()
    };
    hideAdd = () => {
        this.props.hideAddDriverForm()
        this.refs.addForm.resetFields()
    }
    toParent = (data) => {
        this.props.getChildrenMsg(this, data) //向父组件传递数据
    }
};

export default Add;