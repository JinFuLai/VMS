
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addButStyles from '../styles.css';
import AddDriverForm from './addDriverForm';

class DriverList extends React.Component {
    _columns = () => [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'QQ',
            dataIndex: 'QQ',
            key: 'QQ',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    state = {
        confirmLoading: false,
        showAddDriverForm: false,
        tableData: [],
        display_but:"block",
    };

    render() {
        if (this.props.eliminate) {
            this.state.tableData = []
        }
        if (this.props.data.data) {             //判断是否有id进行显示列表
            if (this.props.data.data.driver.length) {
            this.state.tableData.push(JSON.parse(this.props.data.data.driver))
            }
            this.state.display_but = "none"
        } 
        const tableData = this.state.tableData
        const { confirmLoading, showAddDriverForm } = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <div style={{ display: this.state.display_but }}>
                            <Button type='link' onClick={() => this.showAddDriverForm()}>
                                添加驾驶员
                        </Button>
                        </div>
                    </div>
                    <div className={addButStyles.rightSum}>总数：{this.state.tableData.length} </div>
                </div>
                <Table columns={columns} dataSource={tableData} />
                <Modal
                    title="添加驾驶员"
                    width="500px"
                    onOk={this.hideAddDriverForm}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideAddDriverForm}
                    visible={this.state.showAddDriverForm}
                    footer={[]}
                >
                    <AddDriverForm getChildrenMsg={this.getChildrenMsg} hideAddDriverForm={this.hideAddDriverForm}></AddDriverForm>
                </Modal>
            </div>
        );
    }
    showAddDriverForm = () => {
        this.setState({ showAddDriverForm: true })
    }
    hideAddDriverForm = () => {
        this.setState({ showAddDriverForm: false })
    }
    getChildrenMsg = (result, msg) => {
        if (msg) {
            this.setState({ tableData: msg })
            this.toParentTabs(this.state.tableData)
        }
    }
    toParentTabs = (data) => {
        this.props.getChildrenMsgTabsDriverList(this, data) //向爷爷组件传递数据
    }
}

export default DriverList;
