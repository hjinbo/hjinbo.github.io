$(function() {

	const defaultPlayListId = 434963933 // 2179377798 // 

	play()

	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	const getUrlById = (id) => {
		return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
	}
	
	function play() {
		var playListId = getUrlParam('playListId') || defaultPlayListId
		$.get('https://daiwei.site/netease/playlist/detail?id=' + playListId, function(res) {
			let music = res.playlist.tracks
			let index = Math.floor(Math.random() * music.length)
			$.get('https://daiwei.site/netease/song/detail?ids=' + music[index].id, function(res) {
				const d = new Daudio ({
					ele: '#d-audio',
					src: getUrlById(res.songs[0].id),
					imageurl: music[index].al.picUrl + '?param=300y300',
					name: music[index].name,
					singer: music[index].ar[0].name,
					height: '45px',
					initstate: 'circle', 
					next: function () {
						index = Math.floor(Math.random() * music.length)
						$.get('https://daiwei.site/netease/song/detail?ids=' + music[index].id, function(res) {
							console.log(music[index].name + ' - ' + music[index].ar[0].name)
							const info = {
								src: getUrlById(res.songs[0].id),
								imageurl: music[index].al.picUrl + '?param=300y300',
								name: music[index].name,
								singer: music[index].ar[0].name
							}
							d.checkAudio(info.src, info.imageurl, info.name, info.singer)
						})
					}
				})
			})
		})
	}
})