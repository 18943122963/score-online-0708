<template>
    <div>
        <a-card title="本月冲刺总结">
            <a-table
                :columns="columns"
                :data-source="tableData"
                bordered
                :pagination="false"
            >
                <!-- 可编辑部分 -->
                <template
                    v-for="col in editableCol"
                    :slot="col"
                    slot-scope="text, record"
                >
                    <div :key="col">
                        <a-input
                            :value="text"
                            @blur="(e) => save(e.target.value, record.key, col)"
                        />
                    </div>
                </template>
                <!-- 操作插槽 -->
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span @click="() => det(record.key)">X</span>
                    </div>
                </template>
                <!-- 新增行 -->
                <template slot="footer">
                    <div class="add" @click="add()">新增一行</div>
                </template>
            </a-table>
        </a-card>
    </div>
</template>
<script>
const columns = [
    {
        title: "冲刺/调研(逐项填写)",
        dataIndex: "type",
        scopedSlots: { customRender: "type" },
        width: "20%",
        align: "center",
    },
    {
        title: "工时(天)",
        dataIndex: "finishTime",
        scopedSlots: { customRender: "finishTime" },
        align: "center",
    },
    {
        title: "状态",
        dataIndex: "state",
        scopedSlots: { customRender: "state" },
        align: "center",
    },
    {
        title: "上线版本",
        dataIndex: "version",
        scopedSlots: { customRender: "version" },
        align: "center",
    },
    {
        title: "备注/描述",
        dataIndex: "other",
        scopedSlots: { customRender: "other" },
        width: "40%",
        align: "center",
    },
    {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
        align: "center",
    },
];

let num = 0; //总条目
export default {
    data() {
        return {
            num: 0,
            tableData: [{ key: 0 }],
            columns,
        };
    },
    methods: {
        add() {
            // 若为第一项则正常添加
            if (this.tableData.length == 0) {
                this.tableData.push({ key: ++this.num });
                return;
            }

            //上一项全部为空时不允许添加
            let tdLast = this.tableData[this.tableData.length - 1]; //拿到最后一项
            let flag = columns.slice(0, -1).every((item) => {
                //没有该属性或者属性值为空时
                return (
                    !tdLast[item.dataIndex] || !tdLast[item.dataIndex].trim()
                );
            });
            if (flag) return;

            this.tableData.push({ key: ++this.num });
        },
        det(key) {
            let flag = this.tableData.findIndex((item) => {
                return item.key === key;
            });
            this.tableData.splice(flag, 1);
        },
        save(value, key, column) {
            let target = this.tableData.findIndex((item) => {
                return item.key == key;
            });
            this.tableData[target][column] = value;
        },
    },
    computed: {
        editableCol() {
            return columns.slice(0, -1).map((item) => item.dataIndex);
        },
    },
};
</script>
<style scoped>
span,
.add {
    text-align: center;
    color: #1890ff;
    cursor: pointer;
}
</style>
