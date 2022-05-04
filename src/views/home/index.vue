<template>
  <div class="home">
    <el-carousel indicator-position="none" height="475px">
      <el-carousel-item v-for="item in adsImgList" :key="item.id">
        <img :src="item.img" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getAllAds } from '@/services/home'
export default {
  name: 'HomeIndex',
  data () {
    return {
      adsList: []
    }
  },
  created () {
    this.loadAdsList()
  },
  methods: {
    async loadAdsList () {
      const { data } = await getAllAds({
        spaceKeys: 999
      })
      this.adsList = data.content[0].adDTOList
    }
  },
  computed: {
    adsImgList () {
      return this.adsList.filter(item => item.status === 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
