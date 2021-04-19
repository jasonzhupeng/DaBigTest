<template>
  <div>
    <Row :gutter="30">
      <Col span="20">
        <Input clearable prefix="ios-search" v-model="searckKey" placeholder="根据报告名称模糊搜索报告详情(例：biforst-mgmt)" />
      </Col>
      <Col span="4">
        <Button type="primary" @click="queryData">查 询</Button>
      </Col>
    </Row>
    <br />
    <Table :columns="columns1" :data="list" :loading="showLoad">
      <template slot-scope="{ row }" slot="createTime">{{row.createTime|datetimeFormatter("yyyy-MM-dd hh:mm")}}</template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="seeView(row)">View</Button>
      </template>
    </Table>
    <see-view :showModal.sync="showModal" :id="caseId"></see-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BiforstModule from '@/store/modules/biforst'
import SeeView from '@/views/SeeView.vue'

@Component({ components: { SeeView } })
export default class Detail extends Vue {
  showModal: boolean = false;
  showLoad: boolean = false;

  caseId: number = 0;
  searckKey: string = "biforst-mgmt";

  get list() {
    return BiforstModule.list;
  }

  seeView(row: any) {
    this.showModal = true;
    this.caseId = row.id;
  }

  async queryData() {
    if (!this.searckKey) {
      this.$Message.warning("请输入报告名称");
      return;
    }

    this.showLoad = true;

    await BiforstModule.caseResultDetail({ reportName: this.searckKey }).catch(() => {
      BiforstModule.SET_CASEDETAILLIST_EMPTY();
    }).finally(() => {
      setTimeout(() => {
        this.showLoad = false;
      }, 1500);
    })
  }

  async mounted() {
    let sKey = this.$route.query.sKey as string;
    if (!!sKey) {
      this.searckKey = sKey;
      await this.queryData();
    }
  }

  columns1 = [{
    title: 'Id',
    key: 'id',
    width: 100
  },
  {
    title: '主键',
    key: 'resultId',
    width: 100
  },
  {
    title: '用例编号',
    key: 'caseId',
    width: 100
  },
  {
    title: '用例名称',
    key: 'caseName',
    width: 400
  },
  {
    title: '接口地址',
    key: 'requestUrl',
    tooltip: true
  },
  {
    title: '测试结果',
    key: 'passFlag'
  },
  {
    title: '运行时间',
    slot: 'createTime',
    width: 150
  },
  {
    title: '操作',
    slot: "action",
    width: 100
  }]
}
</script>