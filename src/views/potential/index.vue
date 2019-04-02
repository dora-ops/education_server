<template>
  <div class="app-container calendar-list-container" id="potential">
    <div class="filter-container">
      <el-row>
        <el-input clearable style="width: 207px;" class="filter-item"
                  placeholder="输入姓名/手机号"
                  v-model="listQuery.keyword"
                  @keyup.enter.native="handleFilter()" @change="handleFilter()"
        ></el-input>
      <el-select v-model="listQuery.type" class="filter-item" style="width: 207px;" clearable placeholder="类型筛选" @change="getList()">
        <el-option label="地推" value="地推"></el-option>
        <el-option label="线下活动" value="线下活动"></el-option>
        <el-option label="线上留资" value="线上留资"></el-option>
        <el-option label="转介绍" value="转介绍"></el-option>
        <el-option label="Walk in" value="Walk in"></el-option>
        <el-option label="Call in" value="Call in"></el-option>
        <el-option label="交换名单" value="交换名单"></el-option>
      </el-select>
        <el-select v-model="listQuery.soucing"  placeholder="来源" style="width: 207px;"  class="filter-item" clearable @change="handleFilter()">
          <el-option
            v-for="item in soucingListAll"
            :key="item.id"
            :label="item.studentSoucing"
            :value="item.studentSoucing">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.invite" placeholder="邀约人" style="width: 207px;"  class="filter-item" clearable @change="handleFilter()">
          <el-option
            v-for="item in saleUser"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.reception" placeholder="接待人" style="width: 207px;"  class="filter-item" clearable @change="handleFilter()">
          <el-option
            v-for="item in saleUser"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.saleStatus" placeholder="状态" style="width: 207px;"  class="filter-item" clearable @change="handleFilter()">
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.stateName"
            :value="item.stateId">
          </el-option>
          <el-option
            v-for="item in statesOfepl"
            :key="item.value"
            :label="item.stateName"
            :value="item.stateId">
          </el-option>
        </el-select>
          <el-date-picker
            style="width :419px; vertical-align: top;"
            v-model="timeselectr1"
            @change="timeChange1"
            type="daterange"
            value-format="timestamp"
            range-separator="-"
            start-placeholder="初次沟通时间：开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        <el-date-picker
          class="filter-item"
          style="width :419px;display: inline-flex"
          v-model="timeselectr"
          @change="timeChange()"
          type="daterange"
          value-format="timestamp"
          range-separator="-"
          start-placeholder="留资时间：开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-row>
    </div>
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="search" style='margin-bottom: 0px' @click="addNew()">新增</el-button>
      <upload-excel-component class="filter-item" :on-success='handleSuccess'
                              :before-upload="beforeUpload"></upload-excel-component>
      <el-button class="filter-item" type="primary" v-waves icon="search" v-if="edit1" v-show="potentialManager_zg" style='margin-bottom: 0px' @click="edit()">分配</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="search" v-if="!edit1" v-show="potentialManager_zg" style='background:#ff9e10;border-color:#ff9e10;margin-bottom: 0px' @click="multiallocation()">确定</el-button>
    </div>
    <span v-if="!edit1">已选择 {{this.multipleSelectionAll.ids.length}} 条</span>
    <el-table :key='tableKey' @sort-change="getOrder" :data="list" @select-all="cantSelectAll" @select="ifAllocation" border fit highlight-current-row ref="table"
      style="width: 100%;margin-top: 10px"  :default-sort="{prop: propu, order: orderu}">
      <el-table-column type="selection" width="35" :selectable='checkboxInit' v-if='type'></el-table-column>
      <el-table-column align="center" prop='retentionTime' label="留资时间" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.retentionTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='type'  label="类型" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='studentSoucing'  label="来源" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.studentSoucing}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='studentName'  label="姓名">
        <template slot-scope="scope">
          <a style="color:#409EFF;" @click="goDetail(scope.row)">{{scope.row.studentName}}</a>
          <!--
          <el-tooltip class="item" effect="light" content="Top Left 提示文字" placement="top">
          </el-tooltip>
        -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop='parentMobile'  label="联系方式">
        <template slot-scope="scope">
          <span>{{scope.row.parentMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='studentAge'  label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.studentAge}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='studentGrade'  label="年级">
        <template slot-scope="scope">
          <span>{{scope.row.studentGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='studentSex'  label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.studentSex | parseSex}}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column align="center" label="可预约日期">
        <template slot-scope="scope">
          <span>{{scope.row.studentFreeTime}}</span>
        </template>
      </el-table-column>
    -->
      <el-table-column align="center" prop='invite'  label="邀约人" width="110" sortable>
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="inviteChange(scope.row)" v-if="scope.row.saleStatus < 12 && potentialManager_zg&&scope.row.invite!=''">
            <span>{{scope.row.invite}}</span>
          </el-button>
          <span v-else>{{scope.row.invite}}</span>
        </template>
      </el-table-column>
      <el-table-column w align="center" prop='reception'  label="接待人" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.reception}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='firstCommunication'  label="初次沟通时间" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.firstCommunication|parseTimeYmd}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop='saleStatus'  label="状态" width="180" sortable>
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" v-waves icon="search" style="background:#3287d0;border-color:#3287d0" @click="allocation(scope.row)" v-if="scope.row.saleStatus==0">未分配</el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==1" style="background:#81c3e9;border-color:#81c3e9"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==1">已分配</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==16" style="background:#8f82bc;border-color:#8f82bc"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==16">已电联，待定</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==18" style="background:#f39800;border-color:#f39800" 
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==18">已定金</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==2"
                     style="background:#a0a0a0;border-color:#a0a0a0"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==2">拒接/无人接听</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==3"
                     style="background:#a0a0a0;border-color:#a0a0a0"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==3">拒接/无人接听</span>
          </el-button>
          <el-button class="filter-item" v-else-if=" scope.row.saleStatus==4"
                     style="background:#959595;border-color:#959595"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==4">关机/停机</span>
          </el-button>
          <el-button class="filter-item" v-else-if=" scope.row.saleStatus==5"
                     style="background:#959595;border-color:#959595"
                     type="primary" v-waves icon="search"  @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==5">关机/停机</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==6"
                     style="background:#bfbfbf;border-color:#bfbfbf"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==6">错号/空号</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==7"
                     style="background:#bfbfbf;border-color:#bfbfbf"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==7">错号/空号</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus ==8"
                     style="background:#dfc49b;border-color:#dfc49b"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==8">已电联，无兴趣</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus ==9"
                     style="background:#e7cb9f;border-color:#e7cb9f"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==9">已电联，无时间</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus ==10"
                     style="background:#e1c9a4;border-color:#e1c9a4"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==10">已电联，距离远</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus ==11"
                     style="background:#e6d0ad;border-color:#e6d0ad"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==11">已电联，年龄不符</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==12"
                     style="background:#51c406;border-color:#51c406"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
          <span v-if="scope.row.saleStatus==12">已预约</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==13"
                     style="background:#acd598;border-color:#acd598"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==13">已预约，未签单</span>
          </el-button>
          <el-button class="filter-item" v-else-if="scope.row.saleStatus==17"
                     style="background:#89c997;border-color:#89c997"
                     type="primary" v-waves icon="search" @click="followUp(scope.row)">
            <span v-if="scope.row.saleStatus==17">已预约，未到店</span>
          </el-button>
          <el-button class="filter-item" type="primary" v-waves icon="search" 
                     style="background:#eb6100;border-color:#eb6100" @click="followUp(scope.row)" v-else-if="scope.row.saleStatus==14">
          <span>已签单</span>
          </el-button>
          <el-button class="filter-item" type="primary" v-waves icon="search"
                     style="background:#baa4c7;border-color:#baa4c7"
                     disabled @click="followUp(scope.row)" v-else>
            <span v-if="scope.row.saleStatus==15">已退款</span>
          </el-button>
        </template>
      </el-table-column>
      <!--
      <el-table-column align="center" label="操作" width="350">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="order(scope.row)" v-if="scope.row.saleStatus!=0">预约试听</el-button>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="buy(scope.row)" v-if="scope.row.saleStatus!=0">报名课程</el-button>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="goDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    -->
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <el-dialog id="invite" title="编辑邀约人" :visible.sync="dialogInvite" width="400px" center >
      <el-form label-position="right" label-width="110px" :model="newstudent" size="mini">
        <el-form-item label="潜客姓名：">{{newstudent.studentName}}</el-form-item>
        <el-form-item label="邀约人：">
          <el-select value-key="invite" placeholder="邀约人" v-model="newstudent.invite">
            <el-option
              v-for="item in saleUser"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeInvite()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog id="receiver" title="分配邀约人" :visible.sync="dialogReceiverName" width="400px" center>
      <el-form label-position="right" label-width="110px" :model="newstudent" size="mini">
        <el-form-item v-if="!multiple" label="潜客姓名：">{{newstudent.studentName}}</el-form-item>
        <el-form-item label="邀约人：">
          <el-select value-key="invite" placeholder="邀约人" v-model="newstudent.invite">
            <el-option
              v-for="item in saleUser"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeAllocation()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog id="followUp" title="潜客跟进" :visible.sync="dialogfollowUp" width="440px" center>
      <el-form label-position="right" label-width="125px" :model="followForm" size="mini">
        <el-form-item label="潜客姓名：">{{studentName}}</el-form-item>
        <el-form-item label="潜客状态：">
          <el-select placeholder="状态" v-model="buttonState1" v-if="buttonState == 1" @change='kecheng(buttonState1)'>
              <el-option
              v-for="item in dialogStates1"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-select placeholder="状态" v-model="buttonState1" v-if="buttonState>1&&buttonState<12||buttonState == 16" @change='kecheng(buttonState1)'>
            <el-option
              v-for="item in states"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.value"
            v-if="item.stateId > '1'&&item.stateId<13||item.stateId == 14|| item.stateId == 16 ||item.stateId == 18 ">
            </el-option>
          </el-select>
          <el-select placeholder="状态" v-model="buttonState1" v-if="buttonState==12" @change='kecheng(buttonState1)'>
            <el-option
              v-for="item in states"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.value"
              v-if="item.stateId==13||item.stateId==17||item.stateId==18||item.stateId==14">
            </el-option>
          </el-select>
          <el-select placeholder="状态" v-model="buttonState1" v-if="buttonState==13||buttonState==17" @change='kecheng(buttonState1)'>
            <el-option
              v-for="item in states"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.value"
              v-if="item.stateId==18||item.stateId==14||item.stateId==12">
            </el-option> -->
          <!-- </el-select> -->
          <!-- <el-select placeholder="状态" v-model="buttonState1" v-if="buttonState==14||buttonState==18" @change='kecheng(buttonState1)'>
            <el-option
              v-for="item in states"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.value"
              v-if="item.stateId==15">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-col v-if='buttonState1<12||buttonState1==16'>
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.remarkMuch"></el-input>
          </el-form-item>
          <el-form-item label="计划跟进时间：" :inline="true">
           <el-date-picker
            v-model="followForm.nextDateMuch"
            :picker-options="pickerOptions2"
            value-format="timestamp"
            type="date"
            placeholder="选择日期">
           </el-date-picker>
           <el-time-picker
              v-model="followForm.nextTimeMuch"
              placeholder="选择时间"
              value-format="HH:mm"
              format="HH:mm">
            </el-time-picker>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-show='buttonState1==12'><!--已预约-->
          <el-form-item label="试听课程：" required>
             <el-select
              v-model="followForm.courseIdYuYue"

              placeholder="请选择课程">
              <el-option id='yyuyue'
                v-for="item in course1"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId">
              </el-option>
            </el-select>
          </el-form-item>
            <!--:picker-options="pickerOptions2"-->
          <el-form-item label="试听日期：" required>
           <el-date-picker
            v-model="followForm.nextDateYuYue"
            value-format="timestamp"
            type="date"
            placeholder="选择日期">
           </el-date-picker>
          </el-form-item>
          <el-form-item label="试听时间：" required>
           <el-time-picker
              v-model="followForm.nextTimeYuYue"
              placeholder="选择时间"
              value-format="HH:mm"
              :picker-options="{
                selectableRange: '07:00:00 - 22:00:00'
              }"
              format="HH:mm">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="接待人：" required>
            <el-select multiple placeholder="请选择接待人" v-model="followForm.receptionsYuYue" @change="receptionsChange(followForm.receptionsYuYue,index)">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-show='buttonState1==17'> <!--已预约，未到店-->
          <el-form-item label="未出席原因：" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.wcxReason"></el-input>
          </el-form-item>
          <el-form-item label="下次出席时间：" required>
           <el-date-picker
            v-model="followForm.nextDate"
            :picker-options="pickerOptions2"
            value-format="timestamp"
            type="date"
            placeholder="选择日期">
           </el-date-picker>
           <el-time-picker
              v-model="followForm.nextTime"
              placeholder="选择时间"
              value-format="HH:mm"
              format="HH:mm">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="接待人：" required>
            <el-select multiple placeholder="请选择接待人" v-model="followForm.wcxReceptions" @change="receptionsChange(followForm.wcxReceptions,index)">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-show='buttonState1==13'> <!--已预约，未签单-->
          <el-form-item label="未签单原因：" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.weiRemark"></el-input>
          </el-form-item>
          <el-form-item label="接待人：" required>
            <el-select multiple placeholder="请选择接待人" v-model="followForm.weiReceptions" @change="receptionsChange(followForm.weiReceptions,index)">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-show='buttonState1==18'> <!--已定金-->
          <el-form-item label="课程：" required>
            <el-select multiple placeholder="请选择课程" v-model="followForm.courseIdDJ">
            <el-option id='ydj'
              v-for="item in course"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="签单金额：" required>
            <el-input  type="textarea" :autosize="{ minRows: 1}" v-model="followForm.qiandanDJ"></el-input>
          </el-form-item>
          <el-form-item label="定金金额：" required>
            <el-input type="textarea" :autosize="{ minRows: 1}" v-model="followForm.dingjin"></el-input>
          </el-form-item>
          <el-form-item label="意向排课时间：" required>
            <el-input type="textarea" :autosize="{ minRows: 1}" v-model="followForm.paikeTime"></el-input>
          </el-form-item>
          <el-form-item label="签单需求：" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.xuqiuDJ"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.remarkDJ"></el-input>
          </el-form-item>
          <el-form-item label="接待人：" required>
            <el-select multiple placeholder="请选择接待人" v-model="followForm.receptionsDJ" @change="receptionsChange(followForm.receptionsDJ,index)">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-show='buttonState1==14'> <!--已签单-->
          <el-form-item label="课程：" required>
           <el-select multiple placeholder="请选择课程" v-model="followForm.courseIdQD">
            <el-option id='yqd'
              v-for="item in course"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="签单金额：" required>
            <el-input type="textarea" :autosize="{ minRows: 1}" v-model="followForm.qiandan"></el-input>
          </el-form-item>
          <el-form-item label="意向排课时间：" required>
            <el-input type="textarea" :autosize="{ minRows: 1}" v-model="followForm.paike"></el-input>
          </el-form-item>
          <el-form-item label="签单需求：" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.xuqiu"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="接待人：" required>
            <el-select multiple placeholder="请选择接待人" v-model="followForm.receptionsQD" @change="receptionsChange(followForm.receptionsQD,index)">
              <el-option
                v-for="item in saleUser"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
        <el-col v-if='buttonState1==15'> <!--已退款-->
          <el-form-item label="退款金额：" required>
            <el-input type="textarea" :autosize="{ minRows: 1}" v-model="followForm.moneyTK"></el-input>
          </el-form-item>
          <el-form-item label="退款原因：" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.resonTK"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="followForm.remarkTK"></el-input>
          </el-form-item>
          <div class="dialog-footer">
             <el-button type="primary" @click="closeFollowUp()">确 定</el-button>
          </div>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div style="color:#fff">1</div>
      </div>
    </el-dialog>
    <!--
    <el-dialog id="order" title="预约试听课" :visible.sync="dialogOrder" width="420px" center>
      <el-form label-position="right" label-width="92px" :model="orderstudent" size="mini">
        <el-form-item label="学员姓名：">{{studentName}}</el-form-item>
        <el-form-item label="课程名称："  required>
          <el-select placeholder="请选择课程" v-model="orderstudent.saleBookingCourseId">
            <el-option
              v-for="item in course"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约日期：" :inline="true" required>
          <el-date-picker
            v-model="orderstudent.saleBookingDate"
            value-format="timestamp"
            :picker-options="pickerOptions2"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-select
            v-model="orderstudent.saleBookingTime"
            :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '20:00'
            }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="接待人：">
          <el-select multiple placeholder="请选择接待人" v-model="orderstudent.receptions" @change="receptionsChange(orderstudent.receptions,index)">
            <el-option
              v-for="item in saleUser"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeOrder()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog id="buy" title="购课" :visible.sync="dialogBuy" width="400px" center>
      <el-form label-position="right" label-width="110px" :model="buyCourse" size="mini">
        <el-form-item label="学员姓名：">{{studentName}}</el-form-item>
        <el-form-item label="报名课程：" required>
          <el-select
            v-model="buyCourse.courseId"
            multiple
            placeholder="请选择课程">
            <el-option
              v-for="item in course"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程费用：" required>
          <el-input v-model="buyCourse.signMoney" placeholder="请输入课程费用"></el-input>
        </el-form-item>
         <el-form-item v-if="" label="接待人：">-->
          <!--<el-input v-model="buyCourse.reception" placeholder="请输入"></el-input>-->
        <!--</el-form-item>
        <el-form-item label="意向上课时间：">
          <el-input v-model="buyCourse.courseTime" placeholder="请输入意向上课时间"></el-input>
        </el-form-item>
        <el-form-item label="签单需求：">
          <el-input v-model="buyCourse.signDemand" placeholder="请输入签单需求"></el-input>
        </el-form-item>
        <el-form-item label="接待人：" required>
          <el-select multiple v-model="buyCourse.receptions" placeholder="请选择接待人" @change="buyReceptionsChange(buyCourse.receptions,index)">
            <el-option
              v-for="item in saleUser"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="buyCourse.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeBuy()">确 定</el-button>
      </div>
    </el-dialog>
  -->
  </div>
</template>

<script>
  // import {
  //   page,
  //   getSoucing,
  //   distribution,
  //   addSaleFollow,
  //   courseList,
  //   addSaleBooking,
  //   addSaleSign,
  //   updatePotentials,
  //   getSaleUsers,
  //   updateStatusAndRecord
  // } from '@/api/market/potential/index';
  import {mapGetters} from 'vuex';
  import {formatTime1,parseTimeYmd,formatTime2} from '@/utils/index.js'
  export default {
    name: 'index',
    data() {
      return {
        buttonState:null,//按钮状态
        buttonState1:null,
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < Date.now()-24*60*60*1000;
          },
        },//选择今天以后的日期
        type: false,
        edit1: true,
        studentName:'',//姓名
        list: null,
        total: null,
        course: [],
        course1: [],
        multiple:false,//是否多个分配
        multipleSelection:[],//本页id集合
        multipleSelectionAll:{
          invite: '',
          ids: []
        },//多页id集合
        // idKey: 'id', 
          propu: undefined, 
          orderu: undefined,
        newstudent: {
          saleStatus: '',//潜客状态
          id: '',//ID
          invite: '',//邀约人
          studentBirth: '',//学生生日
          retentionTime: '',//留资时间
          studentName: ''//潜客姓名
        },
        singleAllocation: {//单个分配
          id: '',//ID
          invite: '',//邀约人
        },
        followForm: { //新增跟进
          remarkMuch:'',
          nextDateMuch:'',
          nextTimeMuch:'',

          courseIdYuYue:'',
          nextDateYuYue:'',
          nextTimeYuYue:'',
          receptionsYuYue:'',

          wcxReason:'',
          nextTime:'',
          nextDate:'',
          wcxReceptions:'',

          weiRemark:'',
          weiReceptions:'',

          courseIdDJ:[],
          qiandanDJ:'',
          dingjin:'',
          paikeTime:'',
          xuqiuDJ:'',
          remarkDJ:'',
          receptionsDJ:'',

          courseIdQD:[],
          qiandan:'',
          paike:'',
          xuqiu:'',
          remark:'',
          receptionsQD:'',

          moneyTK:'',
          resonTK:'',
          remarkTK:'',

        },
        genjin:{
          bookMoney:undefined,//定金金额 ,
          bookingDate:undefined, //试听日期 ,
          courseId:undefined,//签单课程 ,
          courseTime:undefined,//意向排课时间，待定的话为NULL ,
          attendTime:undefined, //下次出席时间 ,
          attendDate:undefined, //下次出席时间 ,
          nextFollowTime:undefined, //计划跟进时间 ,
          reason:undefined,//原因 ,
          reception:undefined,//接待人 ,
          refund:undefined,//退款 ,
          remark:undefined,//备注 ,
          saleBookingCourse:undefined,//试听课程 ,
          saleBookingCourseId:undefined, //试听课程Id ,
          saleBookingDate :undefined,
          saleBookingTime:undefined,//试听时间 ,
          saleId:undefined, //主键id ,
          saleStatus:undefined, //销售状态 ,
          signDemand:undefined,//签单需求 ,
          signMoney:undefined,//签单金额 ,
          studentName:undefined,//学员姓名
        },
        buyCourse: {
          isSign: '',
          courseId: [],
          courseTime: '',
          saleId: '',
          signMoney: '',
          signDemand: '',
          reception: '',
          remark: '',
          receptions: []
        },//购买课程
        orderstudent: {
          saleBookingCourseId: '',
          saleBookingDate: '',
          saleBookingTime: '',
          receptions: []
        },//预约试听
        timeselectr: '',
        timeselectr1:'',
        dialogfollowUp: false,//跟进框
        dialogInvite: false,//邀约人框
        dialogReceiverName: false,//分配框
        dialogOrder: false,//预约试听课框
        dialogBuy: false,//购课框
        receiverName: '',//弹框接待人
        studentState:'',//弹框潜客状态
        listQuery: {
          page: 1,
          limit: 20,
          keyword: undefined,
          invite: undefined,
          soucing: undefined,
          saleStatus: undefined,
          begin: undefined,
          end: undefined,
          reception: undefined,//接待人
          fcstart: undefined,//初次沟通时间开始
          fcend: undefined,//初次沟通时间结束
          orderBy: undefined,//排序字段
          rule: undefined,//规则 asc升序 desc降序
        },
        statesOfepl:[
            //雇员
          {
            value: 1,
            stateName: '已分配',
            stateId: '1'
          },
          {
            value: 2,
            stateName: '拒接/无人接听',
            stateId: '2'
          },
          // {
          //   value: 3,
          //   stateName: '无人接听',
          //   stateId: '3'
          // },
          {
            value: 4,
            stateName: '关机/停机',
            stateId: '4'
          },
          // {
          //   value: 5,
          //   stateName: '停机',
          //   stateId: '5'
          // },
          {
            value: 6,
            stateName: '错号/空号',
            stateId: '6'
          },
          // {
          //   value: 7,
          //   stateName: '空号',
          //   stateId: '7'
          // },
          {
            value: 16,
            stateName: '已电联，待定',
            stateId: '16'
          },
          {
            value: 8,
            stateName: '已电联，无兴趣',
            stateId: '8'
          },
          {
            value: 9,
            stateName: '已电联，无时间',
            stateId: '9'
          },
          {
            value: 10,
            stateName: '已电联，距离远',
            stateId: '10'
          },
          {
            value: 11,
            stateName: '已电联，年龄不符',
            stateId: '11'
          },
          {
            value: 12,
            stateName: '已预约',
            stateId: '12'
          },
          {
            value: 17,
            stateName: '已预约，未到店',
            stateId: '17'
          },
          {
            value: 13,
            stateName: '已预约，未签单',
            stateId: '13'
          },
          {
            value: 18,
            stateName: '已定金',
            stateId: '18'
          },
          {
            value: 14,
            stateName: '已签单',
            stateId: '14'
          },
          {
            value: 15,
            stateName: '已退款',
            stateId: '15'
          },
        ],
        states: [
          {
            value: 0,
            stateName: '未分配',
            stateId: '0'
          },
          {
            value: 1,
            stateName: '已分配',
            stateId: '1'
          },
          {
            value: 2,
            stateName: '拒接/无人接听',
            stateId: '2'
          },
          // {
          //   value: 3,
          //   stateName: '拒接/无人接听',
          //   stateId: '3'
          // },
          {
            value: 4,
            stateName: '关机/停机',
            stateId: '4'
          },
          // {
          //   value: 5,
          //   stateName: '关机/停机',
          //   stateId: '5'
          // },
          {
            value: 6,
            stateName: '错号/空号',
            stateId: '6'
          },
          // {
          //   value: 7,
          //   stateName: '错号/空号',
          //   stateId: '7'
          // },
          {
            value: 16,
            stateName: '已电联，待定',
            stateId: '16'
          },
          {
            value: 8,
            stateName: '已电联，无兴趣',
            stateId: '8'
          },
          {
            value: 9,
            stateName: '已电联，无时间',
            stateId: '9'
          },
          {
            value: 10,
            stateName: '已电联，距离远',
            stateId: '10'
          },
          {
            value: 11,
            stateName: '已电联，年龄不符',
            stateId: '11'
          },
          {
            value: 12,
            stateName: '已预约',
            stateId: '12'
          },
          {
            value: 17,
            stateName: '已预约，未到店',
            stateId: '17'
          },
          {
            value: 13,
            stateName: '已预约，未签单',
            stateId: '13'
          },
          {
            value: 18,
            stateName: '已定金',
            stateId: '18'
          },
          {
            value: 14,
            stateName: '已签单',
            stateId: '14'
          },
          {
            value: 15,
            stateName: '已退款',
            stateId: '15'
          },
        ],
        dialogStates1: [
          {
            value: 2,
            stateName: '拒接/无人接听',
            stateId: '2'
          },
          {
            value: 4,
            stateName: '关机/停机',
            stateId: '4'
          },
          {
            value: 6,
            stateName: '错号/空号',
            stateId: '6'
          },
          {
            value: 16,
            stateName: '已电联，待定',
            stateId: '16'
          },
          {
            value: 8,
            stateName: '已电联，无兴趣',
            stateId: '8'
          },
          {
            value: 9,
            stateName: '已电联，无时间',
            stateId: '9'
          },
          {
            value: 10,
            stateName: '已电联，距离远',
            stateId: '10'
          },
          {
            value: 11,
            stateName: '已电联，年龄不符',
            stateId: '11'
          },
          {
            value: 12,
            stateName: '已预约',
            stateId: '12'
          },
          {
            value: 18,
            stateName: '已定金',
            stateId: '18'
          },
          {
            value: 14,
            stateName: '已签单',
            stateId: '14'
          },
        ],
        soucingListAll:[],
        saleUser: []
      }
    },
    created(){
      // this.getListQuery()
      // this.getSoucing()
      // this.getList()
      // this.getCourseList()
      // this.getSaleUsers()
    },
    computed: {
      ...mapGetters(['elements', 'name'])
    },
    methods: {
      // kecheng(state){
      //   console.log(this.followForm)
      //   if(state ==12){
      //     this.followForm.courseIdDJ = []
      //     this.followForm.courseIdQD = []
      //   }
      //   else if(state ==14||state ==18){
      //     this.followForm.courseIdYuYue = ''
      //     this.followForm.courseIdDJ = []
      //     this.followForm.courseIdQD = []
      //   }
      // },
      //   getOrder(param){
      //           this.listQuery.page = 1
      //           if(param.column==null){
      //             this.listQuery.rule  = null
      //             this.listQuery.orderBy  = null
      //           }
      //           else{
      //               console.log(param)
      //               if(param.column.order=='ascending'){
      //                 this.listQuery.rule  = 'ASC'
      //               }
      //               else if(param.column.order=='descending'){
      //                 this.listQuery.rule  = 'DESC'
      //               }
      //               if(param.column.label=='留资时间'){
      //                 this.listQuery.orderBy  = 'retentionTime'
      //               }
      //               else if(param.column.label=='类型'){
      //                 this.listQuery.orderBy  = 'type'
      //               }
      //               else if(param.column.label=='来源'){
      //                 this.listQuery.orderBy  = 'studentSoucing'
      //               }
      //               else if(param.column.label=='状态'){
      //                   this.listQuery.orderBy  = 'saleStatus'
      //               }
      //               else if(param.column.label=='初次沟通时间'){
      //                 this.listQuery.orderBy  = 'firstCommunication'
      //               }
      //               else if(param.column.label=='接待人'){
      //                 this.listQuery.orderBy  = 'reception'
      //               }
      //               else if(param.column.label=='邀约人'){
      //                 this.listQuery.orderBy  = 'invite'
      //               }
      //           }
      //           this.getList()
      //   },
      // getListQuery(){
      //   // console.log(JSON.parse(this.$route.params.saveListQuery))
      //   if(this.$route.params.saveListQuery !== undefined ){
      //     this.listQuery = this.$route.params.saveListQuery
      //   }
      // },
      // receptionsChange(item,index){
      //   this.$set(this.followForm,item,index)
      // },
      // kecChange(item,index){
      //   this.$set(this.followForm,item,index)
      // },
      // buyReceptionsChange(item,index){
      //   this.$set(this.buyCourse,item,index)
      // },
      // edit(){
      //   this.type = true
      //   this.edit1 = false
      // },
      // //判断多选框是否可选
      // checkboxInit(row){
      //   if (row.saleStatus < 12)
      //     return 1;//可勾选
      //   else
      //     return 0;//不可勾选
      // },
      // cantSelectAll(selection){
      //   //点击全选
      //   if(this.listQuery.saleStatus==''||this.listQuery.saleStatus==undefined){
      //     this.$refs.table.clearSelection();
      //     this.$message.error('不可进行全选操作')
      //   }else if(this.listQuery.saleStatus == 0){
      //     //全选
      //     this.multipleSelection = []
      //     for(var i=0;i<selection.length;i++){
      //       this.multipleSelection.push(selection[i].id)
      //     }
      //     setTimeout(()=>{
      //       this.changePageCoreRecordData()
      //     }, 50)
      //   }else{
      //     //本页全选
      //     if(selection.length!=0){//全选
      //       this.$confirm('本页潜客已经被分配, 是否继续?', '提示', {
      //         confirmButtonText: '继续',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //       }).then(() => {
      //         this.multipleSelection = []
      //         for(var i=0;i<selection.length;i++){
      //           this.multipleSelection.push(selection[i].id)
      //         }
      //         setTimeout(()=>{
      //           this.changePageCoreRecordData()
      //         }, 50)
      //       }).catch(() => {
      //         this.$refs.table.clearSelection();
      //         this.$message({
      //           type: 'info',
      //           message: '已取消选中'
      //         });
      //       });
      //     }else{
      //       this.multipleSelection = []
      //       setTimeout(()=>{
      //         this.changePageCoreRecordData()
      //       }, 50)
      //     }
      //   }
      // },
      // //判断是否分配
      // ifAllocation(val,row){
      //   if(val[val.length-1]==row&&row.saleStatus!=0) {
      //     this.$confirm('此潜客已经被分配, 是否继续?', '提示', {
      //       confirmButtonText: '继续',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       this.multipleSelection = []
      //       for(var i=0;i<val.length;i++){
      //         this.multipleSelection.push(val[i].id)
      //       }
      //       setTimeout(()=>{
      //         this.changePageCoreRecordData()
      //       }, 50)
      //     }).catch(() => {
      //       val.pop()
      //       this.$message({
      //         type: 'info',
      //         message: '已取消选中'
      //       });
      //     });
      //   }else{
      //     this.multipleSelection = []
      //     for(var i=0;i<val.length;i++){
      //       this.multipleSelection.push(val[i].id)
      //     }
      //     setTimeout(()=>{
      //       this.changePageCoreRecordData()
      //     }, 50)
      //   }
      //   //实时记录选中的数据
      // },
      // setSelectRow() {
      //   if (!this.multipleSelectionAll.ids || this.multipleSelectionAll.ids.length <= 0) {
      //     return;
      //   }
      //   // 标识当前行的唯一键的名称
      //   let selectAllIds = [];
      //   let that = this;
      //   this.multipleSelectionAll.ids.forEach(row=>{
      //     selectAllIds.push(row);
      //   })
      //   this.$refs.table.clearSelection();
      //   for(var i = 0; i < this.list.length; i++) {
      //     if (selectAllIds.indexOf(this.list[i].id) >= 0) {
      //       // 设置选中，记住table组件需要使用ref="table"
      //       this.$refs.table.toggleRowSelection(this.list[i], true);
      //     }
      //   }
      // },
      // changePageCoreRecordData () {
      //   let that = this;
      //   // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      //   if (this.multipleSelectionAll.ids.length <= 0) {
      //     this.multipleSelectionAll.ids = this.multipleSelection
      //     return
      //   }
      //   // 总选择里面的id集合
      //   let selectAllIds = [];
      //   if(!this.multipleSelectionAll.ids){
      //     return
      //   }
      //   this.multipleSelectionAll.ids.forEach(row=>{
      //     selectAllIds.push(row);
      //   })
      //   let selectIds = []
      //   // 获取当前页选中的id
      //   if(!this.multipleSelection){
      //     return
      //   }
      //   this.multipleSelection.forEach(row=>{
      //     selectIds.push(row);
      //     // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
      //     if (selectAllIds.indexOf(row) < 0) {
      //       that.multipleSelectionAll.ids.push(row);
      //     }
      //   })
      //   let noSelectIds = [];
      //   // 得到当前页没有选中的id
      //   if(!this.list){
      //     return
      //   }
      //   this.list.forEach(row=>{
      //     if (selectIds.indexOf(row.id) < 0) {
      //       noSelectIds.push(row.id);
      //     }
      //   })
      //   if(!noSelectIds){
      //     return
      //   }
      //   noSelectIds.forEach(id=>{
      //     if (selectAllIds.indexOf(id) >= 0) {
      //       for(let i = 0; i< that.multipleSelectionAll.ids.length; i ++) {
      //         if (that.multipleSelectionAll.ids[i] == id) {
      //           // 如果总选择中有未被选中的，那么就删除这条
      //           that.multipleSelectionAll.ids.splice(i, 1);
      //           break;
      //         }
      //       }
      //     }
      //   })
      // },
      // //修改邀约人
      // inviteChange(invite) {
      //   this.dialogInvite = true
      //   this.newstudent.saleStatus = invite.saleStatus
      //   this.newstudent.id = invite.id
      //   this.newstudent.invite = invite.invite
      //   this.newstudent.studentName = invite.studentName
      // },
      // //确认更换邀约人
      // closeInvite() {
      //   this.singleAllocation.id = this.newstudent.id
      //   this.singleAllocation.invite = this.newstudent.invite
      //   distribution(this.singleAllocation)
      //     .then(response => {
      //       // this.newstudent = {}
      //       for (var x in this.newstudent) {
      //         this.newstudent[x] = '';
      //       }
      //       this.getList()
      //       this.dialogInvite = false
      //       this.$message({
      //         message: '修改邀约人成功',
      //         type: 'success'
      //       });
      //     })
      // },
      // //单个分配
      // allocation(student) {
      //   if(this.potentialManager_zg){
      //      this.multiple = false
      //      this.dialogReceiverName = true
      //      this.newstudent.saleStatus = student.saleStatus
      //      this.newstudent.id = student.id
      //      this.newstudent.invite = student.invite
      //      this.newstudent.studentName = student.studentName
      //   }
      // },
      // //多人分配
      // multiallocation() {
      //   if(this.multipleSelection.length==0){
      //     this.edit1 = true
      //     this.type = false
      //   }
      //   else{
      //     this.newstudent.invite = ''
      //     this.multiple = true
      //     this.dialogReceiverName = true
      //   }
      // },
      // //确认分配
      // closeAllocation() {
      //   if (this.newstudent.invite == '') {
      //     this.$message('请选择接待人')
      //   } else {
      //     if (this.multiple) {
      //       this.multipleSelectionAll.invite = this.newstudent.invite
      //       const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //       updatePotentials(this.multipleSelectionAll)
      //         .then(response => {
      //           loading.close();
      //           this.multipleSelection = []
      //           this.multipleSelectionAll.ids = []
      //           this.multipleSelectionAll.invite = ''
      //           this.newstudent.invite = ''
      //           this.getList()
      //           this.dialogReceiverName = false
      //           this.$message({
      //             message: '分配邀约人成功',
      //             type: 'success'
      //           });
      //           this.edit1 = true
      //           this.type = false
      //         }).catch(() => {
      //         loading.close();
      //       })
      //     } else {
      //       this.newstudent.saleStatus = 1
      //       this.singleAllocation.id = this.newstudent.id
      //       this.singleAllocation.invite = this.newstudent.invite
      //       const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //       distribution(this.singleAllocation)
      //         .then(response => {
      //           loading.close();
      //           // this.newstudent = {}
      //           for (var x in this.newstudent) {
      //             this.newstudent[x] = '';
      //           }
      //           this.getList()
      //           this.dialogReceiverName = false
      //           this.$message({
      //             message: '分配邀约人成功',
      //             type: 'success'
      //           });
      //         }).catch(() => {
      //         loading.close();
      //       })
      //     }
      //   }

      // },
      // //潜客跟进
      // followUp(student) {
      //   if(student.saleStatus==14||student.saleStatus==18){
      //     this.$message('请在“签单列表”中操作退款流程！')
      //     console.log(student)
      //   }
      //   else{
      //   for (var x in this.followForm) {
      //         this.followForm[x] = '';
      //   }
      //   for (var x in this.genjin) {
      //         this.genjin[x] = undefined;
      //   }
      //   this.dialogfollowUp = true
      //   this.genjin.saleId = student.id
      //   this.buttonState = student.saleStatus
      //   this.studentName = student.studentName
      //   this.buttonState1 = student.saleStatus == 0 ? 0 : student.saleStatus == 1 ? '已分配' :

      //            student.saleStatus == 2 ? '拒接/无人接听' :
      //            student.saleStatus == 3 ? '拒接/无人接听' :
      //            student.saleStatus == 4 ? '关机/停机' :
      //            student.saleStatus == 5 ? '关机/停机' :
      //            student.saleStatus == 6 ? '错号/空号' :
      //            student.saleStatus == 7 ? '错号/空号' :
      //            student.saleStatus == 8 ? '已电联，无兴趣' :
      //            student.saleStatus == 9 ? '已电联，无时间' :
      //            student.saleStatus == 10 ? '已电联，距离远' :
      //            student.saleStatus == 11 ? '已电联，年龄不符' :
      //            student.saleStatus == 12 ? '已预约' :
      //            student.saleStatus == 13 ? '已预约，未签单' :
      //            student.saleStatus == 14 ? '已签单' :
      //            student.saleStatus == 15 ? '已退款' :
      //            student.saleStatus == 16 ? '已电联，待定' :
      //            student.saleStatus == 17 ? '已预约，未到店' :
      //            student.saleStatus == 18 ? '已定金' :''
      //            /*

      //            student.saleStatus == 2 ? 2 :
      //            student.saleStatus == 3 ? 3 :
      //            student.saleStatus == 4 ? 4 :
      //            student.saleStatus == 5 ? 5 :
      //            student.saleStatus == 6 ? 6 :
      //            student.saleStatus == 7 ? 7 :
      //            student.saleStatus == 8 ? 8 :
      //            student.saleStatus == 9 ? 9 :
      //            student.saleStatus == 10 ? 10 :
      //            student.saleStatus == 11 ? 11 :
      //            student.saleStatus == 12 ? '已预约' :
      //            student.saleStatus == 13 ? '已预约，未签单' :
      //            student.saleStatus == 14 ? '已签单' :
      //            student.saleStatus == 15 ? 15 :
      //            student.saleStatus == 16 ? 16 :
      //            student.saleStatus == 17 ? '已预约，未到店' :
      //            student.saleStatus == 18 ? '已定金' :''
      //            */
      //            console.log(this.buttonState1)
      //            console.log(this.buttonState)
      //   if(student.reception==''||student.reception==null){
      //     if(student.invite==''||student.invite==null){
      //     }
      //     else{
      //     this.followForm.receptionsYuYue = student.invite.split('/')
      //     this.followForm.wcxReceptions = student.invite.split('/')
      //     this.followForm.weiReceptions = student.invite.split('/')
      //     this.followForm.receptionsDJ = student.invite.split('/')
      //     this.followForm.receptionsQD = student.invite.split('/')
      //     }
      //   }
      //   else{
      //     this.followForm.receptionsYuYue = student.reception.split('/')
      //     this.followForm.wcxReceptions = student.reception.split('/')
      //     this.followForm.weiReceptions = student.reception.split('/')
      //     this.followForm.receptionsDJ = student.reception.split('/')
      //     this.followForm.receptionsQD = student.reception.split('/')
      //   }
      //   }
      // },
      // //提交跟进
      // closeFollowUp() {
      //   if(/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(this.buttonState1)){
      //     this.genjin.saleStatus = this.buttonState1
      //   }
      //   else{
      //     this.genjin.saleStatus = this.buttonState1 == '已分配' ?  1:
      //            this.buttonState1 ==  '已预约' ? 12:
      //            this.buttonState1 == '已预约，未签单' ? 13 :
      //            this.buttonState1 == '已签单' ? 14 :
      //            this.buttonState1 == '已预约，未到店' ? 17 :
      //            this.buttonState1 == '已定金'? 18  :''
      //   }
      //   if(this.genjin.saleStatus==12){//已预约
      //     if(this.followForm.courseIdYuYue==''){
      //       this.$message('请选择课程')
      //       return;
      //     }
      //     if(this.followForm.nextDateYuYue==''){
      //       this.$message('请选择试听日期')
      //       return;
      //     }
      //     if(this.followForm.nextTimeYuYue==''){
      //       this.$message('请选择试听时间')
      //       return;
      //     }
      //     if(this.followForm.receptionsYuYue==''){
      //       this.$message('请选择接待人')
      //       return;
      //     }
      //     this.genjin.saleBookingCourseId  = this.followForm.courseIdYuYue
      //     this.genjin.saleBookingDate = this.followForm.nextDateYuYue
      //     this.genjin.saleBookingTime = this.followForm.nextTimeYuYue
      //     this.genjin.reception = this.followForm.receptionsYuYue.join('/')
      //   }
      //   else if(this.genjin.saleStatus==17){//已预约，未到店
      //     if(this.followForm.wcxReason==''){
      //       this.$message('请输入未出席原因')
      //       return;
      //     }
      //     if(this.followForm.nextDate==''){
      //       this.$message('请选择下次出席日期')
      //       return;
      //     }
      //     if(this.followForm.nextTime==''){
      //       this.$message('请选择出席时间')
      //       return;
      //     }
      //     if(this.followForm.wcxReceptions==''){
      //       this.$message('请选择接待人')
      //       return;
      //     }
      //     this.genjin.reason  = this.followForm.wcxReason
      //     this.genjin.attendDate = this.followForm.nextDate
      //     this.genjin.attendTime = this.followForm.nextTime
      //     this.genjin.reception = this.followForm.wcxReceptions.join('/')
      //   }
      //   else if(this.genjin.saleStatus==13){//已预约，未签单
      //     if(this.followForm.weiRemark==''){
      //       this.$message('请输入未签单原因')
      //       return;
      //     }
      //     if(this.followForm.weiReceptions==''){
      //       this.$message('请选择接待人')
      //       return;
      //     }
      //     this.genjin.reason  = this.followForm.weiRemark
      //     this.genjin.reception = this.followForm.weiReceptions.join('/')
      //   }
      //   else if(this.genjin.saleStatus==18){//已定金
      //     if(this.followForm.courseIdDJ==''){
      //       this.$message('请选择课程')
      //       return;
      //     }
      //     if(this.followForm.qiandanDJ==''){
      //       this.$message('请输入签单金额')
      //       return;
      //     }
      //     if(this.followForm.dingjin==''){
      //       this.$message('请输入定金金额')
      //       return;
      //     }
      //     if(this.followForm.paikeTime==''){
      //       this.$message('请输入意向排课时间')
      //       return;
      //     }
      //     if(this.followForm.xuqiuDJ==''){
      //       this.$message('请输入签单需求')
      //       return;
      //     }
      //     if(this.followForm.receptionsDJ==''){
      //       this.$message('请选择接待人')
      //       return;
      //     }
      //     this.genjin.courseId  = this.followForm.courseIdDJ
      //     this.genjin.signMoney = this.followForm.qiandanDJ
      //     this.genjin.bookMoney = this.followForm.dingjin
      //     this.genjin.courseTime  = this.followForm.paikeTime
      //     this.genjin.signDemand = this.followForm.xuqiuDJ
      //     this.genjin.remark = this.followForm.remarkDJ
      //     this.genjin.reception = this.followForm.receptionsDJ.join('/')
      //   }
      //   else if(this.genjin.saleStatus==14){//已签单
      //     if(this.followForm.courseIdQD==''){
      //       this.$message('请选择课程')
      //       return;
      //     }
      //     if(this.followForm.qiandan==''){
      //       this.$message('请输入签单金额')
      //       return;
      //     }
      //     if(this.followForm.paike==''){
      //       this.$message('请输入意向排课时间')
      //       return;
      //     }
      //     if(this.followForm.xuqiu==''){
      //       this.$message('请输入签单需求')
      //       return;
      //     }
      //     if(this.followForm.receptionsQD==''){
      //       this.$message('请选择接待人')
      //       return;
      //     }
      //     this.genjin.courseId  = this.followForm.courseIdQD
      //     this.genjin.signMoney = this.followForm.qiandan
      //     this.genjin.courseTime  = this.followForm.paike
      //     this.genjin.signDemand = this.followForm.xuqiu
      //     this.genjin.remark = this.followForm.remark
      //     this.genjin.reception = this.followForm.receptionsQD.join('/')
      //   }
      //   else if(this.genjin.saleStatus==15){//已退款
      //     if(this.followForm.moneyTK==''){
      //       this.$message('请输入退款金额')
      //       return;
      //     }
      //     if(this.followForm.resonTK==''){
      //       this.$message('请输入退款原因')
      //       return;
      //     }
      //     this.genjin.refund  = this.followForm.moneyTK
      //     this.genjin.reason = this.followForm.resonTK
      //     this.genjin.remark = this.followForm.remarkTK
      //   }
      //   else{//一堆
      //     this.genjin.remark = this.followForm.remarkMuch
      //     this.genjin.followDate= this.followForm.nextDateMuch
      //     this.genjin.nextFollowTime = this.followForm.nextTimeMuch
      //   }
      //   console.log(this.followForm)
      //   const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //   updateStatusAndRecord(this.genjin)
      //     .then(reponse => {
      //       loading.close();
      //       this.studentName = ''
      //       // this.followForm = {}
      //       for (var x in this.followForm) {
      //         this.followForm[x] = '';
      //       }
      //       for (var x in this.genjin) {
      //         this.genjin[x] = undefined;
      //       }
      //       this.dialogfollowUp = false
      //       this.$message({
      //         message: '潜客跟进提交成功',
      //         type: 'success'
      //       });
      //       this.getList()

      //     }).catch(() => {
      //     loading.close();
      //   })
      // },
      // //预约试听
      // order(student) {
      //   this.dialogOrder = true
      //   // this.orderstudent = {}
      //   for (var x in this.orderstudent) {
      //     this.orderstudent[x] = '';
      //   }
      //   this.studentName = student.studentName
      //   this.orderstudent.saleId = student.id
      //   this.orderstudent.receptions = [this.name]
      // },
      // //新增预约试听
      // closeOrder(){
      //   if(this.orderstudent.saleBookingCourseId == ''){
      //     this.$message('请选择课程')
      //   }else if(this.orderstudent.saleBookingDate == ''){
      //     this.$message('请选择试听日期')
      //   }else if(this.orderstudent.saleBookingTime == ''){
      //     this.$message('请选择试听时间')
      //   }else {
      //     this.orderstudent.reception = this.orderstudent.receptions.join('/')
      //     delete this.orderstudent.receptions
      //     addSaleBooking(this.orderstudent)
      //       .then(response => {
      //         this.dialogOrder = false
      //         this.studentName = ''
      //         this.$message({
      //           message: '预约试听添加成功',
      //           type: 'success'
      //         });
      //         this.getList()
      //       })
      //   }

      // },
      // //购课
      // buy(student) {
      //   this.dialogBuy = true
      //   this.buyCourse.courseId = []
      //   this.buyCourse.courseTime = ''
      //   this.buyCourse.receptions = [this.name]
      //   this.buyCourse.signMoney = ''
      //   this.buyCourse.signDemand = ''
      //   this.buyCourse.saleId = student.id
      //   this.studentName = student.studentName
      // },
      // closeBuy(){
      //   this.buyCourse.reception = this.buyCourse.receptions.join('/')
      //   delete this.buyCourse.receptions
      //   if(this.buyCourse.courseId.length==0){
      //     this.$message('请选择课程名称')
      //   }else if(this.buyCourse.signMoney==''){
      //     this.$message('请填写课程费用')
      //   }else if(this.buyCourse.reception == ''){
      //     this.$message('请选择接待人')
      //   }else {
      //     addSaleSign(this.buyCourse)
      //       .then(response => {
      //         this.dialogBuy = false
      //         this.studentName = ''
      //         this.$message({
      //           message: '购课成功',
      //           type: 'success'
      //         });
      //         this.getList()
      //       })
      //   }

      // },

      // //页面跳转
      // //新增潜客
      // addNew() {
      //   this.$router.push('potentialManager/addPotential')
      // },
      // //详情
      // goDetail(item) {
      //   // this.$router.push('potentialManager/potentialDetail?id=' + id)
      //   const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //   this.$router.push({
      //     'path': '/marketManager/potentialManager/potentialDetail',
      //     'query': {
      //       id: item.id,
      //       status: item.saleStatus,
      //       studentName: item.studentName,
      //       saveListQuery: encodeURIComponent(JSON.stringify(this.listQuery)),
      //       fatherPage:'index'
      //     }
      //   })
      //   loading.close();
      // },
      // getSoucing(){
      //   //来源
      //   getSoucing()
      //     .then(response => {
      //       this.soucingListAll = response.data
      //     }).catch(() => {
      //     // loading.close();
      //   })
      // },
      // getSaleUsers(){
      //   getSaleUsers()
      //     .then(response => {
      //       this.saleUser = response.data
      //     })
      // },
      // //课程信息
      // getCourseList(){
      //     let data = {
      //       page : 1,
      //       isvalid:0,
      //       limit:99999999
      //     }
      //   courseList(data)
      //     .then(response => {
      //       let aaa=[]
      //       let bbbb= []
      //       aaa = response.data.rows
      //       bbbb = response.data.rows
      //       this.course1 = aaa
      //       this.course = bbbb
      //     })
      // },
      getList() {
      //   //潜客列表分页
      //   const loading = this.$loading({lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.5)'})
      //   this.listLoading = true;  
      //   this.listQuery.keyword == '' ? this.listQuery.keyword = undefined : this.listQuery.keyword
      //   this.listQuery.saleStatus == '' ? this.listQuery.saleStatus = undefined : this.listQuery.saleStatus
      //   this.listQuery.soucing == '' ? this.listQuery.soucing = undefined : this.listQuery.soucing
      //   this.listQuery.begin == '' ? this.listQuery.begin = undefined : this.listQuery.begin
      //   this.listQuery.end == '' ? this.listQuery.end = undefined : this.listQuery.end
      //   this.listQuery.invite == '' ? this.listQuery.invite = undefined : this.listQuery.invite
      //   this.listQuery.reception == '' ? this.listQuery.reception = undefined : this.listQuery.reception
      //   this.listQuery.fcstart == '' ? this.listQuery.fcstart = undefined : this.listQuery.fcstart
      //   this.listQuery.fcend == '' ? this.listQuery.fcend = undefined : this.listQuery.fcend
      //   this.listQuery.orderBy == '' ? this.listQuery.orderBy = undefined : this.listQuery.orderBy
      //   this.listQuery.rule == '' ? this.listQuery.rule = undefined : this.listQuery.rule 
      //   this.propu = this.listQuery.orderBy  
      //   if(this.listQuery.rule=='ASC'){
      //     this.orderu = 'ascending'  
      //   }
      //   else if(this.listQuery.rule=='DESC'){ 
      //     this.orderu = 'descending'
      //   } 
      //   console.log(this.orderu,this.propu)
      //   console.log(this.returnsort)
      //   page(this.listQuery)
      //     .then(response => {
      //       loading.close();
      //       this.list = response.data.rows;
      //       this.total = response.data.total;
      //       if(this.total==0){
      //         this.listLoading = true;
      //       }
      //       else{
      //         this.listLoading = false;
      //       }
      //       for (var i = 0; i < this.list.length; i++) {
      //         this.list[i].retentionTime = formatTime2(this.list[i].retentionTime)
      //       }
      //       setTimeout(()=>{
      //         this.setSelectRow();
      //       }, 50)
      //     }).catch(() => {
      //      loading.close();
      //   })
      },
      // //选择时间筛选
      // timeChange() {
      //   /*
      //   this.listQuery.page=0;
      //   this.multipleSelectionAll = []
      //   this.multipleSelection = []
      //   if(this.timeselectr!=null){
      //     this.listQuery.begin=this.timeselectr[0]/1000
      //     this.listQuery.end=this.timeselectr[1]/1000
      //   }
      //   else{
      //     this.listQuery.begin=''
      //     this.listQuery.end=''
      //   }
      //   this.getList()
      //   */
      //   this.listQuery.page=0;
      //     this.listQuery.begin = this.timeselectr ? this.timeselectr[0] / 1000 : null
      //     this.listQuery.end = this.timeselectr ? this.timeselectr[1] / 1000+86400 : null
      //     this.getList()
      // },
      // timeChange1(){
      //   this.listQuery.page=0;
      //     this.listQuery.fcstart = this.timeselectr1 ? this.timeselectr1[0] / 1000 : null
      //     this.listQuery.fcend = this.timeselectr1 ? this.timeselectr1[1] / 1000+86400 : null
      //     this.getList()
      // },
      handleFilter() {
      //   this.multipleSelectionAll.ids = []
      //   this.multipleSelectionAll.invite = ''
      //   this.multipleSelection = []
      //   console.log(this.listQuery)
      //   this.getList()
      },
      // handleSizeChange(val) {
      //   this.listQuery.limit = val
      //   this.list = []
      //   this.getList()
      // },
      // handleCurrentChange(val) {
      //   this.changePageCoreRecordData();
      //   this.listQuery.page = val
      //   this.list = []
      //   this.getList()
      // },
    }
  }

</script>

<style type="text/css">
  #receiver .el-dialog--center .el-dialog__body,#invite .el-dialog--center .el-dialog__body {
    padding: 0 0 0 95px;
  }
  #buy .el-dialog--center .el-dialog__body {
    padding: 0 0 0 50px;
  }
  #order .el-dialog--center .el-dialog__body,#followUp .el-dialog--center .el-dialog__body {
    padding: 0 0 0 25px;
  }
  #buy .el-input--mini {
     width: 200px;
   }
  #receiver .el-input--mini,#invite .el-input--mini {
    width: 100px;
  }
  #order .el-input--mini {
    width: 130px;
  }
  #potential .el-dialog__wrapper{
    top: 40px;
  }
  #potential .el-dialog__body p{
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 18px;
    line-height: 28px;
  }
  #followUp .el-textarea,#followUp .el-select{
    width:88%;
  }
  #followUp .el-date-editor{
     width: 130px;
   }
   #followUp .dialog-footer{
      margin: 0 auto;
      width: 75px;
   }
  #potential .el-dialog__title{
    font-weight: bold;
    font-size: 20px;
  }
  #potential .el-dialog__header{
    padding: 20px;
  }
</style>
