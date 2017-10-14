/**
 * @Author: jeCyu
 * @Date: 2017-10-13 10:22:22 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-14 9:34:13 am 
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show()
            .find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide()
            .find('.err-msg').text('');        
    }
}

// page逻辑
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;
         // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function() {
            var username = $('#username').val();
            // 用户名存在
            if (username) {
                _user.getQuestion(username, function(res) {
                    // 存取返回的数据
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show('请输入用户名');
            }
        });
         // 输入密码提示问题答案后下一步按钮的点击
        $('#submit-question').click(function() {
            var answer = $('#answer').val();
            // 提示问题答案存在
            if (answer) {
                // 检查密码提示答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer    
                }, function(res) {
                    // 存取返回的数据
                    _this.data.answer = answer;
                    _this.data.token  = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 答案不存在
            else {
                formError.show('请输入密码提示问题的答案');
            }
        });        
        // 输入新密码后下一步按钮的点击
        $('#submit-password').click(function() {
            var password = $('#password').val();
            // 密码不为空
            if (password && password.length >= 6) {
                // 存取新密码
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token 
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset'
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else {
                formError.show('请输入不少于6位的新密码');
            }
        });
        
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e) {
            // keyCode == 13 表示回车键
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },  
    // 加载输入用户名的一步
    loadStepUsername: function() {
        $('.step-username').show();
    },
    // 加载输入用户名的一步
    loadStepQuestion: function() {
        // 清除错误提示
        formError.hide();    
        // 做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);        
    },    
    // 加载输入用户名的一步
    loadStepPassword: function() {
        formError.hide();    
        // 做容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show(); 
    },
};

$(function() {
    page.init();
});