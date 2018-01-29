// adding objects instead of text to t o d o list
//  Loops have 3 parts - initialization; condition; final-expression
var todoList = {
    todos: [],
        // we replaced this with the view object so this can be taken out now
        // displayTodos: function() {
        //     // console.log("My todos:", );
        //     // for (var i =0; i < this.todos.length; i++ ) {
        //     //     // this.todos.lenght = 3 items, 0 = item 1, 1 = itme 2, 2 = itme 3
        //     //     console.log(this.todos[i].todoText);
        //     // }
            
        //     // if this.todos.length is === 0;
        //     if (this.todos.length === 0 ) {
        //         console.log("Your todo list is empty!");
        //     } else {
        //         //print todos as normal
        //         console.log("My todos:" );
        //          for (var i = 0; i < this.todos.length; i++ ) {
        //             // this.todos.lenght = 3 items, 0 = item 1, 1 = itme 2, 2 = itme 3
        //             //  check if . completed is true
        //             if (this.todos[i].completed === true) {
        //                 console.log('(x)', this.todos[i].todoText);        
        //             } else {
        //             // print with ( ) for todoscompleted is false;
        //                 console.log('( )', this.todos[i].todoText);
        //                 }
        //             }
        //         }
        //     },
    addTodo: function(todoText) { 
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        //this.todos[position] = newValue;
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        // get number of completed todos
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
            completedTodos++;
            }
        }
        // case 1 if everything is true, make everything false
       if (completedTodos === totalTodos) {
            //make everything false
            for (var i = 0; i < totalTodos; i++) {
               this.todos[i].completed = false;
        }
            //case 2 otherwise make everything true
            } else {
                for (var i = 0; i < totalTodos; i++) {
                    this.todos[i].completed = true;
                }
            }
        

    }
};

//   OLD CODE
// 1 want access to display todos button
// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');

// // 2 run displayTodos method when someone clicks displayTodos button
// displayTodosButton.addEventListener('click', function() {
//     todoList.displayTodos();
// })

// toggleAllButton.addEventListener('click', function() {
//     todoList.toggleAll();
// });


// REFACTORED CODE:
var handlers = {
    // we deleted this button because it's not needed - all displays are on the other buttons now
    // displayTodos: function() {
    // todoList.displayTodos()
    // },
    addTodo: function() { 
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    deleteTodo: function() {
        var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();    // every one of these handlers changes data so displaying it proves it was changed
    },
    toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();   // every one of these handlers changes data so displaying it proves it was changed
    }
};
// view is responsible for what the user sees. does not change any data
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todo = todoList.todos[i];
            
                // this is what we are trying to accomplish
                // '(x)' todoText
                // var todoTextWithCompletion = '';
                //if todo.completed === true)
                    // (x) todoText
                //else
                    // ( ) todoText
                //todoLi.textContent = todoTextWithCompletion
            
            var todoTextWithCompletion = '';
            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }
            
            todoLi.textContent = todoTextWithCompletion;
            todosUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = 'deleteButton';
        return deleteButton;
    }
};