/**
 * @Author: jeCyu
 * @Date: 2017-10-12 9:58:21 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-16 6:26:06 pm 
 */

 'user strict'
 var _mm =require('util/mm.js');
 
 var _cart = {
 
     // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _mm.request({
             url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
             method: 'GET',
             success: resolve,
             error: reject
        }); 
    }, 

    // 添加到购物车 
    addToCart: function(productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            method: 'GET',
            data: productInfo,
            success: resolve,
            error: reject
        }); 
    } 
 }
 
 module.exports = _cart;