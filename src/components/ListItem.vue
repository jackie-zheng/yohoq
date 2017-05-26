<template>
  <div class="wrapper-item">
    <div class="left">
      <img :src="item.imgUrl" alt="">
    </div>
    <div class="right">
      <div class="title">{{ item.title }}</div>
      <div class="owner">{{ item.owner }}</div>
      <div class="discount">{{ item.discount | currency}}</div>
      <div class="origin-money">{{ item.orgMoney | currency}}</div>
    </div>
    <div class="go-buy" @click="navTo">去购买</div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['item'],
  filters: {
    currency(value) {
      if (typeof value !== 'number') return value
      return '￥' + value.toFixed(2)
    }
  },
  methods: {
    navTo() {
      let openid = sessionStorage.openid
      if (openid) {
        location = this.item.to + '&openid=' + openid
      }
    }
  },
  created() {

  }
}
</script>

<style scoped>
  img {
    width: 100%;
    display: block;
  }
  .wrapper-item {
    border-bottom: 1px solid #ebebeb;
    padding: 15px 20px;
    display: flex;
    position: relative;
  }
  
  .left {
    width: 29.6vw;
    height: 19vw;
    margin-right: 4vw;
    flex-shrink: 0;
  }
  .right {
    width: calc(100% - 29.6vw - 4vw);
  }
  .right > .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .go-buy {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    color: white;
    background-color: #ff7145;
    border-radius: 10px;
    text-align: center;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
  }
  .right > * {
    white-space: nowrap;
  }
  .owner {
    color: #bbb;
    font-size: 13px;
    margin-top: 5px;
  }
  .discount {
    font-size: 15px;
    font-weight: bold;
    margin-top: 5px;
  }
  .origin-money {
    color: #aaa;
    text-decoration: line-through;
    font-size: 13px;
    margin-top: 3px;
  }
</style>


