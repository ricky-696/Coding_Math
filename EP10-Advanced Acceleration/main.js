window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		ship = particle.create(width/2,height/2,0,0),
		thrust = vector.create(0,0),
		shipangle = 0,
		turnleft =false,
		turnright = false,
		thrusting = false,
		breaking = false;
	update();

	document.body.addEventListener("keydown",function (event) {
		switch(event.keyCode){
			case 38:  //UP
				thrusting = true;
				break;
			case 37:  //L
				turnleft = true;
				break;
			case 39:  //R
				turnright = true;
				break;
			case 40:
				breaking = true;
				break;
			default:
				break;
		}
	});

		document.body.addEventListener("keyup",function (event) {
		switch(event.keyCode){
			case 38:  //UP
				thrusting = false;
				break;
			case 37:  //L
				turnleft = false;
				break;
			case 39:  //R
				turnright = false;
				break;
			case 40:
				breaking = false;
				break;
			default:
				break;
		}
	});

	function update() {
		context.clearRect(0,0,width,height);
		if(turnleft){
			shipangle -=0.05;
		}
		if(turnright){
			shipangle +=0.05;
		}
		thrust.setAngle(shipangle);

		if (thrusting) {
			thrust.setLength(0.1);
		}
		else if (breaking) {
			thrust.setLength(-0.1);
		}
		else{
			thrust.setLength(0);
		}
		

		ship.accelerate(thrust);
		ship.update();

		context.save();
		context.translate(ship.position.getX(),ship.position.getY());
		context.rotate(shipangle);
		
		context.beginPath();
		context.moveTo(10,0);
		context.lineTo(-10,-7);
		context.lineTo(-10,7);
		context.lineTo(10,0);
		if (thrusting) {
			context.moveTo(-10,0);
			context.lineTo(-18,0);
		}
		context.stroke();
		context.fill();
		context.restore();
		if (ship.position.getX()>width) {
			ship.position.setX(0);
		}
		if (ship.position.getX()<0) {
			ship.position.setX(width);
		}
		if (ship.position.getY()>height) {
			ship.position.setY(0);
		}
		if (ship.position.getY()<0) {
			ship.position.setY(height);
		}
		console.log(ship.position.getX(),ship.position.getY());
		requestAnimationFrame(update);
	}
	
};