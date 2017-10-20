/**
 * @Author: jeCyu
 * @Date: 2017-10-17 11:48:57 pm 
 * @Modified By: jeCyu 
 * @Last Modified time: 2017-10-18 9:12:26 pm 
 */

'use strict';

var _mm                  = require('util/mm.js');
var _cities              = require('util/cities/index.js');
var _address             = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');


var addressModal = {
    show: function(option) {
        // option的绑定
        this.option     = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this;
        // 省份和城市的二级联动
        _this.$modalWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();            
            _this.loadCities(selectedProvince);
        });

        // 提交收货地址
        _this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo();
            var isUpdate     = _this.option.isUpdate;
            // 使用新地址，且验证通过
            if(!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    // 执行回调函数
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 更新地址，并且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function(res) {
                    _mm.successTips('地址更新成功');
                    _this.hide();
                    // 执行回调函数
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~')
            }
        });
        // 保证modal内容区时不关闭弹窗（事件冒泡导致）
        _this.$modalWrap.find('.modal-container').click(function(e) {
            e.stopPropagation();
        });
        // 点击叉号或蒙板区域，关闭弹窗
        _this.$modalWrap.find('.close').click(function() {
            _this.hide();
        });

    },
    loadModal: function() {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data    : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
     
    },
    // 加载省份
    loadProvince: function() {
        var provinces        = _cities.getProvince() || [];
        var $provinceSelect  = this.$modalWrap.find('#receiver-province');    
        $provinceSelect.html(this.getSelectOption(provinces));   
        // 如果是更新地址，并且有省份信息，则做省份的回填
        if(this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    // 加载城市
    loadCities: function(provinceName) {
        var cities           = _cities.getCities(provinceName) || [];
        var $citySelect      = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities)); 
        // 如果是更新地址，并且有城市信息，则做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }        
    },
    // 关闭弹窗
    hide: function() {
        this.$modalWrap.empty();
    },
    getReceiverInfo: function(optionArray) {
    
    },
    // 获取表单里收件人信息，并做表单的验证
    getReceiverInfo: function() {
        var receiverInfo  = {};
        var result        = {
            status: false,
        };
        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity     = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());
        console.log (receiverInfo);

        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();   
        }

        // 表单验证
        if(!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }
 
        else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        }

        else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        }

        else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请选择收件人详细地址';
        }
        else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        }
        // 所有验证均通过
        else {
            result.status = true;
            result.data   = receiverInfo;
        }
        return result;
    },
    
    // 获取select框的选项，输入:array，输出:HTML
    getSelectOption: function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, len = optionArray.length; i < len; i++) {
            html += '<option value="' + optionArray[i] + '" >' + optionArray[i] +'</option>';
        }
        return html;
    }

};

module.exports = addressModal;