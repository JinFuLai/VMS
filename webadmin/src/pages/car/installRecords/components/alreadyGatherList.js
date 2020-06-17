
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect(({ installRecordsList }) => ({
    installRecordsList,
}))
class NoGatheringList extends React.Component {
    _columns = () => [
        {
            title: '客户简称',
            dataIndex: '1',
            key: '1',
        },
        {
            title: '车牌',
            dataIndex: '2',
            key: '2',
        },
        {
            title: '装机时间',
            dataIndex: '3',
            key: '3',
        },
        {
            title: '服务费开始时间',
            dataIndex: '4',
            key: '4',
        },
        {
            title: '服务费到期时间',
            dataIndex: '5',
            key: '5',
        },
        {
            title: '服务费到期倒计时',
            dataIndex: '6',
            key: '6',
        },
        {
            title: '付款联系号码',
            dataIndex: '7',
            key: '7',
        },
        {
            title: '司机联系号码',
            dataIndex: '8',
            key: '8',
        },
        {
            title: '是否正常使用',
            dataIndex: '9',
            key: '9',
        },
        {
            title: '备注',
            dataIndex: '10',
            key: '10',
        },
        {
            title: '操作',
            dataIndex: '11',
            key: '11',
        },
        {
            title: '续费录入',
            dataIndex: '12',
            key: '12',
        },
        {
            title: '本期服务费',
            dataIndex: '13',
            key: '13',
        },
        {
            title: '收款续费时间',
            dataIndex: '13',
            key: '13',
        },
        {
            title: '续费方式',
            dataIndex: '14',
            key: '14',
        },
        {
            title: '付款金额',
            dataIndex: '15',
            key: '15',
        },
    ];

    componentDidMount() {
        this.search();
    }

    state = {
        loading: false,
    };

    search = keyword => {
        const { dispatch } = this.props;
        const _this = this;
        dispatch({
            type: 'installRecordsList/search',
            payload: (keyword && keyword.length > 0) ? { username: keyword } : {},
            callback: response => {
                _this.setState({
                    selectedRowKeys: [],
                    loadingSearch: false,
                    loadingDelete: false,
                });
            }
        });
    }

    render() {
        const {
            installRecordsList: { data },
    } = this.props;

        const dataSource = data.dataList ? data.dataList.map(user => {
            user.key = user._id;
            return user
        }) : [];
        const columns = this._columns();
        return (
            <div style={{ padding: 24, background: '#fff' }}>
                <Spin spinning={this.state.loading} tip='Loading'>
                    <Input addonBefore="客户简称" style={{ width: '250px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入客户简称"></Input>
                    <Input addonBefore="车牌" style={{ width: '250px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入车牌"></Input>
                    <Input addonBefore="备注" style={{ width: '250px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入备注"></Input>
                    <Input addonBefore="付款备注" style={{ width: '250px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入付款备注"></Input>
                    <Input addonBefore="订单跟进负责人" style={{ width: '290px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入订单跟进负责人"></Input>
                    <Input addonBefore="业务员" style={{ width: '250px',marginRight:'10px',marginTop:'10px' }} placeholder="请输入业务员"></Input>
                    <Button style={{marginRight:'10px',marginTop:'10px' }}>查询</Button>
                    <Button style={{marginRight:'10px',marginTop:'10px' }}>导出</Button>
                    <Table columns={columns} dataSource={dataSource} style={{marginTop:'10px' }} />
                </Spin>
            </div>
        );
    }

}

export default NoGatheringList;
