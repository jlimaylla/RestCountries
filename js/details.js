const flags = document.getElementById('flags')
const query = new URLSearchParams(window.location.search)
const params = query.get('name').toLowerCase()

document.addEventListener("DOMContentLoaded", e => {
	fetchData()
})

const fetchData = async () => {
	try {
		const res = await fetch(`https://restcountries.com/v3.1/name/${params}`)
		const data = await res.json()

		printFlag(data)
		console.log(data);
	} catch (error) {
		console.log(error)
	}
}

const printFlag = data => {
	let elements = ''
	data.forEach(item => {
		elements += `
        <article class="card">
            <img src="${item.flags.svg}" alt="" class="img-fluid">
            <div class="card-content">
                <h3>${item.name.common}</h3>
                <p>
                    <b>Poblacion: </b>
                    ${item.population} habitantes
                </p>
                <p>
                    <b>Capital: </b>
                    ${item.capital}
                </p>
                <p>
                    <b>Región: </b>
                    ${item.region}
                </p>
            </div>
        </article>
        `
	});
	flags.innerHTML = elements
}