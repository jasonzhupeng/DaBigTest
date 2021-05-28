<template>
  <div class="home">
    <Row :gutter="30">
      <Col span="20">
        <Input clearable prefix="ios-search" v-model="searckKey" placeholder="根据报告名称模糊搜索报告(例：biforst-mgmt)" />
      </Col>
      <Col span="4">
        <Button type="primary" @click="queryData">查 询</Button>
      </Col>
    </Row>
    <br />
    <div style="position: relative;">
      <Spin size="large" fix v-if="showLoad"></Spin>
      <Row>
        <Col span="12">
          <strong>主键：</strong>
          <span>{{info.resultId}}</span>
        </Col>
        <Col span="12">
          <strong>报告名称：</strong>
          <span>{{info.reportName}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <strong>创建日期：</strong>
          <span>{{info.createTime|datetimeFormatter("yyyy-MM-dd hh:mm")}}</span>
        </Col>
        <Col span="12">
          <strong>接口用例数：</strong>
          <span>{{info.caseCount}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <strong>用例运行成功数：</strong>
          <span>{{info.sucess}}</span>
        </Col>
        <Col span="12">
          <strong>用例失败数：</strong>
          <span>{{info.fail}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <strong>用例调过数：</strong>
          <span>{{info.skip}}</span>
        </Col>
        <Col span="12">
          <strong>测试集总运行时间：</strong>
          <span>{{info.runtime}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <a href="#" @click="seeDetail">查看详情</a>
        </Col>
      </Row>
    </div>
  </div>
</template>

<style scoped>
.ivu-row {
  line-height: 40px;
}
.modal-spin-icon-load {
  animation: ani-modal-spin 1s linear infinite;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BiforstModule from '@/store/modules/biforst'
import CaseResult from '@/store/entities/case-result'

@Component
export default class Home extends Vue {
  searckKey: string = "biforst-mgmt";
  info: CaseResult = new CaseResult();
  showLoad: boolean = false;

  seeDetail() {
    if (!this.searckKey) {
      this.$Message.warning("请输入报告名称");
      return;
    }

    this.$router.push({
      path: "/detail", query: {
        sKey: this.searckKey
      }
    });
  }

  async mounted() {
    if (this.$route.query.key) {
      this.searckKey = this.$route.query.key.toString();
    }
  }

  async queryData() {
    this.showLoad = true;

    await BiforstModule.caseResult({ reportName: this.searckKey }).then(res => {
      if (!!res.data)
        this.info = res.data;
      else
        this.info = new CaseResult();
    }).finally(() => {
      setTimeout(() => {
        this.showLoad = false;
      }, 1000);
    })
  }

}
</script>