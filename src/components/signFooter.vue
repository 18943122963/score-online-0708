<template>
    <div>
        <a-card title="绩效级别参照标准">
            <div>
                <pre>
(一)简介 
    1.考核即为月报，工作内容请认真填写，作为工作量考核的一个重要因素。
    2.团队协作包括公司的一些行政任务，请注意执行，否则酌情扣分。 
    3.周报是一个沉淀机制，而不是流于形式的工作汇报，因此简单的工作汇报会被扣分。
(二)评分标准： 
    1.按照各项既定规则进行评分；
    2.起评分从8.0分开始，超过8分（不包括）请备注说明，低于6.0分（不包括）请备注说明。一般以0.5分为步进，不接受8.35分以及二位小数等情况。
    3.若起评分超过8分，没有写备注说明，一律按照8分计算；自评分得分不合理，以事实依据为准。
(三)绩效规则： 
  一、薪资体系：岗位薪资=70%基本薪资+30%绩效薪资
  二、奖励说明：
    1.月度绩效得分作为年终奖评定的重要参考，根据得分可获得0-3个月年终奖奖励
    2.单考核项评分：总分100分以上（A+级）；优秀（A级）：90分以上；良好（B级）：75到89分；合格（C级）：60到74分；不合格（D级）：60分以下
    3.月度绩效得分100分以上，月度绩效薪资增加50%；月度绩效得分在90-100分（不包含100分），月度绩效薪资增加20%；月度绩效得分在60-75分（不包含75分），月度绩效薪资扣减50%；月度绩效得分低于60分，月度绩效薪资扣减100%。
    4.处罚：降职降薪：得C等级3次/年，得D等级2次/年；解除劳动合同：得C等级4次/年，得D等级2次/年。</pre
                >
            </div>
        </a-card>
        <a-card>
            <label>确认签名：</label>
            <a-input v-model="sign"></a-input>
            <a-button type="primary" :disabled="noCheck" @click="check()"
                >提交</a-button
            >
        </a-card>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            sign: "",
            noCheck: false,
        };
    },
    methods: {
        //拿到其他三个页面的数据
        check() {
            //触发组件的保存函数
            this.$emit("pf");
            let baseInfo = this.$store.state.baseInfo;
            let finishItem = this.$store.state.finishItem;
            let scoreTable = this.$store.state.scoreTable;

            //检查baseInfo完整性
            let obVal = Object.values(baseInfo);
            if (
                !obVal.every((item) => item.value && item.value.trim() !== "")
            ) {
                this.$notification.open({
                    message: "error",
                    description: "基本信息未填写完整，提交失败",
                    placement: "bottomLeft",
                });
                return;
            }
            //将baseInfo放进localstorage
            for (let item in baseInfo) {
                localStorage.setItem(item, baseInfo[item].value);
            }
            //检查评分
            if (isNaN(scoreTable[2])) {
                this.$notification["error"]({
                    message: "提示",
                    description: "评分填写错误，提交失败",
                    placement: "bottomLeft",
                });
                return;
            }
            //检查签名
            if (this.sign.trim() !== baseInfo.name.value.trim()) {
                this.$notification["error"]({
                    message: "提示",
                    description: "签名与姓名不符，提交失败",
                    placement: "bottomLeft",
                });
                return;
            }

            //传到后台
            axios
                .post("xxx.xx", { baseInfo, finishItem, scoreTable })
                .then((response) => {
                    this.$notification["success"]({
                        message: "提示",
                        description: "提交成功",
                        placement: "bottomLeft",
                    });
                })
                .catch((error) => {
                    this.$notification["error"]({
                        message: "提示",
                        description: "提交失败，后台出错",
                        placement: "bottomLeft",
                    });
                });
        },
    },
};
</script>
<style scoped>
.ant-input {
    width: 10rem;
    margin-right: 2rem;
}
button {
    float: right;
}
pre {
    margin: 0;
}
</style>
