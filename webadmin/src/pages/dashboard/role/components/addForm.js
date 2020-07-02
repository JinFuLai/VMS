import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, Radio } from 'antd';
import { queryCreate } from '../service';
import styles from '../style.css';
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


class Add extends React.Component {
    render() {
        return (
            <div>
                <Form {...layout} name="nest-messages" ref="addForm" onFinish={this.onSubmit} validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={8} key={1}>
                            <Form.Item
                                name="name"
                                label="小组名称"
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
                                name="describe"
                                label="小组描述"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={3}>
                            <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="公司一">公司一</Select.Option>
                                    <Select.Option value="公司二">公司二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={16}>
                            <Form.Item name="jurisdiction" label="权限赋予">
                                <Radio.Group>
                                    <Radio value="权限一">权限一</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={16} key={17}>
                        </Col>
                        <Col span={16} key={18}>
                        </Col>
                        <div className={styles.butLayout}>
                            <Button onClick={() => this.hideAdd()} >取消</Button>
                            <span className={styles.butConfirm}>
                                <Button type="primary" htmlType="submit" >确定</Button>
                            </span>
                        </div>
                    </Row>
                </Form>

            </div>
        );
    }
    onSubmit = (values) => {
        if(values.jurisdiction){
            values.accessNumber = 1
        }else{
            values.accessNumber = 0
        }
        queryCreate(values).then(res => {
            this.props.search()
            this.props.hideAdd()
            this.refs.addForm.resetFields()
        })
    };
    hideAdd = () => {
        this.props.hideAdd()
        this.refs.addForm.resetFields()
    }
};

export default Add;