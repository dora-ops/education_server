<template>
  <div id="courseDetail">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane style='margin-left: 10px' label="课程信息" name="first">
        <h2>课程信息</h2>
        <el-button type="primary" v-if='edit == false' @click="edit = true">编辑</el-button>
        <el-button type="primary" v-else @click="edit = false">保存</el-button>
        <el-form :model="course"  label-position="left" :rules="rules" ref="ruleForm">
          <el-row :gutter="70" style='display:flex;flex-wrap:wrap;'>
            <el-col >
              <el-form-item label="课程名称" required prop="name">
                <el-input v-model="course.name" :placeholder="!edit?'':'请输入姓名'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="课程介绍">
                <el-input type="textarea" v-model="course.abstract" :placeholder="!edit?'':'请输入介绍'"
                          :disabled="!edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane style='margin-left: 10px' label="班级信息" name="second">
        <div class="noList" v-if='course.classQTY==0'>暂无信息</div>
        <div v-else>
            <h2>班级信息</h2>
            <el-table :key='tableKey' :data="classList" border fit highlight-current-row >
              <el-table-column align="center" label="班级名称">
                <template slot-scope="scope">
                  <a @click="goClassDetail(scope.row.id)">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column align="center" label="开始日期">
                <template slot-scope="scope">
                  <span>{{scope.row.startDate}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="结束日期">
                <template slot-scope="scope">
                  <span>{{scope.row.endDate}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="班主任">
                <template slot-scope="scope">
                  <span>{{scope.row.teacher}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="人数">
                <template slot-scope="scope">
                  <span>{{scope.row.peopleQTY}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="开课进度">
                <template slot-scope="scope">
                  <span v-if='scope.row.progress < 0'>未开课</span>
                  <el-progress v-else :text-inside="true" :stroke-width="15" :percentage="scope.row.progress" :status="scope.row.status"></el-progress>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {courses,classes} from "../../sqlMap.js";
export default {
  name: '课程详情',
  data () {
    return {
      activeName: 'first',
      edit: false,
      course: {
        name: '',
        abstract: '',
        classQTY: 1
      },
      classList:[
      
      ]
    };
  },

  components: {},

  computed: {},

  mounted: {},

  created(){
      var id=this.$route.params.id
      var sql=courses.getMyCourses.replace('?',id)
       this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.course = data[0];
          sql=classes.getCourseClass.replace('?',this.course.name)
           this.$http.post("/api/base/action", { sql: sql }).then(res => {
               var data = res.data;
               this.classList = data;
           });
      });
      console.log("vue router")
  },


  methods: {
    goClassDetail(id){
      const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      this.$router.push('/class/classDetail')
      loading.close()
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