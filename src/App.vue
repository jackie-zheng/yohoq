<template>
  <div id="app">
    <Search-box></Search-box>
		<Ad></Ad>
		<cus-nav></cus-nav>
		<div class="list-panel">
			<div id="list-eat">
				<div class="title">
					<img src="./assets/eat.png" alt="">
					饭票
				</div>
				<list-item v-for="(data, index) in itemsData.eatData" :key="index" :item="data"></list-item>
				<div v-if="!itemsData.eatData[0]" class="none">敬请期待</div>
			</div>
			<div id="list-play">
				<div class="title">
					<img src="./assets/play.png" alt="">
					娱乐
				</div>
				<list-item v-for="(data, index) in itemsData.playData" :key="index" :item="data"></list-item>
				<div v-if="!itemsData.playData[0]" class="none">敬请期待</div>
			</div>
			<div id="list-traffic">
				<div class="title">
					<img src="./assets/traffic.png" alt="">
					出行
				</div>
				<list-item v-for="(data, index) in itemsData.trafficData" :key="index" :item="data"></list-item>
				<div v-if="!itemsData.trafficData[0]" class="none">敬请期待</div>
			</div>
			<div id="list-health">
				<div class="title">
					<img src="./assets/health.png" alt="">
					健康
				</div>
				<list-item v-for="(data, index) in itemsData.healthData" :key="index" :item="data"></list-item>
				<div v-if="!itemsData.healthData[0]" class="none">敬请期待</div>
			</div>
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


function fbdWxSlide() {
	document.body.addEventListener('touchmove', (event) => {
		event.preventDefault()
	})
}
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
	let lock = false
	let areaLock
	window.addEventListener('scroll', () => {
		let scrollTop = document.body.scrollTop
		if (scrollTop + bus.axis.searchH > bus.axis.nav && !lock) {
			bus.$emit('toFixed')
			lock = true
		} else if (scrollTop + bus.axis.searchH <= bus.axis.nav && lock){
			bus.$emit('loose')
			lock = false
		}
		let areaArr = [bus.axis.eat, bus.axis.play, bus.axis.traffic, bus.axis.health]
		areaArr = areaArr.sort((a, b) => { return a > b })
		let scrollDis = scrollTop + bus.axis.searchH + bus.axis.navH
		let microDis = 130
		
		if (scrollDis <= areaArr[1] - microDis && areaLock !== 'area1') {
			bus.$emit('area1')
			areaLock = 'area1'
		}
		if (scrollDis > areaArr[1] - microDis && scrollDis <= areaArr[2] - microDis && areaLock !== 'area2') {
			bus.$emit('area2')
			areaLock = 'area2'
		}
		if (scrollDis > areaArr[2] - microDis && scrollDis <= areaArr[3] - microDis && areaLock !== 'area3') {
			bus.$emit('area3')
			areaLock = 'area3'
		}
		if (scrollDis > areaArr[3] - microDis && areaLock !== 'area4') {
			bus.$emit('area4')
			areaLock = 'area4'
		}
	})
}
function getAxis() {
	bus.axis = {
		navH: document.getElementById('nav').offsetHeight,
		nav: document.getElementById('nav').offsetTop,
		eat: document.getElementById('list-eat').offsetTop,
		play: document.getElementById('list-play').offsetTop,
		traffic: document.getElementById('list-traffic').offsetTop,
		health: document.getElementById('list-health').offsetTop,
		searchH: document.querySelector('.wrapper-searchBox').offsetHeight
	}
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
		setTimeout( getAxis)
	}
}
</script>

<style scoped>
	.list-panel {
		overflow: hidden;
	}
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
	.none {
		text-align: center;
		font-size: 24px;
		margin: 30px 0;
		color: #aaa;
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
