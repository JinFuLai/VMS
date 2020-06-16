
import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';

class HistoryList extends React.Component {
    _columns = () => [
        {
            title: '➕',
        },
        {
            title: '维修原因',
            dataIndex: '1',
            key: '1',
        },
        {
            title: '维修厂',
            dataIndex: '2',
            key: '2',
        },
        {
            title: '维修费用',
            dataIndex: '3',
            key: '3',
        },
        {
            title: '维修日期',
            dataIndex: '4',
            key: '4',
        },
    ];
    
    state = {
    };

    render() {
    const {confirmLoading } = this.state;
        const columns = this._columns();
        return (
            <div>
                <Table columns={columns} />
              
            </div>
        );
    }
}

export default HistoryList;
