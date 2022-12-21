function changeMouseIco() {
    var d = localStorage.getItem('mouse-ico');
    if (!d) {
        setMouseIco(1);
        localStorage.setItem('mouse-ico', 1);
    } else {
        setMouseIco(0);
        localStorage.removeItem('mouse-ico');
    }
}

// flag为0表示取消
function setMouseIco(flag) {
    var body = document.getElementsByTagName('body')[0];
    if (flag) {
        body.style.cursor = 'url("/static/pic/cursor.png"), auto';
    } else {
        body.style.cursor = '';
    }
}

window.addEventListener('DOMContentLoaded', function() {
    var d = localStorage.getItem('mouse-ico');
    if (d) {
        setMouseIco(1);
    }
});