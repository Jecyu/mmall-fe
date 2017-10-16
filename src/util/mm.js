/**
 * @Author: jeCyu
 * @Date: 2017-10-09 8:57:41 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-16 4:47:31 pm 
 */

'use strict';
var Hogan = require('hogan.js');
var conf = {
    // 因为接口地址和当前的静态文件地址是一样的，所以直接用空
    serverHost: ''
};
var _mm = {
    // param可以是对象、函数
    // 网络请求
    request: function(param) {
        // 获取_mm对象，以给$.ajax调用
        var _this = this; 
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // 请求成功        
                if (0 === res.status) {
                    // 利用&&断点特性作为条件判断，左边为true才执行右边的代码
                    typeof param.success === 'function' && param.success(res.data, res.msg);    
                }
                // 没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();        
                }
            　　// 请求数据错误
            　　else if(1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg); 
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);  
            }
        });
    },
    // 获取服务器地址
    // 这里把path作为一个方法，为了更改serverHost和添加一些参数更加方便
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    // 获取URL参数  
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null; 
    },
    // 渲染html模版
    // 参数data必须为一个对象
    renderHtml: function(htmlTemplate, data) {
        // 编译
        var template = Hogan.compile(htmlTemplate, data),
            // 渲染
            result = template.render(data);
        return result;    
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips: function(msg) {
        alert(msg || '哪里不对了～');
    },
    // 字段的验证，支持非空、手机号、邮箱的判断
    validate: function(value, type) {
        // trim可以转换非字符串为字符串，及去除字符串的前后空格
        var value = $.trim(value);    
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
        }
    },
    // 统一登录处理，跳到登录页,登录成功后回到先前的页面
    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);                     
    },
    goHome: function() {
        window.location.href = './index.html';
    }         
};

module.exports = _mm;
