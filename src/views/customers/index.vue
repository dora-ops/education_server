
<template>
  <div id="customers">
    <div style='margin-top: 10px'>
      <el-row>
        <el-input placeholder="输入姓名" v-model="listQuery.name" style="width: 200px" clearable></el-input>
        <el-input placeholder="输入手机号" v-model="listQuery.tel" style="width: 200px" clearable></el-input>
        <el-select v-model="listQuery.ifBuy" placeholder="是否购课" clearable>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
        <el-button type="primary" @click="request">查询</el-button>
      </el-row>
    </div>
    <el-table :key='tableKey' :data="customers" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <a @click="goDetail(scope.row)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否购课">
        <template slot-scope="scope">
          <span>{{scope.row.ifBuy}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="330">
        <template slot-scope="scope">
          <!-- <el-button class="filter-item" type="primary" v-waves icon="search" @click="addClass(scope.row)">购课</el-button> -->
          <el-button v-if='scope.row.ifBuy == 1' class="filter-item" type="primary" v-waves icon="search" @click="openCancel(scope.row)">退课</el-button>
          <el-button v-else disabled class="filter-item" type="primary" v-waves icon="search" >退课</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- <el-dialog id="buy" title="购买课程" :visible.sync="dialogBuy" width="400px" center >
      <el-form :model="buyCourse" size="mini" label-width="100px">
        <el-form-item label="客户名称">{{buyCourse.name}}
        </el-form-item>
        <el-form-item label="购买课程">
          <el-select v-model="buyCourse.courses" multiple placeholder="请选择课程" clearable>
            <el-option v-for="course in courses" :key="course.id" :label="course.name" :value="course.id"></el-option> 
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateCustomer(buyCourse)">保 存</el-button>
      </div>
    </el-dialog> -->
    <el-dialog id="Cancel" title="退课" :visible.sync="dialogCancel" width="400px" center >
      <el-form :model="buyCourse" size="mini" label-width="75px">
        <el-form-item label="客户名称:">{{this.row.name}}</el-form-item>
        <el-table :data="cancelList">
          <el-table-column label="课程名">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级">
            <template slot-scope="scope">
              <span>{{scope.row.course}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="cancelBuy(scope.row)">退课</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as sqlMap from "../../sqlMap.js";
export default {
  name: "客户列表",
  data() {
    return {
      dialogBuy: false,
      dialogCancel: false,
      total: "",
      course: "",
      classes: "",
      listQuery: {
        page: 1,
        limit: 20,
        name: null,
        tel: null,
        ifBuy: null
      },
      customers: [],
      buyCourse: {
          courses:[]
      },
      courses:[],
      courseCancel: [
        {
          courseName: "课程名",
          className: "班级"
        }
      ],
      cancelList:[],
      row:{}
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
      this.$router.push("customersDetail");
      loading.close();
    },
    openCancel(row) {
      this.row=row
      this.cancelList=[]
      this.getClass(row.id)
      this.dialogCancel = true
    },
    getClass(id){
      
      var sql = sqlMap.customers.getClassId.replace('?',id);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var classId = JSON.parse(res.data[0].classes)
        console.log(classId)
        for(var i=0;i < classId.length;i++){
          sql = sqlMap.customers.getClass.replace('?',classId[i])
          this.$http.post("/api/base/action", { sql: sql }).then(res => {
            this.cancelList.push(res.data[0])
          });
        }
      });
    },
    request() {
      var sql = sqlMap.customers.page(this.listQuery);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.customers = data;
      });
      sql = sqlMap.customers.count(this.listQuery);
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.total = parseInt(data[0].count);
      });
    },
    addClass(row) {
      this.buyCourse.name = row.name;
      this.dialogBuy = true;
      this.buyCourse.id=row.id
      var sql = sqlMap.courses.getSaleCourse;
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
        var data = res.data;
        this.courses = data;
      });
    },
    cancelBuy(row){
      console.log(row.id)
      for(var i=0;i<this.cancelList.length;i++){
        if(this.cancelList[i].id == row.id){
          this.cancelList.splice(i,1)
        }
      }
      var classes = []
      for(let j=0;j<this.cancelList.length;j++){
        classes.push(this.cancelList[j].id)
      }
      if (classes.length == 0){
        this.row.ifBuy = 0
      }
      var sql = sqlMap.customers.cancelClass
      sql=sql.replace('?',this.row.ifBuy).replace('?',JSON.stringify(classes)).replace('?',this.row.id)
      this.$http.post("/api/base/action", { sql: sql }).then(res => {
      });
    },
  }
};
</script>
<style lang='scss' scoped>
</style>