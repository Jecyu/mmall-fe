/**
 * @Author: jeCyu
 * @Date: 2017-10-15 12:00:04 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-16 4:31:13 pm 
 */

'use strict'

var _mm = require('util/mm.js');

var _product = {
    // 获取product列表
    getProductList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,       // 发送到服务器的数据
            method: 'GET',
            success: resolve,       // 成功后后端返回的提示信息数据
            error: reject           // 失败后后端返回的提示信息
        }); 
    }, 
    // 获取商品详细信息
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    }
   
}

module.exports = _product;