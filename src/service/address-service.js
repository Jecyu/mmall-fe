/**
 * @Author: jeCyu
 * @Date: 2017-10-17 5:25:03 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-18 9:24:08 pm 
 */

'use strict'

var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList: function(resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/shipping/list.do'),
            data   : {
                pageSize: 50
            },
            method : 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error  : reject           // 失败后后端返回的提示信息
        }); 
    }, 
    // 新建收件人地址
    save: function(addressInfo, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/shipping/add.do'),
            data   : addressInfo,
            method : 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error  : reject           // 失败后后端返回的提示信息
        }); 
    },
    // 更新收件人
    update: function(addressInfo, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/shipping/update.do'),
            data   : addressInfo,
            method : 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error  : reject           // 失败后后端返回的提示信息
        }); 
    },
    // 删除收件人
    deleteAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url          : _mm.getServerUrl('/shipping/del.do'),
            data         : {
                shippingId: shippingId
            }, 
            method       : 'GET',
            success      : resolve,       // 成功后后端返回的提示信息数据
            error        : reject           // 失败后后端返回的提示信息
        });
    },
    // 获取单条收件人信息
    getAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/shipping/select.do'),
            data   : {
                shippingId: shippingId
            },
            method : 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error  : reject           // 失败后后端返回的提示信息
        }); 
    } 
}

module.exports = _address;