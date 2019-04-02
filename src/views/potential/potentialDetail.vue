<template>
  <div class="app-container calendar-list-container" id="potentialDetail">
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="goBack()" v-if="!studentEdit">返回</el-button>
    <el-tabs type="border-card"  @tab-click="handleClick">
      <el-tab-pane label="学员信息">
        <studentInformation :id = 'saleId'></studentInformation>
      </el-tab-pane>

      <el-tab-pane label="试听信息">
        <shiting :id = 'saleId'></shiting>
      </el-tab-pane>

      <!-- <el-tab-pane label="签单信息">
        <qiandan :id = 'saleId'></qiandan>
      </el-tab-pane> -->

      <el-tab-pane label="面资信息">
        <mianzi :id = 'saleId'></mianzi>
      </el-tab-pane>

      <!-- <el-tab-pane label="跟进记录">
        <genjin :id = 'saleId' ref="genjin"></genjin>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  // import {   
  // } from '@/api/market/potential/index';
  import studentInformation from '@/components/potential/studentInformation.vue'
  import shiting from '@/components/potential/shiting.vue'
  // import qiandan from '@/components/potential/qiandan.vue'
  import mianzi from '@/components/potential/mianzi.vue'
  // import genjin from '@/src/components/potential/genjin.vue'
  // import {formatTime1,formatTime2} from '@/utils/index.js' 
  // import {mapGetters} from "vuex";
  var telreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
  export default {
    name: 'potentialDetail',
    components: {
      studentInformation, 
      shiting,
      // qiandan,
      mianzi,
      // genjin,
    },
    data() { 
      return {
        // // saleId:this.$route.query.id,
        // saveListQuery: null, 
        // fatherPage:this.$route.query.fatherPage
      }
    },
    computed: {
      // ...mapGetters(['elements', 'name'])
    },
    created() { 
      // this.saveListQuery = JSON.parse(decodeURIComponent(this.$route.query.saveListQuery))
      // this.studentName = this.$route.query.studentName
      
      // this.statuFormList = this.$route.query.status  
      // var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    },
    methods: {
      // goBack() {
      //   if(this.fatherPage == 'index'){
      //     this.$router.push({
      //       name: '潜客管理',
      //       params: {
      //         saveListQuery: this.saveListQuery
      //      }
      //     })
      //   }
      //   else{
      //     this.$router.push({
      //       name: '签单列表',
      //       params: {
      //         saveListQuery: this.saveListQuery
      //      }
      //     })
      //     //this.$router.push({
      //       //path: '/marketManager/signList',
      //       //query: {
      //         //saveListQuery: this.saveListQuery
      //      //}
      //     //})
      //   }
        
      // }, 
      // handleClick(tab, event){
      //     console.log(tab.index);
      //     let Index = tab.index;
      //     if(Index == 0 ){ 
      //     }
      //     else if (Index == 1){  
      //     }
      //     else if (Index == 2){ 
      //     }
      //     else if (Index == 3){ 
      //     }
      //     else if (Index == 4){ 
      //       this.$refs.genjin.getSaleFollow(this.saleId);
      //     }
      //   }, 


      
      /*
       
      studentGradefilters(name){
        let data = [
          {label: '幼儿园小班', value: '幼儿园小班'},
          {label: '幼儿园中班', value: '幼儿园中班'},
          {label: '幼儿园大班', value: '幼儿园大班'},
          {label: '小学一年级', value: '小学一年级'},
          {label: '小学二年级', value: '小学二年级'},
          {label: '小学三年级', value: '小学三年级'},
          {label: '小学四年级', value: '小学四年级'},
          {label: '小学五年级', value: '小学五年级'},
          {label: '小学六年级', value: '小学六年级'},
          {label: '初中一年级', value: '初中一年级'},
          {label: '初中二年级', value: '初中二年级'},
          {label: '初中三年级', value: '初中三年级'},
          {label: '高中一年级', value: '高中一年级'},
          {label: '高中二年级', value: '高中二年级'},
          {label: '高中三年级', value: '高中三年级'},
        ]
        for (let i = 0; i < data.length; i++) {
          if (name == data[i].label) {
            return data[i].value
          } else if (name == data[i].value) {
            return data[i].label
          }
        }
      },
      //时间戳转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate()) + ' '
        var h = date.getHours() + ':'
        var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        return Y + M + D + h + m
      },
      */
      //时间戳转换
      /*
      timestampToDate(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return Y + M + D
      },
      */ 
    }
  }
</script>

<style scoped>
  /*#potentialDetail .el-form-item__content {*/
  /*width: 50%;*/
  /*}*/

  #potentialDetail .el-date-editor {
    width: 100%;
  }

  #potentialDetail .el-form-item__content .el-select--medium {
    width: 100%;
  }

  #potentialDetail .el-button {
    margin-bottom: 15px;
  }

  .errorN .help-block {
    display: none;
    font-size: 12px;
    color: #f56c6c;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
  }

  .has-error .help-block {
    display: block;
  }

  .has-error input {
    border-color: #f56c6c;
  }

  #potentialDetail input[disabled] {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .bookingBorder {
    border-bottom: 1px black dotted;
    height: 520px;
    margin-bottom: 20px
  }

  .signBorder {
    border-bottom: 1px black dotted;
    height: 540px;
    margin-bottom: 10px
  }

  .followBorder {
    border-bottom: 1px black dotted;
  }

  .interviewBorder {
    border-bottom: 1px black dotted;
    height: 400px;
    margin-bottom: 20px
  }

  #potentialDetail {
    position: relative;
    z-index: 0
  }

  /*#potentialDetail input::-webkit-input-placeholder {*/
    /*font-size: 12px;*/
  /*}*/
</style>
