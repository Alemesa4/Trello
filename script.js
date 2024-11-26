const themebuttons = document.querySelectorAll(".theme-button");
const tasks = document.getElementById("tasks");
const add =document.getElementById("add");
const notfinisheddiv = document.getElementById("notfinished");
const onworkdiv = document.getElementById("onwork");
const finisheddiv = document.getElementById("done");
themebuttons.forEach(id => {
    id.addEventListener("click", () => {
        const theme = id.getAttribute("data-theme");
        document.body.setAttribute("data-theme", theme);

        document.cookie = `theme=${theme}; path=/; max-age=31536000`; 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cookies = document.cookie.split("; ");
    const themeCookie = cookies.find(cookie => cookie.startsWith("theme="));
    if (themeCookie) {
        const theme = themeCookie.split("=")[1];
        document.body.setAttribute("data-theme", theme);
    }
});

add.addEventListener("click", () => {
    const task = tasks.value;
    if(task == "") return;
    const tasknotfinished=document.createElement("div");
    const edittask=document.createElement("div");
    const deletetask=document.createElement("div");

    edittask.innerText="✏️";
    deletetask.innerText="🗑️";

    tasknotfinished.style.backgroundColor = `hsl(${Math.random() * 360}, 60%, 50%)`;

    edittask.classList.add("edittask");
    deletetask.classList.add("deletetask");

    tasknotfinished.classList.add("taskmove");
    
    const taskonworkspan=document.createElement("span");
    taskonworkspan.innerText=task;
    tasknotfinished.appendChild(taskonworkspan);
    tasknotfinished.appendChild(edittask);
    tasknotfinished.appendChild(deletetask);
    notfinisheddiv.appendChild(tasknotfinished);
    tasks.value="";

    deletetask.addEventListener("click", () => {    
        notfinisheddiv.removeChild(tasknotfinished);
    });

    edittask.addEventListener("click", () => {
        taskonworkspan.contentEditable = true;
        taskonworkspan.focus();
    });
    tasknotfinished.setAttribute("draggable", "true");
    tasknotfinished.addEventListener("dragover", dragover);
    tasknotfinished.addEventListener("dragstart", dragstart);

    [notfinisheddiv, onworkdiv, finisheddiv].forEach(progress => {
        progress.addEventListener("dragover", dragover);
        progress.addEventListener("drop", drop);
    });
});

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("task");
    const dataDiv = document.createElement("div");
    dataDiv.innerHTML = data;
    dataDiv.classList.add("taskmove");
    dataDiv.setAttribute("draggable", "true");
    dataDiv.style.backgroundColor = `hsl(${Math.random() * 360}, 60%, 50%)`;

    console.log(dataDiv)
    //set data as html in event current target
    event.currentTarget.appendChild(dataDiv);
}


function dragstart(event) {
    console.log(event.target);
    event.dataTransfer.setData("task", event.target.innerHTML);

    
}

function dragover(event) {
    event.preventDefault();

}
