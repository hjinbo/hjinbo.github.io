function stopAllBgEffects() {
    stopSnow();
    stopSnow2();
    stopRain();
}


function snowTrigger() {
    var d = localStorage.getItem('bgEffect');
    if (d == 0) { // 如果目前是雪花效果
        stopSnow();
        localStorage.removeItem('bgEffect');
    } else {
        // 开启前需先停掉其他效果
        stopAllBgEffects();
        startSnow();
        localStorage.setItem('bgEffect', 0);
        Snackbar.show({text: '下雪啦！ o(^▽^)o', duration: 2000, showAction: false, 
            pos: 'top-center', backgroundColor: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)'});
    }
}

function rainTrigger() {
    var d = localStorage.getItem('bgEffect');
    if (d == 1) {
        stopRain();
        localStorage.removeItem('bgEffect');
    } else {
        // 开启前需先停掉其他效果
        stopAllBgEffects();
        startRain();
        localStorage.setItem('bgEffect', 1);
        Snackbar.show({text: '下雨了 ╮(╯_╰)╭', duration: 2000, showAction: false, 
            pos: 'top-center', backgroundColor: 'linear-gradient(45deg,#292a3a,#536976)'});
    }
}

function snowTrigger2() {
    var d = localStorage.getItem('bgEffect');
    if (d == 2) { // 如果目前是雪花效果
        // 停止下雪效果2
        stopSnow2();
        localStorage.removeItem('bgEffect');
    } else {
        // 开启前需先停掉其他效果
        stopAllBgEffects();
        startSnow2();
        localStorage.setItem('bgEffect', 2);
        Snackbar.show({text: '下雪啦！╰(*°▽°*)╯', duration: 2000, showAction: false, 
            pos: 'top-center', backgroundColor: 'linear-gradient(45deg,#a1c4fd,#c2e9fb)'});
    }
}