<template>
  <div class="create-image">
    <!-- 进度条 -->
    <el-progress
      v-if="isUploding"
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
      :width="178">
    </el-progress>
    <!-- 图片上传 -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="handUpload"
    >
      <img
        v-if="value"
        :src="value"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { uploadCourse } from '@/services/course'
export default {
  props: {
    value: {
      type: String
    },
    // 图片大小
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      // 保存下载状态
      isUploding: false,
      percentage: 0
    }
  },
  name: 'CreateImage',
  methods: {
    async handUpload (option) {
      const fd = new FormData()
      this.isUploding = true
      fd.append('file', option.file)
      const { data } = await uploadCourse(fd, (event) => {
        this.percentage = Math.floor(event.loaded / event.total * 100)
      })
      if (data.code === '000000') {
        this.$emit('input', data.data.name)
        this.$message.success('上传成功')
        this.isUploding = false
        this.percentage = 0
      }
    },
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过${this.limit}MB!`)
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.btn .el-button {
  margin-left: 90%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
