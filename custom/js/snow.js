var snowImg = new Image();
snowImg.src = "/static/pic/snow.png";

function Snow(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
}

Snow.prototype.draw = function(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(snowImg, 0, 0, 35 * this.s, 35 * this.s)
    cxt.restore();
}

Snow.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}

SnowList = function() {
    this.list = [];
}
SnowList.prototype.push = function(snow) {
    this.list.push(snow);
}
SnowList.prototype.update = function() {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}
SnowList.prototype.draw = function(cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}
SnowList.prototype.get = function(i) {
    return this.list[i];
}
SnowList.prototype.size = function() {
    return this.list.length;
}

function getRandom(option) {
    var ret, random;
    switch (option) {
    case 'x':
        ret = Math.random() * window.innerWidth;
        break;
    case 'y':
        ret = Math.random() * window.innerHeight;
        break;
    case 's':
        ret = Math.random();
        break;
    case 'r':
        ret = Math.random() * 6;
        break;
    case 'fnx':
        random = -0.5 + Math.random() * 1;
        ret = function(x, y) {
            return x + 0.5 * random - 0.6;
        }
        ;
        break;
    case 'fny':
        random = 0.8 + Math.random() * 0.7
        ret = function(x, y) {
            return y + random;
        }
        ;
        break;
    case 'fnr':
        random = Math.random() * 0.03;
        ret = function(r) {
            return r + random;
        }
        ;
        break;
    }
    return ret;
}

function startSnow(drawNum) {
    if (!drawNum) drawNum = 20; // 如果没传绘制数量默认20
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
    canvas.setAttribute('id', 'canvas_snow');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var snowList = new SnowList();
    for (var i = 0; i < drawNum; i++) {
        var snow, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s');
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        snow = new Snow(randomX, randomY, randomS, randomR, {
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        snow.draw(cxt);
        snowList.push(snow);
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        snowList.update();
        snowList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    })
}
function stopSnow(e) {
    if (!e && document.getElementById("canvas_snow")) {
        var child = document.getElementById("canvas_snow");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
    } else if (e && !document.getElementById("canvas_snow")) {
        startSnow();
    }
}
// window.addEventListener("DOMContentLoaded", startSnow);

var d = localStorage.getItem('bgEffect');
if (d == 0) {
    startSnow();
}