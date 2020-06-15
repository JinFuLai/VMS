
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddEquipmentForm from './addEquipmentForm';

class EquipmentList extends React.Component {
    _columns = () => [
        {
            title: '设备编号',
            dataIndex: 'equipmentNumber',
            key: 'equipmentNumber',
        },
        {
            title: '设备类型',
            dataIndex: 'equipmentType',
            key: 'equipmentType',
        },
        {
            title: 'SIM卡',
            dataIndex: 'SIMCard',
            key: 'SIMCard',
        },
        {
            title: '生产日期',
            dataIndex: 'manufactureDate',
            key: 'manufactureDate',
        },
    ];
    
    state = {
        confirmLoading: false,
        showAddEquipmentForm: false,
    };

    render() {
        const { confirmLoading, showAddContactsForm} = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <Button type='link'  onClick={() => this.showAddEquipmentForm()}>
                            添加设备
                        </Button>
                    </div>
                    <div className={addButStyles.rightSum}>总数：1002</div>
                </div>
                <Table columns={columns} />
                <Modal
                 title="添加设备"
                 width="500px"
                 onOk={this.hideAddEquipmentForm}
                 confirmLoading={confirmLoading}
                 onCancel={this.hideAddEquipmentForm}
                 visible={this.state.showAddEquipmentForm}
                >
                   <AddEquipmentForm></AddEquipmentForm>
                </Modal>
            </div>
        );
    }
    showAddEquipmentForm = () =>{
        this.setState({ showAddEquipmentForm: true})
    }
    hideAddEquipmentForm = () =>{
        this.setState({ showAddEquipmentForm: false})
    }
}

export default EquipmentList;
