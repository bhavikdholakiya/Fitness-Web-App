function clicked1(){
    var temp=document.getElementById('email');
    temp.disabled=false;
}
function clicked2(){
    var temp=document.getElementById('name');
    temp.disabled=false;
}
function clicked3(){
    var temp=document.getElementById('password');
    temp.disabled=false;
}
function clicked4(){
    var temp=document.getElementById('age');
    temp.disabled=false;
}
async function submitProfile(){
    let obj=new Object();
    if(document.getElementById('email').value!=""){
        obj.email=document.getElementById('email').value;
    }
    if(document.getElementById('name').value!=""){
        obj.name=document.getElementById('name').value;
    }
    if(document.getElementById('password').value!=""){
        obj.password=document.getElementById('password').value;
    }
    if(document.getElementById('age').value!=""){
        obj.age=document.getElementById('age').value;
    }
   
    
    await fetch('/user/update',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    window.location.href='/user/dashboard/profile'
}