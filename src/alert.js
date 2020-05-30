var obj = {
		id:"box",
		w:"300",
		h:"151",
		hint:"提示",
		content:"自定义消息内容",
		callback:play
	};
	function play(){
		console.log("回调函数");
	}
function Tan(obj){
		this.w = obj.w;
		this.h = obj.h;
		this.id = obj.id;
		this.hint = obj.hint;
		this.content = obj.content;
		this.con = document.getElementById(this.id);
		 this.isMouseDown = false; //鼠标状态，没按下为false，按下为true
		 this.callback = obj.callback;//用户自定义的函数名
		 this.posX = 0; //保存鼠标点击时的x坐标
		 this.posY = 0; //保存鼠标点击时的y坐标
		this.init();
		this.addEvent();
	}
	Tan.prototype.init = function() {
		
		this.str = '<div class="title"><p>'+this.hint+'</p></div><div class="content"><p>'+this.content+'</p></div><div class="foot" id="foot"><p>确定</p></div>';
		this.con.innerHTML = this.str;
		this.con.style.width = this.w+"px";
		this.con.style.hight = this.h+"px";
		this.callback.call(window);
	};
	//添加自定义监听事件，PC端为mousedown,mousedown移动端为touchstart,touchmove
	Tan.prototype.addEvent = function() {
		//判断是移动端还是pc端
		// console.log(window.navigator.userAgent);
		this.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
			this.clickEvent =this.device? "touchstart":"mousedown";
			this.moveEvent = this.device? "touchmove" : "mousemove";
			this.endEvent = this.device? "touchend" : "mouseup";
		// console.log(clickEvent,moveEvent,endEvent);
		//添加鼠标点击或手机点击事件
		var that =this;
		this.con.addEventListener(this.clickEvent,function(evt){
			var event = evt || window.event;
			//获取鼠标点击或手指点击式的视口坐标
			that.posX = that.device? event.touches[0].clientX : event.clientX;
			that.posY = that.device? event.touches[0].clientY : event.clientY;
			that.mouseX = that.con.offsetLeft;
			that.mouseY = that.con.offsetTop;
			that.isMouseDown = true; //鼠标按下
		});
		this.con.addEventListener(this.moveEvent,function(evt){
			if( !that.isMouseDown ){
				return false;
			}else{
				var event = evt || window.event;
				// 调用canvas画线，将鼠标移动时坐标作为lineTo()参数传入。注意上一次点击时的坐标点作为画线的起始坐标
				var x2 =  that.device? event.touches[0].clientX : event.clientX;
				var y2 = that.device? event.touches[0].clientY : event.clientY;
				that.con.style.left = that.mouseX + x2 - that.posX+"px";
				that.con.style.top = that.mouseY + y2 - that.posY+"px";
			}
		});
	this.con.addEventListener(this.endEvent,function(evt){
		that.isMouseDown = false; //鼠标未按下
		
		
	});
	};
	var btn = document.getElementById("btn");
	var box = document.getElementById("box");
	btn.onclick = function(){
		
	var tan = new Tan(obj);
	var foot = document.getElementById("foot");
		foot.onclick = function(){
			box.innerHTML = "";
		};
	};
	