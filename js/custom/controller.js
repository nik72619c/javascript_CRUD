window.addEventListener("load",()=>{

document.querySelector("#add").addEventListener("click",addItem);
document.querySelector("#cleartable").addEventListener("click",cleartable);
document.querySelector("#sort").addEventListener("click",sortItem);
document.querySelector("#search-final").addEventListener("click",searchItem);
document.querySelector("#delete").addEventListener("click",deleteItem);
document.querySelector("#save").addEventListener("click",saveItem);
document.querySelector("#load").addEventListener("click",loadItem);
document.querySelector("#loadfromserver").addEventListener("click",loadFromServer);


});

function printItemTable(){
    var tbody =document.querySelector("#itemtable");
    tbody.innerHTML = "";
    itemid=1;
    itemOperations.itemList.forEach(e=>printItem(e));
    console.log("printItemTable called...");
    
}

function sortItem(){
    
  var arr=  itemOperations.sortById();
    var table=document.querySelector("#itemtable").innerHTML="";
  arr.forEach(e=>printItem(e));
}

function searchItem(){

   var object= itemOperations.searchById();
   document.querySelector("#itemtable").innerHTML="";
   object.forEach(e=>printItem(e));
}

var itemObject;

function addItem(){


var id=document.querySelector("#itemid").value;
var name=document.querySelector("#name").value;
var desc=document.querySelector("#desc").value;
var price=document.querySelector("#price").value;
var color=document.querySelector("#color").value;
var url=document.querySelector("#url").value;
var date=document.querySelector("#date").value;
itemObject=new item(id,name,desc,price,color,url,date);
itemOperations.add(itemObject);
printItem(itemObject);

countTotalRecords();

}
var tablerows;
var itemid=1;
var index;

function printItem(itemObject){

tablerows=1;
    index=0;
    
    var table=document.querySelector("#itemtable");
    var tr=table.insertRow();
    tr.setAttribute("id",itemid);
    tr.setAttribute("tclass",tablerows);
    console.log(`row id is ${itemid}`);
    itemid++;
    
    
    for(let key in itemObject){
        // var index=0;
if(key!="markForDelete"){

        if(key=="url"){

           tr.insertCell(index).innerHTML=`<img src="${itemObject[key]}" style="width: 60px;height: 60px;">`; 
           
        }

        else if(key=="color"){

            tr.insertCell(index).innerHTML=`<div style="width: 60px;height: 60px;background-color: ${itemObject[key]};border-radius: 50%; "></div>`;
           
        }

        else{
        tr.insertCell(index).innerHTML=itemObject[key];
        
        }

        index++;
        
    }

    else{}
    
    

    }
    
   var operationTd= tr.insertCell(index);
   var id=itemObject.id;
   operationTd.appendChild(createIcon(id,"images/delete.png",toggleMarkUnmark));
   operationTd.appendChild(createIcon(id,"images/edit.png",toggleMarkUnmark));

}

var count=1;
var i=0;
var isMark=1;
function toggleMarkUnmark(event){
    
    var img=event.srcElement;
    // console.log(`var img has ${img}`);
    var id=img.id;
    // console.log(`img id is ${id}`);
   var tr= img.parentNode.parentNode;
   tr.classList.toggle("red");
//    console.log(tr);
if(tr.className=="red"){

    isMark+=1;
    count++;
    tr.className="red";
    itemOperations.toggleMark(id);
    console.log("after setting red class item list is"+ itemOperations.itemList);

    console.log(`isMark after if is ${isMark}`);
    document.querySelector("#marked").innerHTML=(isMark-1);
    countUnmarkedRecords();

}

else{

    isMark-=1;
    tr.className=" ";
    count++;
    itemOperations.toggleMark(tr.id);
    console.log("after else item list is"+ itemOperations.itemList.forEach(e=>console.log(e)));

    document.querySelector("#marked").innerHTML=(isMark-1);
    countUnmarkedRecords();
}


}

var i=1;
function  createIcon(id,path,func){

    
var img=document.createElement("img");
img.src=path;

if(i%2!=0)
{

img.setAttribute("id",id);
}

else{}
img.className="icon";

if(i%2!=0)
img.addEventListener("click",func);

else{}
i++;
return img;

}

function countTotalRecords(){

document.querySelector("#total").innerHTML=itemOperations.itemList.length;

}

function countMarkedRecords(isMark){
// document.querySelector("#marked").innerHTML=(isMark);
}
var unMark=0;
function countUnmarkedRecords(){

    var total=itemOperations.itemList.length;
 unMark=total-isMark+1;
document.querySelector("#unmarked").innerHTML=`${unMark}`;
}

var rows=[];
function deleteItem(){

//     var table;
// console.log("inside delete func...");
    
// table=document.getElementById("itemtable");
// console.log(table);

// var rows=document.getElementsByClassName("red");
// // console.log("red rows are "+ rows);

// for(let i=0;i<rows.length;i++){

// itemOperations.itemList[parseInt(rows[i].id)-1].markDelete=true;
// console.log(itemOperations.itemList);
// console.log("red rows are - "+ rows[i]);


// }

// itemOperations.itemList=itemOperations.itemList.filter(w=>w.markDelete!=true);
//  console.log(itemOperations.itemList);

//  document.querySelector("#itemtable").innerHTML="";

//  itemOperations.itemList.forEach(e=>printItem(e));
itemOperations.deleteRec();
printItemTable();


}



function cleartable(){

    var table=document.querySelector("#itemtable");
    table.innerHTML="";
    itemOperations.itemList.length=0;
    isMark=0;

    countTotalRecords();
    countMarkedRecords(isMark);
    countUnmarkedRecords();
}

function saveItem(){

    var json=JSON.stringify(itemOperations.itemList);

    if(localStorage){

        localStorage.myData=json;
        alert("data saved successfully....");
    }

    else{

        alert("data could not be transferred");
    }
}

function loadItem(){

if(localStorage.myData){


    var list=JSON.parse(localStorage.myData);

    list.forEach(itemObject=>{

        let object = new item(itemObject.id, itemObject.name, itemObject.desc, itemObject.price, itemObject.color,itemObject.url,itemObject.date); 
        itemOperations.add(object);

    });

    printItemTable();

}

else{

    alert("data could not be loaded.....plzz check if localstorage has data");
}


}

var xmlHttpReq;

function loadFromServer(){


xmlHttpReq= new XMLHttpRequest();
xmlHttpReq.open("GET","http://localhost:3000/fake.json");

xmlHttpReq.onreadystatechange=function (){


    console.log(xmlHttpReq.readyState);
if(xmlHttpReq.readyState==4 && xmlHttpReq.status==200){
    printServerData(xmlHttpReq.responseText);
}


}
xmlHttpReq.send(null);

// var result=xmlHttpReq.respnseText;
// console.log("result is "+ result);



}

function printServerData(json){

    console.log("inside print server data function ....");
  var objectarray=JSON.parse(json);console.log(json);
  console.log("objectarray is"+objectarray);

 itemOperations.itemList=[];
 
 for(let i=0;i<objectarray.myData.length;i++){

    console.log(objectarray[i]);
// itemOperations.itemList.push(objectarray[i]);
itemOperations.itemList[i]=objectarray.myData[i];
console.log("inside");


printItemTable();

 }
 console.log(itemOperations.itemList);
 
 console.log("printItemTable called .....");
  
}

