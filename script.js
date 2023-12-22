const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");


// event listner for adding tasks to list
function addTask(){
    if(inputBox.value === ''){
        alert("Task cannot be empty!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
}

//event listner for enter key
inputBox.addEventListener('keypress', function (q){
    if (q.key === 'Enter') {
        addTask();
    }
});

//  event listner for task completed & deleting task
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }

}, false);



