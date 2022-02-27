window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		number = 10,
		px = [];
		for (var i = 0; i <= number-1; i += 1) {
			var	p = particle.create(Math.random()*width, Math.random()*height, 5, Math.random() * Math.PI * 2, 0.1);
			p.radius = 40;
			p.bounce = -0.9;
			px.push(p);
		}
	update();

	function update() {
		context.clearRect(0, 0, width, height);

		for(var i = 0; i <= number-1; i += 1) {
			var p = px[i];
			p.update();

			for(var j = 0; j <= number-1; j += 1) {
				if (p.collision(px[j]) && i != j) {
					context.fillStyle = "#FF0000";
						p.velocity.setX(p.velocity.getX() * -1);
						p.velocity.setY(p.velocity.getY() * -1);
					break;
				}
				else{
					context.fillStyle = "#000000";
				}
			}

			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			context.fill();

			if(p.position.getX() + p.radius > width) {
				p.position.setX(width - p.radius);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if(p.position.getX() - p.radius < 0) {
				p.position.setX(p.radius);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if(p.position.getY() + p.radius > height) {
				p.position.setY(height - p.radius);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
			if(p.position.getY() - p.radius < 0) {
				p.position.setY(p.radius);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
		}
		requestAnimationFrame(update);
	}
};