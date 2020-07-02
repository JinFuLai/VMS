import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox } from 'antd';
import UploadPhoto from './uploadPhoto';
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
// @Form.create()
class AddUser extends React.Component {
// const AddUser = () => {
     onFinish = values => {
        console.log(values);
    };
    componentDidMount(){
        this.props.onRef(this)
    }

    myName = () => alert('xiaohesong')
    // const {form,getFieldDecorator} = this.props;
  
    
    render(){
        console.log(this.props.data)
        return (
            <div >
            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item
                            name="userName"
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
                    <Col span={8} key={2}>
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
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item name="email" label="邮箱" rules={[{ type: 'email', required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item name="phoneNumber" label="手机号" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item name="QQNumber" label="QQ" rules={[{ required: true, }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={6}>
                        <Form.Item name="gender" label="性别" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="man">男</Select.Option>
                                <Select.Option value="woman">女</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={7}>
                        <Form.Item name="company" label="所属公司" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo1">公司一</Select.Option>
                                <Select.Option value="demo2">公司二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={8}>
                        <Form.Item name="department" label="所属部门" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo3">部门一</Select.Option>
                                <Select.Option value="demo4">部门二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={9}>
                        <Form.Item name="province" label="省份" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo5">省份一</Select.Option>
                                <Select.Option value="demo6">省份二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={10}>
                        <Form.Item name="city" label="城市" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo7">城市一</Select.Option>
                                <Select.Option value="demo8">城市二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={11}>
                        <Form.Item name="town" label="乡镇" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo9">乡镇一</Select.Option>
                                <Select.Option value="demo10">乡镇二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={12}>
                        <Form.Item name="street" label="街道" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo11">街道一</Select.Option>
                                <Select.Option value="demo12">街道二</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={13}>
                        <Form.Item name="state" label="状态" rules={[{ required: true, }]}>
                            <Select>
                                <Select.Option value="demo13">启用</Select.Option>
                                <Select.Option value="demo14">禁用</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={14}>
                        <Form.Item name="photo" label="头像" rules={[{ required: true, }]}>
                            <UploadPhoto></UploadPhoto>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={15}>
                    </Col>
                
                </Row>
            </Form>
                <Form  {...layout_} name="nest-messages_" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={24} key={16}>
                        <Form.Item name="checkbox-group" label="角色" rules={[{ required: true, }]}>
                            <Checkbox.Group style={{ width: '100%' }} >
                                <Row gutter={24}>
                                    <Col span={5}>
                                        <Checkbox value="A"  style={{ lineHeight: '32px' }}>超级管理员</Checkbox>
                                    </Col>
                                    <Col span={5}>
                                        <Checkbox value="B"  style={{ lineHeight: '32px' }}>普通管理员</Checkbox>
                                    </Col>
                                    <Col span={5}>
                                        <Checkbox value="c"  style={{ lineHeight: '32px' }}>管理员1</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>,
                         </Form.Item>
                    </Col>
                </Row>
            </Form>
            
            </div>
        );       
    }
   
};

// ReactDOM.render(<Demo />, mountNode);
export default AddUser;