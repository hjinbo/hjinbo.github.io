$(function() {

    // 增加设备检测, 移动设备不允许访问
    deviceCheck();

    var useAnimation = false;

    $(".music").click(function() {
        var player = document.getElementById("bgMusic"); // 只能用原生js
        player.pause();
        if (useAnimation) {
            $(this).attr("class", "music");
            player.pause();
            useAnimation = false;
        } else {
            $(this).attr("class", "music layui-anim layui-anim-scaleSpring layui-anim-loop");
            player.play();
            useAnimation = true;
        }
    });


    // 检测访问设备
    function deviceCheck() {
        var system ={};
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        // system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if (system.win || system.mac) { // 如果是电脑
            
        } else {  // 如果是手机, 拒绝
            layer.msg("请用电脑浏览器访问.")
        }
    }
})