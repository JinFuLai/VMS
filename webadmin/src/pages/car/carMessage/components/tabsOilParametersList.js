
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';


class OilParametersList extends React.Component {
    _columns = () => [
        {
            title: '➕',
        },
        {
            title: '油量读数',
            dataIndex: 'oilNumber',
            key: 'oilNumber',
        },
        {
            title: '油量参数',
            dataIndex: 'oilParameter',
            key: 'oilParameter',
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

export default OilParametersList;
