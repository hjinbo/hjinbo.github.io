Particle3D=function(material){
	THREE.Particle.call(this,material);
	this.velocity=new THREE.Vector3(0,-8,0);//速度;
	//this.velocity.rotateX(2);//旋转;
	this.gravity=new THREE.Vector3(0,0,0);//加速度;
	this.drag=1;//速度相乘系数;
};
//Particle:粒子;
//prototype:原形;
Particle3D.prototype=new THREE.Particle();
Particle3D.prototype.constructor=Particle3D;//构造函数
Particle3D.prototype.updatePhysics=function(){
	this.velocity.multiplyScalar(this.drag);//矢量相乘函数
	this.velocity.addSelf(this.gravity);//矢量相加函数
	this.position.addSelf(this.velocity);//矢量相加函数
}
var TO_RADIANS=Math.PI/180;//角度向弧度转换系数*
THREE.Vector3.prototype.rotateY=function(angle){
	//绕Y轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;
	var tempx=this.x;
	this.x=(tempx*cosRY)+(tempz*sinRY);
	this.z=(tempx*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateX=function(angle){
	//绕X轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempz*sinRY);
	this.z=(tempy*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateZ=function(angle){
	//绕Z轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempx=this.x;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempx*sinRY);
	this.x=(tempy*-sinRY)+(tempx*cosRY);
}
function randomRange(min,max){
	return((Math.random()*(max-min))+ min);
}

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
//容器
var container;
//雪花例子
var particle;
//摄像机
var camera;
//场景
var scene;
//渲染器
var renderer;
//粒子在垂直（Y轴）方向运动范围
var particleY_Range = 0;
//粒子在垂直（X轴）方向运动范围
var particleX_Range = 0;

//风力权重，正值向右，负值向左，0表示无风
var wind_weight = 0;

var windowHalfX = SCREEN_WIDTH / 2;
var windowHalfY = SCREEN_HEIGHT / 2;

var particles = []; 

var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
particleImage.src = "/static/pic/ParticleSmoke.png";

let lastTime = 0;
const interval = 30; // 控制雪花下落速率

function loop(timestamp) {
	// 检查是否达到目标间隔
    if (timestamp - lastTime >= interval) {
		for(var i = 0; i<particles.length; i++)
		{
			var particle = particles[i]; 
			particle.updatePhysics();
			const pos = particle.position;
			const yRangeHalf = particleY_Range / 2;
			const screenHalfX = windowHalfX;

			if (pos.y < -yRangeHalf) {
				pos.y += particleY_Range;
			}

			if (pos.x > screenHalfX) {
				pos.x -= SCREEN_WIDTH;
			} else if (pos.x < -screenHalfX) {
				pos.x += SCREEN_WIDTH;
			}

			pos.x += wind_weight;	
		}

		camera.position.x += ( 0 - camera.position.x ) * 0.05;
		camera.position.y += ( - 0 - camera.position.y ) * 0.05;
		camera.lookAt(scene.position); 
		renderer.render( scene, camera );

		lastTime = timestamp;
	}
	stop = requestAnimationFrame(loop);
}

function startSnow2(options) {
		var defaults = {     
			//创建粒子数量，密度
			particleNo: 300,
			//粒子下拉速度
			particleSpeed:30,
			//粒子在垂直（Y轴）方向运动范围
			particleY_Range:1300,
			//粒子在垂直（X轴）方向运动范围
			particleX_Range:1000,
			//是否绑定鼠标事件
			bindMouse: false,
			//相机离Z轴原点距离
			zIndex:600,
			//风力强度，正值向右，负值向左
			wind_weight:-1,
			//摄像机视野角度
			angle:55
		};     
	var opts = options || defaults;
	
	particleY_Range=opts.particleY_Range;
	particleX_Range=opts.particleX_Range;
	
	wind_weight=opts.wind_weight;
	
	container = document.createElement('div');
	container.setAttribute('id', 'snow2-div');
	container.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
	document.body.appendChild(container);
//		透视相机，物体大小随距离摄像机远近改变，对比投影相机
//		相机的上方向为Y轴，右方向为X轴，沿着Z轴垂直朝里（视野角：fov； 纵横比：aspect； 相机离视最近的距离：near； 相机离视体积最远距离：far）
	camera = new THREE.PerspectiveCamera( opts.angle, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	//设置摄像机z坐标位置距离原点向外距离
	camera.position.z = opts.zIndex;
	//创建场景
	scene = new THREE.Scene();
	scene.add(camera);
	//创建渲染器
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	//创建材料
	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
		
	for (var i = 0; i < opts.particleNo; i++) {

		particle = new Particle3D( material);
		particle.position.x = Math.random() * SCREEN_WIDTH - windowHalfX;
		particle.position.y = Math.random() * SCREEN_HEIGHT * 2 - SCREEN_HEIGHT;
		particle.position.z = Math.random() * opts.zIndex * 4 - opts.zIndex*2;
		particle.scale.x = particle.scale.y =  1;
		scene.add( particle );
		
		particles.push(particle); 
	}

	container.appendChild( renderer.domElement );
	stop = requestAnimationFrame(loop);
}


function stopSnow2() {
	if (document.getElementById("snow2-div")) {
		var child = document.getElementById("snow2-div");
		child.removeChild(child.childNodes[0]);
		child.parentNode.removeChild(child);
		particles = [];
		material = null;
		camera = null;
		scene = null;
		window.cancelAnimationFrame(stop);
	}
}

var d = localStorage.getItem('bgEffect');
if (d == 2) {
	startSnow2();
}