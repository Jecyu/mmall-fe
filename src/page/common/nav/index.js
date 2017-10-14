/**
 * @Author: jeCyu
 * @Date: 2017-10-11 11:59:11 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-13 10:15:16 pm 
 */

 'use strict'
 require('./index.css');

 var _mm = require('util/mm.js');
 var _user = require('service/user-service.js');
 var _cart = require('service/cart-service.js');
 // 导航
 var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount(); 
        return this; 
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function() {
            _mm.doLogin();
        });
        // 注册点击事件
        $('js-register').click(function() {
            console.log('test');            
            window.location.href = './user-register.html';
        });


        // TODO 注册点击事件无效，为什么？登录却有效

        // 退出点击事件（需要请求后端删除登录状态）
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                // 成功 
                window.location.reload();           
            }, function(errMsg) {
                // 
                _mm.errTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg) {
            // do nothing 
        });

    },  
    // 加载购物车数量
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });
    }

 };

 module.exports = nav.init();