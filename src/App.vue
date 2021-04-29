<template>
  <div class="layout">
    <Layout>
      <Header class="custom_header">
        <h1 style="color:white;">
          <i>Da Big - API test results viewing platform</i>
        </h1>
      </Header>
      <Layout>
        <Sider hide-trigger :collapsible="true" v-model="isCollapsed" :style="{background: '#fff'}">
          <Menu :active-name="$route.name" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>Item 1
              </template>
              <MenuItem name="Home" to="/">查看汇总</MenuItem>
              <MenuItem name="Detail" to="/detail">查看明细</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <router-view />
        </Content>
      </Layout>
      <Footer class="layout-footer-center">
        &copy; By jason Zhu All Rights Reserved
        <br />
        <Icon size="20" type="logo-github" />&nbsp;
        <a href="https://github.com/jasonzhupeng">https://github.com/jasonzhupeng</a>
      </Footer>
    </Layout>
  </div>
</template>

<style scoped>
.custom_header {
  background: #2d8cf0;
  z-index: 9;
}
.layout-footer-center {
  text-align: center;
}
a:hover {
  text-decoration: underline;
}
/* .layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
} */
</style>

<script lang="ts">
import Vue from 'vue'
export default class extends Vue {
  isCollapsed: boolean = false;
}
</script>

