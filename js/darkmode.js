const btnDark = document.querySelector('.btn-dark-mode');

btnDark.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme')
	if (document.body.className === 'dark-theme') {
		btnDark.innerHTML = `
            <i class="fas fa-sun"></i>
            Light Mode
        `
	} else {
		btnDark.innerHTML = `
            <i class="fas fa-moon"></i>
            Dark Mode
        `
	}
})
