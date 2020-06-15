
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddDepartmentForm from './addDepartmentForm';

class CarList extends React.Component {
    _columns = () => [
        {
            title: '所属公司',
            dataIndex: 'subordinateCompanies',
            key: 'subordinateCompanies',
        },
        {
            title: '部门名称',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '负责人',
            dataIndex: 'principal',
            key: 'principal',
        },
        {
            title: '负责人手机',
            dataIndex: 'principalPhone',
            key: 'principalPhone',
        },
    ];
    
    state = {
        confirmLoading: false,
        showAddDepartmentForm: false,
    };

    render() {
        const { confirmLoading, showAddDepartmentForm} = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <Button type='link'  onClick={() => this.showAddDepartmentForm()}>
                            添加部门
                        </Button>
                    </div>
                    <div className={addButStyles.rightSum}>总数：1002</div>
                </div>
                <Table columns={columns} />
                <Modal
                 title="添加部门"
                 width="500px"
                 onOk={this.hideAddDepartmentForm}
                 confirmLoading={confirmLoading}
                 onCancel={this.hideAddDepartmentForm}
                 visible={this.state.showAddDepartmentForm}
                >
                   <AddDepartmentForm></AddDepartmentForm>
                </Modal>
            </div>
        );
    }
    showAddDepartmentForm = () =>{
        this.setState({ showAddDepartmentForm: true})
    }
    hideAddDepartmentForm = () =>{
        this.setState({ showAddDepartmentForm: false})
    }
}

export default CarList;
