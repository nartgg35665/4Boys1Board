const navEL = document.getElementById('nav');
const tempEls = document.getElementsByClassName("temp");
const chooseUser = JSON.parse(localStorage.getItem("user"));

navEL.innerHTML += `<span id="user">${chooseUser.name} ${chooseUser.surname}</span>`;
//console.log(tempEls);

for(temp of tempEls){
    console.log(temp.innerHTML[0]+temp.innerHTML[1]+temp.innerHTML[3]);
    if(temp.innerHTML[0]+temp.innerHTML[1]+temp.innerHTML[3]>=375){
        temp.style.color = "red";
    }
    else{
        temp.style.color = "green";
    }
}