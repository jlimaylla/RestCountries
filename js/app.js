const flags = document.getElementById('flags');
document.addEventListener('DOMContentLoaded', (e) => {
	fetchData()
})

const fetchData = async () => {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const data = await response.json();
		printFlags(data)
		formClient(data)
	} catch (error) {
		console.log(error);
	}
}

const printFlags = data => {
	let elements = ''
	data.forEach(item => {
		let languages = ''
		for (const property in item.languages) {
			languages += `<ul>
			<li>${item.languages[property]}</li>
			</ul>`
		}

		elements += `<tr>

		<td>${item.cca3}</td>
		<td>${item.name.common}</td>
		<td>${item.capital}</td>
		<td>${item.population} habs.</td>
		<td>${languages}</td>

		<td>
			<img src="${item.flags.svg}" alt="${item.name.common}" class="img-fluit">
			<a href="detail.html?name=${item.name.common}">Más infomación</a>
		</td>

	</tr>`
	});
	flags.innerHTML = elements
}

const form = document.getElementById('form')
const inputForm = document.getElementById('inputForm')

const formClient = data => {
	form.addEventListener('keyup', e => {
		e.preventDefault()
		const textClient = inputForm.value.toLowerCase()
		const filterCountries = data.filter(item => {
			const name = item.name.common.toLowerCase()
			if (name.includes(textClient)) {
				return item
			}
		})
		printFlags(filterCountries)
		textRegion.innerHTML = ''
	})
}


const select = document.getElementById("selectForm")
const textRegion = document.getElementById("textRegion")


select.addEventListener('change', async e => {
	e.preventDefault()
	const select = e.target
	const regionSelected = select.value.toLowerCase()
	const description = select.options[select.selectedIndex].text
	if (regionSelected === "") {
		fetchData()
		textRegion.innerHTML = ''
		return
	}
	const response = await fetch(`https://restcountries.com/v3.1/region/${regionSelected}`)
	const data = await response.json()
	textRegion.innerHTML = `<p> ${description.toUpperCase()} - ${data.length} paises encontrados</p>`
	printFlags(data)
})

