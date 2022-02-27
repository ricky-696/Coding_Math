window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,//(focal length)
		cards = [],
		numcards = 20,
		centerZ = 1000,//camera's distance
		radious = 1000,//半徑
		baseangle = 0,
		cav_y = 0,
		rotationspeed = 0.01;


	for(var i = 0; i < numcards; i += 1) {
		var card = {
			angle: Math.PI * 2 / numcards * i,
			img: document.createElement("img")
		};
		card.img.src = "cute.png";
		card.x = Math.cos(card.angle + baseangle) * radious;
		card.z = Math.sin(card.angle + baseangle) * radious + centerZ;
		cards.push(card);
	}

	context.translate(width / 2, height / 2);

	document.body.addEventListener("mousemove",function(event) {
		rotationspeed = (event.clientX - width / 2) * 0.00005;
		cav_y = (event.clientY - height / 2)*2;
	});

	update();

	function update() {
		baseangle += rotationspeed;
		cards.sort(function zsort(cardA,cardB) {
			return cardB.z - cardA.z;
		});
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numcards; i += 1) {
			var card = cards[i],
			perspective = fl / (fl + card.z);
					 // 焦距(focal length) / (焦距+物體與camera的距離);
			context.save();
			context.scale(perspective, perspective);//放大perspective倍
			context.translate(card.x , cav_y);//轉換畫布的xy

			context.translate(-card.img.width / 2, -card.img.height / 2);
			context.drawImage(card.img,0,0);

			context.restore();

			card.x = Math.cos(card.angle + baseangle) * radious;
			card.z = Math.sin(card.angle + baseangle) * radious + centerZ;

		}
		requestAnimationFrame(update);
	}

	
};