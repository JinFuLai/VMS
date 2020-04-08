class Gps {
  constructor(longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  setWgLongitude(longitude) {
    this.longitude = longitude;
  }

  setWgLatitude(latitude) {
    this.latitude = latitude;
  }

  getWgLongitude(longitude) {
    return this.longitude;
  }

  getWgLatitude(latitude) {
    return this.latitude;
  }

  toString() {
    return this.longitude + ',' + this.latitude;
  }

  toJson(count = 8) {
    let result = {
      longitude: this.longitude.toFixed(count) * 1,
      latitude: this.latitude.toFixed(count) * 1,
    };
    return result;
  }
}

module.exports = Gps;
