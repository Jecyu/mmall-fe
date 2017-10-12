/**
 * @Author: jeCyu
 * @Date: 2017-10-12 9:22:27 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-12 9:53:23 am 
 */

 'use strict'

var _mm =require('util/mm.js');

var _user = {
    // 检查登录状态(通过是否能够取到用户信息来判断登录状态)
    checkLogin: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        }); 
    }, 
    // 登出
    logout: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        }); 
    } 
}

module.exports = _user;