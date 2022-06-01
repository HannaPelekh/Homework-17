class Todo{
    static url = 'todos';
    #todos = [];
    #http = null;
    
    #current = {
        todo: null,
        el: null,
    };
    #edit = {
        el: null,
        title: null,
        body: null,
    };
    #todoListE = null;
    #CLASSES = {
        todo_complete: "todo_complete",
        active_item: "active_item",
        show_edit: "show_edit",
        hideComplete_Btn: "hide_element",
        close: "close",
        complete: "complete_btn",
        title: "title",
        body: "body"
    }
    constructor(el, editEl) {       
        this.#todoListE = el;
        this.#edit.el = editEl;               
        this.initTodo()          
    }

    initTodo() {
        this.#http = new Http(Todo.url);  
        this.#edit.title = this.#edit.el.querySelector(".edit_title");
        this.#edit.body = this.#edit.el.querySelector(".edit_body"); 
        this.setEventListener();
        this.getTodos();           
    }
    setEventListener() {
        this.#todoListE.addEventListener("click", this.onTodoClick);
        this.#edit.el.querySelector(".save").addEventListener("click", this.onTodoSave);   
    } 
    getTodos() {
        this.#http.getAllTodo().then((data) => {
            this.#todos = data;
            this.renderTodos(this.#todos);
        });
    }

    renderTodos(todos) {
        const content = todos.map((t) => this.createTodoElement(t)).join("");
        this.#todoListE.innerHTML = content;                
    }

    createTodoElement(todo) {
        return      `<div class="todo_items ${
                        todo.isComplete ? this.#CLASSES.todo_complete : ""
                        }" id="${todo.id}">
                        <div class="close"></div>
                        <h2 class="title">${todo.title}</h2>
                        <p class="body">${todo.body}</p>
                        <div class="dateAndComplete">
                            <p>${this.createDate(todo.createDate)}</p>
                            <p>${this.createTime(todo.createTime)}</p>
                            <button class="complete_btn ${
                                todo.isComplete ? this.#CLASSES.hideComplete_Btn : ""
                                }" id="${todo.id}">complete</button>
                        </div>
                    </div>`
    }       
    createDate(date){
        const newDate = moment(date).format("DD.MM.YYYY")        
        return newDate
    }
    createTime(time){
        const newTime = moment(time).format("HH:mm:ss")        
        return newTime
    }
    onTodoClick = (e) => {
        const target = e.target;
        if (this.#current.el) {
            this.#current.el.classList.remove(this.#CLASSES.active_item)
        }
        this.#current.el = e.target.closest(".todo_items");
        if (this.#current.el) {
            this.#current.todo = this.#todos.find(
                (e) => e.id === this.#current.el.id
            );
        }             
        if(e.target.classList.contains(this.#CLASSES.close)){
            this.removeTodo(this.#current.todo.id)       
            return;
        }
        if(e.target.classList.contains(this.#CLASSES.complete)){
            this.completeTodo(this.#current.todo)
            return;
        }
        if(e.target.classList.contains(this.#CLASSES.title) 
        || e.target.classList.contains(this.#CLASSES.body)){           
            this.editTodo(this.#edit.el)
            return;
        }
    };
    createTodo(title, body){
        const todo = {
            title,
            body,
            isComplete: false,
        };
        this.#http.create(todo).then((r) => {
            if(r && r.id) {
                this.#todos.unshift(r);
                const content = this.createTodoElement(r);
                this.#todoListE.insertAdjacentHTML("afterbegin", content);                                
            }
        })        
    }
    completeTodo(todo) {
        todo.isComplete = true;
        this.#http.update(todo.id, todo).then((r) => {
            if(r && r.id){
                this.#current.el.classList.add(this.#CLASSES.todo_complete)
                this.clearDate();
            }
        });
    }
    editTodo() {
        this.#edit.el.classList.add(this.#CLASSES.show_edit);  
        this.#current.el.classList.add(this.#CLASSES.active_item)           
        this.#edit.title.value = this.#current.todo.title;
        this.#edit.body.value = this.#current.todo.body;                 
    }
    onTodoSave = () => {
        this.#current.todo.title = this.#edit.title.value;
        this.#current.todo.body = this.#edit.body.value;
        this.#http.update(this.#current.todo.id, this.#current.todo).then((r) => {
            if(r && r.id){
                this.#current.el.querySelector(".title").innerHTML = r.title;
                this.#current.el.querySelector(".body").innerHTML = r.body;
                this.#edit.el.classList.remove(this.#CLASSES.show_edit);   
                this.#current.el.classList.remove(this.#CLASSES.active_item);
                this.clearDate();                 
            }
        })
    }
    removeTodo(id) {
       this.#http.delete(id).then((r) => {
            if(r.deletedCount >= 1) {
                this.#todos = this.#todos.filter((t) => t.id !== id);
                this.#current.el.remove();
                this.clearDate();
            }
        });
    }
    clearDate() {     
        this.#current.el = null;  
        this.#current.todo = null;          
    }
    

}



