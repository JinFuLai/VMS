import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd';
import styles from '../styles.css';
const layout = {
    labelCol: {
        span: 5,
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
                            <Form.Item name="belong_to_company" label="所属公司" rules={[{ required: true, },]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={2}>
                            <Form.Item name="department_name" label="部门名称" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={3}>
                            <Form.Item name="principal" label="负责人" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={4}>
                            <Form.Item name="principal_phone" label="负责人手机" rules={[{ required: true, }]}>
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
        values.key = values.principal_phone
        let data = []
        data.push(values.department = JSON.parse(JSON.stringify(values))) //添加部门
        this.props.hideAddDepartmentForm()
        // console.log(data,"车辆数据")
        this.toParent(data)
        this.refs.addForm.resetFields()
    };
    hideAdd = () => {
        this.props.hideAddDepartmentForm()
        this.refs.addForm.resetFields()
    }
    toParent = (data) => {
        this.props.getChildrenMsg(this, data) //向父组件传递数据
    }
};

export default Add;