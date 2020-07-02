import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox } from 'antd';
import UserTabs from './tabs';
import { queryCreate } from '../service';
import styles from '../styles.css';
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
    state = {
        eliminate:false, //清除tabs列表数据的状态
        tableData: [],
        tableDataCar: [],
        tableDataDriver:[],
        tableDataEquipment:[],
        tableDataDepartment:[],
    };
    render() {
        return (
            <div>
                <Form {...layout} name="nest-messages" ref="addForm" onFinish={this.onSubmit} validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={8} key={1}>
                            <Form.Item name="name" label="公司名称" rules={[{ required: true, },]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={2}>
                            <Form.Item name="company_type" label="公司类别" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="类别一">类别一</Select.Option>
                                    <Select.Option value="类别二">类别二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={3}>
                            <Form.Item name="province" label="省份" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="省份一">省份一</Select.Option>
                                    <Select.Option value="省份二">省份二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={4}>
                            <Form.Item name="city" label="城市" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="城市一">城市一</Select.Option>
                                    <Select.Option value="城市二">城市二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={5}>
                            <Form.Item name="town" label="乡镇" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="乡镇一">乡镇一</Select.Option>
                                    <Select.Option value="乡镇二">乡镇二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={6}>
                            <Form.Item name="street" label="街道" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={7}>
                            <Form.Item name="juridical_person" label="法人" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={8}>
                            <Form.Item name="bank_name" label="开户银行" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="银行一">银行一</Select.Option>
                                    <Select.Option value="银行二">银行二</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={9}>
                            <Form.Item name="tax_number" label="税号" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11} key={10}>
                            <Form.Item name="bank_account" label="开户银行账号" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11} key={11}>
                        </Col>
                        <Col span={11} key={12}>
                            <Form.Item name="comment" label="备注" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={13}>
                            <UserTabs
                             getChildrenMsgTabs={this.getChildrenMsgTabs}  
                             eliminate={this.state.eliminate}
                             getChildrenMsgTabsCar={this.getChildrenMsgTabsCar}  
                             getChildrenMsgTabsDriver={this.getChildrenMsgTabsDriver}  
                             getChildrenMsgTabsEquipment={this.getChildrenMsgTabsEquipment}  
                             getChildrenMsgTabsDepartment={this.getChildrenMsgTabsDepartment}  
                             ></UserTabs>
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
        let tableDataObj = this.state.tableData //联系人数据
        let newTableDataObj = []
        for (let i = 0; i < tableDataObj.length; i++) {
            newTableDataObj.push(JSON.stringify(tableDataObj[i]))
        }
        values.contact = newTableDataObj
        let tableDataObjCar = this.state.tableDataCar  //车辆数据
        let newTableDataObjCar = []
        for (let i = 0; i < tableDataObjCar.length; i++) {
            newTableDataObjCar.push(JSON.stringify(tableDataObjCar[i]))
        }
        values.car = newTableDataObjCar
        let tableDataObjDriver = this.state.tableDataDriver  //驾驶员数据
        let newTableDataObjDriver = []
        for (let i = 0; i < tableDataObjDriver.length; i++) {
            newTableDataObjDriver.push(JSON.stringify(tableDataObjDriver[i]))
        }
        values.driver = newTableDataObjDriver
        let tableDataObjEquipment = this.state.tableDataEquipment  //设备数据
        let newTableDataObjEquipment = []
        for (let i = 0; i < tableDataObjEquipment.length; i++) {
            newTableDataObjEquipment.push(JSON.stringify(tableDataObjEquipment[i]))
        }
        values.equipment = newTableDataObjEquipment
        let tableDataObjDepartment = this.state.tableDataDepartment  //部门数据
        let newTableDataObjDepartment = []
        for (let i = 0; i < tableDataObjDepartment.length; i++) {
            newTableDataObjDepartment.push(JSON.stringify(tableDataObjDepartment[i]))
        }
        values.department = newTableDataObjDepartment
        queryCreate(values).then(res => {
            this.props.search()
            this.props.hideAdd()
            this.refs.addForm.resetFields()
            this.state.eliminate = true
        })
    };
    hideAdd = () => {
        this.props.hideAdd()
        this.refs.addForm.resetFields()
        this.state.eliminate = true

    }
    getChildrenMsgTabs = (result, msg) => {   //联系人数据
        // console.log(msg, "祖先数据")
        if (msg) {
            this.setState({ tableData: msg })
        }
    }
    getChildrenMsgTabsCar = (result, msg) => {  //车辆数据
        // console.log(msg, "祖先数据")
        if (msg) {
            this.setState({ tableDataCar: msg })
        }
    }
    getChildrenMsgTabsDriver = (result, msg) => {  //驾驶员数据
        // console.log(msg, "祖先数据")
        if (msg) {
            this.setState({ tableDataDriver: msg })
        }
    }
    getChildrenMsgTabsEquipment = (result, msg) => {  //设备数据
        // console.log(msg, "祖先数据")
        if (msg) {
            this.setState({ tableDataEquipment: msg })
        }
    }
    getChildrenMsgTabsDepartment = (result, msg) => {  //部门数据
        // console.log(msg, "祖先数据")
        if (msg) {
            this.setState({ tableDataDepartment: msg })
        }
    }
};

export default Add;