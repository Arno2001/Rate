function Rate(from,selectRate,to,selectRateTo,bool) {
  fetch("http://data.fixer.io/api/latest?access_key=e4cc7e9dd46e2de6e22bca80fb277720")
    .then((response) => response.json())
    .then(function (result) {
      
      let selectFrom = document.getElementById('from');
      let selectTo = document.getElementById('to');
      let rates = result.rates;
      
      // Takes from api and add to select element
      selectAdd(selectFrom,rates);
      selectAdd(selectTo,rates);

      if(bool == true){ // If write in the FROM input this condition will work
        let convert = Math.round(((from/(selectRate.value)) * selectRateTo.value)*100)/100;
        if(!Number(convert)){
          document.getElementById("rateChange").innerHTML = " ";
          document.getElementsByTagName("input")[1].value = "";
        }else if(!isNaN(convert)){
          document.getElementsByTagName("input")[1].value = convert;
          document.getElementById("rateChange").innerHTML = from + " " + selectRate.options[selectRate.selectedIndex].text + " = <span>" + convert + "</span> " + selectRateTo.options[selectRateTo.selectedIndex].text;
        }
      }else if(bool == false){// If write in the TO input this condition will work
        let convert1 = Math.round(((to/(selectRateTo.value)) * selectRate.value)*100)/100;
        if(!Number(convert1)){
          document.getElementById("rateChange").innerHTML = " ";
          document.getElementsByTagName("input")[0].value = "";
        }else if(!isNaN(convert1)){
          document.getElementsByTagName("input")[0].value = convert1;
          document.getElementById("rateChange").innerHTML = to + " " + selectRateTo.options[selectRateTo.selectedIndex].text + " = <span>" + convert1 + "</span> " + selectRate.options[selectRate.selectedIndex].text;
        }
      }
    })
}

// Function add options to selects element
function selectAdd(selectName,rates){
  for (let key in rates) {
    let option = document.createElement("option");
    let val = rates[key];
    option.setAttribute('value',val);
    option.innerHTML = key;
    selectName.appendChild(option);
  }
}
// Function send data to Rate 
function rec(bool) {
  let from = document.getElementsByTagName("input")[0].value;
  let selectRate = document.getElementsByTagName("select")[0];
  let to = document.getElementsByTagName("input")[1].value;
  let selectRateTo = document.getElementsByTagName("select")[1];
  Rate(from,selectRate,to,selectRateTo,bool);
}
// 
document.querySelector("#inputFrom").addEventListener("keyup", function(){
  rec(true);
});
document.querySelector("#inputTo").addEventListener("keyup", function(){
  rec(false);
});
document.getElementById("from").onchange = function (){
  rec(true);
};
document.getElementById("to").onchange = function (){
  rec(false);
};
Rate();