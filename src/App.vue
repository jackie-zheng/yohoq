<template>
  <div id="app">
    <Search-box></Search-box>
		<Ad></Ad>
		<cus-nav></cus-nav>
		<div class="list-eat">
			<div class="title">
				<img src="./assets/eat.png" alt="">
				饭票
			</div>
			<list-item v-for="(data, index) in itemsData.eatData" :key="index" :item="data"></list-item>
		</div>
		<div class="list-play">
			<div class="title">
				<img src="./assets/play.png" alt="">
				娱乐
			</div>
			<list-item v-for="(data, index) in itemsData.playData" :key="index" :item="data"></list-item>
		</div>
		<div class="list-traffic">
			<div class="title">
				<img src="./assets/traffic.png" alt="">
				出行
			</div>
			<list-item v-for="(data, index) in itemsData.trafficData" :key="index" :item="data"></list-item>
		</div>
		<div class="list-health">
			<div class="title">
				<img src="./assets/health.png" alt="">
				健康
			</div>
			<list-item v-for="(data, index) in itemsData.healthData" :key="index" :item="data"></list-item>
		</div>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import Ad from './components/Ad'
import CusNav from './components/CusNav'
import ListItem from './components/ListItem'
import itemsData from './services/itemsData'
import bus from './services/bus'

function getOpenid() {
	let getWxInfoUrl = '/foxbill/getWxUserInfo'
	let search = location.search
	let xhr = new XMLHttpRequest()
    xhr.onload = function(e) {
      let res = JSON.parse(e.target.response)
      if (res && res.openid) {
        sessionStorage.setItem('openid', res.openid)
      } else {
				throw new Error('获取openid失败...')
			}
    }
    xhr.open('GET', getWxInfoUrl + search)
    xhr.send()
}
function listenScroll() {
	let scroll = false
	window.addEventListener('scroll', () => {
		let scrollTop = document.body.scrollTop
		if (scrollTop > 0 && !scroll) {
			bus.$emit('scrolling')
			scroll = true
			console.log(scroll)
		}
	})
}
export default {
  name: 'app',
	data() {
		return {
			itemsData
		}
	},
  components: {
    SearchBox,
		Ad,
		CusNav,
		ListItem
  },
	created() {
		getOpenid()
		listenScroll()
	},
	mounted() {

	}
}
</script>

<style scoped>
	#app::before {
		content: '';
		display: block;
		height: 37px;
	}
	.title {
		margin-top: 15px;
		padding-left: 20px;
		font-size: 13px;
		vertical-align: middle;
	}
	.title img {
		width: 14px;
		margin-right: 4px;
	}
</style>
<style>
  /* reset.css*/
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/**/
* {
  box-sizing: border-box;
}
</style>
