const addForm = document.querySelector('.add');
const list = document.querySelector('.todos'); //.todos found in ul tag
const search = document.querySelector('.search input');



//had class of span on the span tag but not needed
//generates the data(todo) that is input by the user and displays on list
const generateTemplate = todo => {
    const html = `
    <li class="list-group-item mb-1">
        <span class=" align-items-center">${todo}</span> 
        <div>
    <textarea placeholder="${todo} - Definition of word here..." class="list-group-item mt-2 show"></textarea>
            </div>
            <i class="far fa-trash-alt delete mt-3" alt="Bin Me"></i>
    </li>
    `;

    list.innerHTML += html;

};



//event listener on submit of input from user
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    //addForm.add is refering to the 'name' of the input tag on the html
    if(todo.length){
    generateTemplate(todo);
    addForm.reset();


    //set data in local storage
    localStorage.setItem('todo', JSON.stringify(todo));
    // console.log(todo);

    //set new array for data to output
    let data;

    if(localStorage.getItem('data') === null){
        data = [];
        // console.log(data)
    } else {
        data = JSON.parse(localStorage.getItem('data'))
        //gets whatever is in local storage
    }
        //push the data onto the todo list
        data.push(todo);
        localStorage.setItem('data', JSON.stringify(data));
    }
});


//grab data in local storage and output
function getLocalStorage(){
    //iterate through each item in the local storage
    const data = JSON.parse(localStorage.getItem('data'));
    if(data === null){
        // console.log('empty data');
        list.innerHTML = `
        <span id="no-words"><strong>No current words available
        </strong></span>`;
    }else {
    data.forEach(function(data){
        // console.log(data)
        // if(data === null){
        //     console.log('Nothing available')
        // }
    
    generateTemplate(data);
    
});
}
}

getLocalStorage();



// localStorage.clear(); 
//can add this with an all clear button or
//when trash can i spressed it should cancel from local storage aswell


//delete todos from interface
list.addEventListener('click', e => {
    // console.log(e.target) checks anywhere i click in the list section
    if(e.target.classList.contains('delete')){
    //checks a particular class that was clicked on 
    //delete is a class name for all the trashcans (icons)
        e.target.parentElement.remove();
        //target the parentElement of the delete class
        //in this case its the li tag
    }
});


//filters the list by checking users input - top of app
const filterTodos = (term) => {
    Array.from(list.children)
    //the list.children was logged to console and found that it was a HTML collection
    //Array.from made sure that it was changed into an array in order to use the 
    //following methods
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) //will !NOT! match the term(word typed in) 
        //filter returns a new array that has been filtered with whatever we want left in it
    .forEach((todo) => todo.classList.add('filtered'));
     //foreach will add a filtered class to the html which means it will FILTER OUt
     //the li's that DO NOT have whatever word the user is typing in. Genius.
    
    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
     //in case user backtracks on term(word) being typed in then the 
     //filter will re-evaluate the term and see if it is still filtered
}


//keyup event refers back to the function above which filters out the names on the list 
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});


//LEFT TODO 
//delete/remove 'todo' from list AND local storage
//change styles