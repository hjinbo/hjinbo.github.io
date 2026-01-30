// 为什么这个变量不放入json文件中，因为多了文件读取这一步，meting.js请求就会先于本js，导致获取不到服务器音乐数据
var musicSource = [
    ['#', '#'], // 本地音乐占位
    ['tencent', '8111690820'],
    ['netease', '6805826295'],
    ['tencent', '9652908114']
];

// flag表示若localStroage中存在音乐源还是否更新
function setMusicParams(d, flag) {
    var type = 0;
    var dataServer = musicSource[type][0];
    var dataId = musicSource[type][1];
    if (d) {
        var params = d.split('-');
        type = params[0];
        dataServer = params[1];
        dataId = params[2];
        if (flag) { // 更新localStorage中的音乐源
            type = (parseInt(type) + 1) % musicSource.length;
            dataServer = musicSource[type][0];
            dataId = musicSource[type][1];
        }
        // console.log(type + '-' + dataServer + '-' + dataId);
    }
    if (type == 0) {
        window.addEventListener('DOMContentLoaded', selfHostedPlayer);
    } else {
        var aplayer = document.getElementById('aplayer');
        aplayer.removeAttribute('audio');
        aplayer.setAttribute('class', "aplayer no-destroy");
        aplayer.setAttribute('data-type', "playlist");
        aplayer.setAttribute('data-preload', "auto");
        aplayer.setAttribute('data-fixed', "true");
        aplayer.setAttribute('data-server', dataServer);
        aplayer.setAttribute('data-id', dataId);
    }
    localStorage.setItem('music-source', type + '-' + dataServer + '-' + dataId);
}

// 改变音乐播放器播放源
function changeMusicSource() {
    var d = localStorage.getItem('music-source');
    setMusicParams(d, 1);
    location.reload();
}

function selfHostedPlayer() {
    fetch('/static/music/localMusic.json') // 从json文件中获取
        .then((response) => response.json())
        .then((json) => {
            // 20260130 为简化localMusic.json中字段，只保留歌曲名称和演唱者，其他字段自动生成
            var localMusicList = json.localMusicList
            const staticPath = '/static/music/'
            for (i = 0; i < localMusicList.length; i++) {
                localMusic = localMusicList[i]
                localMusic['url'] = staticPath + 'url/' + localMusic['name'] + '-' + localMusic['artist'] + '.mp3';
                localMusic['cover'] = staticPath + 'cover/' + localMusic['name'] + '-' + localMusic['artist'] + '.png';
                localMusic['lrc'] = staticPath + 'lrc/' + localMusic['name'] + '-' + localMusic['artist'] + '.lrc';
            }
            const ap = new APlayer({
                container: document.getElementById('aplayer'),
                fixed: true,
                listFolded: false,
                lrcType: 3,
                audio: localMusicList
            });
        });
}

var d = localStorage.getItem('music-source');
setMusicParams(d, 0);