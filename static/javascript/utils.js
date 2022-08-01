async function logout(){
    let buffer=await fetch('/user/signout',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    let answer=await buffer.json();
    console.log('Hi');
    console.log(answer);
    if(answer.status==='done')
    {
        console.log('done');
        window.location.href='/';
    }
    else{
        console.log('fail');
        alert('error');
    }
}