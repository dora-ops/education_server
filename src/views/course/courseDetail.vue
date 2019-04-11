<template>
    <div id="courseDetail">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane style='margin-left: 10px' label="课程信息" name="first">
                <h2>课程信息</h2>
                <el-button type="primary" v-if='edit == false' @click="edit = true">编辑</el-button>
                <el-button type="primary" v-else @click="edit = false">保存</el-button>
                <el-form :model="course" label-position="left" :rules="rules" ref="ruleForm">
                    <el-row :gutter="70" style='display:flex;flex-wrap:wrap;'>
                        <el-col>
                            <el-form-item label="课程名称" required prop="name">
                                <el-input v-model="course.name" :placeholder="!edit?'':'请输入姓名'" :disabled="!edit"></el-input>
                            </el-form-item>
                            <el-form-item label="课程介绍">
                                <el-input type="textarea" v-model="course.abstract" :placeholder="!edit?'':'请输入介绍'" :disabled="!edit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane style='margin-left: 10px' label="班级信息" name="second">
                <div class="noList" v-if='course.classQTY==0'>暂无信息</div>
                <div v-else>
                    <h2>班级信息</h2>
                    <el-table :key='tableKey' :data="classList" border fit highlight-current-row>
                        <el-table-column align="center" label="班级名称" width="170">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="开始日期" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.startDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="结束日期" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.endDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="班主任" width="110">
                            <template slot-scope="scope">
                                <span>{{scope.row.teacher}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="人数" width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.peopleQTY}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="开课进度" width="160">
                            <template slot-scope="scope">
                                <span v-if='scope.row.progress < 0'>未开课</span>
                                <el-progress v-else :text-inside="true" :stroke-width="15" :percentage="scope.row.progress" :status="scope.row.status"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="updateifSale(scope.row)">上传章节</el-button>
                                <el-button type="primary" @click="delClass(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog id="AddClass" title="添加章节" :visible.sync="dialogCalssAdd" width="400px" center>
                    <el-form :model="ClassAdd" size="mini" label-width="75px">

                        <el-form-item label="章节目录:">
                            <el-upload :file-list="fileList" action="http://localhost:3000/api/base/upload" accept=".mp4,.avi" :on-success="handleAvatarSuccess">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>

                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button type="primary" @click="courseAddClass()">保 存</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { courses, classes } from "../../sqlMap.js";

export default {
  name: "课程详情",
  data() {
    return {
      activeName: "first",
      edit: false,
      course: {
        name: "",
        abstract: "",
        classQTY: 1
      },
      classList: [],
      dialogAdd: false,
      dialogCalssAdd: false,
      fileList: [],
      resource: [],
      claId: ""
    };
  },

  created() {
    this.request();
  },

  methods: {
    goClassDetail(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      this.$router.push("/class/classDetail");
      loading.close();
    },
    updateifSale(row) {
      this.claId = row.id;
      if (row.resource) {
        var sql = classes.getResource(JSON.parse(row.resource));
        this.$http.post("/api/base/action", { sql: sql }).then(res => {
          this.fileList = res.data.map(item => {
            this.resource.push(item.id);
            return {
              name: item.originalname,
              url: "http://localhost:3000/" + item.fileName
            };
          });
        });
      }

      this.dialogCalssAdd = true;
    },
    delClass(row) {
      var sql = classes.delClass.replace("?", row.id);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        this.request();
      });
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.resource = this.resource.concat(res);
    },
    courseAddClass() {
      var sql = classes.updateResource
        .replace("?", JSON.stringify(this.resource))
        .replace("?", this.claId);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        this.dialogCalssAdd = false;
        this.request();
      });
    },
    request() {
      var id = this.$route.params.id;
      var sql = courses.getMyCourses.replace("?", id);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.course = data[0];
        sql = classes.getCourseClass.replace("?", this.course.name);
        this.$http.post("/api/base/action", { sql: sql }).then(res => {
          var data = res.data;
          this.classList = data;
          let myDate = new Date();
          myDate=this.$moment(myDate).format("YYYY-MM-DD")
          console.log(myDate)
          for(let i = 0;i<this.classList.length;i++){
            this.classList[i].startDate = this.$moment(this.classList[i].startDate).format("YYYY-MM-DD");
            this.classList[i].endDate = this.$moment(this.classList[i].endDate).format("YYYY-MM-DD");
            console.log(this.classList[i])
            if(myDate <= this.classList[i].startDate)
              this.classList[i].progress = 0
            else if(myDate >= this.classList[i].endDate)
              this.classList[i].progress = 100
            else{
              this.classList[i].progress = (myDate-this.classList[i].startDate)/(this.classList[i].endDate-this.classList[i].startDate)
            }
          }

        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.noList {
  text-align: center;
  padding: 40px 0;
  font-size: 20px;
  color: #a8a8a8;
}
</style>