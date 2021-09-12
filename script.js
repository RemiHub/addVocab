const addForm = document.querySelector('.add');
const list = document.querySelector('.todos'); //.todos found in ul tag
const search = document.querySelector('.search input');
const addWord = document.querySelector('.add input');
const vocabList = document.querySelector('#vocab-list')
const addVocabForm = document.querySelector('#add-form')




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





function renderWords(doc){

    let li = document.createElement('li');
    let word = document.createElement('span');
    let definition = document.createElement('textarea'); 
    let bin = document.createElement('button');
    
   
    definition.readOnly = true; //make description read only


    li.setAttribute('data-id', doc.id);
    word.textContent = doc.data().word;
    definition.textContent = doc.data().definition;
    bin.textContent = 'DELETE';
    bin.style.backgroundColor = 'red';
    bin.style.color = 'white';
    bin.style.fontWeight = '600';
    
    // bin.innerHTML = `<i class="far fa-trash-alt delete mt-3" ></i>`;            

    li.appendChild(word);
    li.appendChild(definition);
    li.appendChild(bin);
    
    // const html = `
    // <li class="list-group-item mb-1">
    //     <span class=" align-items-center">${doc.data().word}</span> 
    //     <div>
    // <textarea placeholder="${doc.data().definition || "click on the name to type in definition"}" name="definition" readonly class="list-group-item mt-2 show"></textarea>
    //         </div>
    //         <i class="far fa-trash-alt delete mt-3" alt="Bin Me"></i>
    // </li>
    // `;

    
    vocabList.appendChild(li);

    //delete word and desc when delete btn clicked
    bin.addEventListener('click', e => {
        e.stopPropagation();
        //get the unique id from the db
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Vocab').doc(id).delete();
    })
}


db.collection('Vocab').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        renderWords(doc);
        //grabs the data from the database
    })
});


//disable button until both input fields are filled out
let button = document.querySelector('.btn');
let input = document.querySelector('.input');
let input2 = document.querySelector('.input2');
button.disabled = true;


input2.addEventListener('change', stateHandle);
input.addEventListener("change", stateHandle);


function stateHandle() {
    if (document.querySelector('.input').value === "" ) {

        button.disabled = true; //button remains disabled
    
    } else if(document.querySelector('.input2').value === "") {
        button.disabled = true;

    } else {
         //button is enabled
        button.disabled = false; 
    }

}


//saving data to db
addVocabForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(definition);

    db.collection('Vocab').add({
        word: addVocabForm.add.value,
        definition: addVocabForm.defined.value
    });
    
  
    addVocabForm.add.value = ''; //clear the search bar value
    addVocabForm.defined.value = '';
});

db.collection('Vocab').doc()



function submitStorage(){
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
    // console.log(localStorage)

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
}

submitStorage();



function checkDatabaseEmpty(){
    
db.collection('Vocab').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        // console.log(doc.data())
        if(doc.data() === ''){
            list.innerHTML = `
         <span id="no-words"><strong>No current words available
         </strong></span>`;
            // console.log(doc.data());
        }
    })
})
}

checkDatabaseEmpty();




// localStorage.clear(); 
//grab data in local storage and output
// function getLocalStorage(){
//     //iterate through each item in the local storage
//     const data = JSON.parse(localStorage.getItem('data'));
//     if(data === null){
        
//         // console.log('empty data');
//         list.innerHTML = `
//         <span id="no-words"><strong>No current words available
//         </strong></span>`;
//     }else {
//     data.forEach(function(data){
//         // console.log(data)
//         // if(data === null){
//         //     console.log('Nothing available')
//         // }
    
    
//     generateTemplate(data);
    
// });
// }
// }

// getLocalStorage();


function removeStorage(){
//check local storage and remove when clicked
list.addEventListener('click', e => {
    // let newArr;
    // localStorage.setItem('data', JSON.stringify('newArr'));
    

    let arr = JSON.parse(localStorage.getItem('data'));
    if(e.target.classList.contains('delete')){
        arr.forEach(function(arr){
            if(arr == e.target.parentElement.textContent.trim()){
            console.log(arr);
            // console.log(e.target.parentElement.textContent.trim())
            let indexToRemove = 1;
            arr.slice(indexToRemove, 1)
            
            // localStorage.setItem('newArr', JSON.stringify(arr));
            }
        })

    }
})

}

removeStorage()



//delete todos from interface
list.addEventListener('click', e => {
    // console.log(e.target) checks anywhere i click in the list section
    // let getToRemove = localStorage.getItem('data');
    if(e.target.classList.contains('delete')){
    //checks a particular class that was clicked on 
    //delete is a class name for all the trashcans (icons)
    // console.log(localStorage.data)
        e.target.parentElement.remove();
        
        // let getToRemove = localStorage.getItem('data');
        // console.log(getToRemove)
        // localStorage.removeItem();
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


//if there is a duplicate then dont submit OR allow duplicates?
