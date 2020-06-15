import { Tabs } from 'antd';
import tabsStyles from '../styles.less';
import TabsCarList from './tabsCarList';
import TabsDriverList from './tabsDriverList';
import TabsEquipmentList from './tabsEquipmentList';
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const UserTabs = () => {
    return (
        <div className={tabsStyles['ant-tabs-nav-scroll']}>
            <Tabs onChange={callback} type="card" >
                <TabPane tab="车辆" key="1">
                    <TabsCarList></TabsCarList>
                </TabPane>
                <TabPane tab="驾驶员" key="2">
                    <TabsDriverList></TabsDriverList>
                </TabPane>
                <TabPane tab="设备" key="3">
                    <TabsEquipmentList></TabsEquipmentList>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default UserTabs;
