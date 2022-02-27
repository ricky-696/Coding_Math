window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,//(focal length)
		cards = [],
		numcards = 21;

	for(var i = 0; i < numcards; i += 1) {
		var card = {
			x: utils.randomRange(-1000, 1000),
			y: utils.randomRange(-1000, 1000),
			z: utils.randomRange(0, 10000),
			img: document.createElement("img")
		};
		card.img.src = "img" + (i % 7) + ".jpg";
		cards.push(card);
	}

	context.translate(width / 2, height / 2);

	update();

	function update() {
		cards.sort(function zsort(cardA,cardB) {
		return cardB.z - cardA.z;
	});
		//sort(a, b) 回傳值如果小於 0 (負數)，表示 a 排序在 b 前面
		//sort(a, b) 回傳值如果等於 0，表示 a 和 b 排序一樣位置不動
		//sort(a, b) 回傳值如果大於 0 (正數)，表示 b 排序在 a 前面
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numcards; i += 1) {
			var card = cards[i],
			perspective = fl / (fl + card.z);
					 // 焦距(focal length) / (焦距+物體與camera的距離);
			context.save();
			context.scale(perspective, perspective);//放大perspective倍
			context.translate(card.x , card.y);//轉換畫布的xy

			context.translate(-card.img.width / 2, -card.img.height / 2);
			context.drawImage(card.img,0,0);

			context.restore();

			card.z -= 5;
			if(card.z < 0) {
				card.z = 10000;
			}
		}
		requestAnimationFrame(update);
	}

	
};