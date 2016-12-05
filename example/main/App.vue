<template>
  <div class="view-wrapper">
    <ul>
      <li><router-link to="/baseUsage">baseUsage</router-link></li>
      <li><router-link to="/fancyboxThumbnail">v-fancybox-thumbnail</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>

import baseUsage from './component/baseUsage.vue';

import fancyboxThumbnail from './component/fancyboxThumbnail.vue';

export default {
  data () {
    return {}
  },
  components: { baseUsage, fancyboxThumbnail }
}

</script>

<style>

  .view-wrapper ul {
    padding: 0;
    display: flex;
    list-style-type: none;
    justify-content: space-between;

    a {
      color: #000;
      text-decoration: none;
    }
  }

  .imageList {
    display: flex;
    flex-wrap: wrap;
  }
</style>
