exports.STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    DELETED: "DELETED"
};

exports.PERMISSION = {
    CREATE_USER: "CREATE_USER",
    DELETE_USER: "DELETE_USER"
};

//设备类型  VEHICLE_GPS：车载GPS，PERSONAL_GPS：手持GPS
exports.DEVICETYPE = {
    VEHICLE_GPS: "VEHICLE_GPS",
    PERSONAL_GPS: "PERSONAL_GPS",
};

//当下保险状态  正常:VALIDATE, 脱保:INVALIDATE
exports.CURRENT_STATUS = {
    VALIDATE: "VALIDATE",
    INVALIDATE: "INVALIDATE"
}

//审核状态  审核中：PROCESSING，审核通过:APPROVE，审核失败:FAIL
exports.APPROVAL_STATUS = {
    PROCESSING: "PROCESSING",
    APPROVE: "APPROVE",
    FAIL: "FAIL"
}

//理赔状态  理赔款已到账：COMPLETE，未到账：INCOMPLETE
exports.CLAIM_STATUS = {
    COMPLETE: "COMPLETE",
    INCOMPLETE: "INCOMPLETE"
}

//维修方式  保险理赔：INSURE，自主维修：SELF
exports.REPAIR_TYPE = {
    INSURE: "INSURE",
    SELF: "SELF"
}

//维修状态  维修中：PROCESSING，维修结束：END
exports.REPAIR_STATUS = {
    PROCESSING: "PROCESSING",
    END: "END"
}

//判断是否保存数据的距离
exports.LIMIT_CONDITIONS = {
    /**小于该距离的点不保存 */
    DISTANCE_SMALLEST: 10000,
    /**小于该距离，大于DISTANCE_SMALLEST的点，不插入到location中，但device.last_gps_point要跟新. */
    DISTANCE_MIDDLE: 100000,
    /**(分钟)只有时间间隔小于该值的点才保存 */
    MAX_TIME: 15
}
