/**
 * @Author: jeCyu
 * @Date: 2017-10-12 6:26:07 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-13 5:53:18 pm 
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default'; 
    var $element = $('.' + type + '-success');  
    // 显示对应的提示元素
    $element.show();
});