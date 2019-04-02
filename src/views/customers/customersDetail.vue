<template>
  <div id='customersDetail'>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane style='margin-left: 10px' label="用户信息" name="first">
        <h2>学生信息</h2>
        <el-button type="primary" v-if='edit == false' @click="edit = true">编辑</el-button>
        <el-button type="primary" v-else @click="edit = false">保存</el-button>
        <el-form :model="customer" label-width="85px" label-position="left" :rules="rules" ref="ruleForm">
          <el-row :gutter="70" style='display:flex;flex-wrap:wrap;'>
            <el-col :span="6">
              <el-form-item label="学员姓名" required prop="studentName">
                <el-input v-model="customer.name" :placeholder="!edit?'':'请输入姓名'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" required prop="studentTel">
                <el-input v-model="customer.phone" :placeholder="!edit?'':'请输入姓名'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="customer.sex" :placeholder="!edit?'':'请选择性别'" :disabled="!edit">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否购课">
                <el-select v-model="customer.ifBuy" :placeholder="!edit?'':'请选择性别'" :disabled="!edit">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="customer.remark" :placeholder="!edit?'':'请输入备注'"
                          :disabled="!edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane style='margin-left: 10px' label="课程信息" name="second">
        <div class="noList" v-if='customer.ifBuy==0'>暂无信息</div>
        <div v-else>
            <h2>课程信息</h2>
            <el-table :key='tableKey' :data="buyList" border fit highlight-current-row >
              <el-table-column align="center" label="购买时间">
                <template slot-scope="scope">
                  <span>{{scope.row.buyDate}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="课程">
                <template slot-scope="scope">
                  <span>{{scope.row.course}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="班级">
                <template slot-scope="scope">
                  <span>{{scope.row.class}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="金额">
                <template slot-scope="scope">
                  <span>{{scope.row.money}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="接待人">
                <template slot-scope="scope">
                  <span>{{scope.row.reception}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="进度">
                <template slot-scope="scope">
                  <span v-if='scope.row.progress < 0'>未开课</span>
                  <el-progress v-else :text-inside="true" :stroke-width="15" :percentage="scope.row.progress"></el-progress>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" v-if='scope.row.progress <= 30'>退课</el-button>
                  <el-button type="primary" v-else disabled>退课</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '用户详情',
  data () {
    return {
      activeName: 'first',
      edit: false,
      customer: {
        name: 'aaa',
        phone: '1515151515',
        sex: '1',
        remark: 'wuwuwu',
        ifBuy: '1'
      },
      buyList: [
        {
          buyDate: 'a',
          course: 'a',
          class: 'a',
          money: 'a',
          reception: 'a',
          progress: 30
        },
        {
          buyDate: 'b',
          course: 'b',
          class: 'b',
          money: 'b',
          reception: 'b',
          progress: 50
        },
      ]
        
      
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}

</script>
<style lang='scss' scoped>
  .noList{
    text-align: center;
    padding:40px 0;
    font-size:20px;
    color:#a8a8a8;
  }
</style>