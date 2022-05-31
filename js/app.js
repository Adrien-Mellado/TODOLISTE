// selecteur 
const todoInput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo_boutton");
const todolist = document.querySelector(".todo_lists");
const filterOption = document.querySelector(".filter_todo");

// ecouteurs 
document.addEventListener("DOMContentLoaded" , getTodos);
todobutton.addEventListener("click" , addTodo)
todolist.addEventListener("click", deletecheck)
filterOption.addEventListener("input", filtertodo)

// function

function addTodo (event){
    event.preventDefault();
    // to div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // cree le li 
    const NewTodo = document.createElement("li");
    NewTodo.innerText= todoInput.value;
    NewTodo.classList.add("todo_item");
    todoDiv.appendChild(NewTodo);
    // ajouter la todo au localstorage //
    savelocalTodos(todoInput.value);

    // button check

    const completButton= document.createElement("button");
    completButton.innerHTML = '<i class="fas fa-check"></i>';
    completButton.classList.add("complete_btn");
    todoDiv.appendChild(completButton);

    // bouton sup 
    const trashButton= document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash_btn");
    todoDiv.appendChild(trashButton);

    // Ajouter la to do list 
    todolist.appendChild(todoDiv);
    todoInput="";

}



function deletecheck(e){
    const item =e.target;
    if (item.classList[0]==="trash_btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removelocalTodos(todo);
        todo.addEventListener("transitionend" , function() {
            
           todo.remove(); 
        })
    }

    if (item.classList[0]==="complete_btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filtertodo (e) {
    const todo = todolist.childNodes;
    todo.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;

            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";

                }else {
                    todo.style.display = "none";

                }
                break;

                case "uncompleted":
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex";
    
                    }else {
                        todo.style.display = "none";
    
                    }
                    break;

        }
    })
}


function savelocalTodos(todo){
    // check si il y a des item // 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(todo){
    // check si il y a des item // 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

   todos.forEach(function(todo){
       // to div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // cree le li 
    const NewTodo = document.createElement("li");
    NewTodo.innerText= todo;
    NewTodo.classList.add("todo_item");
    todoDiv.appendChild(NewTodo);
 ;

    // button check

    const completButton= document.createElement("button");
    completButton.innerHTML = '<i class="fas fa-check"></i>';
    completButton.classList.add("complete_btn");
    todoDiv.appendChild(completButton);

    // bouton sup 
    const trashButton= document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash_btn");
    todoDiv.appendChild(trashButton);

    // Ajouter la to do list 
    todolist.appendChild(todoDiv);
   })
}


function removelocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// NOTIF AVEC ALARME DE RAPELLE // 