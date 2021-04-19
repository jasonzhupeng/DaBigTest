import ajax from '@/util/ajax'

/** 查询测试报告集*/
export const caseResult = (params: any) => ajax({
    url: "quanwai/report/caseResult",
    method: "get",
    params
});

/** 测试报告详情*/
export const caseResultDetail = (params: any) => ajax({
    url: "quanwai/report/caseResultDetail",
    method: "get",
    params
});