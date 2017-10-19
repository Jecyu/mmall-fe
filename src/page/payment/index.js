/**
 * @Author: jeCyu
 * @Date: 2017-10-19 10:12:50 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-19 10:44:17 am 
 */

'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm           = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templateIndex = require('./index.string');

// page逻辑
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadPaymentInfo();
    },
   
    // 加载订单详情
    loadPaymentInfo: function() {
        var _this       = this;
        var paymentHtml = '';
        var $pageWrap   = $('.page-wrap');
        $('.order-list-con').html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res) {
            // 渲染Html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml); 
            
            // 监听订单状态
            _this.listenOrderStatus();
            
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },

    // 监听订单状态
    listenOrderStatus: function() {
        var _this         = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber, function(res) {
                if (res == true) {
                    window.location.href 
                        = './result.html?type=payment&&orderNumber=' + _this.data.orderNumber;
                }
            }, function(errMsg) {

            })
        }, 5e3) 
    }
   
};

$(function() {
    page.init();
});