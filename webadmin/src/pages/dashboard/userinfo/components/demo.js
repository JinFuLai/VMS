import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox, Modal } from 'antd';
import { queryUserUpdata, queryUserCreate } from '../service';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 26,
    },
};
const layout_ = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 22,
    },
};
const validateMessages = {
    required: '${label}不能为空!',
    types: {
        email: '请输入正确得邮箱号',
        number: '请输入正确得数字',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
class AddUser extends React.Component {
    // const AddUser = (props) => {
    onFinish = values => {
        console.log(values);
    };
    
    componentDidMount () {
        // console.log(prevProps, "prevProps")
    //         const data=this.props.data
    //  this.refs.ref.setFieldsValue()
    //     console.log(this.props.data, "this.props")
        // if (this.props.username !== prevProps.data.username) {
        //     // if (this.formRef.data.username) {
        //     //     this.formRef.data.username.setFieldsValue(this.props.data.username)
        //     // }
        //     // alert:("caio")
        // }
    //     this.datas = {}

    //    this.datas.username = this.props.data
        this.refs.addForm.setFieldsValue(this.props.data)
    }
    render() {
        // console.log(this.props, "caonim")
        return (

            <div>
                <Form
                  onFinish={this.onSubmit}
                  ref='addForm' {...layout} name="nest-messages"  validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={8} key={1}>
                            <Form.Item
                                name="username"
                                label="用户名称"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* <Col span={8} key={2}>
                            <Form.Item
                                name="passWord"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>


                        </Col> */}
                        <Button type="primary" htmlType="submit" >submit</Button>
                    </Row>

                </Form>

            </div >
        )
    }
    onSubmit = (values) => {
        console.log(values)
        console.log("qiaonima")
        values.id = this.props.data._id,
        queryUserUpdata(values).then(res => {
            // props.search()
            // props.hideUpdateUser()
        })
    };
    // demo = (prevProps) => {
    //       if (this.props.data.username !== prevProps.data.username) {
    //         if (this.formRef.data.username) {
    //             this.formRef.data.username.setFieldsValue(this.props.data.username)
    //         }
    //         // alert:("caio")
    //     }
    //     console.log("caonima ")
    // }
};

export default AddUser;