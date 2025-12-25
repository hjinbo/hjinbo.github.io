var rainImg = new Image();
rainImg.src = "/static/pic/rain.png";

function Rain(x, y, fn) {
    this.x = x;
    this.y = y;
    this.fn = fn;
}

Rain.prototype.draw = function(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(-0.7);
    cxt.drawImage(rainImg, 0, 0, 40, 40)
    cxt.restore();
}

Rain.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        if (Math.random() > 0.4) {
            this.x = getRainRandom('x');
            this.y = 0;
        } else {
            this.x = window.innerWidth;
            this.y = getRainRandom('y');
        }
    }
}

RainList = function() {
    this.list = [];
}
RainList.prototype.push = function(rain) {
    this.list.push(rain);
}
RainList.prototype.update = function() {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}
RainList.prototype.draw = function(cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}
RainList.prototype.get = function(i) {
    return this.list[i];
}
RainList.prototype.size = function() {
    return this.list.length;
}

function getRainRandom(option) {
    var ret;
    switch (option) {
    case 'x':
        ret = Math.random() * window.innerWidth;
        break;
    case 'y':
        ret = Math.random() * window.innerHeight;
        break;
    case 'fnx':
        xOffset = -1;
        ret = function(x, y) {
            return x + 0.5 * xOffset - 0.6;
        }
        ;
        break;
    case 'fny':
        yOffset = 20;
        ret = function(x, y) {
            return y + yOffset;
        }
        ;
        break;
    }
    return ret;
}

function startRain(drawNum) {
    if (!drawNum) drawNum = 20; // 如果没传绘制数量默认20
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
    canvas.setAttribute('id', 'canvas_rain');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var rainList = new RainList();
    for (var i = 0; i < drawNum; i++) {
        var rain, randomX, randomY, randomFnx, randomFny;
        randomX = getRainRandom('x');
        randomY = getRainRandom('y');
        randomFnx = getRainRandom('fnx');
        randomFny = getRainRandom('fny');
        rain = new Rain(randomX, randomY, {
            x: randomFnx,
            y: randomFny
        });
        rain.draw(cxt);
        rainList.push(rain);
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        rainList.update();
        rainList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    })
}
function stopRain(e) {
    if (!e && document.getElementById("canvas_rain")) {
        var child = document.getElementById("canvas_rain");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
    } else if (e && !document.getElementById("canvas_rain")) {
        startRain();
    }
}
// window.addEventListener("DOMContentLoaded", startRain);

var d = localStorage.getItem('bgEffect');
if (d == 1) {
    startRain();
}