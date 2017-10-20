/**
 * @Author: jeCyu
 * @Date: 2017-10-12 9:58:21 am 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-17 10:34:43 pm 
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
            url    : _mm.getServerUrl('/cart/add.do'),
            method : 'GET',
            data   : productInfo,
            success: resolve,
            error  : reject
        }); 
    },

    // 获取购物车列表
    getCartList: function(resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/list.do'),
            method : 'GET',
            success: resolve,
            error  : reject
        }); 
    },
    // 选择购物车商品
    selectProduct:  function(productId, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/select.do'),
            data   : {
                productId: productId
            },
            method : 'GET',
            success: resolve,
            error  : reject
        })
    },
    // 取消选择购物车商品
    unselectProduct:  function(productId, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/un_select.do'),
            data   : {
                productId: productId
            },
            method : 'GET',
            success: resolve,
            error  : reject
        })
    }, 
    // 选中全部购物车商品
    selectAllProduct:  function(resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/select_all.do'),
            method : 'GET',
            success: resolve,
            error  : reject
        })
    }, 
    // 取消选中全部购物车商品
    unselectAllProduct:  function(resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/un_select_all.do'),
            method : 'GET',
            success: resolve,
            error  : reject
        })
    },
    // 更新购物车商品数量
    updateProduct: function(productInfo, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/update.do'),
            data   : productInfo,
            method : 'GET',
            success: resolve,
            error  : reject
        })
    },
    // 删除指定商品
    deleteCartProduct: function(productIds, resolve, reject) {
        _mm.request({
            url    : _mm.getServerUrl('/cart/delete_product.do'),
            data   : {
                productIds: productIds
            },
            method : 'GET',
            success: resolve,
            error  : reject
        })
    }   
}

module.exports = _cart;