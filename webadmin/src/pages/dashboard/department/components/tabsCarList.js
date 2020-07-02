
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddCarForm from './addCarForm';

class CarList extends React.Component {
    _columns = () => [
        {
            title: '车辆编号',
            dataIndex: 'car_erialNumber',
            key: 'car_erialNumber',
        },
        {
            title: '车牌号码',
            dataIndex: 'plate_number',
            key: 'plate_number',
        },
        {
            title: '车辆品牌',
            dataIndex: 'car_brand',
            key: 'car_brand',
        },
        {
            title: '车辆类型',
            dataIndex: 'car_tyle',
            key: 'car_tyle',
        },
    ];

    state = {
        confirmLoading: false,
        showAddCarForm: false,
        tableData: [],
        display_but: "block",
    };

    render() {
        if (this.props.eliminate) {
            this.state.tableData = []
        }
        if (this.props.data.data) {             //判断是否有id进行显示列表
            if (this.props.data.data.car.length) {
                this.state.tableData.push(JSON.parse(this.props.data.data.car))
            }
            this.state.display_but = "none"
        }
        const tableData = this.state.tableData
        const { confirmLoading, showAddContactsForm } = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <div style={{ display: this.state.display_but }}>
                            <Button type='link' onClick={() => this.showAddCarForm()}>
                                添加车辆
                        </Button>
                        </div>
                    </div>
                    <div className={addButStyles.rightSum}>总数：{this.state.tableData.length}</div>
                </div>
                <Table columns={columns} dataSource={tableData} />
                <Modal
                    title="添加车辆"
                    width="500px"
                    onOk={this.hideAddCarForm}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideAddCarForm}
                    visible={this.state.showAddCarForm}
                    footer={[]}
                >
                    <AddCarForm getChildrenMsg={this.getChildrenMsg} hideAddCarForm={this.hideAddCarForm}></AddCarForm>
                </Modal>
            </div>
        );
    }
    showAddCarForm = () => {
        this.setState({ showAddCarForm: true })
    }
    hideAddCarForm = () => {
        this.setState({ showAddCarForm: false })
    }
    getChildrenMsg = (result, msg) => {
        if (msg) {
            this.setState({ tableData: msg })
            this.toParentTabs(this.state.tableData)
        }
    }
    toParentTabs = (data) => {
        this.props.getChildrenMsgTabsCarList(this, data) //向爷爷组件传递数据
    }
}

export default CarList;
