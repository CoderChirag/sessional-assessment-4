let lightThemeStylesheet;
let cssFile = document.createElement('link');
if (
	['/user/profile.html', '/user/profile'].includes(window.location.pathname)
) {
	cssFile = document.createElement('link');
	cssFile.rel = 'stylesheet';
	cssFile.href = '../css/lightTheme.css'; // or path for file {themes('/styles/mobile.css')}
	document.head.appendChild(cssFile);
} else {
	cssFile = document.createElement('link');
	cssFile.rel = 'stylesheet';
	cssFile.href = './css/lightTheme.css'; // or path for file {themes('/styles/mobile.css')}
	document.head.appendChild(cssFile);
}

cssFile.onload = () => {
	setTimeout(() => {
		for (let stylesheet of document.styleSheets) {
			if (stylesheet.href.includes('lightTheme.css')) {
				lightThemeStylesheet = stylesheet;
				break;
			}
		}
		setTimeout(() => {
			if (localStorage.getItem('theme') === 'dark') {
				lightThemeStylesheet.disabled = true;
				document
					.querySelectorAll('.nav-link ol li svg')[0]
					.classList.remove('d-none');
				document
					.querySelectorAll('.menu-phone-icons svg')[0]
					.classList.remove('d-none');
			} else {
				document
					.querySelectorAll('.nav-link ol li svg')[1]
					.classList.remove('d-none');
				document
					.querySelectorAll('.menu-phone-icons svg')[1]
					.classList.remove('d-none');
			}
		}, 100);
	}, 200);
};

function toggleTheme(svg) {
	if (!lightThemeStylesheet) {
		for (let stylesheet of document.styleSheets) {
			if (stylesheet.href.includes('lightTheme.css')) {
				lightThemeStylesheet = stylesheet;
				break;
			}
		}
	}
	if (lightThemeStylesheet.disabled) {
		// dark -> light
		localStorage.setItem('theme', 'light');
		svg.setAttribute('color', '#ea5e10');
		svg.children[1].setAttribute('fill', '#ea5e10');
		svg.setAttribute('width', '40');
		svg.setAttribute('height', '40');
		svg.style.color = 'transparent';
		let rotate = 90;
		let rotation = setInterval(() => {
			if (rotate === 40) {
				clearInterval(rotation);
			}
			svg.style.transform = `rotate(${rotate}deg)`;
			rotate -= 1;
		}, 20);
		// svg.style.transform = 'rotate(90deg)';
		svg.style.marginTop = '-5px';
		let cx = 90;
		let cxInterval = setInterval(() => {
			if (cx === 50) {
				clearInterval(cxInterval);
			}
			svg.children[0].children[1].style.cx = `${cx}%`;
			cx -= 1;
		}, 20);
		svg.children[0].children[1].style.cy = '23%';
		let r = 5;
		let rInterval = setInterval(() => {
			if (r === 9) {
				clearInterval(rInterval);
			}
			svg.children[1].style.r = `${r}`;
			r += 1;
		}, 20);
		let opacity = 1;
		let opacityInterval = setInterval(() => {
			if (opacity < 0) {
				svg.children[2].style.opacity = `0`;
				clearInterval(opacityInterval);
			}
			svg.children[2].style.opacity = `${opacity}`;
			opacity -= 0.01;
		}, 0);
		lightThemeStylesheet.disabled = false;
	} else {
		// light -> dark;
		localStorage.setItem('theme', 'dark');
		svg.setAttribute('color', '#64ffda');
		svg.children[1].setAttribute('fill', '#64ffda');
		svg.setAttribute('width', '30');
		svg.setAttribute('height', '30');
		svg.style.color = null;
		let rotate = 40;
		let rotation = setInterval(() => {
			if (rotate === 90) {
				clearInterval(rotation);
			}
			svg.style.transform = `rotate(${rotate}deg)`;
			rotate += 1;
		}, 20);
		// svg.style.transform = 'rotate(90deg)';
		svg.style.marginTop = null;
		let cx = 50;
		let cxInterval = setInterval(() => {
			if (cx === 90) {
				clearInterval(cxInterval);
			}
			svg.children[0].children[1].style.cx = `${cx}%`;
			cx += 1;
		}, 20);
		svg.children[0].children[1].style.cy = '0px';
		let r = 9;
		let rInterval = setInterval(() => {
			if (r === 5) {
				clearInterval(rInterval);
			}
			svg.children[1].style.r = `${r}`;
			r -= 1;
		}, 20);
		let opacity = 0;
		let opacityInterval = setInterval(() => {
			if (opacity > 1) {
				svg.children[2].style.opacity = `1`;
				clearInterval(opacityInterval);
			}
			svg.children[2].style.opacity = `${opacity}`;
			opacity += 0.01;
		}, 0);
		lightThemeStylesheet.disabled = true;
	}
}
