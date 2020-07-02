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

class UserTabs extends React.Component {
 
  state = {
    tableData: [],
    tableDataCar: [],
    tableDataDriver: [],
    tableDataEquipment: [],
    tableDataDepartment: [],
  };
  render() {
    // console.log(this.props,"川谷来")
    return (
      <div className={tabsStyles['ant-tabs-nav-scroll']}>
        <Tabs onChange={callback} type="card" >
          <TabPane tab="联系人" key="1">
            <TabsContactsList data={this.props} getChildrenMsgTabsContactsList={this.getChildrenMsgTabsContactsList} eliminate={this.props.eliminate}></TabsContactsList>
          </TabPane>
          <TabPane tab="车辆" key="2">
            <TabsCarList data={this.props} getChildrenMsgTabsCarList={this.getChildrenMsgTabsCarList} eliminate={this.props.eliminate}></TabsCarList>
          </TabPane>
          <TabPane tab="驾驶员" key="3">
            <TabsDriverList data={this.props} getChildrenMsgTabsDriverList={this.getChildrenMsgTabsDriverList} eliminate={this.props.eliminate}></TabsDriverList>
          </TabPane>
          <TabPane tab="设备" key="4">
            <TabsEquipmentList data={this.props} getChildrenMsgTabsEquipmentList={this.getChildrenMsgTabsEquipmentList} eliminate={this.props.eliminate}></TabsEquipmentList>
          </TabPane>
          <TabPane tab="部门" key="5">
            <TabsDepartmentList data={this.props} getChildrenMsgTabsDepartmentList={this.getChildrenMsgTabsDepartmentList} eliminate={this.props.eliminate}></TabsDepartmentList>
          </TabPane>
        </Tabs>
      </div>
    )
  }
  getChildrenMsgTabsContactsList = (result, msg) => { //联系人数据
    console.log(msg, "爷爷数据")
    if (msg) {
      this.setState({ tableData: msg })
      this.toParentAddForm(this.state.tableData)
    }
  }
  toParentAddForm = (contactData) => {
    this.props.getChildrenMsgTabs(this, contactData) //向祖先组件传递数据
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
  getChildrenMsgTabsDepartmentList = (result, msg) => {   //部门数据
    if (msg) {
      this.setState({ tableDataDepartment: msg })
      this.toParentTabsDepartmentList(this.state.tableDataDepartment)
    }
  }
  toParentTabsDepartmentList = (data) => {
    this.props.getChildrenMsgTabsDepartment(this, data) //向祖先组件传递数据
  }

}
export default UserTabs;
