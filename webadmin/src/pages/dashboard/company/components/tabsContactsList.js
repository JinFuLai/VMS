
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import addUserButStyles from '../styles.css';
import AddContactsForm from './addContactsForm';

class ContactsList extends React.Component {
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
            dataIndex: 'QQNumber',
            key: 'QQNumber',
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            key: 'mail',
        },
    ];
    
    state = {
        confirmLoading: false,
        showAddContactsForm: false,
    };

    render() {
        const { confirmLoading, showAddContactsForm} = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addUserButStyles.layoutBox}>
                    <div className={addUserButStyles.leftBut}>
                        <Button type='link'  onClick={() => this.showAddContactsForm()}>
                            添加联系人
                        </Button>
                    </div>
                    <div className={addUserButStyles.rightSum}>总数：1002</div>
                </div>
                <Table columns={columns} />
                <Modal
                 title="添加联系人"
                 width="500px"
                 onOk={this.hideAddContactsForm}
                 confirmLoading={confirmLoading}
                 onCancel={this.hideAddContactsForm}
                 visible={this.state.showAddContactsForm}
                >
                   <AddContactsForm></AddContactsForm>
                </Modal>
            </div>
        );
    }
    showAddContactsForm = () =>{
        this.setState({ showAddContactsForm: true})
    }
    hideAddContactsForm = () =>{
        this.setState({ showAddContactsForm: false})
    }
}

export default ContactsList;
