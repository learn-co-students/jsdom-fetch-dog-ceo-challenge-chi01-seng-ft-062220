console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){
    dogImages();
    dogBreeds();
    filtered()
});


const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function dogImages(){
    fetch(imgUrl).then(function(response){
        return response.json();
    })
    .then(function(json) {
        json.message.forEach (image => addImage(image))
    }
 )}

 function addImage(url){
    let container = document.getElementById('dog-image-container');
    let newImageElement = document.createElement('img');
    newImageElement.src = url;
    container.appendChild(newImageElement);
 }

 function dogBreeds(){
     fetch(breedUrl).then(function(response){
         return response.json();
     })
     .then(json => {
        const allBreeds = json.message
        addBreed(allBreeds)
    })
}

 function addBreed(allBreeds){
    for (breed in allBreeds){
        const nationality = allBreeds[breed]
        if (nationality.length === 0){
            let container = document.getElementById('dog-breeds')
            let newBreed = document.createElement('li');
            newBreed.innerText = breed;
            newBreed.style.cursor = 'pointer';
            container.appendChild(newBreed);
            newBreed.addEventListener('click', changeColor)
        } else {
            nationality.forEach(nation =>{
                const fullName = `${nation} ${breed}`
                let container = document.getElementById('dog-breeds')
                let newBreed = document.createElement('li');
                newBreed.innerText = fullName;
                newBreed.style.cursor = 'pointer';
                container.appendChild(newBreed);
                newBreed.addEventListener('click', changeColor)
            })
                
        }
    }
}

 function changeColor(object){
    object.target.style.color = '#879800'
 }

// filter function based on selection in #breed-dropdown
// should create an array of breeds
// filter out options that don't include breed[0] === option value
// and return the ones that match

function filtered(){
    const selectionField = document.getElementById('breed-dropdown')
    selectionField.addEventListener('change', function(event){
        const beginsWith = event.target.value
        const allBreedsListed = document.getElementById('dog-breeds')
        allBreedsListed.innerHTML = ''
        console.log(beginsWith)
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(jsonData => {
          const breedObj = jsonData.message
    
          const filteredBreedObj = {}
    
          for (breed in breedObj ){
            if (breed[0] === beginsWith) {
              filteredBreedObj[breed] = breedObj[breed]
            }
          }
    
          addBreed(filteredBreedObj)
    
        })
    })
}