
import React from 'react';

import { connect } from 'dva';
import { Table, Divider, Tag, Button, Input, Avatar, Modal, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ParticularsForm from './components/particularsForm';

const { Search } = Input;

@connect(({positionDataList }) => ({
  positionDataList,
}))
class PositionDataList extends React.Component {
  _columns = () => [
    {
      title: '公司',
      dataIndex: '1',
      key: '1',
    },
    {
      title: '设备',
      dataIndex: '2',
      key: '2',
    },
    {
      title: '车辆',
      dataIndex: '3',
      key: '3',
    },
    {
      title: '驾驶员',
      dataIndex: '4',
      key: '4',
    },
    {
      title: 'UTC时间',
      dataIndex: '5',
      key: '5',
    },
    {
      title: '速度',
      dataIndex: '6',
      key: '6',
    },
    {
      title: '报警',
      dataIndex: '7',
      key: '7',
    },
    {
      title: '操作',
      key: 'action',
      render: user => (
        <span>
          <Button type='link' onClick={() => this.showViewDetails()} >
            查看详情
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
    confirmLoading: false,
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
      type: 'positionDataList/search',
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
      positionDataList: { data },
    } = this.props;

    const { loadingDelete, selectedRowKeys, loadingSearch, confirmLoading } = this.state;
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          </PageHeaderWrapper>
          <Modal
            title="查看详情"
            width="900px"
            onOk={this.hideViewDetails}
            confirmLoading={confirmLoading}
            onCancel={this.hideViewDetails}
            visible={this.state.viewDetailsForm}
          >
          <ParticularsForm></ParticularsForm>
          </Modal>
        </Spin>
      </div>
    );
  }
 

  showViewDetails = () => {
    this.setState({ viewDetailsForm: true })
  }
  hideViewDetails = () => {
    this.setState({ viewDetailsForm: false })
  }
}

export default PositionDataList;
