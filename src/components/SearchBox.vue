<template>
  <div class="wrapper-searchBox">
    <div class="search-ct">
      <div class="search-btn" @click="showSearchBox"><img src="../assets/searchBox.png" alt="搜索" ></div>
      <div v-show="showBox" class="search-box-ct">
        <transition name="slide-fade">
          <div class="search-box" v-show="showBox">
            <div class="search-btn"><img src="../assets/searchBox.png" alt="搜索"></div>
            <input type="text" placeholder="请输入搜索内容" size="1" v-model="content" v-focus="true">
            <div class="clear-btn" @click="clearContent" v-if="content"><img src="../assets/clear.png" alt="清除"></div>
            <div class="search" @click="searchKey"><img src="../assets/arrow.png" alt="确认"></div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="mask" v-show="showBox" @click="showSearchBox"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import { focus } from 'vue-focus'
export default {
  name: 'searchBox',
  data() {
    return {
      showBox: false,
      content: ''
    }
  },
  directives: {
    focus
  },
  methods: {
    showSearchBox() {
      this.showBox = !this.showBox
    },
    searchKey() {
      this.showSearchBox()
    },
    clearContent() {
      this.content = ''
    }
  }
}
</script>

<style scoped>
  .wrapper-searchBox {
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
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .search-box-ct {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: white;
    height: 38px;
    z-index: 100;
  }
  .search-ct {
    width: 100%;
    padding: 10px 10px;
    display: flex;
    flex-direction: row-reverse;
    position: relative;
  }
  .search-btn {
    width: 15px;
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 5px auto;
    width: 70vw;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }
  
  .search-box > input {
    display: block;
    flex: 1;
    border: 0;
    background-color: white;
    margin-left: 10px;
    height: 100%;
  }
  .search-box > .search-btn {
    width: 15px;
  }
  .clear-btn {
    position: absolute;
    right: 40px;
    width: 15px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .search-box > .search {
    width: 22px;
    margin-right: 1px;
  }
  /*.slide-fade-leave-active , .slide-fade-enter-active{
    transition: all .8s ;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }*/
  
</style>

