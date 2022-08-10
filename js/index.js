const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

const fetchData = () => {
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				resolve(JSON.parse(this.responseText));
			}
			if (this.readyState === 4 && this.status !== 200) {
				reject({ status: this.status });
			}
		};
		xhttp.open(
			'GET',
			'https://jsonplaceholder.typicode.com/photos?utm_source=Mailerlite&utm_medium=E-mail&utm_campaign=Test%20Series&utm_term=2022-08-09',
			true
		);
		xhttp.send();
	});
};

const fetchUIData = () => {
	console.log(true);
	return new Promise((resolve, reject) => {
		fetchData()
			.then(data => {
				console.log('c');
				data = shuffleArray(data);
				console.log('d');
				resolve(data);
			})
			.catch(err => reject(err));
	});
};

showImages = async () => {
	try {
		let galleryData = await fetchUIData();
		console.log('b');
		// galleryData = shuffleArray(galleryData);
		galleryData = galleryData.filter((item, index) => index < 10);
		let galleryContainer = document.getElementById('gallery');

		let ind = 0;
		setTimeout(() => {
			console.log('a');
			for (const data of galleryData) {
				if (ind === 0) {
					galleryContainer.innerHTML = '';
				}
				galleryContainer.innerHTML += `
			    <div class="gallery-item">
			        <span class="material-icons-outlined close hidden">close</span>
			        <div class="content"><img src="${data.url}"></div>
                    <p class="img_title">${
						data.title.length > 10
							? `${data.title.substring(0, 10).trim()}..`
							: data.title.length
					}</p>
			    </div>
			`;
				ind++;
			}

			galleryUI();
		}, 500);
	} catch (err) {
		console.log(`Error, Status Code: ${err.status}`);
	}
};

function galleryUI() {
	var gallery = document.querySelector('#gallery');
	var getVal = function (elem, style) {
		return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
	};
	var getHeight = function (item) {
		return item.querySelector('.content').getBoundingClientRect().height;
	};
	var resizeAll = function () {
		var altura = getVal(gallery, 'grid-auto-rows');
		var gap = getVal(gallery, 'grid-row-gap');
		gallery.querySelectorAll('.gallery-item').forEach(function (item) {
			var el = item;
			el.style.gridRowEnd = `span ${
				Math.ceil((getHeight(item) + gap) / (altura + gap)) + 4
			}`;
		});
	};
	gallery.querySelectorAll('img').forEach(function (item) {
		item.classList.add('byebye');
		if (item.complete) {
			console.log(item.src);
			var altura = getVal(gallery, 'grid-auto-rows');
			var gap = getVal(gallery, 'grid-row-gap');
			var gitem = item.parentElement.parentElement;
			gitem.style.gridRowEnd = `span ${
				Math.ceil((getHeight(gitem) + gap) / (altura + gap)) + 4
			}`;
			item.classList.remove('byebye');
			if (item.clientHeight > item.clientWidth + 50) {
				item.classList.add('portrait');
			} else {
				item.classList.add('landscape');
			}
		} else {
			item.addEventListener('load', function () {
				console.log(true);
				var altura = getVal(gallery, 'grid-auto-rows');
				var gap = getVal(gallery, 'grid-row-gap');
				var gitem = item.parentElement.parentElement;
				gitem.style.gridRowEnd = `span ${
					Math.ceil((getHeight(gitem) + gap) / (altura + gap)) + 4
				}`;
				item.classList.remove('byebye');
				if (item.clientHeight > item.clientWidth + 50) {
					item.classList.add('portrait');
				} else {
					item.classList.add('landscape');
				}
			});
		}
	});
	window.addEventListener('resize', resizeAll);
	gallery.querySelectorAll('.gallery-item').forEach(function (item) {
		item.addEventListener('click', function () {
			item.classList.toggle('full');
			item.children[0].classList.toggle('hidden');
		});
	});

	let gr = document.getElementsByClassName('content');
	for (var i = 0; i < gr.length; i++) {
		gr[i].classList.add('gradient');
	}
}

// galleryUI();
showImages();
