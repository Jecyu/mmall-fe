/**
 * @Author: jeCyu
 * @Date: 2017-10-15 11:49:25 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-16 10:47:01 am 
 */

'use strict';

require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm           = require('util/mm.js');
var _product      = require('service/product-service.js');
var Pagination    = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword     : _mm.getUrlParam('keyword')    || '',
            categoryId  : _mm.getUrlParam('categoryId') || '',
            orderBy     : _mm.getUrlParam('orderBy')    || 'default',
            // 当前页码
            pageNum     : _mm.getUrlParam('pageNum')    || 1,
            // 每页能够显示的商品数量
            pageSize    : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        this.loadList();
    },
    bindEvent: function() {
        // 缓存page对象
        var _this = this;
        // 排序点击事件
        $('.sort-item').click(function(e) {
            var $this = $(this);
            _this.data.pageNum = 1;
            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 如果已经是active样式
                if ($this.hasClass('active')) {
                    return;
                }
                // 其他
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击按价格排序
            else if ($this.data('type') === 'price') {
                // active class的处理  
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                // 降序处理
                if(!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
                // 升序处理
                else {
                    $this.addClass('desc').removeClass('asc');                    
                    _this.data.listParam.orderBy = 'price_desc';                    
                }
            }
            // 重新加载列表
            _this.loadList();
        })
    },
    // 加载list数据
    loadList: function loadList() {
        var _this     = this;
        var listHtml  = '';
        // 把listParam缓存起来
        var listParam = this.data.listParam;
        var pListCon  =  $('.p-list-con')

        pListCon.html('<div class="loading"></div>');                    
        // 删除参数中不必要的字段
        //  (delete listParam.keyword)加括号放在delete造成的优先级问题
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // listParam可以传送keyword,categoryId,分页信息，分页容量等等
        // 请求接口
        _product.getProductList(listParam, function(res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
                
            pListCon.html(listHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg) {
            _mm.errorTips(errMsg);
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
                _this.loadList();
            }
        }));
    }
}

$(function() {
    page.init();
});