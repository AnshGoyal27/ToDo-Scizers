import task from "./task.js";
import {data} from "./data.js";
window.addEventListener("load",start);
function start(){
    console.log("Called start");
    document.querySelector('#Add').addEventListener('click',add);
    document.querySelector('#Delete').addEventListener('click',dlt);
    document.querySelector('#Save').addEventListener('click',save);
    document.querySelector('#Load').addEventListener('click',load);
    document.querySelector('#Update').addEventListener('click',update);
    document.querySelector('#Search').addEventListener('click',search);
    document.querySelector('#Clear').addEventListener('click',clear);
    document.querySelector('#All').addEventListener('click',()=>printtable(data.tasks));
    document.querySelector("#searchtext").addEventListener('input',gosearch);
}
var indexo=0;
function add(){
    console.log("Called add");
    let newTask=new task;
    for(let key in newTask){
        if(key==="status"){
            if(document.querySelector('#Done').checked){
                newTask[key]="Done";
            }
            else if(document.querySelector('#Pending').checked){
                newTask[key]="Pending";
            }
            else{
                newTask[key]="None";
            }
        }
        else if(key==="check"){
            newTask[key]="False";
        }
        else{
            newTask[key]=document.querySelector(`#${key}`).value;
        }
    }
    data.tasks.push(newTask);
    printtask(newTask);
}
function radioclick(){
    for(let i in data.tasks){
        if(data.tasks[i].check=="True"){
            data.tasks[i].check="False";
        }
    }
    for(let i in data.tasks){
        if(document.getElementById(data.tasks[i].id).checked){
            for(let key in data.tasks[i]){
                if(key=="check"){
                    data.tasks[i].check="True";
                }
                else if(key=="status"){
                    if(data.tasks[i][key]==="Done"){
                        document.getElementById("Done").checked=true;
                        document.getElementById("Pending").checked=false;
                        document.getElementById("None").checked=false;
                    }
                    else if(data.tasks[i][key]==="Pending"){
                        document.getElementById("Pending").checked=true;
                        document.getElementById("Done").checked=false;
                        document.getElementById("None").checked=false;
                    }
                    else{
                        document.getElementById("None").checked=true;
                        document.getElementById("Done").checked=false;
                        document.getElementById("Pending").checked=false;
                    }
                    continue;
                }
                else{
                    console.log(key+":"+data.tasks[i][key]);
                    document.getElementById(key).value=data.tasks[i][key];
                }
            }
            console.log(data.tasks[i]);
        }
    }


}

function dlt(){
    data.tasks=data.tasks.filter(element=>element.check=="False");
    printtable(data.tasks);
}

function save(){
    if(window.localStorage){
        localStorage.mytaskdata = JSON.stringify(data.tasks);
        alert("Data Saved...");
      }
      else{
        alert("No LocalStoage U Have Outdated Browser...");
      }
}

function load(){
    if(window.localStorage){
        if(localStorage.mytaskdata){
          const allTask = JSON.parse(localStorage.mytaskdata);
          printtable(allTask);
          data.tasks=allTask;
        }
        else{
          alert("U Don't Have any data to load...");
        }
      }
      else{
        alert("No LocalStoage U Have Outdated Browser...");
      }
}

function update(){
    for(let i in data.tasks){
        if(data.tasks[i].check=="True"){
            for(let key in data.tasks[i]){
                if(key==="status"){
                    if(document.querySelector('#Done').checked){
                        data.tasks[i][key]="Done";
                    }
                    else if(document.querySelector('#Pending').checked){
                        data.tasks[i][key]="Pending";
                    }
                    else{
                        data.tasks[i][key]="None";
                    }
                }
                else if(key==="check"){
                    data.tasks[i][key]="False";
                }
                else{
                    data.tasks[i][key]=document.querySelector(`#${key}`).value;
                }
            }
        }
    }
    printtable(data.tasks);
}

function search(){
    document.getElementById("D1").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="ID";
        document.getElementById("Dropdown").name="id";
        document.getElementById("searchtext").type="text";
    });
    document.getElementById("D2").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="Name";
        document.getElementById("searchtext").type="text";
        document.getElementById("Dropdown").name="name";
    });
    document.getElementById("D3").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="Desc";
        document.getElementById("searchtext").type="text";
        document.getElementById("Dropdown").name="desc";
    });
    document.getElementById("D4").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="Color";
        document.getElementById("searchtext").type="color";
        document.getElementById("Dropdown").name="color";
    });
    document.getElementById("D5").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="Status";
        document.getElementById("searchtext").type="text";
        document.getElementById("Dropdown").name="status";
    });
    document.getElementById("D6").addEventListener('click',()=>{
        document.getElementById("Dropdown").innerText="Date";
        document.getElementById("searchtext").type="date";
        document.getElementById("Dropdown").name="date";
    });

    // document.getElementById("search").addEventListener('click',gosearch);
    
}

// function gosearch(){
//     document.querySelector('#tasks').innerHTML="";
//     for(let i in data.tasks){
//         if(data.tasks[i][document.getElementById("Dropdown").name]==document.getElementById("searchtext").value){
//             printtask(data.tasks[i]);
//         }
//     }
// }

function gosearch(){
    document.querySelector('#tasks').innerHTML="";
    const searchOption = document.getElementById("Dropdown").name;
    const toSearch = document.getElementById("searchtext").value;
    console.log(toSearch)
    if(searchOption==="name" || searchOption==="id" || searchOption==="desc"){
        for(let i in data.tasks){
            if(data.tasks[i][searchOption].includes(toSearch)){
                printtask(data.tasks[i]);
            }
        }
    }
    else if(searchOption==="date"){
        for(let i in data.tasks){
            const d1 = new Date(data.tasks[i][searchOption]);
            const d2 = new Date(toSearch);
            if(d1<=d2 && data.tasks[i]["status"]!=="Done" ){
                printtask(data.tasks[i]);
            }
        }
    }
    else{
        console.log("other");
    }

}

function clear(){
    console.log("Clear clicked");
    data.tasks.length=0;
    printtable(data.tasks);
}

function printtask(Task){
    console.log("Printing")
   const body=document.querySelector('#tasks');
   const newrow=body.insertRow();
   let index=0;
   for(let key in Task){
    if(index==0){
        let btn=document.createElement('input');
        btn.type='radio';
        btn.name='checkbtn'
        btn.id=Task.id;
        btn.onclick=radioclick;
        newrow.insertCell(index).appendChild(btn);
        index++;
    }
    else{
        if(key=="status"){
            if(Task[key]==="Pending"){
                newrow.className="table-danger";
                newrow.insertCell(index).innerText=Task[key];
            }
            else if(Task[key]==="Done"){
                newrow.className="table-success";
                newrow.insertCell(index).innerText=Task[key];
            }
            else{
                newrow.className="table-warning";
                newrow.insertCell(index).innerText=Task[key];
            }
        }
        else if(key=="color"){
            newrow.insertCell(index).style.backgroundColor=Task[key];
            index++;
        }
        else{
            newrow.insertCell(index).innerText=Task[key];
            index++;
        }
    }
    
    
   }
}

function printtable(data){
    document.querySelector('#tasks').innerHTML="";
    data.forEach(element => {
        printtask(element);
    });
}
