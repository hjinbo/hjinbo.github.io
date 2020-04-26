$(function() {

	const playListId = 2179377798 // // 434963933

	play(playListId)

	const getUrlById = (id) => {
		return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
	}
	
	function play(playListId) {
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