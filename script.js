const themebuttons = document.querySelectorAll(".theme-button");
const tasks = document.getElementById("tasks");
const add =document.getElementById("add");
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
    const notfinished = document.getElementById("not finished");  
    const tasknotfinished=document.createElement("div");
    tasknotfinished.classList.add("taskmove");
    const taskonworkspan=document.createElement("span");
    taskonworkspan.innerText=task;
    tasknotfinished.appendChild(taskonworkspan);
    notfinished.appendChild(tasknotfinished);
    tasks.value="";
  
});
