import React from 'react';
import homePageStyles from './styles.css';
import ChartsTwo from './components/chartsTwo';
import ChartsOne from './components/chartsOne';
import { Form, Select } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    CarOutlined,
    AimOutlined,
    VerticalAlignMiddleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
class HomePage extends React.Component {


    render() {

        return (
            <div style={{ padding: 24, background: '#fff' }}>
                <div className={homePageStyles.headerBox}>
                    <div className={homePageStyles.contentBox1}>
                        <div className={homePageStyles.iconBox}>
                            <UserOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>用户数量:1200</div>
                    </div>
                    <div className={homePageStyles.contentBox2}>
                        <div className={homePageStyles.iconBox}>
                            <CarOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>车辆数量:700</div>
                    </div>
                    <div className={homePageStyles.contentBox3}>
                        <div className={homePageStyles.iconBox}>
                            <TeamOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>司机数量:200</div>
                    </div>
                    <div className={homePageStyles.contentBox4}>
                        <div className={homePageStyles.iconBox}>
                            <AimOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>设备数量:800</div>
                    </div>
                    <div className={homePageStyles.contentBox5}>
                        <div className={homePageStyles.iconBox}>
                            <VerticalAlignMiddleOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>数据接受:100</div>
                    </div>
                    <div className={homePageStyles.contentBox6}>
                        <div className={homePageStyles.iconBox}>
                            <ExclamationCircleOutlined style={{ fontSize: 26, color: "white" }} />
                        </div>
                        <div className={homePageStyles.textBox}>报警信息:200</div>
                    </div>

                </div>
                <div className={homePageStyles.chartBox}>
                    <div>
                        {/* <div>
                            <Form name="nest-messages" >
                                <Form.Item name="gender" label="性别" >
                                    <Select>
                                        <Select.Option value="man">男</Select.Option>
                                        <Select.Option value="woman">女</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div> */}
                        <div className={homePageStyles.chartBoxOne}>

                            <ChartsOne></ChartsOne>
                        </div>
                    </div>

                    <div className={homePageStyles.chartBoxTwo}>
                        <ChartsTwo></ChartsTwo>
                    </div>
                    <div className={homePageStyles.informationBox}>
                    <div  >最近消息</div>
                    <div  className={homePageStyles.warnBox}></div>
                    <div  className={homePageStyles.systemBox}></div>
                    </div>
                </div>
                <div className={homePageStyles.mapBox}>

                </div>
            </div>
        );
    }

}


export default HomePage;
