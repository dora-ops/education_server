<template>
  <div class="app-container calendar-list-container" id="addPotential">
    <div class="filter-container">
      <el-row>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="goBack()">返回列表</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="Preservation(ruleForm)">保存</el-button>
      </el-row>
    </div>
    <el-form :model="form" label-width="88px" label-position="left" :rules="rules" ref="ruleForm">
      <el-row :gutter="100">
        <el-col :span="8">
          <h2 style="margin-bottom: 20px">
            学生信息
          </h2>
          <el-form-item label="学员姓名" v-bind:class="{'has-error':studentNameError}" class='errorN' required>
            <input class="el-input__inner" v-on:focus="studentNameError=false"  v-model="form.studentName" placeholder="请输入姓名"></input>
            <span class="help-block">{{ studentNameerrormsg }}</span>
          </el-form-item>
          <el-form-item label="电话" v-bind:class="{'has-error':parentMobileError}" class='errorN' required>
            <input class="el-input__inner" v-on:focus="parentMobileError=false"   v-model="form.parentMobile" placeholder="请输入电话"></input>
            <span class="help-block">{{ parentMobileerrormsg }}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input  v-model="form.studentAge" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.studentSex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
            <el-select v-model="form.studentGrade" placeholder="请选择年级">
              <el-option label="大班以下" value="大班以下"></el-option>
              <el-option label="大班" value="大班"></el-option>
              <el-option label="一年级" value="一年级"></el-option>
              <el-option label="二年级" value="二年级"></el-option>
              <el-option label="三年级" value="三年级"></el-option>
              <el-option label="四年级" value="四年级"></el-option>
              <el-option label="五年级" value="五年级"></el-option>
              <el-option label="六年级" value="六年级"></el-option>
              <el-option label="初一" value="初一"></el-option>
              <el-option label="初二" value="初二"></el-option>
              <el-option label="初三" value="初三"></el-option>
              <el-option label="高中及以上" value="高中及以上"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="form.studentBirth"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="form.studentSchool" placeholder="请输入学校"></el-input>
          </el-form-item>
          <el-form-item label="兴趣">
            <el-input v-model="form.studentInterest" placeholder="请输入兴趣"></el-input>
          </el-form-item>
          <el-form-item label="有无基础">
            <el-input v-model="form.studentFoundation" placeholder="请输入有无基础"></el-input>
          </el-form-item>
          <el-form-item label="可预约时间">
            <el-input v-model="form.studentFreeTime" placeholder="请输入可预约时间"></el-input>
          </el-form-item>
          <el-form-item label="学生备注">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入学生备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <h2 style="margin-bottom: 20px">
            家长信息
          </h2>
          <el-form-item label="来访家长">
            <el-input  v-model="form.parents" placeholder="请输入来访家长"></el-input>
          </el-form-item>
          <el-form-item label="家长职业">
            <el-input  v-model="form.parentProfession" placeholder="请输入家长职业"></el-input>
          </el-form-item>
          <el-form-item label="来访方式">
            <el-input  v-model="form.parentVisitingWay" placeholder="请输入来访方式"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input  v-model="form.parentAddress" placeholder="请输入家庭住址"></el-input>
          </el-form-item>
          <el-form-item label="家长备注">
            <el-input type="textarea" v-model="form.parentRemark" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <h2 style="margin-bottom: 20px">
            留资信息
          </h2>
          <el-form-item label="邀约人" v-bind:class="{'has-error':inviteError}" class='errorN' required>
            <input class="el-input__inner" v-on:focus="inviteError=false"  v-model="form.invite" placeholder="请输入邀约人"></input>
            <span class="help-block">{{ inviteerrormsg }}</span>
          </el-form-item>
          <el-form-item label="接待人">
            <el-select multiple placeholder="请输入接待人" v-model="form.receptions">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  // import {
  //   addPotential,
  //   getSaleUsers
  // } from '@/api/market/potential/index';
  var telreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
  var regEn = /[`~!@#$%^&()_+<>?:"{},.\/;'[\]]/;
  var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/;
  var kongg = /[\s]/
  export default {
    name: 'addPotential',
    data() {
      var tel = (rule, value, callback) => {
        if (value != '') {
          if ((/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(value)) == false) {
            callback(new Error('请输入正确的手机号！'));
          } else {
            callback();
          }
        }
      };
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        saleUser: [],
        studentNameError:false,
        parentSecondMobileError:false,
        parentMobileError:false,
        parentPhoneError:false,
        inviteError: false,
        form: {
          studentName: '', //学生姓名
          studentSex: '', //学生性别
          studentAge: '', //学生年龄
          mobile: '', //联系电话
          receptions: [], //负责人
          remark: '', //备注
        },
        rules: {
          studentName: [
            {required: true, message: '请输入姓名',},
          ],
          mobile: [
            {validator: tel}
          ],
          invite: [
            {required: true, message: '请输入邀约人',}
          ]
        },
      }
    },
    created() {
      // this.getSaleUsers()
    },
    methods: {
      // getSaleUsers(){
      //   getSaleUsers()
      //     .then(response => {
      //       this.saleUser = response.data
      //     })
      // },
      addPotential() {
      //   //增加
      //   const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //   addPotential(this.form)
      //     .then(response => {
      //       console.log(response)
      //       loading.close();
            // this.$message({
            //   message: '新增潜客成功',
            //   duration: 5 * 1000,
            //   type: 'success'
            // });
            // this.$router.push({name:'潜客列表'})
            this.$router.back()
      //     }).catch(() => {
      //     loading.close();
      //   })
      },
      goBack() {
        this.$router.back()
      },
      Preservation(formName) {
      //   //保存
      console.log('111111')
      this.$router.push('/potential/index')
        if(this.form.studentName==''){
          this.studentNameError=true;
          this.studentNameerrormsg='请输入学员姓名';
          if(this.form.invite == ''){
            this.inviteError=true;
            this.inviteerrormsg='请选择邀约人';
            if(this.form.parentMobile=='' && this.form.parentPhone==''){
              this.parentMobileError=true;
              this.parentMobileerrormsg='请输入电话或座机';
              return;
            } else {
              if(this.form.parentMobile!=''){
                if(!telreg.test(this.form.parentMobile)){
                  this.parentMobileError=true;
                  this.parentMobileerrormsg='请输入正确的手机号！';
                  return;
                }
              }
            }
          }else {
            if(this.form.parentMobile=='' && this.form.parentPhone==''){
              this.parentMobileError=true;
              this.parentMobileerrormsg='请输入电话或座机';
              return;
            } else {
              if(this.form.parentMobile!=''){
                if(!telreg.test(this.form.parentMobile)){
                  this.parentMobileError=true;
                  this.parentMobileerrormsg='请输入正确的手机号！';
                  return;
                }
              }
            }
          }
        }
        else if(regEn.test(this.form.studentName) || regCn.test(this.form.studentName)||kongg.test(this.form.studentName)) {
          this.studentNameError=true;
          this.studentNameerrormsg='请输入正确的学员姓名';
          if(this.form.invite == ''){
            this.inviteError=true;
            this.inviteerrormsg='请选择邀约人';
            if(this.form.parentMobile=='' && this.form.parentPhone==''){
              this.parentMobileError=true;
              this.parentMobileerrormsg='请输入电话或座机';
              return;
            } else {
              if(this.form.parentMobile!=''){
                if(!telreg.test(this.form.parentMobile)){
                  this.parentMobileError=true;
                  this.parentMobileerrormsg='请输入正确的手机号！';
                  return;
                }
              }
            }
          }else {
            if(this.form.parentMobile=='' && this.form.parentPhone==''){
              this.parentMobileError=true;
              this.parentMobileerrormsg='请输入电话或座机';
              return;
            } else {
              if(this.form.parentMobile!=''){
                if(!telreg.test(this.form.parentMobile)){
                  this.parentMobileError=true;
                  this.parentMobileerrormsg='请输入正确的手机号！';
                  return;
                }
              }
            }
          }
        }
        else {
          if(this.form.invite == '') {
            this.inviteError = true;
            this.inviteerrormsg = '请选择邀约人';
            if (this.form.parentMobile == '' && this.form.parentPhone == '') {
              this.parentMobileError = true;
              this.parentMobileerrormsg = '请输入电话或座机';
              return;
            } else {
              if (this.form.parentMobile != '') {
                if (!telreg.test(this.form.parentMobile)) {
                  this.parentMobileError = true;
                  this.parentMobileerrormsg = '请输入正确的手机号！';
                  return;
                }
              }
            }
          } else {
            if (this.form.parentMobile == '' && this.form.parentPhone == '') {
              this.parentMobileError = true;
              this.parentMobileerrormsg = '请输入电话或座机';
              return;
            } else {
              if (this.form.parentMobile != '') {
                if (!telreg.test(this.form.parentMobile)) {
                  this.parentMobileError = true;
                  this.parentMobileerrormsg = '请输入正确的手机号！';
                  return;
                }
              }
            }
            if (this.form.parentSecondMobile != '') {
              if (!telreg.test(this.form.parentSecondMobile)) {
                this.parentSecondMobileError = true;
                this.parentSecondMobileerrormsg = '请输入正确的手机号！';
                return;

              }
            }
            this.form.reception = this.form.receptions.join('/')
            delete this.form.receptions
            this.addPotential()
          }
        }
      }
    }
  }
</script>

<style type="text/css">
  #addPotential .el-form-item__content {
    width: 70%;
  }

  #addPotential .el-date-editor--date,#addPotential .el-date-editor--datetime {
    width: 100%;
  }

  #addPotential .el-form-item__content .el-select--medium {
    width: 100%;
  }
  .errorN .help-block{
    display: none;
    font-size: 12px;
    color:#f56c6c;
    line-height:1;
    padding-top:4px;
    position:absolute;
  }

  .has-error .help-block{
    display: block;
  }
  .has-error input{
    border-color:#f56c6c;
  }
</style>
