<template>
  <Modal lock-scroll :value="showModal" title="查看" width="80%" @on-ok="close" @on-cancel="close" @on-visible-change="open">
    <Row>
      <Col span="2">
        <strong>请求头：</strong>
      </Col>
      <Col span="22">
        <prism-editor
          class="my-editor height-300"
          v-model="info.requestHeaders"
          :highlight="highlighter"
          :line-numbers="lineNumbers"
          :readonly="true"
        ></prism-editor>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="2">
        <strong>请求体：</strong>
      </Col>
      <Col span="22">
        <prism-editor
          class="my-editor height-300"
          v-model="info.requestBody"
          :highlight="highlighter"
          :line-numbers="lineNumbers"
          :readonly="true"
        ></prism-editor>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="2">
        <strong>响应头：</strong>
      </Col>
      <Col span="22">
        <prism-editor
          class="my-editor height-300"
          v-model="info.responseHeaders"
          :highlight="highlighter"
          :line-numbers="lineNumbers"
          :readonly="true"
        ></prism-editor>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="2">
        <strong>响应体：</strong>
      </Col>
      <Col span="22">
        <prism-editor
          class="my-editor height-300"
          v-model="info.responseBody"
          :highlight="highlighter"
          :line-numbers="lineNumbers"
          :readonly="true"
        ></prism-editor>
      </Col>
    </Row>
  </Modal>
</template>

<style>
/* required class */
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional */
.prism-editor__textarea:focus {
  outline: none;
}

/* not required: */
.height-300 {
  height: auto;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from 'prismjs/components/prism-core';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

import CaseDetail from '@/store/entities/case-detail'
import BiforstModule from '@/store/modules/biforst'

@Component({ components: { PrismEditor } })
export default class SeeView extends Vue {
  @Prop({ required: true, type: Boolean }) showModal: boolean = false;
  @Prop({ required: true, type: Number }) id: number = 0;

  lineNumbers: boolean = true;
  info: CaseDetail = new CaseDetail();

  highlighter(code: any) {
    return highlight(code, languages.js); //returns html
  }

  close() {
    this.$emit("update:showModal", false);
  }

  get list() {
    return BiforstModule.list;
  }

  open(val: any) {
    if (val) {
      this.info = this.list.find(x => x.id == this.id) as CaseDetail;
    }
  }

}
</script>