// /* eslint-disable react/no-string-refs */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable eqeqeq */
// /* eslint-disable no-shadow */
// import React, {Component} from 'react';
// import {Text, Thumbnail} from 'native-base';
// import {Color, StyleSheet} from './Tools';
// import {MapView} from 'react-native-amap3d';
// import ActionButton from 'react-native-action-button';
// import PropTypes from 'prop-types';
// import {LocationBottom, WarningBottom} from '../Home/Search/SearchComponent';

// export default class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       center: null,
//       mapType: null, // PropTypes.oneOf(["standard", "satellite", "navigation", "night", "bus"]),
//       carList: [],
//       historyList: [],
//       historyListCurrentIndex: 0, //历史轨迹动画，车辆所在点的位置
//     };
//   }

//   static propTypes = {
//     style: PropTypes.any,
//     renderItem: PropTypes.any,
//     detailsViewType: PropTypes.oneOf(['location', 'Warning', 'history']),
//     center: PropTypes.any,
//     mapType: PropTypes.oneOf([
//       'standard',
//       'satellite',
//       'navigation',
//       'night',
//       'bus',
//     ]),
//   };

//   render() {
//     var currentItem = this.state.historyList[
//       this.state.historyListCurrentIndex
//     ];
//     return (
//       <MapView
//         style={[Mapstyle.defaultMapStyle, this.props.style]}
//         coordinate={
//           this.state.center
//             ? this.state.center
//             : this.props.center
//             ? this.props.center
//             : {latitude: 39.9109, longitude: 113.37296}
//         }
//         showsCompass={false} //是否显示指南针
//         mapType={
//           this.state.mapType
//             ? this.state.mapType
//             : this.props.mapType
//             ? this.props.mapType
//             : 'standard'
//         } //{this.state.mapType}
//         mapLanguage={0} //中英文 (0 中文, 1英文)
//         locationEnabled
//         onLocation={({nativeEvent}) =>
//           console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
//         }>
//         <ActionButton size={36} buttonColor={Color.jfl_37BCAD}>
//           <ActionButton.Item
//             buttonColor={Color.jfl_FFFFFF}
//             title=""
//             onPress={() => this.setMapType('standard')}>
//             <Text style={Mapstyle.buttonTextStyle}>标准</Text>
//           </ActionButton.Item>
//           <ActionButton.Item
//             buttonColor={Color.jfl_FFFFFF}
//             title=""
//             onPress={() => this.setMapType('satellite')}>
//             <Text style={Mapstyle.buttonTextStyle}>卫星</Text>
//           </ActionButton.Item>
//           <ActionButton.Item
//             buttonColor={Color.jfl_FFFFFF}
//             title=""
//             onPress={() => this.setMapType('navigation')}>
//             <Text style={Mapstyle.buttonTextStyle}>3D</Text>
//           </ActionButton.Item>
//         </ActionButton>
//         {this.props.renderItem}
//         {//历史轨迹
//         this.props.detailsViewType != 'history'
//           ? null
//           : this.state.historyList
//               .filter(item => item.latitude && item.longitude)
//               .map(() => (
//                 <MapView.Polyline
//                   dashed
//                   width={5}
//                   coordinates={this.state.historyList}
//                 />
//               ))}
//         {//历史轨迹 - 汽车位置
//         this.props.detailsViewType != 'history' ? null : currentItem ==
//           null ? null : (
//           <MapView.Marker
//             ref={'History_Marker'}
//             icon={() => (
//               <Thumbnail
//                 square
//                 style={{width: 40, height: 30}}
//                 source={require('../Source/Img/Home/Home/che.png')}
//               />
//             )}
//             coordinate={{
//               latitude: currentItem.latitude,
//               longitude: currentItem.longitude,
//             }}
//             draggable={false}
//             flat={true}
//             key={'key_history_che'}>
//             <WarningBottom
//               style={{width: null, height: null}}
//               carNum={currentItem.address}
//               IMEI={currentItem.vehicleStatus}
//               driving={currentItem.stop != 0}
//               clickDetailsBtn={index =>
//                 this._clickDetailsBottomBtn(index, {
//                   name: currentItem.directionString,
//                   driving: currentItem.stop != 0,
//                 })
//               }
//             />
//           </MapView.Marker>
//         )}
//         {//其他
//         this.props.detailsViewType == 'history'
//           ? null
//           : this.state.carList
//               .filter(item => item.latitude && item.longitude)
//               .map((item, index) => (
//                 <MapView.Marker
//                   ref={'Marker' + index.toString()}
//                   icon={() => (
//                     <Thumbnail
//                       square
//                       style={{width: 40, height: 30}}
//                       source={require('../Source/Img/Home/Home/che.png')}
//                     />
//                   )}
//                   coordinate={{
//                     latitude: item.latitude,
//                     longitude: item.longitude,
//                   }}
//                   draggable={false}
//                   flat={true}
//                   key={item.stationId}
//                   clickDisabled={this.props.detailsViewType == null}>
//                   {this.props.detailsViewType == 'location' ? (
//                     <LocationBottom
//                       ref={this.LocationBottom}
//                       name={item.name}
//                       driving={item.driving}
//                       clickDetailsBtn={index =>
//                         this._clickDetailsBottomBtn(index, {
//                           name: this.props.navigation.state.params.data,
//                           driving: true,
//                         })
//                       }
//                     />
//                   ) : this.props.detailsViewType == 'Warning' ? (
//                     <WarningBottom
//                       carNum={item.name}
//                       IMEI={item.IMEI}
//                       driving={item.driving}
//                       clickDetailsBtn={index =>
//                         this._clickDetailsBottomBtn(index, {
//                           name: item.carNum,
//                           driving: item.driving,
//                         })
//                       }
//                     />
//                   ) : null}
//                 </MapView.Marker>
//               ))}
//       </MapView>
//     );
//   }

//   ///设置地图类型["standard", "satellite", "navigation", "night", "bus"]
//   setMapType(type) {
//     this.setState({mapType: type});
//   }

//   setCenter(latitude, longitude) {
//     this.setState({
//       center: {
//         latitude: latitude,
//         longitude: longitude,
//       },
//     });
//   }
//   setCarList(list) {
//     this.setState({carList: list});
//   }

//   setHistoryList(list) {
//     this.setState({historyList: list});
//     this.startHistoryAnimation();
//   }

//   startHistoryAnimation() {
//     setTimeout(() => {
//       if (
//         this.state.historyListCurrentIndex + 1 <
//         this.state.historyList.length
//       ) {
//         this.setState({
//           historyListCurrentIndex: this.state.historyListCurrentIndex + 1,
//         });
//         this.startHistoryAnimation();
//       }
//     }, 1000);
//   }
// }

// const Mapstyle = StyleSheet.create({
//   defaultMapStyle: {
//     width: '100%',
//     height: '100%',
//   },
//   buttonTextStyle: {
//     fontSize: 12,
//     color: Color.jfl_373737,
//   },
// });
