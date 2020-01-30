var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');   // https://www.npmjs.com/package/config

class responseHelper {
    static createResponse(code, data, msg) {
        return {
            code: code,
            data: data,
            message: msg
        }
    }

    static Success(data = null) {
        return {
            code: 200,
            data: data,
            message: 'Success'
        }
    }

    static Error(msg = null) {
        return {
            code: 400,
            data: null,
            message: msg === null ? 'Error. Please try again later!' : msg
        }
    }
    /*token错误 */
    static TokenError(msg = null) {
        return {
            code: 456,
            data: null,
            message: msg === null ? '请登录后操作' : msg
        }
    }
    /*参数错误 */
    static ParameterError(msg = null) {
        return {
            code: 457,
            data: null,
            message: msg === null ? '请确认所传参数是否正确' : msg
        }
    }

    /**根据id生成token */
    static createToken(id) {
        if (id) {
            const payload = {
                //admin: _user.admin // TODO add roles
                admin: true,
                id: id//用户id
              };
              var token = jwt.sign(payload, config.get('JWT_SECRET'), {
                expiresIn: 60*60*24*7 // expires in 1 week
              });
              return token; 
        }else{
            return null;
        }
    }
    
    /**检查header中的token，并返回解析出的id */
    static check(headers) {
        if (headers && headers.token){
            try{
                let info = jwt.verify(headers.token,config.get('JWT_SECRET'));
                return info != null ? this.Success(info.id) : this.TokenError();
            }catch(err) {
                return this.TokenError('登录已过期');
            }
        }else{
            return this.TokenError();
        }
    }
}

module.exports = responseHelper;