/**
 * @Author: jeCyu
 * @Date: 2017-10-05 11:42:16 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-15 11:33:01 am 
 */

// 使用$$防止和全局变量发生冲突
// var $$ = require('jquery');
// $$('body').html('HELLO INDEX');

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');

// 初始化unslider
$(function() {
    // 渲染 banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化Banner，并存储它的JQuery以便重写unslider的data属性
    var $slide = $('.banner').unslider({
        dots: true,               //  Display dot navigation
    });

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(e) {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        // 需要使用前面初始化时的jQuery对象
        $slide.data('unslider')[forward]();
    });
});

// _mm.request({
//     url: '/product/list.do?keyword=1',
//     success: function(res) {
//         console.log(res);
//     },
//     error: function(errMsg) {
//         console.log(errMsg);
//     }
// })

// console.log(_mm.getUrlParam('test'));
// var html = '<div>{{data}}</div>'
// var data = {
//     data: 123
// }
// console.log(_mm.renderHtml(html, data));