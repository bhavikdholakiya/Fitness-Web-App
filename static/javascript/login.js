async function login(){
    document.getElementById("loginreplace").innerHTML=`<div class="loader"></div>`
    const user=new Object();
    user.email=document.getElementById('email').value;
    user.password=document.getElementById('password').value;
    let answer=await fetch('/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    const result=await answer.json();
    console.log(result);
    if(result.status==='done')
    {
        console.log('Done');
        window.location.href='/user/dashboard';
    }
    else{
        console.log('Error');
    }
    document.getElementById("loginreplace").innerHTML=` <svg onclick="login()" class="app-sidebar-link" style="border:none;cursor:pointer"xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
  </svg>`
}