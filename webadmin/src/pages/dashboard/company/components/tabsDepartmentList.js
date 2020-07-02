
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddDepartmentForm from './addDepartmentForm';

class CarList extends React.Component {
    _columns = () => [
        {
            title: '所属公司',
            dataIndex: 'belong_to_company',
            key: 'belong_to_company',
        },
        {
            title: '部门名称',
            dataIndex: 'department_name',
            key: 'department_name',
        },
        {
            title: '负责人',
            dataIndex: 'principal',
            key: 'principal',
        },
        {
            title: '负责人手机',
            dataIndex: 'principal_phone',
            key: 'principal_phone',
        },
    ];

    state = {
        confirmLoading: false,
        showAddDepartmentForm: false,
        tableData: [],
        display_but: "block",
    };

    render() {
        if (this.props.eliminate) {
            this.state.tableData = []
        }
        if (this.props.data.data) {             //判断是否有id进行显示列表
            if (this.props.data.data.department.length) {
            this.state.tableData.push(JSON.parse(this.props.data.data.department))
            }
            this.state.display_but = "none"
        }
        const tableData = this.state.tableData
        const { confirmLoading, showAddDepartmentForm } = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <div style={{ display: this.state.display_but }}>
                            <Button type='link' onClick={() => this.showAddDepartmentForm()}>
                                添加部门
                        </Button>
                        </div>
                    </div>
                    <div className={addButStyles.rightSum}>总数：{this.state.tableData.length}</div>
                </div>
                <Table columns={columns} dataSource={tableData} />
                <Modal
                    title="添加部门"
                    width="500px"
                    onOk={this.hideAddDepartmentForm}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideAddDepartmentForm}
                    visible={this.state.showAddDepartmentForm}
                    footer={[]}
                >
                    <AddDepartmentForm getChildrenMsg={this.getChildrenMsg} hideAddDepartmentForm={this.hideAddDepartmentForm}></AddDepartmentForm>
                </Modal>
            </div>
        );
    }
    showAddDepartmentForm = () => {
        this.setState({ showAddDepartmentForm: true })
    }
    hideAddDepartmentForm = () => {
        this.setState({ showAddDepartmentForm: false })
    }
    getChildrenMsg = (result, msg) => {
        if (msg) {
            this.setState({ tableData: msg })
            this.toParentTabs(this.state.tableData)
        }
    }
    toParentTabs = (data) => {
        this.props.getChildrenMsgTabsDepartmentList(this, data) //向爷爷组件传递数据
    }
}

export default CarList;
