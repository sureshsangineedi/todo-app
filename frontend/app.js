const API="https://todo-app-h2bu.onrender.com";
async function loadTodos(){
  const res=await fetch(API+"/todos");
  const todos=await res.json();
  const list=document.getElementById("todoList");
  list.innerHTML="";
  todos.forEach(todo=>{
    const li=document.createElement("li");
    li.textContent=todo.text+" ";
    const del=document.createElement("button");
    del.textContent="Delete";
    del.onclick=async()=>{await fetch(API+"/todos/"+todo.id,{method:"DELETE"});loadTodos();};
    li.appendChild(del);
    list.appendChild(li);
  });
}
async function addTodo(){
  const input=document.getElementById("todoInput");
  const text=input.value;
  if(text.trim()==="") return alert("Enter something!");
  await fetch(API+"/todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text})});
  input.value="";
  loadTodos();
}
loadTodos();
