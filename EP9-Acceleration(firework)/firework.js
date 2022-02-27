window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		particles = [];
		for (var i = 0; i < 99; i+=1) {
			particles.push(particle.create(width/2,height/3,Math.random()*5+2,Math.random()*Math.PI*2,0.1));
		}
	update();

	function update() {
		context.clearRect(0,0,width,height);
		
		for (var i = 0; i < 99; i+=1) {
			var p = particles[i];
			p.update();
			var color = Math.floor(Math.random()*16777215)+1;
			color = color.toString(16);
			context.beginPath();
			context.fillStyle = '#' + color;
			context.arc(p.position.getX(),p.position.getY(),4,0,Math.PI*2,false);
			context.fill();
		}
		requestAnimationFrame(update);
	}
	
};