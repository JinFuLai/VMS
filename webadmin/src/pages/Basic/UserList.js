import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { Search } = Input;

const columns = [
  {
    title: '用户账号',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '用户头像',
    dataIndex: 'photo',
    key: 'photo',
    render: photo => <Avatar src={photo} />,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '用户性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '所在权限组',
    dataIndex: 'permissionGroups',
    key: 'permissionGroups',
    render: permissionGroups => (
      <span>
        {permissionGroups.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </span>
    ),
  },
  {
    title: '拥有权限数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '注册时间',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <a href="javascript:;">查看详情</a>
        <Divider type="vertical" />
        <a href="javascript:;">编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;">停用</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    ),
  },
];

@connect(({ userList }) => ({
  userList,
}))
class UserList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userList/search',
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
      userList: { dataList },
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
              添加用户
            </Button>
            <Search
              placeholder="请输入查询内容"
              enterButton="查询"
              onSearch={value => console.log(value)}
              style={{ width: 250, marginLeft: 10 }}
            />
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={dataList} />
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default UserList;
