let ul = document.getElementById('todoList');



let todoList = {

    todos: [],
    addTodoCounter: 0,

    addTodo: function(todo) {
        if (todo) {

            let li = document.createElement('li');
            ul.appendChild(li);

            newTodo = {
                todo: todo,
                completed: false,
                id: this.addTodoCounter
            }

            this.addTodoCounter++;
            this.todos.push(newTodo);
            li.innerText = todo;
            li.setAttribute('id', newTodo.id);
            let div = document.createElement('div');
            let deleteMarker = document.createElement('button');
            li.appendChild(div);
            div.appendChild(deleteMarker);
            deleteMarker.innerText = 'X';
            deleteMarker.id = newTodo.id;
            deleteMarker.classList.add("deleteButton");
        }
    },

    changeTodo: function(position, todoText) {
        let currentTodoId = this.todos[position - 1].id
        this.todos[position - 1].todo = todoText;
        ul.childNodes[position].textContent = todoText;
        let div = document.createElement('div');
            let deleteMarker = document.createElement('button');
            ul.childNodes[position].appendChild(div);
            div.appendChild(deleteMarker);
            deleteMarker.innerText = 'X';
            deleteMarker.id = currentTodoId;
            deleteMarker.classList.add("deleteButton");
    },

    deleteTodo: function(position) {
        let todos = todoList.todos;
            this.todos.splice(position, 1)
            ul.childNodes[position + 1].remove();
    },

    toggleCompleted: function(event, position) {
        this.todos[position].completed = !this.todos[position].completed; 
        
        let toggleClickEvent = event.target;
        if (this.todos[position].completed === true) {
            toggleClickEvent.style.textDecoration = 'line-through';
        } else {
            toggleClickEvent.style.textDecoration = '';
        }
    },

    toggleAllCompleted() {


    }
};

let handlers = {

    addTodoListener: function(event) {
        if (event.keyCode === 13 || event.type === 'click') {
            let addTodoInput = document.getElementById('newTodo').value;
            todoList.addTodo(addTodoInput);
            document.getElementById('newTodo').value = '';
        }
        
    },

    changeTodoListener: function(e) {
        let changeTodoText = document.getElementById('changeTodoText').value;
        let changeTodoPosition = parseInt(document.getElementById('changeTodoPosition').value);
        if (changeTodoText && changeTodoPosition) {
            todoList.changeTodo(changeTodoPosition, changeTodoText)
            document.getElementById('changeTodoText').value = '';
            document.getElementById('changeTodoPosition').value = '';
            var alertText = document.getElementById('alertText');
            alertText.textContent = "";
        } else {
            document.getElementById('changeTodoPosition').value = '';
            var alertText = document.getElementById('alertText');
            alertText.textContent = "※ Please enter a number..."
            return;
        }
        
    },

    deleteTodoListener: function(event) {
        let todos = todoList.todos;
        const deleteClickEvent = event.target;
        if (deleteClickEvent.className === 'deleteButton') {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === parseInt(deleteClickEvent.id)) {
                    todoList.deleteTodo(i);
                }
            } 
        }
    },

    toggleCompletedListener: function(event) {
        let todos = todoList.todos;
        let toggleClickEvent = event.target;
        if (toggleClickEvent.tagName === 'LI') {
            for (let i = 0; i < todos.length; i++) {
                let tempTodo = todos[i].todo.concat('','X')
                if (tempTodo === toggleClickEvent.textContent) {
                   todoList.toggleCompleted(event, i);
                }
            } 
        }
    },

    clearCompletedListener(event) {
        let todos = todoList.todos;
        let todoElements = ul.childNodes;
        for (let i = todos.length - 1; i >= 0; i--) {
            if (todos[i].completed) {
                if (todos[i].id === parseInt(todoElements[i + 1].id)) {
                    todos.splice(i, 1);
                    ul.childNodes[i + 1].remove();
                }
            }
        }
    }
}




todoList.addTodo('First');
todoList.addTodo('Second');
todoList.addTodo('Third');








































