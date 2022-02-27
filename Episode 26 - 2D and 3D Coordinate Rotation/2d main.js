window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		point = {
			x: 300,
			y: 200
		},
		delta = 0.05;

	context.translate(width / 2,height / 2);

	update();

	function update() {
		context.clearRect(-width / 2, -height / 2, width, height);
		context.beginPath();
		context.arc(point.x,point.y,20,0,Math.PI*2,false);
		context.fill();

		var cos = Math.cos(delta),
			sin = Math.sin(delta),
			x = point.x * cos - point.y * sin,
			y = point.y * cos + point.x * sin;

		point.x = x;
		point.y = y;


		requestAnimationFrame(update);
	}
	function square(){
		drawLine(0, 1, 2, 3, 0);
		drawLine(4, 5, 6, 7, 4);
		drawLine(0, 4);
		drawLine(1, 5);
		drawLine(2, 6);
		drawLine(3, 7);
	}
	function triangle(){
		drawLine(4, 5, 6, 7, 4);
		drawLine(4,8);
		drawLine(5,8);
		drawLine(6,8);
		drawLine(7,8);
	}
};