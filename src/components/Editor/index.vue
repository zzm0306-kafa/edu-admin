<template>
   <div ref="editor" class="text-editor"></div>
</template>
<script>
import E from 'wangeditor'
import { uploadCourse } from '@/services/course'
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async (basefile, baselist) => {
        const fd = new FormData()
        // basefile是数组来的
        fd.append('file', basefile[0])
        const { data } = await uploadCourse(fd)
        if (data.code === '000000') {
          baselist(data.data.name)
        }
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
}
</script>
