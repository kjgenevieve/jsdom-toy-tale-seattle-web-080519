const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// On the index.html page, there is a div with the id "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

API_URL = "http://localhost:3000/toys"

fetch(API_URL).then(response => response.json()).then(json => createCards(json))

function createCards(json){
  const toyCollection = document.getElementById("toy-collection")

  for (toy of json) {
    const toyCard = document.createElement("div")
    toyCard.class = "card"
    

    let toyName = document.createElement("h2") //toy's name
    let toyImage = document.createElement("img") // image
    let toyLikes = document.createElement("p") // likes
    let toyBtn = document.createElement("button") // like button

    toyImage.id = "image"
    toyBtn.class = "like-btn"

    toyName.innerText = toy.name
    toyImage.src = toy.image
    toyLikes.innerText = toy.likes
    toyBtn.innerText = "Like"

    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(toyBtn)
    
    toyCollection.appendChild(toyCard) 
  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


const createBtn = document.querySelector('.add-toy-form')

createBtn.addEventListener('submit', (e) => {
  // debugger;
  e.preventDefault()
  // console.log(e.target.name.value)
  // console.log(e.target.image.value)
  
  const name = e.target.name.value
  const image = e.target.image.value
  const likes = 0

  const newToy = {name, image, likes}
  
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }).then(response => response.json()).then(json => createCards([json]))
})