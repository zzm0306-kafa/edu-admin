<template>
  <div class="course-section">
    <el-card>
      <el-tree
      :data="section"
      :props="defaultProps"
      draggable
    ></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson } from '@/services/course-section'
export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      section: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created () {
    // 加载内容章节信息
    this.LoadSection()
  },
  methods: {
    async LoadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      console.log(data)
      this.section = data.data
    }
  }
}
</script>
<style lang="scss">
</style>
