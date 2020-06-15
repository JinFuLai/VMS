import { Tabs } from 'antd';
import tabsStyles from '../styles.less';
import TabsContactsList from './tabsContactsList';
import TabsCarList from './tabsCarList';
import TabsDriverList from './tabsDriverList';
import TabsEquipmentList from './tabsEquipmentList';
import TabsDepartmentList from './tabsDepartmentList';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const UserTabs = () => {
  return (
    <div className={tabsStyles['ant-tabs-nav-scroll']}>
      <Tabs onChange={callback} type="card" >
        <TabPane tab="联系人" key="1">
          <TabsContactsList></TabsContactsList>
        </TabPane>
        <TabPane tab="车辆" key="2">
          <TabsCarList></TabsCarList>
        </TabPane>
        <TabPane tab="驾驶员" key="3">
          <TabsDriverList></TabsDriverList>
        </TabPane>
        <TabPane tab="设备" key="4">
        <TabsEquipmentList></TabsEquipmentList>
        </TabPane>
        <TabPane tab="部门" key="5">
        <TabsDepartmentList></TabsDepartmentList>
        </TabPane>
      </Tabs>
    </div>
  )
}
export default UserTabs;
