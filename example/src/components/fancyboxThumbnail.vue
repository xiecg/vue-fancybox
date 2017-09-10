<template>
  <div>
    <div class="imageList">
      <div class="list" v-for="(n, index) in imageList" v-fancybox-thumbnail="[n.width, n.height]" :data-index="index">
        <img @click="open($event)" :src="n.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>

import fancyBox from '@/fancybox/index';
// import fancyBox from 'vue-fancybox';

export default {
  data() {
    return {
     imageList: [
        {width: 900,height: 675,url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg'},
        {width: 601,height: 1024,url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg'},
        {width: 1024,height: 700,url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg'},
        {width: 1366,height: 768,url: 'http://ocm0knkb1.bkt.clouddn.com/1-4.jpg'},
        {width: 1920,height: 1200,url: 'http://ocm0knkb1.bkt.clouddn.com/1-5.jpg'},
        {width: 500,height: 750,url: 'http://ocm0knkb1.bkt.clouddn.com/1-6.jpg'},
        {width: 2560,height: 1714,url: 'http://ocm0knkb1.bkt.clouddn.com/1-7.jpg'},
        {width: 1920,height: 1200,url: 'http://ocm0knkb1.bkt.clouddn.com/1-8.jpg'},
        {width: 1920,height: 1200,url: 'http://ocm0knkb1.bkt.clouddn.com/1-9.jpg'},
        {width: 286,height: 220,url: 'http://ocm0knkb1.bkt.clouddn.com/1-10.jpg'},
        {width: 1024,height: 1024,url: 'http://ocm0knkb1.bkt.clouddn.com/1-12.jpg'}
      ]
    }
  },
  mounted: function() {},
  methods: {
    open (e) {
      fancyBox(e.target, this.imageList);
    }
  }
}
</script>

<style scoped>
  .list {
    overflow: hidden;
    height: 60px;
    width: 60px;
    margin: 30px 10px 0 0;
  }
</style>
