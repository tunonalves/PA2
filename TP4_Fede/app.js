const items = document.getElementById('items')
const templatecard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded',()=>{
	fetchData()
})
items.addEventListener('click', e => {
	addCarrito(e)
})

const fetchData = async() => {
	try{
		const res = await fetch('api.json')
		const data = await res.json()
		//console.log(data)
		pintarCard(data)
	}catch (error){
		console.log(error)
	}
}

const pintarCard = data => {
	console.log(data)
	data.forEach(producto =>{
		templatecard.querySelector('h5').textContent = producto.title
		templatecard.querySelector('p').textContent = producto.precio
		templatecard.querySelector('img').setAttribute("src",producto.thumbnailUrl)
		templatecard.querySelector('.btn-dark').dataset.id = producto.id
		const clone = templatecard.cloneNode(true)
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)
}

const addCarrito = e => {
	//console.log(e.target)
	//console.log(e.target.classList.contains('btn-dark'))
	if(e.target.classList.contains('btn-dark')){
		
	}
}
