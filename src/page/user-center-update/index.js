/**
 * @Author: jeCyu
 * @Date: 2017-10-14 9:37:31 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-15 11:54:02 am 
 */

'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

// page逻辑
var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'    
        });
        // 加载用户信息
        this.loadUserInfo();  
    },
    bindEvent: function() {
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function() {

            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            };

            var validateResult = _this.validateForm(userInfo);
            console.log(validateResult);            
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function(res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            console.log(res);
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });        
    },
    // 验证字段信息
    validateForm: function(formData) {
 
        var result = {
            status: false,
            msg: ''
        };
      
        // 验证手机
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        
        // 验证邮箱格式
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }

        // 验证密码提示问题是否为空
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }

        // 验证密码提示问题答案是否为空
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }

        // 通过验证，返回正确
        result.status = true;
        result.msg = '验证通过';
        return result;
    }    
   
};

$(function() {
    page.init();
});