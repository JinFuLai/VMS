
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddEquipmentForm from './addEquipmentForm';
import moment from 'moment';

class EquipmentList extends React.Component {
    _columns = () => [
        {
            title: '设备编号',
            dataIndex: 'equipment_erialNumber',
            key: 'equipment_erialNumber',
        },
        {
            title: '设备类型',
            dataIndex: 'equipment_tyle',
            key: 'equipment_tyle',
        },
        {
            title: 'SIM卡',
            dataIndex: 'sim_card',
            key: 'sim_card',
        },
        {
            title: '生产日期',
            dataIndex: 'production_date',
            key: 'production_date',
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
    ];

    state = {
        confirmLoading: false,
        showAddEquipmentForm: false,
        tableData: [],
        display_but:"block",
    };

    render() {
        if (this.props.eliminate) {
            this.state.tableData = []
        }
        if (this.props.data.data) {             //判断是否有id进行显示列表
            if (this.props.data.data.equipment.length) {
            this.state.tableData.push(JSON.parse(this.props.data.data.equipment))
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
                            <Button type='link' onClick={() => this.showAddEquipmentForm()}>
                                添加设备
                        </Button>
                        </div>
                    </div>
                    <div className={addButStyles.rightSum}>总数：{this.state.tableData.length}</div>
                </div>
                <Table columns={columns} dataSource={tableData} />
                <Modal
                    title="添加设备"
                    width="500px"
                    onOk={this.hideAddEquipmentForm}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideAddEquipmentForm}
                    visible={this.state.showAddEquipmentForm}
                    footer={[]}
                >
                    <AddEquipmentForm getChildrenMsg={this.getChildrenMsg} hideAddEquipmentForm={this.hideAddEquipmentForm}></AddEquipmentForm>
                </Modal>
            </div>
        );
    }
    showAddEquipmentForm = () => {
        this.setState({ showAddEquipmentForm: true })
    }
    hideAddEquipmentForm = () => {
        this.setState({ showAddEquipmentForm: false })
    }
    getChildrenMsg = (result, msg) => {
        if (msg) {
            this.setState({ tableData: msg })
            this.toParentTabs(this.state.tableData)
        }
    }
    toParentTabs = (data) => {
        this.props.getChildrenMsgTabsEquipmentList(this, data) //向爷爷组件传递数据
    }
}

export default EquipmentList;
