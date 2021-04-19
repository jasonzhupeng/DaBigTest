import Vue from 'vue'
import { datetimeFormat } from './date-util'

/**
 * 将日期时间格式化
 */
Vue.filter('datetimeFormatter', function (date: any, fmt: string = "yyyy-MM-dd") {
    return datetimeFormat(date, fmt)
})