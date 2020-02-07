import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Button, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { Search } = Input;

const columns = [
  {
    title: '所属公司',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '旗下车辆数',
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
  },
  {
    title: '旗下驾驶员数',
    dataIndex: 'driverNumber',
    key: 'driverNumber',
  },
  {
    title: '旗下设备数',
    dataIndex: 'deviceNumber',
    key: 'deviceNumber',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <a>查看详情</a>
        <Divider type="vertical" />
        <a>编辑</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];

@connect(({ department }) => ({
  department,
}))
class DepartmentList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetch',
    });
  }

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      department: { data },
    } = this.props;

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{ padding: 24, background: '#fff' }}>
        <PageHeaderWrapper>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
              批量删除
            </Button>
            <Button type="primary" style={{ marginLeft: 10 }}>
              添加部门
            </Button>
            <Search
              placeholder="请输入查询内容"
              enterButton="查询"
              onSearch={value => console.log(value)}
              style={{ width: 250, marginLeft: 10 }}
            />
            {/*
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                            </span>
                        */}
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default DepartmentList;
