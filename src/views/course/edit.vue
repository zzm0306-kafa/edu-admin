<template>
  <div class="edit-course">
    <create-or-edit is-edit :courseId="courseId"></create-or-edit>
  </div>
</template>
<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'EditCourse',
  components: {
    CreateOrEdit
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
