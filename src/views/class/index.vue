
<template>
  <div id="class">
    <div style='margin-top: 10px'>
      <el-row>
        <el-input placeholder="输入课程" v-model="listQuery.courseName" style="width: 200px" clearable></el-input>
        <el-date-picker v-model="listQuery.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.courseifsSart" placeholder="是否开课" clearable>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-row>
    </div>
    <el-table :key='tableKey' :data="classes" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="课程名称">
        <template slot-scope="scope">
          <a @click="goCourseDetail(scope.row)">{{scope.row.courseName}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称">
        <template slot-scope="scope">
          <a @click="goClassDetail(scope.row)">{{scope.row.className}}</a>
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
          <span>{{scope.row.number}}</span>
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
</template>

<script>
export default {
  name: '班级列表',
  data () {
    return {
      listQuery:{
        page: 1,
        limit: 20,
        courseName: null,
        time: null,
        courseifsSart: null
      },
      classes:[
        {
          courseName: '1',
          className: '1',
          classifSale: '1',
          startDate: '1',
          endDate: '1',
          progress: 60,
          status: '',
          teacher: 'aaa',
          number: '60'
        },
        {
          courseName: '2',
          className: '2',
          classifSale: '0',
           startDate: '2',
          endDate: '2',
          progress: 100,
          status: 'success',
          teacher: 'bbb',
          number: '45'
        },
        {
          courseName: '3',
          className: '3',
          classifSale: '0',
           startDate: '3',
          endDate: '3',
          progress: -10,
          status: '',
          teacher: 'ccc',
          number: '3'
        }
      ],
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    goCourseDetail(id){
      const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      this.$router.push('/course/courseDetail')
      loading.close()
    },
    goClassDetail(id){
      const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      this.$router.push('classDetail')
      loading.close()
    }
  }
}

</script>
<style lang='scss' scoped>
</style>