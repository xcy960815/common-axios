
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('qs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios', 'qs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.commonAxios = {}, global.axios, global.qs));
}(this, (function (exports, axios, qs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
    var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * 创建axios实例
     * @param config
     */
    var createAxiosInstance = function (config) {
        return axios__default['default'].create(__assign(__assign({}, config), { withCredentials: config && config.withCredentials !== undefined
                ? config.withCredentials
                : true }));
    };
    /**
     * 调用参数为params的axios请求
     * @param axiosInstance
     * @param method
     * @returns
     */
    var createParamHelper = function (axiosInstance, method) {
        return function (url, params, config) {
            return axiosInstance[method](url, __assign({ params: params }, config))
                .then(function (res) {
                console.log('调用参数为params的axios请求', res);
                return res;
            })
                .catch(function (error) {
                return error;
            });
        };
    };
    /**
     *
     * @param axiosInstance axios 实例
     * @param method 请求方法
     * @returns
     */
    var createDataHelper = function (axiosInstance, method) {
        return function (url, data, config) {
            return axiosInstance[method](url, __assign({ data: data }, config))
                .then(function (response) { return response; })
                .catch(function (error) { return error; });
        };
    };
    /**
     * 请求前的配置
     * @param config
     * @returns config
     */
    var axiosRequestCallback = function (config) {
        // 如果需要遮罩层 那就创建遮罩层节点
        // if (needLoading) createLoadingNode(loadingText)
        var axiosDebounce = config.axiosDebounce;
        // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
        if (axiosDebounce) {
            handleRemoveResponseLog(config); // 在请求开始前，对之前的请求做检查取消操作
            handleAddResponseLog(config); // 将当前请求添加到 pending 中
        }
        return config;
    };
    /**
     *
     * @param axiosResponse 请求返回的参数
     * @returns
     */
    var axiosResponseCallback = function (axiosResponse) {
        if (axiosResponse.data.code === 200) {
            return Promise.resolve(axiosResponse.data);
        }
        else {
            return Promise.reject(axiosResponse.data.message);
        }
    };
    // 声明一个 Map 用于存储每个请求的标识 和 取消函数
    var logMap = new Map();
    /**
     * 添加请求
     * @param {AxiosRequestConfigs} config
     */
    var handleAddResponseLog = function (config) {
        var key = [
            config.method,
            config.url,
            qs__default['default'].stringify(config.params),
            qs__default['default'].stringify(config.data),
        ].join('&');
        config.cancelToken =
            config.cancelToken ||
                new axios__default['default'].CancelToken(function (cancel) {
                    if (!logMap.has(key)) {
                        // 如果 logMap 中不存在当前请求，则添加进去
                        logMap.set(key, cancel);
                    }
                });
    };
    /**
     * 移除请求
     * @param {AxiosRequestConfigs} config
     */
    var handleRemoveResponseLog = function (config) {
        var key = [
            config.method,
            config.url,
            qs__default['default'].stringify(config.params),
            qs__default['default'].stringify(config.data),
        ].join('&');
        if (logMap.has(key)) {
            // 如果在 logMap 中存在当前请求标识，需要取消当前请求，并且移除
            var cancel = logMap.get(key);
            cancel(key);
            logMap.delete(key);
            config.needLoading = false;
        }
    };

    /**
     * @param AxiosRequestConfigs
     */
    var createAxios = function (initAxiosRequestConfig) {
        /* 创建axios实例 */
        var axiosInstance = createAxiosInstance(initAxiosRequestConfig);
        /** 添加请求拦截器 **/
        axiosInstance.interceptors.request.use(function (config) { return axiosRequestCallback(config); }, function (error) { return Promise.reject(error); });
        /** 添加响应拦截器  **/
        axiosInstance.interceptors.response.use(function (axiosResponse) {
            axiosResponseCallback(axiosResponse);
        }, function (error) {
            if (axios__default['default'].isCancel(error)) ;
            else {
                return Promise.reject(error);
            }
        });
        var axiosHelpers = {
            get: function (url, params, config) {
                return createParamHelper(axiosInstance, 'get')(url, params, config);
            },
            head: function (url, data, config) {
                return createDataHelper(axiosInstance, 'head')(url, data, config);
            },
            post: function (url, data, config) {
                return createDataHelper(axiosInstance, 'post')(url, data, config);
            },
            put: function (url, data, config) {
                return createDataHelper(axiosInstance, 'put')(url, data, config);
            },
            patch: function (url, data, config) {
                return createDataHelper(axiosInstance, 'patch')(url, data, config);
            },
        };
        return axiosHelpers;
    };
    // options: (url, data, config) => {
    //     return axiosInstance
    //         .options(url, { data, ...config })
    //         .then((response) => {
    //             return response.data
    //         })
    //         .catch((error) => {
    //             return error
    //         })
    // },
    // delete: (url, data, config) => {
    //     return axiosInstance
    //         .delete(url, {
    //             data,
    //             ...config,
    //         })
    //         .then((response) => {
    //             return response.data
    //         })
    //         .catch((error) => {
    //             return error
    //         })
    // },

    exports.createAxios = createAxios;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
