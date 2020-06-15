
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddCarForm from './addCarForm';

class CarList extends React.Component {
    _columns = () => [
        {
            title: '车辆编号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: '车牌号码',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '车辆品牌',
            dataIndex: 'carBrand',
            key: 'carBrand',
        },
        {
            title: '车辆类型',
            dataIndex: 'carType',
            key: 'carType',
        },
    ];
    
    state = {
        confirmLoading: false,
        showAddCarForm: false,
    };

    render() {
        const { confirmLoading, showAddContactsForm} = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                   
                        <Button type='link'  onClick={() => this.showAddCarForm()}>
                            添加车辆
                        </Button>
                    </div>
                    <div className={addButStyles.rightSum}>总数：1002</div>
                </div>
                <Table columns={columns} />
                <Modal
                 title="添加车辆"
                 width="500px"
                 onOk={this.hideAddCarForm}
                 confirmLoading={confirmLoading}
                 onCancel={this.hideAddCarForm}
                 visible={this.state.showAddCarForm}
                >
                   <AddCarForm></AddCarForm>
                </Modal>
            </div>
        );
    }
    showAddCarForm = () =>{
        this.setState({ showAddCarForm: true})
    }
    hideAddCarForm = () =>{
        this.setState({ showAddCarForm: false})
    }
}

export default CarList;
