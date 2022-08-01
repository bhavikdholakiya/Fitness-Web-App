
isAuth();
    async function isAuth(){
      let div=document.getElementById('logincredential');
      let buffer=await fetch('/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
      })
      const ans=await buffer.json();
      console.log(ans);
      if(ans.status)
      {
        div.innerHTML=`
        
        
        <a onclick="window.location.href='/user/dashboard'">DashBoard</a>
      
      `
        
      }
      else{
        div.innerHTML=`
        <a onclick="window.location.href='/login'">LogIn / SignUp</a>
      `
      }
    }