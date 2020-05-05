import Gps from './GPS';

const BAIDU_LBS_TYPE = 'bd09ll';
const pi = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;
const x_pi = pi * 3000.0 / 180.0;

class GpsUtil {
  /**
   * WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,
   * 谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
   * GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
   * 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;
   * 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的
   * 北斗芯片获取的经纬度为WGS84地理坐标
   */

  /**
   * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
   *
   * @param lat
   * @param lon
   * @return
   */
  static gps84_To_Gcj02(lon, lat) {
    if (GpsUtil.outOfChina(lon, lat)) {
      return null;
    }
    let dLat = GpsUtil.transformLat(lon - 105.0, lat - 35.0);
    let dLon = GpsUtil.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return new Gps(mgLon, mgLat);
  }

  /**
   * 84 to (百度坐标系 (BD-09) * @param lon * @param lat * @return
   * */
  static gps84_To_Bd09(lon, lat) {
    let gcl = GpsUtil.gps84_To_Gcj02(lon, lat);
    let bd = GpsUtil.gcj02_To_Bd09(gcl.getWgLongitude(), gcl.getWgLatitude());
    return bd;
  }

  /**
   * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return
   * */
  static gcj_To_Gps84(lon, lat) {
    let gps = GpsUtil.transform(lon, lat);
    let longitude = lon * 2 - gps.getWgLongitude();
    let latitude = lat * 2 - gps.getWgLatitude();
    return new Gps(longitude, latitude);
  }

  /**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
   *
   * @param gg_lat
   * @param gg_lon
   */
  static gcj02_To_Bd09(gg_lon, gg_lat) {
    let x = gg_lon,
      y = gg_lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    let bd_lon = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    let gps = new Gps(bd_lon, bd_lat);
    return gps;
  }

  /**
   * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
   * bd_lat * @param bd_lon * @return
   */
  static bd09_To_Gcj02(bd_lon, bd_lat) {
    let x = bd_lon - 0.0065,
      y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let gg_lon = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return new Gps(gg_lon, gg_lat);
  }

  /**
   * (BD-09)-->84
   * @param bd_lat
   * @param bd_lon
   * @return
   */
  static bd09_To_Gps84(bd_lon, bd_lat) {
    let gcj02 = GpsUtil.bd09_To_Gcj02(bd_lon, bd_lat);
    let map84 = GpsUtil.gcj_To_Gps84(
      gcj02.getWgLongitude(),
      gcj02.getWgLatitude(),
    );
    return map84;
  }

  static outOfChina(lon, lat) {
    if (lon < 72.004 || lon > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  }

  static transform(lon, lat) {
    if (GpsUtil.outOfChina(lon, lat)) {
      return new Gps(lon, lat);
    }
    let dLat = GpsUtil.transformLat(lon - 105.0, lat - 35.0);
    let dLon = GpsUtil.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return new Gps(mgLon, mgLat);
  }

  static transformLat(x, y) {
    var ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  }

  static transformLon(x, y) {
    var ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) *
        2.0) /
      3.0;
    return ret;
  }
}

export default GpsUtil;
