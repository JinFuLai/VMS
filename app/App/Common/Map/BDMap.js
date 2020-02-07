import React, {Component} from 'react';
import {View} from 'native-base';
import PropTypes from 'prop-types';
import {LocationBottom} from '../../Home/Search/SearchComponent';

export default class BDMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      mapType: null, // PropTypes.oneOf(["standard", "satellite", "navigation", "night", "bus"]),
      carList: [],
      historyList: [],
      historyListCurrentIndex: 0, //历史轨迹动画，车辆所在点的位置
    };
  }

  static propTypes = {
    style: PropTypes.any,
    renderItem: PropTypes.any,
    detailsViewType: PropTypes.oneOf(['location', 'Warning', 'history']),
    center: PropTypes.any,
    mapType: PropTypes.oneOf([
      'standard',
      'satellite',
      'navigation',
      'night',
      'bus',
    ]),
    clickDetailsBtn: PropTypes.any, //点击事件
  };

  // async componentDidMount() {
  //     // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
  //     await Location.init();
  //     Location.setOptions({ gps: true });
  //     this.listener = Location.addLocationListener(location => {
  //         this.state.center={
  //             latitude:this.state.latitude,
  //             longitude:this.state.longitude
  //         }
  //       this.setState({ location });
  //     });
  //     Location.start();
  // }

  // componentWillUnmount() {
  //     Location.stop();
  //     this.listener.remove();
  // }

  render() {
    return <View />;
    // var currentItem = this.state.historyList[this.state.historyListCurrentIndex];
    // if (currentItem != null) {
    //     this.state.center = {
    //         latitude: currentItem.latitude,
    //         longitude: currentItem.longitude,
    //     }
    // }
    // return(
    //     <MapView
    //     style = {[Mapstyle.defaultMapStyle,this.props.style]}
    //     location={this.state.location}
    //     center = {this.state.center}
    //     satellite = {this.state.mapType == 'satellite'}//卫星地图
    //     // trafficEnabled = {true}//交通
    //     indoorEnabled = {true}
    //     locationMode = {'normal'}
    //     compassDisabled = {true}
    //     locationEnabled
    //     buildingsDisabled = {false}
    //     onClick={(point) =>
    //         this.setState({hiddenDetails:true})
    //     }
    //     >
    //         { this._renderHistory(this.state.historyList)}
    //         { currentItem != null ? this._renderMarker(currentItem,'key1') : null }
    //         {/* { currentItem != null ? this._renderMarker1({latitude:currentItem.latitude+0.1,longitude:currentItem.longitude+0.1},'key2') : null } */}
    // <ActionButton size={36} buttonColor={Color.jfl_37BCAD}>
    //     <ActionButton.Item buttonColor={Color.jfl_FFFFFF} title="" onPress={() => this.setMapType('standard')}>
    //         <Text style={Mapstyle.buttonTextStyle}>标准</Text>
    //     </ActionButton.Item>
    //     <ActionButton.Item buttonColor={Color.jfl_FFFFFF} title="" onPress={() => this.setMapType('satellite')}>
    //         <Text style={Mapstyle.buttonTextStyle}>卫星</Text>
    //     </ActionButton.Item>
    //     <ActionButton.Item buttonColor={Color.jfl_FFFFFF} title="" onPress={() => this.setMapType('navigation')}>
    //         <Text style={Mapstyle.buttonTextStyle}>3D</Text>
    //     </ActionButton.Item>
    // </ActionButton>
    //         {this.props.renderItem}
    //         { this._hiddenDetails(this.state.hiddenDetails)}
    //     </MapView>
    // )
  }

  // _renderMarker = (item,index )=> (
  //     <MapView.Marker
  //     key={index}
  //     onPress={()=>
  //         this.setState({hiddenDetails:false})
  //     }
  //     coordinate={item}
  //     image = "che"
  //     // view={()=>
  //     //     <Button>
  //     //         <Text>自定义控件</Text>
  //     //     </Button>
  //     // }
  //     >
  //     </MapView.Marker>
  // );

  // _renderMarker1 = (item,index )=> (
  //     <MapView.Marker
  //     key={index}
  //     title = "自定义"
  //     onPress={()=>
  //         this.setState({hiddenDetails:false})
  //     }
  //     image = "che"
  //     coordinate={item}
  //     view={()=>
  //         <Button>
  //             <Text>自定义控件</Text>
  //         </Button>
  //     }
  //     >
  //     </MapView.Marker>
  // );

  // _renderHistory = (items) => {
  //     var points = items.filter(
  //         (item) => item.latitude && item.longitude
  //     ).map((item,index)=>
  //         ({latitude: item.latitude, longitude: item.longitude })
  //     );
  //     return(
  //         <MapView.Polyline
  //             points = {points}
  //             width={2}
  //             color={Color.jfl_3BBC72}
  //         />
  //     )
  // }

  _hiddenDetails = hidden => {
    if (hidden === false) {
      return (
        <LocationBottom
          ref={this.LocationBottom}
          name={'currentItem.address'}
          driving={true}
          clickDetailsBtn={index => this.props.clickDetailsBtn(index)}
        />
      );
    }
  };

  ///设置地图类型["standard", "satellite", "navigation", "night", "bus"]
  setMapType(type) {
    this.setState({mapType: type});
  }

  setCenter(latitude, longitude) {
    this.setState({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }
  setCarList(list) {
    this.setState({carList: list});
  }

  setHistoryList(list) {
    this.setState({historyList: list});
    this.startHistoryAnimation();
  }

  startHistoryAnimation() {
    setTimeout(() => {
      if (
        this.state.historyListCurrentIndex + 1 <
        this.state.historyList.length
      ) {
        this.setState({
          historyListCurrentIndex: this.state.historyListCurrentIndex + 1,
        });
        this.startHistoryAnimation();
      }
    }, 2000);
  }
}
