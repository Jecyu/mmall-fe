/**
 * @Author: jeCyu
 * @Date: 2017-10-17 4:05:00 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-18 9:48:42 pm 
 */

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal    = require('./address-modal.js');


var page = {
    data: {
        // 当前选中的地址
        selectAddressId: null
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function() {
        // 缓存page对象
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');  
            _this.data.selectAddressId = $(this).data('id');
        });

        // 订单的提交
        $(document).on('click', '.order-submit', function() {
            var shippingId = _this.data.selectAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });    
            }   
            else {
                _mm.errorTips('请选择地址后再提交');
            }
        });
        // 地址的添加
        $(document).on('click', '.address-add', function() {
            addressModal.show({
                isUpdate: false,
                // 展示成功回调函数
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
    
        // 地址的编辑
        $(document).on('click', '.address-update', function(e) {
            // 阻止事件冒泡，清除编辑造成选中的问题
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    // 展示成功回调函数
                    onSuccess: function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });

        // 地址的删除
        $(document).on('click', '.address-delete', function(e) {
            // 阻止事件冒泡，清除编辑造成选中的问题
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址吗？')) {
                _address.deleteAddress(shippingId, function(res) {
                       _this.loadAddressList();
                    }, function(errMsg) {
                        _mm.errorTips(errMsg);
                });
            }
        }); 
    },
    // 加载地址列表
    loadAddressList: function () {
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');        
        // 获取地址列表
        _address.getAddressList(function(res) {
            // 过滤函数主要用来应对点击删除/编辑时，改变了别的地址选中状态 
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');            
        });  
    },
    // 处理地址列表中选中状态
    addressFilter: function(data) {
        if (this.data.selectAddressId) {
            var selectAddressIdFlag = false;
            for (var i = 0, len = data.list.length; i < len; i++) {
                if (data.list[i] === this.data.selectAddressId) {
                    data.list[i].isActive = true;
                    selectAddressIdFlag   = true;
                }
            }
            // 如果以前选中的地址不在列表里，将其删除
            if (!selectAddressIdFlag) {
                this.data.selectAddressId = null;
            }
        }
    },
   // 加载商品列表
   loadProductList: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取商品列表
        _order.getProductList(function(res) {
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');            
        });  
    
    }
};

$(function() {
    page.init();
});