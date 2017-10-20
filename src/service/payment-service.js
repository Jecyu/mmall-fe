/**
 * @Author: jeCyu
 * @Date: 2017-10-19 10:32:13 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-19 10:45:00 am 
 */
/**
 * @Author: jeCyu
 * @Date: 2017-10-17 4:14:47 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-19 9:35:50 am 
 */


'use strict'

var _mm = require('util/mm.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo: function(orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            method: 'GET',
            data: {
                orderNo: orderNumber
            },
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    }, 
    // 获取订单支付状态
    getPaymentStatus: function(orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            method: 'GET',
            data: {
                orderNo: orderNumber
            },
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    }

}

module.exports = _payment;