// 为什么这个变量不放入json文件中，因为多了文件读取这一步，meting.js请求就会先于本js，导致获取不到服务器音乐数据
var musicSource = [
    ['#', '#'],
    ['tencent', '8111690820'],
    ['netease', '6805826295']
];

// flag表示若localStroage中存在音乐源还是否更新
function setMusicParams(d, flag) {
    var type = 2;
    var dataServer = musicSource[type][0];
    var dataId = musicSource[type][1];
    if (d) {
        var params = d.split('-');
        type = params[0];
        dataServer = params[1];
        dataId = params[2];
        if (flag) { // 更新localStorage中的音乐源
            type = (type + 1) % musicSource.length;
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
            const ap = new APlayer({
                container: document.getElementById('aplayer'),
                fixed: true,
                listFolded: false,
                lrcType: 3,
                audio: json.localMusicList
            });
        });
}

var d = localStorage.getItem('music-source');
setMusicParams(d, 0);