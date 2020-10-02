//Select elements in HTML file
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const STRIKE_THROUGH = "strikeThrough";

// variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");

// check id data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set id to last item
    loadList(LIST); // load the list to the user interface
} else {
    // if data isnt empty
    LIST = [];
    id = 0;
}

// load items to the users interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//const clear = document.querySelector(".clear");

// clear the local storage
clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

// show todays date
const options = { weekday: 'long', month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const STRIKE = done ? STRIKE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${STRIKE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                   </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

//addToDo("drinkcoffee", 1, true, false);

// add an item to the list user
document.addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        const toDo = input.value;
        // if input is not empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
            // add item to local storage (this code must be added where the LIST Array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})

// // Complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(STRIKE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; // returns the clicked element inside list
    const elementJOB = element.attributes.job.value; // complete or delete

    if (elementJOB == "complete") {
        completeToDo(element);
    }
    else if (elementJOB == "delete") {
        removeToDo(element);
    }
    // add item to local storage (this code must be added where the LIST Array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
