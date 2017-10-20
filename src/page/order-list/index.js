/**
 * @Author: jeCyu
 * @Date: 2017-10-18 9:53:21 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-18 11:39:49 pm 
 */

'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _order        = require('service/order-service.js');
var Pagination    = require('util/pagination/index.js');
var templateIndex = require('./index.string');

// page逻辑
var page = {
    data: {
        listParam: {
            pageNum : 1,
            pageSize: 10
        }
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'    
        });
    },
    // 加载订单列表
    loadOrderList: function() {
        var _this         = this;
        var orderListHtml = '';
        var $listCon      = $('.order-list-con');
        $('.order-list-con').html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res) {
     
            // 渲染Html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);   

            // 渲染分页
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
            
        }, function(errMsg) {
            $listCon('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
   
     // 加载分页信息 pageInfo传入一个对象
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());    
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            // 回调函数
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function() {
    page.init();
});