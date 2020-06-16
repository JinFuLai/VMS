
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import ViewDetailsForm from './viewDetailsForm';

class HistoryList extends React.Component {
    _columns = () => [
        {
            title: '车牌号码',
            dataIndex: '1',
            key: '1',
        },
        {
            title: '保单号',
            dataIndex: '2',
            key: '2',
        },
        {
            title: '保险种类',
            dataIndex: '3',
            key: '3',
        },
        {
            title: '投保金额',
            dataIndex: '4',
            key: '4',
        },
        {
            title: '保险公司',
            dataIndex: '5',
            key: '5',
        },
        {
            title: '操作',
            key: 'action',
            render: user => (
              <span>
                <Button type='link' onClick={() => this.showViewDetails()} >
                  查看详情
                </Button>
              </span>
            ),
          },
    ];
    
    state = {
        confirmLoading: false,
        viewDetailsForm: false,
    };

    render() {
    const {confirmLoading } = this.state;
        const columns = this._columns();
        return (
            <div>
                <Table columns={columns} />
                <Modal
                    title="查看详情"
                    width="800px"
                    onOk={this.hideViewDetails}
                    confirmLoading={confirmLoading}   
                    onCancel={this.hideViewDetails}
                    visible={this.state.viewDetailsForm}
                >
                <ViewDetailsForm></ViewDetailsForm>
                </Modal>
            </div>
        );
    }
    showViewDetails = () => {
        this.setState({ viewDetailsForm: true })
      }
      hideViewDetails = () => {
        this.setState({ viewDetailsForm: false })
      }
}

export default HistoryList;
