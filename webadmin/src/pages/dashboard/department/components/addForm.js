import { Form, Input, InputNumber, Button, Row, Col, Select, Checkbox } from 'antd';
import CarTabs from './tabs';
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
        eliminate: false, //清除tabs列表数据的状态
        tableDataCar: [],
        tableDataDriver: [],
        tableDataEquipment: [],
    }
    render() {
        return (
            <div>
                <Form {...layout} name="nest-messages" ref="addForm" onFinish={this.onSubmit} validateMessages={validateMessages}>
                    <Row gutter={24}>
                        <Col span={8} key={1}>
                            <Form.Item name="belong_to_company" label="所属公司" rules={[{ required: true, },]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={2}>
                            <Form.Item name="name" label="部门名称" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={3}>
                            <Form.Item name="department_principal" label="部门负责人" rules={[{ required: true, }]}>
                                <Select>
                                    <Select.Option value="张三">张三</Select.Option>
                                    <Select.Option value="李四">李四</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={4}>
                            <Form.Item name="comment" label="备注" rules={[{ required: true, }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} key={5}>
                            <CarTabs
                                getChildrenMsgTabsCar={this.getChildrenMsgTabsCar}
                                eliminate={this.state.eliminate}
                                getChildrenMsgTabsDriver={this.getChildrenMsgTabsDriver}
                                getChildrenMsgTabsEquipment={this.getChildrenMsgTabsEquipment}  
                            ></CarTabs>
                        </Col>
                        <Col span={16} key={6}>
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
};

export default Add;