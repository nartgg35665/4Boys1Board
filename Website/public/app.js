/*

*/
const user = JSON.parse(localStorage.getItem('user'));
//console.log(user.userId);

var dbPath = 'UsersData/' + user.userId.toString() + '/readings';
//var chartPath = 'UsersData/' + user.userId.toString() + '/charts/range';

// Database references
//console.log(dbPath);
var dbRef = firebase.database().ref(dbPath);
//console.log(dbRef);
//var chartRef = firebase.database().ref(chartPath);
//console.log(dbRef);
/*
dbRef.orderByKey().on('value', snapshot =>{
  var jsonData = snapshot.toJSON();
  // Save values on variables
  var a = jsonData.temperature;
  var b = jsonData.timestamp;
  console.log(a)
  console.log(b)
});
*/
function epochToJsDate(epochTime) {
  return new Date(epochTime * 1000);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime) {
  var epochDate = new Date(epochToJsDate(epochTime));
  var dateTime = epochDate.getFullYear() + "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
    ("00" + epochDate.getDate()).slice(-2) + " " +
    ("00" + epochDate.getHours()).slice(-2) + ":" +
    ("00" + epochDate.getMinutes()).slice(-2) + ":" +
    ("00" + epochDate.getSeconds()).slice(-2);

  return dateTime;
}

dbRef.orderByKey().limitToLast(100).on("value", function (snapshop) {
  var cnt = 1;
  var last = 0;
  var table_head = `<tr class="hrow">
                    <th>No.</th>
                    <th>Temperature</th>
                    <th>Time</th>
                    <th>Date</th>
                    </tr>`;
  document.querySelector("#task-table").innerHTML = table_head;
  //console.log(snapshop.val());
  var arr = [];
  snapshop.forEach(function (childSnapshot) {
    arr.push(childSnapshot.val());
    var data = childSnapshot.val();
    //console.log(data.temperature);
    var temp = parseInt(data.temperature) / 100;
    //console.log(temp);
    //var date = epochToDateTime(data.timestamp);
    last = temp;
  });
  for(var i = arr.length-1;i>=0;i--){
    var data = arr[i];
    var temp = parseInt(arr[i].temperature) / 100;
    var date = epochToDateTime(arr[i].timestamp);
    var html = `<tr>
                <td>${cnt}</td>
                <td class="temp">${temp} °C</td>
                <td>${date.slice(11)}</td>
                <td>${date.slice(0, 10)}</td>
                </tr>`
    document.querySelector("#task-table").innerHTML += html;
    cnt++;
  }
  const tempEls = document.getElementsByClassName("temp");
  for (temp of tempEls) {
    //console.log(temp.innerHTML[0] + temp.innerHTML[1] + temp.innerHTML[3]);
    if (temp.innerHTML[0] + temp.innerHTML[1] + temp.innerHTML[3] >= 375) {
      temp.style.color = "red";
    }
    else {
      temp.style.color = "green";
    }
  }
  document.querySelector(".temp-box h2").innerHTML = last.toString() + "°C";
  if(last >= 37.5){
    //console.log("+++++++" + last);
    document.querySelector(".temp-box").style.background = "red";
  }else{
    //console.log("=======" + last);
    document.querySelector(".temp-box").style.background = "green";
  }
});