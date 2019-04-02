<template>
  <div id="classDetail">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane style='margin-left: 10px' label="班级信息" name="first">
        <h2>班级信息</h2>
        <el-button type="primary" v-if='edit == false' @click="edit = true">编辑</el-button>
        <el-button type="primary" v-else @click="edit = false">保存</el-button>
        <el-form :model="classes" label-width="85px" label-position="left" :rules="rules" ref="ruleForm">
          <el-row :gutter="70" style='display:flex;flex-wrap:wrap;'>
            <el-col :span="8">
              <el-form-item label="班级名称" required prop="studentName">
                <el-input v-model="classes.className" :placeholder="!edit?'':'请输入班级'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="所属课程" required prop="studentName">
                <el-input v-model="classes.courseName" :placeholder="!edit?'':'请输入课程'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="班主任" required prop="studentName">
                <el-input v-model="classes.teacher" :placeholder="!edit?'':'请输入姓名'" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="课程进度" required prop="studentName">
                <span v-if='classes.progress <= 0'>未开课</span>
                <el-progress v-else :text-inside="true" :stroke-width="15" :percentage="classes.progress" :status="classes.status" style="margin-top: 12px"></el-progress>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane style='margin-left: 10px' label="课件信息" name="second">
        <div>
            <h2>课件信息</h2>
            <el-table :key='tableKey' :data="coursewareList" border fit highlight-current-row >
              <el-table-column align="center" label="章节名称">
                <template slot-scope="scope">
                  <span>{{scope.row.chaperName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="课程资料">
                <template slot-scope="scope">
                  <span v-if="scope.row.courseware == ''">未上传</span>
                  <el-button v-else type="primary">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="资料上传">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.courseware == ''" type="primary" @click="addClass">上传</el-button>
                  <span v-else>已上传</span>
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
  name: '班级详情',
  data () {
    return {
      activeName: 'first',
      edit: false,
      classes:{
        className: '第一期',
        courseName: '1',
        teacher: 'aaa',
        progress: 20,
        status: ''
      },
      coursewareList: [
        {
          chaperName: '1',
          courseware: '1'
        },
        {
          chaperName: '2',
          courseware: ''
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>