const taskTable = document.getElementById('task-table');
const searchEl = document.getElementById('search');
const searchResultEl = document.getElementById('search-result');

var cnt=0;
getUsers();


async function getUsers(searchKey=""){
    let resultNumber = 0;
    users.forEach((user)=>{
        let txtValue;
        let filter = searchKey;
        if(user.name) txtValue = user.name.toUpperCase();
        else txtValue = "";
        if(txtValue.indexOf(filter) > -1){
            cnt++;
            addNewUser(user);
            resultNumber++;
        }
    });
    return resultNumber;
}

function addNewUser(user){
    const tr = document.createElement('tr');
    const number = document.createElement('td');
    const img = document.createElement('td');
    const name = document.createElement('td');
    const temp = document.createElement('td');

    number.innerHTML = cnt;
    img.innerHTML = `<img src=${user.imglink}>`
    name.innerHTML = `<a href="temperature.html">${user.name} ${user.surname}</td>`
    name.addEventListener("click",()=>{
        localStorage.setItem("user", JSON.stringify(user));        
        window.location.href = "temperature.html";
    });
    //temp.innerHTML = user.temp;
    temp.innerHTML = `<span id="temp-${cnt-1}">${user.temp}</span>`;
    /*
    taskName.innerHTML = task.taskName;
    taskNumber.innerHTML = task.taskNumber;
    const chooseBtn = document.createElement('button');
    chooseBtn.innerText = "choose";
    chooseBtn.addEventListener("click",()=>{
        localStorage.setItem("chooseTaskID", task.taskID);
        window.location.href = taskInfoLink;
    });
    chooseBtnTd.appendChild(chooseBtn);
    tr.appendChild(taskName);
    tr.appendChild(taskNumber);
    tr.appendChild(chooseBtnTd);
    */
    tr.setAttribute("id",cnt.toString());
    tr.appendChild(number);
    tr.appendChild(img);
    tr.appendChild(name);
    tr.appendChild(temp);
    taskTable.appendChild(tr);
}

searchEl.addEventListener('keypress',(e)=>{
    cnt=0;
    if(e.key === 'Enter'){
        if(searchEl.value!==""){
            searchWait();
        }
        else{
            searchResultEl.innerHTML = "";
            taskTable.innerHTML = `<tr class="hrow">
            <th>No.</th>
            <th> </th>
            <th>Username</th>
            <th>Latest Temp</th>
            </tr>`;
            getUsers();
        } 
    }
});

async function searchWait(){
    let resultNumber = 0;
    filter = searchEl.value.toUpperCase();
    taskTable.innerHTML = `<tr class="hrow">
    <th>No.</th>
    <th> </th>
    <th>Username</th>
    <th>Latest Temp</th>
    </tr>`;
    /*
    if (tasks) {
        tasks.forEach((task) => {
            if(task.taskName) txtValue = task.taskName.toUpperCase();
            else txtValue = "";
            if(txtValue.indexOf(filter) > -1){
                addNewTask(task);
                resultNumber++;
            }
        });
    }
    */
    resultNumber = await getUsers(filter);

    searchResultEl.innerHTML = "";
    if(resultNumber!==0) searchResultEl.innerHTML += "There are "+ resultNumber +" result(s) of \""+searchEl.value+"\".";
    else{
        searchResultEl.innerHTML += "Sorry, No result of \""+searchEl.value+"\".";
        taskTable.innerHTML = "";
    }
}