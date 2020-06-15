
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
        showAddDriverForm: false,
    };

    render() {
        const { confirmLoading, showAddDriverForm} = this.state;
        const columns = this._columns();
        return (
            <div>
                <div className={addButStyles.layoutBox}>
                    <div className={addButStyles.leftBut}>
                        <Button type='link'  onClick={() => this.showAddDriverForm()}>
                            添加驾驶员
                        </Button>
                    </div>
                    <div className={addButStyles.rightSum}>总数：1002</div>
                </div>
                <Table columns={columns} />
                <Modal
                 title="添加驾驶员"
                 width="500px"
                 onOk={this.hideAddDriverForm}
                 confirmLoading={confirmLoading}
                 onCancel={this.hideAddDriverForm}
                 visible={this.state.showAddDriverForm}
                >
                   <AddDriverForm></AddDriverForm>
                </Modal>
            </div>
        );
    }
    showAddDriverForm = () =>{
        this.setState({ showAddDriverForm: true})
    }
    hideAddDriverForm = () =>{
        this.setState({ showAddDriverForm: false})
    }
}

export default DriverList;
