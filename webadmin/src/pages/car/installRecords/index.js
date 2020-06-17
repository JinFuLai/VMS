import { Tabs } from 'antd';
import tabsStyles from './styles.less';
import NoGatheringList from './components/noGatheringList';
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
          <TabPane tab="装机未收款记录" key="1">
            <NoGatheringList></NoGatheringList>
          </TabPane>
          <TabPane tab="装机已收费待总经理确认记录" key="2">
            <AwaitOperationList></AwaitOperationList>
          </TabPane>
          <TabPane tab="装机以收费记录" key="3">
            <AlreadyGatherList></AlreadyGatherList>
          </TabPane>
        </Tabs>
      </PageHeaderWrapper>
    </div>
  )
}
export default ServeTabs;