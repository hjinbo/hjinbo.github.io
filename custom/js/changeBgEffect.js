function snowTrigger() {
    var d = localStorage.getItem('bgEffect');
    if (d == 0) { // 如果目前是雪花效果
        stopSnow();
        localStorage.removeItem('bgEffect');
    } else {
        // 开启前需先停掉其他效果
        if (d == 1) {
            stopRain();
        }
        startSnow();
        localStorage.setItem('bgEffect', 0);
    }
}

function rainTrigger() {
    var d = localStorage.getItem('bgEffect');
    if (d == 1) {
        stopRain();
        localStorage.removeItem('bgEffect');
    } else {
        // 开启前需先停掉其他效果
        if (d == 0) {
            stopSnow();
        }
        startRain();
        localStorage.setItem('bgEffect', 1);
    }
}