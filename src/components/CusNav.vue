<template>
  <ul>
    <li class="active" @click="navTo('eat')">
      <img src="../assets/eat.png" alt="">
      饭票
    </li>
    <li @click="navTo('play')">
      <img src="../assets/play.png" alt="">
      娱乐
    </li>
    <li @click="navTo('traffic')">
      <img src="../assets/traffic.png" alt="">
      出行
    </li>
    <li @click="navTo('health')">
      <img src="../assets/health.png" alt="">
      健康
    </li>
  </ul>
</template>

<script>
export default {
  name: 'cusNav',
  methods: {
    navTo(type) {
      if (type === 'eat') {
        
      }
    }
  }
}
</script>

<style scoped>
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    padding-top: 10px;
    text-align: center;
    border-bottom: 1px solid #d4d4d4;
    position: relative;
  }
  img {
    height: 20px;
    margin: auto;
    margin-bottom: 8px;
    display: block;
  }
  ul > li {
    flex: 1;
    position: relative;
    padding-bottom: 10px;
  }
  .active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(50%);
    width: 100%;
    height: 4px;
    background-color: #ffa067;

  }
</style>


