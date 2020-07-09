<template>
  <div>
    <baseInfo ref="baseInfo" />
    <finishItem />
    <scoreTable />
    <signFooter @pf="parent" />
  </div>
</template>
<script>
import baseInfo from "../components/baseInfo";
import finishItem from "../components/finishItem";
import scoreTable from "../components/scoreTable";
import signFooter from "../components/signFooter";
export default {
  components: {
    baseInfo,
    finishItem,
    scoreTable,
    signFooter
  },
  methods: {
    parent() {
      // 触发子组件的保存
      this.$refs.baseInfo.save();
    }
  }
};
</script>
<style>
.ant-card {
  width: 95%;
  margin: 2rem auto !important;
  text-align: left;
}
label {
  display: inline-block;
  width: 5rem;
  text-align: left;
}
.ant-table-tbody > tr > td {
  white-space: pre-line;
}
body {
  background: rgb(240, 240, 240) !important;
}
</style>
