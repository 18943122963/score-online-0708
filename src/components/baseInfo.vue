<template>
  <div class="home">
    <a-card title="基本信息">
      <div v-for="(item, index) in formData" :key="index" class="infoDiv">
        <label>{{ item.nameCn }}：</label>
        <a-input
          v-if="item.type === 'input'"
          :placeholder="'请填写' + item.nameCn"
          v-model="baseInfo[item.nameEn].value"
          @blur="save()"
        ></a-input>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from "moment"; //日期选择器
import "moment/locale/zh-cn"; //中文
const formData = [
  {
    nameCn: "姓名",
    nameEn: "name",
    type: "input"
  },
  {
    nameCn: "职位",
    nameEn: "position",
    type: "input"
  },
  {
    nameCn: "直接上级",
    nameEn: "boss",
    type: "input"
  },
  {
    nameCn: "考核周期",
    nameEn: "time",
    type: "input"
  }
];
export default {
  name: "baseInfo",
  data() {
    return {
      formData,
      baseInfo: undefined //主要数据
    };
  },
  methods: {
    moment,
    //下拉框搜索过滤
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //保存至vuex
    save() {
      this.$store.commit("baseInfo", this.baseInfo);
    }
  },
  created() {
    //初始化baseinfo，有记录值读取记录值，没有则建立空值
    this.baseInfo = {};
    for (let item of formData) {
      if (localStorage.getItem(item.nameEn)) {
        this.baseInfo[item.nameEn] = {
          nameEn: item.nameEn,
          nameCn: item.nameCn,
          value: localStorage.getItem(item.nameEn)
        };
      } else {
        this.baseInfo[item.nameEn] = {
          nameEn: item.nameEn,
          nameCn: item.nameCn,
          value: undefined
        };
      }
    }
    //设置上个月份
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    if (month === 0) {
      year--;
      month = 12;
    }
    this.baseInfo["time"].value =
      year + "-" + (month > 10 ? month : "0" + month);
  }
};
</script>
<style scoped>
.ant-input,
.ant-select,
.ant-calendar-picker {
  width: 10rem;
  margin: 0.3rem 0;
}
.infoDiv {
  display: inline-block;
  margin: 0 2rem;
}
</style>
