
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';


class DriverList extends React.Component {
    _columns = () => [
        {
            title: '➕',
        },
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
            title: '驾驶员类型',
            dataIndex: 'driverType',
            key: 'driverType',
        }
    ];
    
    state = {
    };

    render() {
        const columns = this._columns();
        return (
            <div>
                <Table columns={columns} />
            </div>
        );
    }
}

export default DriverList;
