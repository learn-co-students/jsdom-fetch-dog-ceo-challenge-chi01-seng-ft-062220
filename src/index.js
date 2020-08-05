document.addEventListener('DOMContentLoaded', function(){
    getImageFromApi();
    findBreed();
    addBreedSelectListener();
})

function getImageFromApi(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp=> resp.json())
        .then(json=> {
            json.message.map(image => renderImage(image))
        }); 
}

function renderImage(dogPictureURL){
    let container = document.getElementById('dog-image-container');
    let newImage = document.createElement('img');
    newImage.src = dogPictureURL;
    container.appendChild(newImage);
}

function findBreed(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp=> resp.json())
    .then(json=> {
        breeds = Object.keys(json.message);
        arrayOfDogs(breeds);
    })
}

function arrayOfDogs(breeds){
    let ul = document.getElementById('dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => listOfDogs(breed));
}

function removeChildren(element){
    let child = element.lastElementChild;
        while (child) {
            element.removeChild(child);
            child = element.lastElementChild;
  }
}

function listOfDogs(breed){
    let ul = document.getElementById('dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    ul.append(li);
    li.addEventListener('click', function(event){
        event.target.style.color = 'green';
    })
}

function addBreedSelectListener(){
    let breedDropDown = document.getElementById('breed-dropdown');
    breedDropDown.addEventListener('change', function(event){
        selectBreedsStartingWith(event.target.value);
    })
}

function selectBreedsStartingWith(letter) {
    arrayOfDogs(breeds.filter(breed => breed.startsWith(letter)));
  }

