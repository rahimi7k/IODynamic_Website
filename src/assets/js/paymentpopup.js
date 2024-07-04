var actionBar = document.getElementById("actionBar"),
payment = document.getElementById("payment"),
mousePosition,
offset = [0, 0],
div,
isDown = false;

if (actionBar != null) {
	//payment.style.visibility = "hidden";
	actionBar.style.position = "absolute";

	actionBar.addEventListener('mousedown', function (e) {
		isDown = true;
		offset = [
			payment.offsetLeft - e.clientX,
			payment.offsetTop - e.clientY
		]

	}, true);
	actionBar.addEventListener('mouseup', function () {
		isDown = false;
	}, true);

	document.addEventListener('mousemove', function (event) {
		event.preventDefault();
		if (isDown) {
			mousePosition = {
				x: event.clientX,
				y: event.clientY
			};
			payment.style.left = (mousePosition.x + offset[0]) + 'px';
			payment.style.top = (mousePosition.y + offset[1]) + 'px';
		}
	}, true);
}



