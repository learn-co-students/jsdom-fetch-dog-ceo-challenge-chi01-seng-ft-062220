

document.addEventListener('DOMContentLoaded', function(){
    fetchImages();
    fetchBreeds();
});


function fetchImages (){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch (imgUrl)
        .then(res => res.json())
        .then(results => { 
            results.message.forEach(imageurl => addImage(imageurl))

        });
}

function addImage(url) {
    let container = document.getElementById('dog-image-container');
    let newImageElement = document.createElement('img');
    newImageElement.src = url;
    container.appendChild(newImageElement);
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch (breedUrl)
        .then(res => res.json())
        .then(results => {
            Object.keys(results.message).forEach(breed => addBreed(breed))
            });
            
            //Object.keys() => Array[keys:]
    }

function addBreed(breed){
    let ul = document.getElementById("dog-breeds");
    let li = document.createElement('li')
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener('dblclick', changeColor)
                                    //without ()
}



function findByName(letter){ 
    //const breedCollection = document.getElementsByTagName('li');
    ////console.log(breedCollection)
    //const breedArr = [].slice.call(breedCollection);
    //console.log(breedArr)
    updateBreeds(breed.filter(breed => breed.startsWith(letter)))
}

function updateBreeds(breeds){
    let ul = document.getElementById("dog-breeds");
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed));
}

function breedEventListener(){
    let breedDropDown = document.querySelector("#breed-dropdown")
    breedDropDown.addEventListener('change', function(event){
        findByName(event.target.value)
    })
}


function changeColor(object) {
    object.target.style.color = 'Fuchsia';
}


