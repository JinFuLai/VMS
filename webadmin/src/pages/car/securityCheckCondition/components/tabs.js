import { Tabs } from 'antd';
import tabsStyles from '../styles.less';
import TabsItemList from './tabsItemList';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const UserTabs = () => {
    return (
        <div className={tabsStyles['ant-tabs-nav-scroll']}>
            <Tabs onChange={callback} type="card" >
                <TabPane tab="安全设置" key="1">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="传动系统" key="2">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="轮胎" key="3">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="摄像头" key="4">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="外观" key="5">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="悬架系统" key="6">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="照明、信号指示灯" key="7">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="制动系统" key="8">
                    <TabsItemList></TabsItemList>
                </TabPane>
                <TabPane tab="转向系统" key="9">
                    <TabsItemList></TabsItemList>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default UserTabs;
