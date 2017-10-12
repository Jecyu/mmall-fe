/**
 * @Author: jeCyu
 * @Date: 2017-10-12 9:58:21 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-12 10:06:30 am 
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
     } 
 }
 
 module.exports = _cart;