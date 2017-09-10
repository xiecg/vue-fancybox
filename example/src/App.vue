<template>
  <div id="app" class="view-wrapper">
    <ul>
      <li><router-link to="/baseUsage">baseUsage</router-link></li>
      <li><router-link to="/fancyboxThumbnail">v-fancybox-thumbnail</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.view-wrapper ul {
  padding: 0;
  display: flex;
  list-style-type: none;
  justify-content: space-between;
}

.view-wrapper ul a {
  color: #2c3e50;
  font-size: 20px;
}

.imageList {
  display: flex;
  flex-wrap: wrap;
}

</style>
