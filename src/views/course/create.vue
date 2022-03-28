<template>
  <div class="create-course">
    <el-card>
      <div slot="header" class="clearfix">
        <el-steps
          :active="activeNum"
          finish-status="success"
          simple
          style="margin-top: 20px"
        >
          <el-step
            v-for="(item, i) in activeMessage"
            :key="item.id"
            :title="item.title"
            @click.native="activeNum = i"
          ></el-step>
        </el-steps>
      </div>
      <el-form label-width="80px">
        <!-- 步骤对应的表单结构 -->
        <div v-show="activeNum === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input  v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="course.previewFirstField"
              placeholder="概述1"
              style="width: 49%;min-width: 300px; margin-right: 15px;">
              <template slot="append">{{ course.previewFirstField.length }}/20</template>
              </el-input>
            <el-input
              v-model="course.previewSecondField"
              placeholder="概述2"
              style="width: 49%;min-width: 300px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <template>
              <el-input-number controls-position="right" v-model="course.sortNum"></el-input-number>
            </template>
          </el-form-item>
        </div>
        <!-- 课程封面 -->
        <div v-show="activeNum === 1">
          <el-form-item label="课程封⾯">
            <create-image
              v-model="course.courseListImg"></create-image>
          </el-form-item>
          <el-form-item label="解锁封⾯">
            <create-image v-model="course.courseImgUrl"></create-image>
          </el-form-item>
        </div>
        <!-- 销售信息 -->
        <div v-show="activeNum === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="course.discounts"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="商品原价"
            ><el-input v-model="course.price"
              ><template slot="append">元</template></el-input
            ></el-form-item
          >
          <el-form-item label="销量"
            ><el-input v-model="course.discountsTag"
              ><template slot="append">单</template></el-input
            ></el-form-item
          >
          <el-form-item label="活动标签"><el-input v-model="course.priceTag"></el-input></el-form-item>
        </div>
        <!-- 秒杀活动 -->
        <div v-show="activeNum === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="isSeckill"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="isSeckill">
            <el-form-item label="开始时间">
              <el-date-picker type="datetime" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker type="datetime" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="秒杀库存"
              ><el-input
                ><template slot="append">件</template></el-input
              ></el-form-item
            >
          </template>
        </div>
        <div v-show="activeNum === 4">
          <el-form-item label="课程详情">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeNum !== activeMessage.length - 1" class="btn">
          <el-button @click="activeNum++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import { getsaveOrUpdateCourse } from '@/services/course'
import CreateImage from './components/CreateImage'
export default {
  name: 'CreateCourse',
  components: {
    CreateImage
  },
  data () {
    return {
      activeNum: 0,
      activeMessage: [
        { id: 1, title: '基本信息' },
        { id: 2, title: '课程封面' },
        { id: 3, title: '销售信息' },
        { id: 4, title: '秒杀信息' },
        { id: 5, title: '课程详情' }
      ],
      isSeckill: false,
      course: {
        id: 0,
        // 课程名称
        courseName: '',
        // 课程介绍
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          // 讲师名称
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          // 讲师介绍
          description: ''
        },
        // 课程详情内容
        courseDescriptionMarkDown: '',
        // 商品原价
        price: 0,
        // 售卖价格
        discounts: 0,
        // 活动标签
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        // 课程封面地址
        courseListImg: '',
        // 解锁封面地址
        courseImgUrl: '',
        sortNum: 0,
        // 概述1
        previewFirstField: '',
        // 概述2
        previewSecondField: '',
        // 课程排序
        status: 0,
        sales: 0,
        // 上架状态，默认值 0 代表不上架，1 代表上架
        activityCourse: true,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          // 秒杀活动开始时间
          beginTime: '',
          endTime: '',
          // 秒杀活动价格
          amount: 0,
          // 秒杀库存
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  }
}
</script>
<style lang="scss">
.btn .el-button {
  margin-left: 90%;
}
</style>
