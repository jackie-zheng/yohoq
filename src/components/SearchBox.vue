<template>
  <div class="wrapper-searchBox">
    <div class="search-ct">
      <div class="search-btn-ct" @click="showSearchBox">
        <div class="search-box">
          <div class="search-btn"><img src="../assets/searchBox.png" alt="搜索"></div>
          <span>请输入搜索内容</span>
        </div>
        <!--<div class="search-btn">
          <img src="../assets/searchBox.png" alt="搜索">
        </div>-->
      </div>
      <div v-show="showBox" class="search-box-ct">
        <div class="exit" onclick="history.back()"><img src="../assets/arrow-left.png" alt="退出" ></div>
        <div class="search-box" v-show="showBox">
          <div class="search-btn"><img src="../assets/searchBox.png" alt="搜索"></div>
          <input type="text" placeholder="请输入搜索内容" size="1" v-model="content" v-focus="focused">
          <div class="clear-btn" @click="clearContent" v-if="content"><img src="../assets/clear.png" alt="清除"></div>
          <!--<div class="search" @click="searchKey"><img src="../assets/arrow.png" alt="确认"></div>-->
        </div>
        <div class="search" @click="searchKey">搜索</div>
      </div>
      <div class="mask" v-show="showBox">
        <list-item :item="data" v-for="(data, index) in filtedData" :key="index" class="list-item"></list-item>
        <div class="none" v-if="showError">
          <p>您要找的东西不在图图这里</p>
          <p>图图会努力添加更多新品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { focus } from 'vue-focus'
import ListItem from './ListItem'
import itemsData from '../services/itemsData'
let cacheScrollTop
export default {
  name: 'searchBox',
  data() {
    return {
      showBox: false,
      content: '',
      filtedData: [],
      focused: true,
      result: false,
      showError: false
    }
  },
  watch: {
    showBox(newValue) {
      if (!newValue) {
        this.clearContent()
        this.focused = false
        this.showError = false
        document.body.classList.remove('scrollFixed')
      } else {
        this.focused = true
        document.body.classList.add('scrollFixed')
        
      }
    },
    content(newValue) {
      if (!newValue) this.showError = false
    }
  },
  components: {
    ListItem
  },
  directives: {
    focus,
  },
  methods: {
    showSearchBox() {
      history.pushState('search', '', '')
      this.showBox = true
    },
    searchKey() {
      // this.focused = false
      this.filtedData = []
      for (let key in itemsData) {
        let items = itemsData[key]
        let filtedArr = items.filter( (item) => {
          let regexp = new RegExp(this.content || 'wrong')
          if (regexp.test(item.title)) return true
        })
        this.filtedData.push(...filtedArr)
        this.showError = this.filtedData[0] ? false : true 
      }
    },
    clearContent() {
      this.content = ''
      this.filtedData = []
    }
  },
  mounted() {
    window.onpopstate = (e) => {
      if (history.state === 'search') {
        this.showBox = true
      } else {
        this.showBox = false
      }
    }
  }
}
</script>

<style>
  .scrollFixed {
    overflow: hidden;
    position: fixed;
  }
</style>
<style scoped>
  
  .wrapper-searchBox .exit:active::after,
  .wrapper-searchBox .search:active::after {
    background-color: #bbceea
  }
  input {
    font-size: 14px;
  }
  .none {
    text-align: center;
    background-color: white;
    margin: 0 20px;
    margin-top: 10px;
    padding: 20px 0;
  }
  .none p {
    margin-top: 10px;
  }
  .search-btn-ct {
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    padding-right: 20px;
    flex-direction: row-reverse;
  }
  .wrapper-searchBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: white;
    z-index: 5;
    border-bottom: 1px solid #e8e8e8;
  }
  img {
    width: 100%;
    vertical-align: -3px;
  }
  .mask {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 40px;
    overflow: scroll;
  }
  .mask .list-item {
    padding: 15px 10px;
    margin: 0 20px;
    margin-top: 20px;
  }
  .search-box-ct {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: white;
    height: 38px;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #cac6c6;
    box-shadow: 0px 0px 22px #999;
  }
  .search-ct {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    position: relative;
  }
  .search-btn {
    width: 20px;
    margin-left: 5px;
    position: relative;
  }
  .search-btn::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: scale(1.7)
  }
  .search-box {
    position: relative;
    margin: 5px 0;
    margin-right: 15px;
    width: 70vw;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    height: 30px;
  }
  .exit {
    margin-right: 15px;
    position: relative;
  }
  .exit img{
    width: 22px;
    float: right;
  }
  .exit::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: scale(1.8)
  }
  .search-box > input {
    display: block;
    /*flex: 1;*/
    width: 80%;
    border: 0;
    background-color: white;
    margin-left: 10px;
    height: 100%;
  }
  .search-box > .search-btn {
    width: 20px;
  }
  .clear-btn {
    position: absolute;
    right: 50px;
    width: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .search {
    width: 30px;
    margin-right: 1px;
    position: relative;
    white-space: nowrap;
  }
  .search::after , .clear-btn::after{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: scale(1.8)
  }
  .search-btn-ct{
    padding-right: 0;
    justify-content: center;
  }
  .search-btn-ct > .search-box {
    margin: auto;
  }
  .search-btn-ct > .search-box span {
    margin-left: 8px;
    font-size: 14px;
  }
  /*.slide-fade-leave-active , .slide-fade-enter-active{
    transition: all .8s ;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }*/
  
</style>

