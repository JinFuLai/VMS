
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AddForm from './components/addForm';
import UpdateForm from './components/updateForm';
import ViewDetailsForm from './components/viewDetailsForm';

const { Search } = Input;

@connect(({ departmentList }) => ({
  departmentList,
}))
class DepartmentList extends React.Component {

  _columns = () => [
    {
      title: '所属公司',
      dataIndex: 'belong_to_company',
      key: 'belong_to_company',
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '旗下车辆数',
      dataIndex: 'car_number',
      key: 'car_number',
    },
    {
      title: '旗下驾驶员数',
      dataIndex: 'driver_number',
      key: 'driver_number',
    },
    {
      title: '旗下设备数',
      dataIndex: 'equipment_unmber',
      key: 'equipment_unmber',
    },
    {
      title: '操作',
      key: 'action',
      render: (Text,record) => (
        <span>
          <Button type='link' onClick={() => this.showViewDetails(record)} >
            查看详情
          </Button>
          <Divider type="vertical" />
          <Button type='link' onClick={() => this.showUpdate(record)} >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type='link' onClick={() => this._showDeleteModel(record._id)} >
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
    UpdateData:{},
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
      type: 'departmentList/search',
      payload: (keyword && keyword.length > 0) ? { name: keyword } : {},
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
      departmentList: { data },
    } = this.props;

    const { loadingDelete, selectedRowKeys, loadingSearch, showAddForm, showUpdateForm, confirmLoading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const dataSource = data.dataList ? data.dataList.map(user => {
      user.car_number = user.car.length
      user.driver_number = user.driver.length
      user.equipment_unmber = user.equipment.length
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
                添加部门
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
              height: '520px',
              overflow: 'auto'
            }}
            title="添加部门"
            width="900px"
            onOk={this.hideAdd}
            confirmLoading={confirmLoading}
            onCancel={this.hideAdd}
            visible={this.state.showAddForm}
            footer={[]}
          >
            <AddForm search={this.search} hideAdd={this.hideAdd}></AddForm>
          </Modal>
          <Modal
            bodyStyle={{
              height: '520px',
              overflow: 'auto'
            }}
            title="编辑部门"
            width="900px"
            onOk={this.hideUpdate}
            confirmLoading={confirmLoading}
            onCancel={this.hideUpdate}
            visible={this.state.showUpdateForm}
            footer={[]}
          >
            <UpdateForm data={this.state.UpdateData} search={this.search} hideUpdate={this.hideUpdate}></UpdateForm>
          </Modal>
          <Modal
            bodyStyle={{
              height: '520px',
              overflow: 'auto'
            }}
            title="查看详情"
            width="900px"
            onOk={this.hideViewDetails}
            confirmLoading={confirmLoading}
            onCancel={this.hideViewDetails}
            visible={this.state.viewDetailsForm}
          >
            <ViewDetailsForm data={this.state.viewDetailsData}></ViewDetailsForm>
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
  showUpdate = (record) => {
    this.setState({ UpdateData: record })
    this.setState({ showUpdateForm: true })
  }
  hideUpdate = () => {
    this.setState({ showUpdateForm: false })
  }
  showViewDetails = (record) => {
    this.setState({ viewDetailsData: record })
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
  }

  _deleteUser = () => {
    this.setState({ showDeleteModal: false, loading: true })
    const { dispatch } = this.props;
    const _this = this;
    dispatch({
      type: 'departmentList/delete',
      payload: (this.state.shouldDeleteIds && this.state.shouldDeleteIds.length > 0) ? { id: this.state.shouldDeleteIds } : {},
      callback: () => {
        _this.setState({
          selectedRowKeys: [],
          loadingSearch: false,
          loadingDelete: false,
          loading: false,
        });
        this.search();
      }
    });
  }
}

export default DepartmentList;
