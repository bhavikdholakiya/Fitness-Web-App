async function signup(){
    var user=new Object();
    user.email=document.getElementById('email').value;
    user.password=document.getElementById('password').value;
    user.name=document.getElementById('yourname').value;
    user.age=document.getElementById('age').value;
    let x=document.getElementById('rd1').checked;
    // console.log(x);
    if(x)
    {
        user.gender='Male';
    }
    else{
        user.gender='Female';
    }
    await fetch('/user/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    window.location.href="/user/dashboard";
    console.log(user);
}