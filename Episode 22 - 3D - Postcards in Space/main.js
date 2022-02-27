window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,//(focal length)
		shapes = [],
		numShapes = 100;

	for(var i = 0; i < numShapes; i += 1) {
		shapes[i] = {
			x: utils.randomRange(-1000, 1000),
			y: utils.randomRange(-1000, 1000),
			z: utils.randomRange(0, 10000),
			char: String.fromCharCode(utils.randomRange(65, 91))
		};
	}

	context.translate(width / 2, height / 2);
	context.font = "200px Arial";

	update();

	function update() {
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numShapes; i += 1) {
			var shape = shapes[i],
			perspective = fl / (fl + shape.z);
					 // 焦距(focal length) / (焦距+物體與camera的距離);
			context.save();
			context.scale(perspective, perspective);//放大perspective倍
			context.translate(shape.x , shape.y);//轉換畫布的xy
			// square:
			// context.fillRect(-100, -100, 200, 200);
			
			// circle:
			// context.beginPath();
			// context.arc(0, 0, 100, 0, Math.PI * 2, false);
			// context.fill();

			// letter:
			context.fillText(shape.char, -100, -100)

			context.restore();

			// move away:
			// shape.z += 5;
			// if(shape.z > 10000) {
			// 	shape.z = 0;
			// }

			// move toward:
			shape.z -= 5;
			if(shape.z < 0) {
				shape.z = 10000;
			}
		}
		requestAnimationFrame(update);
	}
};