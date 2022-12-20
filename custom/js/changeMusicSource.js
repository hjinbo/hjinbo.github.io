var defaultDataServer = 'tencent';
var defaultDataId = '8111690820';
var musicData = [
    ['#', '#'],
    ['tencent', '8111690820'],
    ['netease', '6805826295']
];

var localMusicList = [
    {
        name: '一路向北',
        artist: '周杰伦',
        url: '/static/music/一路向北-周杰伦.mp3',
        cover: '/static/music/cover/一路向北-周杰伦.png',
        lrc: '/static/music/lrc/一路向北-周杰伦.lrc'
    },
    {
        name: '不能说的秘密',
        artist: '周杰伦',
        url: '/static/music/不能说的秘密-周杰伦.mp3',
        cover: '/static/music/cover/不能说的秘密-周杰伦.png',
        lrc: '/static/music/lrc/不能说的秘密-周杰伦.lrc'
    },
    {
        name: '小小',
        artist: '容祖儿',
        url: '/static/music/小小-容祖儿.mp3',
        cover: '/static/music/cover/小小-容祖儿.png',
        lrc: '/static/music/lrc/小小-容祖儿.lrc'
    },
    {
        name: '不死之身',
        artist: '林俊杰',
        url: '/static/music/不死之身-林俊杰.mp3',
        cover: '/static/music/cover/不死之身-林俊杰.png',
        lrc: '/static/music/lrc/不死之身-林俊杰.lrc'
    }
];

// flag表示若localStroage中存在音乐源还是否更新
function setMusicParams(d, flag) {
    var type = 2;
    var dataServer = musicData[type][0];
    var dataId = musicData[type][1];
    if (d) {
        var params = d.split('-');
        type = params[0];
        dataServer = params[1];
        dataId = params[2];
        if (flag) { // 更新localStorage中的音乐源
            type = (type + 1) % musicData.length;
            dataServer = musicData[type][0];
            dataId = musicData[type][1];
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
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        lrcType: 3,
        audio: localMusicList
    });
}

var d = localStorage.getItem('music-source');
setMusicParams(d, 0);
