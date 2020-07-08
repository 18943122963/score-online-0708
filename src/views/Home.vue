<template>
    <div>
        <baseInfo />
        <finishItem />
        <scoreTable />
        <signFooter />
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
        signFooter,
    },
};
//baseInfo需要localstroge
//finishItem需要清理空项
</script>
<style>
.ant-card {
    width: 80%;
    margin: 2rem auto !important;
    text-align: left;
}
</style>
