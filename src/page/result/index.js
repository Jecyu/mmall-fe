/**
 * @Author: jeCyu
 * @Date: 2017-10-12 6:26:07 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-19 10:55:56 am 
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default'; 
    var $element = $('.' + type + '-success'); 
    // 支付类型的特别处理
    if(type === 'payment') {
        var orderNumber = _mm.getUrlParam('orderNumber');
        var $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    } 
    // 显示对应的提示元素
    $element.show();
});