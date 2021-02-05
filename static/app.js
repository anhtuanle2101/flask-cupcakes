import {Cupcake} from './class.js';

const lst = document.querySelector('.cupcakes-list');

async function show_all_cupcakes(){
    const cupcakes = await Cupcake.fetchAllCupcakes();
    for (let i=0; i<cupcakes.length; i++){
        const cupcake = cupcakes[i];
        const newLi = document.createElement('li')
        newLi.textContent = `${cupcake.id} - ${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}`
        const newImg = document.createElement('img')
        newImg.src = `${cupcake.image}`;
        newImg.style = 'width:100px; height:100px'
        newLi.append(newImg);
        lst.append(newLi);
    }
}

async function add_cupcake(e){
    if (e.target.tagName === 'BUTTON'){
        const data = get_inputs();
        if (data){
            const cupcake = await Cupcake.createCupcakes(data);
            addCupcakeHTML(cupcake);
        }
    }
}

async function search_cupcake(){
    const term = document.querySelector('#search').value;
    const rsLst = document.querySelector('.search-results');
    rsLst.textContent = '';
    if (term){
        const cupcakes = await Cupcake.searchCupcakes(term);
        if (cupcakes){
            populateSearchResultsHTML(cupcakes);
        }
    }
}

function populateSearchResultsHTML(cupcakes){
    const rsLst = document.querySelector('.search-results');
    rsLst.textContent = '';
    for (let i=0; i<cupcakes.length; i++){
        const cupcake = cupcakes[i];
        const newLi = document.createElement('li')
        newLi.textContent = `${cupcake.id} - ${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}`
        const newImg = document.createElement('img')
        newImg.src = `${cupcake.image}`;
        newImg.style = 'width:100px; height:100px'
        newLi.append(newImg);
        rsLst.append(newLi);
    }
}

function addCupcakeHTML(cupcake){
    const newLi = document.createElement('li')
    newLi.textContent = `${cupcake.id} - ${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}`
    const newImg = document.createElement('img')
    newImg.src = `${cupcake.image}`;
    newImg.style = 'width:100px; height:100px'
    newLi.append(newImg);
    lst.append(newLi);
}

function get_inputs(){
    const flavor = document.querySelector('#flavor').value;
    const size = document.querySelector('#size').value;
    const rating = document.querySelector('#rating').value;
    const image = document.querySelector('#image').value;
    if (flavor&&size&&rating){
        return {
            flavor,
            size,
            rating,
            image
        }
    }
}

show_all_cupcakes();

document.querySelector('.add-form').addEventListener('click', async function(e){ e.preventDefault(); await add_cupcake(e)})

document.querySelector('#search').addEventListener('keyup', search_cupcake)