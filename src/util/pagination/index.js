/**
 * @Author: jeCyu
 * @Date: 2017-10-15 7:17:27 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-16 10:49:19 am 
 */

'use strict'

require('./index.css');
var _mm = require('util/mm.js')
var templatePagination = require('./index.string');

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container    : null,
        // 当前页码
        pageNum      : 1,
        // 当前页码左右区间显示的范围，|上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9 5左2 3 4 右 6 7 8
        pageRange    : 3,
        // 回调函数
        onSelectPage : null
    };
    // 事件代理（事件监听）
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 判断是否能够点击,对active和disable按钮点击，不做处理        
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ?  _this.option.onSelectPage($this.data('value')) : null;
    });
};

// 渲染分页组件
Pagination.prototype.render = function(userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jQuery对象,如果不是jq对象，调用jq方法的话会报错，做了个容错处理
    // ! 优先级 > instanceof
    if(!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断是否只有一页
    if(!(this.option.pages >= 1)) {
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9
Pagination.prototype.getPaginationHtml = function() {
    var html      = '';
    var option    = this.option; 
    // pageArray用于存储页码的显示
    var pageArray = [];
    // 开始显示的值，如2
    var start     = option.pageNum - option.pageRange > 0 
        ? option.pageNum - option.pageRange : 1;
    // 结束显示的值，如8 
    var end       = option.pageNum + option.pageRange < option.pages
        ? option.pageNum + option.pageRange : option.pages;

    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    // 数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum),
        });
    }
    // 下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum   : option.pageNum,
        pages     : option.pages
    });
    return html;
};

module.exports = Pagination;