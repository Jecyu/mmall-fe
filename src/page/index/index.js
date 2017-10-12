/**
 * @Author: jeCyu
 * @Date: 2017-10-05 11:42:16 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-12 6:16:18 pm 
 */

// 使用$$防止和全局变量发生冲突
// var $$ = require('jquery');
// $$('body').html('HELLO INDEX');

'use strict';
// require('./index.css');
// require('../module.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

navSide.init({
    name: 'order-list'
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