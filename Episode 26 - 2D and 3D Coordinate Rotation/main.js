window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight
		fl = 300,
		points = [],
		needsUpdate = true,
		centerZ = 1500,
		shape = 0,
		change = false;

	context.translate(width / 2, height / 2);
	reset();
	function reset() {
		points[0] = { x: -500, y: -500, z: 500 };//200 200 200
		points[1] = { x:  500, y: -500, z: 500 };//0 200 200
		points[2] = { x:  500, y: -500, z: -500 };//0 200 0
		points[3] = { x: -500, y: -500, z: -500 };//200 200 0
		points[4] = { x: -500, y: 500, z: 500 };//200 0 200
		points[5] = { x:  500, y: 500, z: 500 };//0 0 200
		points[6] = { x:  500, y: 500, z: -500 };//0 0 0
		points[7] = { x: -500, y: 500, z: -500 };//200 0 0
		points[8] = { x: 0, y: -500, z: 0 };//center
		project();
	}

	function project() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				scale = fl / (fl + p.z + centerZ);

			p.sx = p.x * scale;
			p.sy = p.y * scale;
		}
	}

	function drawLine() {
		var p = points[arguments[0]];
		context.moveTo(p.sx, p.sy);

		for(var i = 1; i < arguments.length; i++) {
			p = points[arguments[i]];
			context.lineTo(p.sx, p.sy);
		}
	}

	function translateModel(x, y, z) {
		for(var i = 0; i < points.length; i++) {
			points[i].x += x;
			points[i].y += y;
			points[i].z += z;
		}
		needsUpdate = true;
	}

	function rotate(angle,xyz) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if (xyz=="x") {
				p.y = p.y * cos - p.z * sin;
				p.z = p.z * cos + p.y * sin;
			}
			else if(xyz=="y"){
				p.x = p.x * cos - p.z * sin;
				p.z = p.z * cos + p.x * sin;
			}
			else if(xyz=="z"){
				p.x = p.x * cos - p.y * sin;
				p.y = p.y * cos + p.x * sin;
			}		
		}
		needsUpdate = true;
	}

	document.body.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case 37: // left
				if(event.ctrlKey) {
					rotate(0.05,"y");
				}
				else {
					translateModel(-20, 0, 0);
				}
				break;
			case 39: // right
				if(event.ctrlKey) {
					rotate(-0.05,"y");
				}
				else {
					translateModel(20, 0, 0);
				}
				break;
			case 38: // up
				if(event.shiftKey) {
					translateModel(0, 0, 20);
				}
				else if(event.ctrlKey) {
					rotate(0.05,"x");
				}
				else {
					translateModel(0, -20, 0);
				}
				break;
			case 40: // down
				if(event.shiftKey) {
					translateModel(0, 0, -20);
				}
				else if(event.ctrlKey) {
					rotate(-0.05,"x");
				}
				else {
					translateModel(0, 20, 0);
				}
				break;
			case 49:
				shape = 0;
				needsUpdate = true;
				change = true;
				break;
			case 50:
				shape = 1;
				needsUpdate = true;
				change = true;
				break;
		}
	});

	update();

	function update() {
		console.log(shape);
		if(needsUpdate) {
			context.clearRect(-width / 2, -height / 2, width, height);
			project();
			for (var i = 0; i <= 8; i++) {
				console.log(points[i]);
			}
			context.beginPath();
			if (change==true) {
				reset();
				change = false;
			}
			if (shape==0) {
				square();
			}
			else{
				triangle();
			}		
			context.stroke();
			needsUpdate = false;
		}
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