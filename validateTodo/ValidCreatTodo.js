const titleE = document.getElementById("input_title");
const bodyE = document.getElementById("input_body");
const buttonE = document.getElementById("button_create");
const ErrMsgTitleE = document.querySelector(".title_error");
const ErrMsgBodyE = document.querySelector(".body_error");
const inputBox = document.querySelector(".add_container");

titleE.addEventListener("keyup", validateTitle);
bodyE.addEventListener("keyup", validateBody);
buttonE.addEventListener("click", onAddTodoList);
inputBox.addEventListener("keyup", validateData);

buttonE.disabled = true;

function onAddTodoList() {   
    todo.createTodo(titleE.value, bodyE.value)      
    buttonE.disabled = true;   
    titleE.value = "";
    bodyE.value = "";             
}   
function validateTitle(e) {   
  if (!e.target.value.trim()) {
    ErrMsgTitleE.innerText = "";
    buttonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;    
    return;
  }
  if (e.target.value.trim().length <= 3) {
    ErrMsgTitleE.innerText = "Error, Title should be more then 3 symbols";
    buttonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;   
    return;
  }
  IS_DATA_VALID[e.target.id] = true;
  ErrMsgTitleE.innerText = "";
  
}
function validateBody(e) {
    if (!e.target.value.trim()) {
      ErrMsgBodyE.innerText = "";
      buttonE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (e.target.value.trim().length <= 3) {
        ErrMsgBodyE.innerText = "Error, Body should be more then 3 symbols";
        buttonE.disabled = true;
        IS_DATA_VALID[e.target.id] = false;
        return;
    }    
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgBodyE.innerText = "";
}
function validateData(e) {    
    const target = e.target;        
    if (target.id === "input_title") {
    validateTitle(e);
    }
    if (target.id === "input_body") {
    validateBody(e);
    }       
    buttonE.disabled = !(
        IS_DATA_VALID["input_title"] &&      
        IS_DATA_VALID["input_body"]
    );   
    
}  
