<template>
    <div class="edit">
        <create-or-edit :isEdit="true"></create-or-edit>
    </div>
</template>
<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'EditMenu',
  components: {
    CreateOrEdit
  }
}
</script>
<style lang="scss" scoped></style>
