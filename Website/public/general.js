class User{
    constructor(imglink,name,surname,temp,password,userId){
        this.imglink = imglink;
        this.name = name;
        this.surname = surname;
        this.temp = temp;
        this.password = password;
        this.userId = userId;
    }
}
var users = [new User("img/nart.jpg","Ratchanart","Lacharochana","36.5 °C","1234", "0Jii4DZWbihb4ad1WnCyqTadlrB2"), 
            new User("img/asia.jpg","Theerut","Seekeaw","38.0 °C","1234", "HkTH6hLjAnM3od9xNB1Q8Irs05g2"), 
            new User("img/plub.jpg","Chaiyapluek","Muskul","35.9 °C","1234", "GO9izWeQc9ObHxBUCiZGXaMn5ur1"), 
            new User("img/yuan.jpg","None","Wanitchollakit","36.0 °C","1234", "f5FOzh2B6RbIEky3iWaREmj65L42")]
for(var i=0 ; i<users.length ; i++){
    play(i);
}
async function play(i){
    //console.log(users[i]);
    const path = 'UsersData/' + users[i].userId.toString() + '/readings';
    const dbRef = firebase.database().ref(path);
    await dbRef.orderByKey().limitToLast(1).on("value", function(snapshot){
        var data = snapshot.val();
        for(const x in data){
            //console.log("xx"+data[x].temperature);
            document.getElementById(`temp-${i}`).innerHTML = data[x].temperature/100+" °C";
            //console.log(i+1);
            users[i].temp = data[x].temperature/100+" °C";
        }
    });
}

