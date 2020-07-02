
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addUserButStyles from '../styles.css';
import AddContactsForm from './addContactsForm';

class ContactsList extends React.Component {
    _columns = () => [
        {
            title: '姓名',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: '联系电话',
            dataIndex: 'mobile',
            key: 'mobile',
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
        showAddContactsForm: false,
        tableData: [],
        display_but: "block",
    };

    render() {
        if (this.props.eliminate) {
            this.state.tableData = []
        }
        if (this.props.data.data) {       //判断是否有id进行显示列表
            if (this.props.data.data.contact.length>0) {
                this.state.tableData.push(JSON.parse(this.props.data.data.contact))
            }
            this.state.display_but = "none"
        }
        const tableData = this.state.tableData


        const { confirmLoading, showAddContactsForm } = this.state;
        const columns = this._columns();

        return (
            <div>
                <div className={addUserButStyles.layoutBox}>
                    <div className={addUserButStyles.leftBut}>
                        <div style={{ display: this.state.display_but }}>
                            <Button type='link' onClick={() => this.showAddContactsForm()} >
                                添加联系人
                        </Button>
                        </div>
                    </div>
                    <div className={addUserButStyles.rightSum}>总数：{this.state.tableData.length}</div>
                </div>
                <Table columns={columns} dataSource={tableData} />
                <Modal
                    title="添加联系人"
                    width="500px"
                    onOk={this.hideAddContactsForm}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideAddContactsForm}
                    visible={this.state.showAddContactsForm}
                    footer={[]}
                >
                    <AddContactsForm getChildrenMsg={this.getChildrenMsg} hideAddContactsForm={this.hideAddContactsForm}></AddContactsForm>
                </Modal>
            </div>
        );
    }
    showAddContactsForm = () => {
        this.setState({ showAddContactsForm: true })
    }
    hideAddContactsForm = () => {
        this.setState({ showAddContactsForm: false })
    }
    getChildrenMsg = (result, msg) => {
        // console.log(result, msg, '子组件数据')
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        if (msg) {
            // console.log(msg, 'msg')
            // console.log(this.state.tableData, "shuju")
            // let aa = {}
            // for (let i = 0; i < msg.length; i++) {
            //    aa= msg[0]
            // }
            //     let aa = []
            //     aa = this.state.tableData.push(msg[0])
            //    console.log(aa,"00")
            //     console.log(this.state.tableData, "111")

            this.setState({ tableData: msg })
            this.toParentTabs(this.state.tableData)
        }
    }
    toParentTabs = (contactData) => {
        this.props.getChildrenMsgTabsContactsList(this, contactData) //向爷爷组件传递数据
    }


}

export default ContactsList;
