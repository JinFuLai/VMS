import { Tabs } from 'antd';
import tabsStyles from '../styles.less';
import TabsCarList from './tabsCarList';
import TabsDriverList from './tabsDriverList';
import TabsEquipmentList from './tabsEquipmentList';
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class UserTabs extends React.Component {

    state = {
        tableDataCar: [],
        tableDataDriver: [],
        tableDataEquipment: [],
    };
    render() {
        return (
            <div className={tabsStyles['ant-tabs-nav-scroll']}>
                <Tabs onChange={callback} type="card" >
                    <TabPane tab="车辆" key="1">
                        <TabsCarList data={this.props} getChildrenMsgTabsCarList={this.getChildrenMsgTabsCarList} eliminate={this.props.eliminate}></TabsCarList>
                    </TabPane>
                    <TabPane tab="驾驶员" key="2">
                        <TabsDriverList data={this.props} getChildrenMsgTabsDriverList={this.getChildrenMsgTabsDriverList} eliminate={this.props.eliminate}></TabsDriverList>
                    </TabPane>
                    <TabPane tab="设备" key="3">
                        <TabsEquipmentList data={this.props} getChildrenMsgTabsEquipmentList={this.getChildrenMsgTabsEquipmentList} eliminate={this.props.eliminate}></TabsEquipmentList>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
    getChildrenMsgTabsCarList = (result, msg) => {   //车辆数据
        if (msg) {
            this.setState({ tableDataCar: msg })
            this.toParentTabsCarList(this.state.tableDataCar)
        }
    }
    toParentTabsCarList = (data) => {
        this.props.getChildrenMsgTabsCar(this, data) //向祖先组件传递数据
    }
    getChildrenMsgTabsDriverList = (result, msg) => {   //驾驶员数据
        if (msg) {
            this.setState({ tableDataDriver: msg })
            this.toParentTabsDriverList(this.state.tableDataDriver)
        }
    }
    toParentTabsDriverList = (data) => {
        this.props.getChildrenMsgTabsDriver(this, data) //向祖先组件传递数据
    }
    getChildrenMsgTabsEquipmentList = (result, msg) => {   //设备数据
        if (msg) {
            this.setState({ tableDataEquipment: msg })
            this.toParentTabsEquipmentList(this.state.tableDataEquipment)
        }
    }
    toParentTabsEquipmentList = (data) => {
        this.props.getChildrenMsgTabsEquipment(this, data) //向祖先组件传递数据
    }
}
export default UserTabs;
