<template>
  <div>
    <a-card title="绩效考核">
      <a-table :columns="firstColumns" :data-source="firstData" bordered :pagination="false">
        <template
          v-for="col in firstColumns.map(item=>item.dataIndex)"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              :value="text"
              @blur="(e) => save(e.target.value, record.key, col,'firstData')"
            />
          </div>
        </template>
      </a-table>
    </a-card>
    <a-card title="非考核项附加分">
      <a-table :columns="secondColumns" :data-source="secondData" bordered :pagination="false">
        <template
          v-for="col in secondColumns.map(item=>item.dataIndex)"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              :value="text"
              @blur="(e) => save(e.target.value, record.key, col,'secondData')"
            />
          </div>
        </template>
      </a-table>
    </a-card>
    <a-card title="本次考评最终得分">
      <div class="score">{{result}}</div>
    </a-card>
  </div>
</template>
<script>
//共有表头
const coColumns = [
  {
    title: "行为表现或工作要求",
    dataIndex: "activity"
  },
  {
    title: "权重",
    dataIndex: "weight",
    align: "center",
    width: "80px"
  },
  {
    title: "考核标准",
    dataIndex: "standard"
  }
];
//第一个表
const firstColumns = [
  {
    title: "KPL绩效指标",
    dataIndex: "kpl"
  },
  ...coColumns,
  {
    title: "自评",
    dataIndex: "scoreByMyself",
    scopedSlots: { customRender: "scoreByMyself" },
    align: "center",
    width: "100px"
  },
  {
    title: "上级评",
    dataIndex: "scoreByBoss",
    scopedSlots: { customRender: "scoreByBoss" },
    align: "center",
    width: "100px"
  },
  {
    title: "得分说明",
    dataIndex: "scoreStandard",
    align: "center"
  }
];
const firstData = [
  {
    kpl: " 1.开发项目 (完成情况8分以上请备注说明）",
    activity:
      "按时、按需求完成功能模块：\n① 按照既定计划进行开发，并按时提交版本\n② 按照产品文档、需求文档和技术方案，完整实现\n③ 完成质量、工作量饱和度（参考jira）",
    weight: 30,
    standard:
      "起评分8分：提前完成加分，逾期减分\n√ 提前1天完成任务：+1分/日（需要提前通知）\n× 逾期截止时间（无特殊原因）：-0.5分/日（自然日，不按工作日计算）\n× 未按照需求或技术方案实现，验收不通过：-2分/次"
  },
  {
    activity:
      "技术落地：\n① 后台（运营、商户的PC端、移动端等）\n② 前台 （C端、大屏等）",
    weight: 10,
    standard: "后台：易用性/稳定性/用户体验\n前台：还原度/兼容度/用户体验"
  },
  {
    activity:
      "线上跟进：\n①及时响应\n② 业务故障/问题（严重）、兼容故障/问题（中等）、文案故障/问题（普通）",
    weight: 10,
    standard:
      "跟踪线上问题（群、电话等）、提出解决方案（文档形式）\n0-1次（中等+普通）：8.0~10分；\n2-3次（严重+中等+普通）：6.0~7.9分；\n4-5次（严重+中等+普通）：4.0~5.9分；\n5次以上（严重+中等+普通）：0~3.9分；\n× 线上严重故障数量及影响，单独扣分：1-5分/项\n× 跟踪、反馈、解决问题不及时，单独扣分：1-5分/项"
  },
  {
    activity:
      "规范：\n① 文档结构合理\n② 代码模块清晰合理、注释规范完整\n③ 测试用例",
    weight: 10,
    standard:
      "9.0-10分：命名规范，模块清晰，代码精简，可读性强，注释完整\n8.0-8.9分：命名合理，可读性强，注释基本完整\n7.0-7.9分：命名合理，可读性尚可，注释不完善\n0-6.9分：较为混乱，代码混乱，可读性差，注释少"
  },
  {
    kpl: "2. 团队协作",
    activity:
      "高效的与他人合作：\n① 日常工作中与他人配合度\n② 能及时完成文档编写\n③ 有积极责任心（owner/master意识，主动推进）",
    weight: 15,
    standard:
      "9.1~10分：能发挥主观能动性，自主安排任务，并高质量完成\n8.1~9.0分：能提前完成任务，并能主动告知进度\n7.1~8.0分：合格，能及时完成任务，且完成质量有保障\n<7分：任务经常出现延迟",
    scoreStandard: "必选，需要写上合作方的名字，PD/RD/上级 打分"
  },
  {
    kpl: "3. 公司制度&价值观",
    activity: "价值观：\n① 成就客户\n② 成人达己\n③ 突破自我",
    weight: 10,
    standard: "× 价值观若有一项出现问题：-10分/项",
    scoreStandard: "0或10分选项，不需要写说明"
  },
  {
    activity:
      "公司制度遵守：\n① 考勤制度执行情况\n② 周报制度遵守情况\n③ 团建活动参与情况",
    weight: 5,
    standard: "× 周报未及时提交：-1分/次\n× 迟到：-1分/次\n× 缺勤：-3分/次"
  },
  {
    kpl: "4.技术贡献",
    activity:
      "经验总结与技术分享：\n① 组内总结与分享，形式自选\n② 主讲人要事先通知分享主题，准备好分享文档。分享后留档",
    weight: 5,
    standard:
      "根据分项内容和效果，主观评分\n√ 内容被实际应用：2~5分/项\n√ 额外有效分享：2~5分/次\n× 无文档（PPT/分享材料）：1分\n× 无分享：0分"
  },
  {
    activity:
      "保持技术热情，学以致用：\n① 采用新的框架、技术，解决现有问题\n② 采用新的流程规范，提升研发效率",
    weight: 5,
    standard: "采纳并应用上线后，视具体情况得分。"
  }
];
//第二个表
const secondColumns = [
  ...coColumns,
  {
    title: "评分",
    dataIndex: "score",
    scopedSlots: { customRender: "score" },
    align: "center",
    width: "100px"
  }
];
const secondData = [
  {
    key: 0,
    activity: "① 加分项",
    weight: "/",
    standard:
      "建议被采纳并实施（1-5分）\n潜在问题预见性、有对应解决方案（1-5分）\n额外加分：公司表彰等 （1-5分）"
  },
  {
    key: 1,
    activity: "① 减分项",
    weight: "/",
    standard:
      "工作大事故，行政批评 （1-5分）\n违背价值观（传播一些不实谣言，对其他同事造成影响）（1-5分）\n工作投诉（1-5分）"
  }
];

export default {
  data() {
    return {
      firstColumns,
      firstData,
      secondData,
      secondColumns,
      result: 0
    };
  },
  methods: {
    //失焦时进行保存
    save(value, index, name, data) {
      this[data][index][name] = value;
      this.getResult();
      this.$store.commit("scoreTable", [
        this.firstData,
        this.secondData,
        this.result
      ]);
    },
    //计算分数
    getResult() {
      let part_1 = 0,
        part_2 = 0,
        part_3 = 0; //分数由三部分构成，1自评，2上级评，3附加分
      //计算第一个表格
      for (let item of firstData) {
        part_1 += (item.scoreByMyself ? +item.scoreByMyself : 0) * item.weight;
        part_2 += (item.scoreByBoss ? +item.scoreByBoss : 0) * item.weight;
      }
      //计算第二个表格
      for (let item of secondData) {
        part_3 += item.score ? +item.score : 0;
      }
      let result = (part_1 * 0.03 + part_2 * 0.07 + part_3).toFixed(1);
      this.result = isNaN(result) ? "请检查输入" : result;
    }
  },
  created() {
    //初始化firstdata
    for (let i = 0; i < firstData.length; i++) {
      firstData[i].key = i;
      if (!firstData[i].scoreStandard) {
        firstData[i].scoreStandard = "必填";
      }
    }
  }
};
</script>
<style scoped>
.ant-card:last-child {
  text-align: center;
}
.score {
  color: red;
  font-size: 2rem;
}
</style>