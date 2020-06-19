/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AddUserForm from './components/addUserForm';
import UpdateUserForm from './components/updateUserForm';
import ViewDetailsForm from './components/viewDetailsForm';
import Table_ from './components/table';

const { Search } = Input;

@connect(({ userList }) => ({
  userList,
}))
class UserList extends React.Component {

  _columns = () => [
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
          {permissionGroups != null ? permissionGroups.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          )) : ''}
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
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: '操作',
      key: 'action',
      render: user => (
        <span>
          <Button type='link' onClick={() => this.showViewDetails()} >
            查看详情
          </Button>
          <Divider type="vertical" />
          <Button type='link' onClick={() => this.showUpdateUser()} >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type='link' onClick={() => this.showBlockUpModal()} >
            停用
          </Button>
          <Divider type="vertical" />
          <Button type='link' onClick={() => this._showDeleteModel(user._id)} >
            删除
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    this.search();
  }

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loadingDelete: false,
    loadingSearch: false,
    loading: false,
    showDeleteModal: false,
    blockUpModal: false,
    shouldDeleteIds: null, // 将要删除的ids字符串集合，用‘，’隔开
    showAddUserForm: false,
    confirmLoading: false,
    showUpdateUserForm: false,
    viewDetailsForm: false,
  };

  start = () => {
    this.setState({ loadingDelete: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loadingDelete: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  search = keyword => {
    const { dispatch } = this.props;
    const _this = this;
    dispatch({
      type: 'userList/search',
      payload: (keyword && keyword.length > 0) ? { username: keyword } : {},
      callback: response => {
        console.log(response);
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
      userList: { data },
    } = this.props;

    const { loadingDelete, selectedRowKeys, loadingSearch, showAddUserForm,showUpdateUserForm, confirmLoading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const dataSource = data.dataList ? data.dataList.map(user => {
      user.key = user._id;
      return user
    }) : [];
    const columns = this._columns();
    return (
      <div style={{ padding: 24, background: '#fff' }}>
        <Spin spinning={this.state.loading} tip='Loading'>
          <PageHeaderWrapper>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={() => this._showDeleteModel(this.state.selectedRowKeys != null ? this.state.selectedRowKeys.join(',') : null)} disabled={!hasSelected} loading={loadingDelete}>
                批量删除
              </Button>
              <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.showAddUser()}>
                添加用户
              </Button>
              <Search
                placeholder="请输入查询内容"
                enterButton="查询"
                onSearch={value => {
                  this.setState({ loadingSearch: true });
                  this.search(value);
                }}
                style={{ width: 250, marginLeft: 10 }}
                loading={loadingSearch}
              />
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
            {/* <Table_ rowSelection={rowSelection} columns={columns} dataSource={dataSource}></Table_> */}
          </PageHeaderWrapper>
          <Modal
            // title="确定删除？"
            closable={false}
            centered
            visible={this.state.showDeleteModal}
            onOk={this._deleteUser}
            onCancel={this._hiddenDeleteModel}
          >
            <p>确认删除?</p>
          </Modal>
          <Modal
            closable={false}
            centered
            visible={this.state.blockUpModal}
            onOk={this.hideBlockUpModal}
            onCancel={this.hideBlockUpModal}
          >
            <p>确认停用?</p>
          </Modal>
          <Modal
            title="添加用户"
            width="900px"
            onOk={this.hideAddUser}
            confirmLoading={confirmLoading}
            onCancel={this.hideAddUser}
            visible={this.state.showAddUserForm}
          >
            <AddUserForm></AddUserForm>
          </Modal>
          <Modal
            title="编辑用户"
            width="900px"
            onOk={this.hideUpdateUser}
            confirmLoading={confirmLoading}
            onCancel={this.hideUpdateUser}
            visible={this.state.showUpdateUserForm}
          >
            <UpdateUserForm></UpdateUserForm>
          </Modal>
          <Modal
            title="查看详情"
            width="900px"
            onOk={this.hideViewDetails}
            confirmLoading={confirmLoading}
            onCancel={this.hideViewDetails}
            visible={this.state.viewDetailsForm}
          >
          <ViewDetailsForm></ViewDetailsForm>
          </Modal>
        </Spin>
      </div>
    );
  }
  showAddUser = () => {
    this.setState({ showAddUserForm: true })
  }
  hideAddUser = () => {
    this.setState({ showAddUserForm: false })
  }
  showUpdateUser = () => {
    this.setState({ showUpdateUserForm: true })
  }
  hideUpdateUser = () => {
    this.setState({ showUpdateUserForm: false })
  }
  showViewDetails = () => {
    this.setState({ viewDetailsForm: true })
  }
  hideViewDetails = () => {
    this.setState({ viewDetailsForm: false })
  }
  showBlockUpModal = () => {
    this.setState({ blockUpModal: true })
  }
  hideBlockUpModal = () => {
    this.setState({ blockUpModal: false })
  }
  _hiddenDeleteModel = () => {
    this.setState({ showDeleteModal: false })
  }

  _showDeleteModel = ids => {
    this.setState({ showDeleteModal: true, shouldDeleteIds: ids })
    console.log(ids);
  }

  _deleteUser = () => {
    this.setState({ showDeleteModal: false, loading: true })
    const { dispatch } = this.props;
    const _this = this;
    dispatch({
      type: 'userList/delete',
      payload: (this.state.shouldDeleteIds && this.state.shouldDeleteIds.length > 0) ? { id: this.state.shouldDeleteIds } : {},
      callback: () => {
        _this.setState({
          selectedRowKeys: [],
          loadingSearch: false,
          loadingDelete: false,
          loading: false,
        });
      }
    });
  }
}

export default UserList;
