/**
 * @Author: jeCyu
 * @Date: 2017-10-17 4:14:47 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-19 9:35:50 am 
 */


'use strict'

var _mm = require('util/mm.js');

var _order = {
    // 获取product列表
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    }, 
    // 提交订单
    createOrder: function(orderInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    },
    // 获取订单列表
    getOrderList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    },
    // 获取订单详情
    getOrderDetail:  function(orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    },
    // 取消订单
    cancelOrder: function(orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    }
}

module.exports = _order;