export default class CaseDetail {
    id!: number;
    caseId!: number;
    requestUrl: string = "";
    requestHeaders: string = "";
    requestBody: string = "";
    responseHeaders: string = "";
    responseBody: string = "";
    passFlag: string = "";
    caseName: string = "";
    createTime: string = "";
    resultId!: number;
}