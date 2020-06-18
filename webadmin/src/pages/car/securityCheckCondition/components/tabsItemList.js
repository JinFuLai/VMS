
import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';

class ItemList extends React.Component {
    _columns = () => [
        {
            title: '➕',
        },
        {
            title: '检查项目',
            dataIndex: '1',
            key: '1',
        },
        {
            title: '检查结果',
            dataIndex: '2',
            key: '2',
        },
        {
            title: '照片',
            dataIndex: '3',
            key: '3',
        },
        {
            title: '操作',
            key: 'action',
            render: user => (
                <span>
                    <Button type='link'>
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button type='link'>
                        删除
                    </Button>
                </span>
            ),
        },
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

export default ItemList;
