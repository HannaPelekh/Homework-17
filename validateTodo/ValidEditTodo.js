const editTitleE = document.querySelector(".edit_title");
const editBodyE = document.querySelector(".edit_body");
const editButtonE = document.querySelector(".save");
const ErrMsgEditTiteE = document.querySelector(".edit_title_error");
const ErrMsgEditBodyE = document.querySelector(".edit_body_error");
const editInputBox = document.querySelector(".edit_todo");

editTitleE.addEventListener("keyup", validateEditTitle);
editBodyE.addEventListener("keyup", validateEditBody);
editInputBox.addEventListener("keyup", validateEditData);

editButtonE.disabled = true;
  
function validateEditTitle(e) {   
  if (!e.target.value.trim()) {
    ErrMsgEditTiteE.innerText = "";
    editButtonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;    
    return;
  }
  if (e.target.value.trim().length <= 3) {
    ErrMsgEditTiteE.innerText = "Error, Title should be more then 3 symbols";
    editButtonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;   
    return;
  }
  IS_DATA_VALID[e.target.id] = true;
  ErrMsgEditTiteE.innerText = "";
  
}
function validateEditBody(e) {
    if (!e.target.value.trim()) {
      ErrMsgEditBodyE.innerText = "";
      editButtonE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (e.target.value.trim().length <= 3) {
        ErrMsgEditBodyE.innerText = "Error, Body should be more then 3 symbols";
        editButtonE.disabled = true;
        IS_DATA_VALID[e.target.id] = false;
        return;
    }    
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgEditBodyE.innerText = "";
}
function validateEditData(e) {    
    const target = e.target;        
    if (target.id === "edit_title") {
        validateEditTitle(e);
    }
    if (target.id === "edit_body") {
        validateEditBody(e);
    }       
    editButtonE.disabled = !(
        IS_DATA_VALID["edit_title"] &&      
        IS_DATA_VALID["edit_body"]
    );   
    
}  
