import store from '@/store'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import * as api from '@/api/biforst'
import CaseDetail from '@/store/entities/case-detail'

@Module({ dynamic: true, store, name: "biforst", namespaced: true })
class biforstStore extends VuexModule {
    list: Array<CaseDetail> = new Array<CaseDetail>();

    @Mutation
    public SET_CASEDETAILLIST(result: any) {
        this.list = result.data;
    }

    @Mutation
    public SET_CASEDETAILLIST_EMPTY() {
        this.list = [];
    }

    @Action
    public async caseResult(params: any) {
        let result = await api.caseResult(params);
        return result.data;
    }

    @Action({ commit: "SET_CASEDETAILLIST" })
    public async caseResultDetail(params: any) {
        let result = await api.caseResultDetail(params);
        return result.data;
    }
}

export default getModule(biforstStore);