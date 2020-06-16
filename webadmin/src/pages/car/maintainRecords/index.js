
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AddForm from './components/addForm';
import UpdateForm from './components/updateForm';

const { Search } = Input;

@connect(({maintainRecordsList }) => ({
  maintainRecordsList,
}))
class MaintainRecordsList extends React.Component {
  _columns = () => [
    {
      title: '车牌号码',
      dataIndex: '1',
      key: '1',
    },
    {
      title: '维修原因',
      dataIndex: '2',
      key: '2',
    },
    {
      title: '维修厂',
      dataIndex: '3',
      key: '3',
    },
    {
      title: '维修费用',
      dataIndex: '4',
      key: '4',
    },
    {
      title: '经手人',
      dataIndex: '5',
      key: '5',
    },
    {
      title: '维修状态',
      dataIndex: '6',
      key: '6',
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
          <Button type='link' onClick={() => this.showUpdate()} >
            编辑
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
    showAddForm: false,
    confirmLoading: false,
    showUpdateForm: false,
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
      type: 'maintainRecordsList/search',
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
      maintainRecordsList: { data },
    } = this.props;

    const { loadingDelete, selectedRowKeys, loadingSearch, showAddForm,showUpdateForm, confirmLoading } = this.state;
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
              <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.showAdd()}>
                添加维修记录
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
          </PageHeaderWrapper>
          <Modal
            closable={false}
            centered
            visible={this.state.showDeleteModal}
            onOk={this._deleteUser}
            onCancel={this._hiddenDeleteModel}
          >
            <p>确认删除?</p>
          </Modal>
          <Modal
            bodyStyle={{
              height:'520px',
              overflow:'auto'
             }}
            title="添加维修记录"
            width="990px"
            onOk={this.hideAdd}
            confirmLoading={confirmLoading}
            onCancel={this.hideAdd}
            visible={this.state.showAddForm}
          >
            <AddForm></AddForm>
          </Modal>
          <Modal
            title="编辑维修记录"
            width="900px"
            onOk={this.hideUpdate}
            confirmLoading={confirmLoading}
            onCancel={this.hideUpdate}
            visible={this.state.showUpdateForm}
          >
            <UpdateForm></UpdateForm>
          </Modal>
          <Modal
            title="查看详情"
            width="900px"
            onOk={this.hideViewDetails}
            confirmLoading={confirmLoading}
            onCancel={this.hideViewDetails}
            visible={this.state.viewDetailsForm}
          >
          </Modal>
        </Spin>
      </div>
    );
  }
  showAdd = () => {
    this.setState({ showAddForm: true })
  }
  hideAdd = () => {
    this.setState({ showAddForm: false })
  }
  showUpdate = () => {
    this.setState({ showUpdateForm: true })
  }
  hideUpdate = () => {
    this.setState({ showUpdateForm: false })
  }
  showViewDetails = () => {
    this.setState({ viewDetailsForm: true })
  }
  hideViewDetails = () => {
    this.setState({ viewDetailsForm: false })
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
      type: 'maintainRecordsList/delete',
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

export default MaintainRecordsList;
