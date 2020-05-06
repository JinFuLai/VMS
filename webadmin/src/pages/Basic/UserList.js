/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

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
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: '操作',
      key: 'action',
      render: user => (
        <span>
          <a>查看详情</a>
          <Divider type="vertical" />
          <a>编辑</a>
          <Divider type="vertical" />
          <a>停用</a>
          <Divider type="vertical" />
          <Button type='link' onClick={()=>this._showDeleteModel()} >
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
      payload: (keyword && keyword.length > 0) ? {username:keyword} : {},
      callback:response=>{
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

    const { loadingDelete, selectedRowKeys, loadingSearch } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const dataSource = data ? data.dataList.map(user => {
      user.key= user._id;
      return user
    }) : [];
    const columns = this._columns();
    return (
      <div style={{ padding: 24, background: '#fff' }}>
        <Spin spinning={this.state.loading} tip='Loading'>
          <PageHeaderWrapper>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={this._showDeleteModel} disabled={!hasSelected} loading={loadingDelete}>
                批量删除
              </Button>
              <Button type="primary" style={{ marginLeft: 10 }}>
                添加用户
              </Button>
              <Search
                placeholder="请输入查询内容"
                enterButton="查询"
                onSearch={value => {
                  this.setState({loadingSearch:true});
                  this.search(value);
                }}
                style={{ width: 250, marginLeft: 10 }}
                loading={loadingSearch}
              />
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource}/>
          </PageHeaderWrapper>
          <Modal
            // title="确定删除？"
            closable={false}
            centered
            visible = {this.state.showDeleteModal}
            onOk={()=>this._deleteUser(selectedRowKeys.join(','))}
            onCancel={this._hiddenDeleteModel}
          >
            <p>确认删除?</p>
          </Modal>
        </Spin>
      </div>
    );
  }

  _hiddenDeleteModel = () => {
    this.setState({showDeleteModal: false})
  }
  
  _showDeleteModel = () => {
    this.setState({showDeleteModal: true})
  }

  _deleteUser = userIds => {
    this.setState({showDeleteModal: false})
    // const { dispatch } = this.props;
    // const _this = this;
    // dispatch({
    //   type: 'userList/delete',
    //   payload: (userIds && userIds.length > 0) ? {id:userIds} : {},
    //   callback:()=>{
    //     _this.setState({
    //       selectedRowKeys: [],
    //       loadingSearch: false,
    //       loadingDelete: false,
    //       loading: false,
    //     });
    //   }
    // });
  }

}

export default UserList;
