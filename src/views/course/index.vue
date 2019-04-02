
<template>
  <div id="course">
    <div style='margin-top: 10px'>
      <el-row>
        <el-input placeholder="输入课程" v-model="listQuery.name" style="width: 200px" clearable></el-input>
        <el-select v-model="listQuery.ifSale" placeholder="是否上架" clearable>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
         <el-button type="primary" @click="request">查询</el-button>
      </el-row>
    </div>
    <el-button type="primary" @click="dialogAdd = true">添加课程</el-button>
    <el-table  :data="course" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          <a @click="goDetail(scope.row.id)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级数量">
        <template slot-scope="scope">
          <span>{{scope.row.classQTY}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否上架">
        <template slot-scope="scope">
          <span>{{scope.row.ifSale}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="330">
        <template slot-scope="scope">
          <div v-if='scope.row.ifSale == 0'>
            <el-button type="primary" @click="updateifSale(scope.row)">上架</el-button>
            <el-button type="info" disabled @click="addClass">添加班级</el-button>
          </div>
          <div v-else>
            <el-button type="info" @click="updateifSale(scope.row)">下架</el-button>
            <el-button type="primary" @click="addClass(scope.row)">添加班级</el-button>
          </div>
        </template>
        
      </el-table-column>
    </el-table>
    <div>
      <el-pagination 
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <el-dialog id="AddCourse" title="添加课程" :visible.sync="dialogAdd" width="400px" center >
      <el-form :model="Add" size="mini" label-width="75px">
        <el-form-item label="课程名称:">
          <el-input v-model="Add.name" placeholder="请输入内容"></el-input>
        </el-form-item>
         <el-form-item label="班级数量:">
          <el-input v-model="Add.classQTY" placeholder="请输入内容"></el-input>
        </el-form-item>
         <el-form-item label="价格:">
          <el-input v-model="Add.price" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="课程简介:">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="Add.abstract"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addCourse" >保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog id="AddClass" title="添加班级" :visible.sync="dialogCalssAdd" width="400px" center >
      <el-form :model="ClassAdd" size="mini" label-width="75px">
        <el-form-item label="课程名称:">{{ClassAdd.course}}</el-form-item>
        <el-form-item label="班级名称:">
          <el-input v-model="ClassAdd.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:">
          <el-date-picker v-model="ClassAdd.startDate" value-format="yyyy-MM-dd" type="date" placeholder="选择时间"></el-date-picker>
        </el-form-item>
         <el-form-item label="结束时间:">
          <el-date-picker v-model="ClassAdd.endDate" value-format="yyyy-MM-dd" type="date" placeholder="选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="班级人数:">
          <el-input v-model="ClassAdd.peopleQTY" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="班主任:">
          <el-select v-model="ClassAdd.teacher" placeholder="请选择班主任" clearable>
          <el-option label="teahcer1" value="teahcer1"></el-option>
          <el-option label="teahcer2" value="teahcer2"></el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="章节目录:">
          <el-upload action="http://localhost:3000/api/base/upload" :on-success="handleAvatarSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="courseAddClass">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as sqlMap from "../../sqlMap.js";
export default {
  name: "course",
  data() {
    return {
      dialogAdd: false,
      dialogCalssAdd: false,
      total: 0,
      course: "",
      classes: "",
      listQuery: {
        page: 1,
        limit: 20,
        courseName: null,
        tel: null,
        ifSale: null
      },
      course: [],
      Add: {
        name: "",
        abstract: "",
        ifSale: "0"
      },
      resource: [],
      ClassAdd: {
        name: "",
        course: "",
        teacher: "",
        resource: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted: {},

  created() {
    this.request();
  },

  methods: {
    goDetail(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      //   this.$router.push({path:"courseDetail/"+id,query:{id:id}});
      this.$router.push("courseDetail/" + id);
      loading.close();
    },
    addClass(row) {
      this.ClassAdd.course = row.name;
      this.dialogCalssAdd = true;
    },
    courseAddClass() {
      if (this.resource) {
        this.ClassAdd.resource = JSON.stringify(this.resource);
      }
      var param = { table: "classes", data: this.ClassAdd };
      this.$http.post("/api/base/insert", param).then(res => {
        var data = res.data;
        this.dialogCalssAdd = false;
      });
    },
    request() {
      var sql = sqlMap.courses.page(this.listQuery);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.course = data;
      });
      sql = sqlMap.courses.count(this.listQuery);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.total = parseInt(data[0].count);
      });
    },
    addCourse() {
      var param = { table: "courses", data: this.Add };
      this.$http.post("/api/base/insert", param).then(res => {
        var data = res.data;
        this.dialogAdd = false;
        this.request();
      });
    },
    updateifSale(row) {
      var sql = sqlMap.courses.updateifSale.replace(
        "?",
        row.ifSale == "0" ? "1" : "0"
      );
      sql = sql.replace("?", row.id);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        this.request();
      });
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.resource=this.resource.concat(res);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>