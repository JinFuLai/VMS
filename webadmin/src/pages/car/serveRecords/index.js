import { Tabs } from 'antd';
import tabsStyles from './styles.less';
import ExpireRecordList from './components/expireRecordList';
import AwaitOperationList from './components/awaitOperationList';
import AlreadyGatherList from './components/alreadyGatherList';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ServeTabs = () => {
  return (
    <div style={{ padding: 24, background: '#fff' }} className={tabsStyles['ant-tabs-nav-scroll']}>
      <PageHeaderWrapper>
        <Tabs onChange={callback} type="card">
          <TabPane tab="服务费到期记录" key="1">
            <ExpireRecordList></ExpireRecordList>
          </TabPane>
          <TabPane tab="服务费已收待总经理确认记录" key="2">
            <AwaitOperationList></AwaitOperationList>
          </TabPane>
          <TabPane tab="已收服务费记录" key="3">
            <AlreadyGatherList></AlreadyGatherList>
          </TabPane>
        </Tabs>
      </PageHeaderWrapper>
    </div>
  )
}
export default ServeTabs;