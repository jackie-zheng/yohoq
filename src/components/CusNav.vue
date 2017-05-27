<template>
  <ul id="nav">
    <li @click="navTo('eat')" :class="{active: params.eatNav}">
      <img src="../assets/eat.png" alt="">
      饭票
    </li>
    <li @click="navTo('play')" :class="{active: params.playNav}">
      <img src="../assets/play.png" alt="">
      娱乐
    </li>
    <li @click="navTo('traffic')" :class="{active: params.trafficNav}">
      <img src="../assets/traffic.png" alt="">
      出行
    </li>
    <li @click="navTo('health')" :class="{active: params.healthNav}">
      <img src="../assets/health.png" alt="">
      健康
    </li>
  </ul>
</template>

<script>
import scrollTo from 'animated-scrollto'
import bus from '../services/bus'
function listenFixed() {
  let navElem = document.getElementById('nav')
  let navH = navElem.offsetHeight
  bus.$on('toFixed', () => {
    navElem.classList.add('toFixed')
    navElem.nextElementSibling.style.marginTop = navH + 'px'
  })
  bus.$on('loose', () => {
    navElem.classList.remove('toFixed')
    navElem.nextElementSibling.style.marginTop = '0'
  })
}
function listenArea() {
  let elems = document.getElementById('nav').children
  Array.prototype.forEach.call(elems, (item, index) => {
    bus.$on('area' + (index + 1), () => {
      Array.prototype.forEach.call(elems, (item) => {
        item.classList.remove('active')
      })
      item.classList.add('active')
    })
  })
}
export default {
  name: 'cusNav',
  data() {
    return  {
      params: {
        eatNav: true,
        playNav: false,
        trafficNav: false,
        healthNav: false
      }
    }
  },
  methods: {
    navTo(type) {
      // Object.keys(this.params).forEach( (key) => {
      //   this.params[key] = false
      // })
      if (type === 'eat') {
        // this.params.eatNav = true
        let dis = bus.axis.eat - bus.axis.navH - bus.axis.searchH
        scrollTo(document.body, dis - 10, 300)
      }
      if (type === 'play') {
        // this.params.playNav = true
        let dis = bus.axis.play - bus.axis.navH - bus.axis.searchH
        scrollTo(document.body, dis - 10, 300)
      }
      if (type === 'traffic') {
        // this.params.trafficNav = true
        let dis = bus.axis.traffic - bus.axis.navH - bus.axis.searchH
        scrollTo(document.body, dis - 10, 300)
      }
      if (type === 'health') {
        // this.params.healthNav = true
        let dis = bus.axis.health - bus.axis.navH - bus.axis.searchH
        scrollTo(document.body, dis - 10, 300)
      }
    }
  },
  mounted() {
    listenFixed()
    listenArea()
  }
}
</script>

<style scoped>
  .toFixed {
    position: fixed;
    top: 38px;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    padding-top: 10px;
    text-align: center;
    border-bottom: 1px solid #d4d4d4;
    position: relative;
    background-color: white;
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


