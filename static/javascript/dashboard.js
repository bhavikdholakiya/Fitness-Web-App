let user=new Object();
getUserInfo();
async function getUserInfo(){
    let buffer=await fetch('/user/info');
    let ans=await buffer.json();
    user=ans.user;
    console.log(user);
    displayActivity();
    liveData();
}
let html=``;
let selectedAc=new Array;
 async function valueChange(id,value,element){
      let onchangevalue=Object();
      onchangevalue.id=id;
      onchangevalue.value=value;
      element.parentElement.children[1].innerHTML=value+'%';
      element.parentElement.children[0].value=value;
      liveData();
      // getUserInfo();
      const buffer=await fetch('/user/dashboard/activityProgress',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(onchangevalue)
      })
      const ans=await buffer.json();
      console.log(ans);
      getLeaderBoard();
 }
 function liveData(){
   var pending=0,inProgress=0,completed=0;
   let temp=``;
   let divtemp=document.getElementById("upperData");
  //  document.getElementById('totalActivities').innerHTML=user.activities.length;
   user.activities.forEach((element)=>{
     if(element.progress===100){
       completed++;
     }
     else if(element.progress===0){
       pending++;
     }
     else{
       inProgress++;
     }
   })
  //  document.getElementById('pending').innerHTML=pending;
  //  document.getElementById('progress').innerHTML=inProgress;
  //  document.getElementById('completed').innerHTML=completed;

   temp= `
   <div class="projects-status" onchange="liveData()">
               <div class="item-status">
                 <span class="status-number" id="pending">${pending}</span>
                 <span class="status-type">Pending</span>
               </div>
               <div class="item-status">
                 <span class="status-number" id="progress">${inProgress}</span>
                 <span class="status-type">In Progress</span>
               </div>
               <div class="item-status">
                 <span class="status-number" id="completed">${completed}</span>
                 <span class="status-type">Completed Activites</span>
               </div>
               <div class="item-status">
                 <span class="status-number" id="totalActivities">${user.activities.length}</span>
                 <span class="status-type">Total Activities</span>
               </div>
             </div>
   `
   divtemp.innerHTML = temp;

 }
 getLeaderBoard();
async function getLeaderBoard(){
  let buffer=await fetch('/user/getLeaderBoard');
  let div=document.querySelector('.leaderboard');
  let ans=await buffer.json();
  let leaderboard=ans.set.leaderboard;
  let userid=ans.user;
  console.log(ans);
  let points=ans.point;
  len=leaderboard.length;
  leaderboard.sort((a,b)=>{
    return a.point-b.point;
  });
  let html=`<h1>
  <svg class="ico-cup">
    <use xlink:href="#cup"></use>
  </svg>
  Most active Players
</h1>
<ol id="leaderboard-ol">`;

  console.log(leaderboard);
  let j=-1;
  
  for(var i=len-1;i>=0;i--)
  {
    if(leaderboard[i].userid==userid)
    {
      j=i;
      html+=`
      <li id="you-1">
        <mark>You</mark>
        <small>${points}</small>
      </li>`
    }
    else{
      html+=`
      <li>
        <mark>${leaderboard[i].username}</mark>
        <small>${leaderboard[i].point}</small>
      </li>`
    }
  }
  console.log(j);
  // document.styleSheets[2].insertRule('.you::before',`content:'${j+1}'`, 0);
  html+=`
  <li id="you-2">
      <mark>${leaderboard[j].username}/ Rank(${len-j})</mark>
      <small>${points}</small>
    </li>`
    html+=`</ol>`
  div.innerHTML=html;
  document.getElementById('go').style.display='none';
  console.log(leaderboard);
}
  function displayActivity(ac, x) {
    // console.log(ac);
    let localhtml = ``;
    let length = user.activities;
    let div = document.getElementById("project-boxes");
    
   
    // console(user.activities);

   user.activities.forEach((element) => {
        // console.log(element.activity);
        console.log(element);
        string='';
        if(element.remainderTime>0)
        {
          string='checked';
        }
      localhtml += `
<div class="project-box-wrapper">
    <div class="project-box" style="background-color: #fee4cb;">
        <div class="project-box-header">
        <span>December 10, 2020</span>
        <div class="more-wrapper" onclick="changeState('${element.activity._id}',this)">
        <svg xmlns="http://www.w3.org/2000/svg" style="opacity:${(element.progress==100)?0:1}" id="uncheck" width="30" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" style="opacity:${(element.progress==100)?1:0}" id="check" width="30" height="30" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    </div>
    </div>
    <div class="project-box-content-header">
    <p class="box-content-header">${element.activity.name}</p>
    <p class="box-content-subheader">${element.activity.description}</p>
    </div>
    <div class="box-progress-wrapper">
    <p class="box-progress-header">Progress</p>
    <div class="slider" style="display: flex; justify-content: space-around;">
          <input type = "range" id="strength" min="0" max="100" value='${element.progress}'  onclick="valueChange('${element.activity._id}',this.value,this)" onchange="rangevalue.value=${element.progress}"/>
          <output id="rangevalue">${element.progress}%</output>
    
    </div>
    <div style="display: flex;justify-content: space-around;flex-direction:column;align-items:center">
    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
    <a target="_blank" href="/docter/getVideo/${element.activity._id}"<i class="fas fa-play"></i></a>
  </button>
  <p style="margin-top:5px">Points:${element.activity.point}<p/>
    </div>
    </div>
    <div class="project-box-footer">
      <input style="width:40px;height:40px;background-color:transparent;border:none" type="number" placeholder="0" value="${element.remainderTime}"></input>
      <div class="form-check form-switch" style="cursor:pointer">
        <input class="form-check-input" type="checkbox" role="switch" ${string} onclick="Reminder(this,'${element.activity._id}')" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
      </div>
    <div class="days-left" style="color: #ff942e;">
    <p>${element.activity.docter.name}<p>
    </div>
    </div>
    </div>
    </div>
          `;
    });
    if (x) {
      div.innerHTML = localhtml;
    } else {
      html += localhtml;
      div.innerHTML = html;
    }
  }
  
  function changeState(id,element)
  {
      let input=element.parentElement.parentElement.children[2].children[1].children[0];
      let value;
      let uncheck=element.children[0];
      let check=element.children[1];
      console.log(uncheck,check);
      if(uncheck.style.opacity=='0')
      {
          uncheck.style.opacity=1;
          check.style.opacity=0;
          value=0;
      }
      else{
        uncheck.style.opacity=0;
        check.style.opacity=1;
        value=100;
      }
      // liveData();
      
      valueChange(id,value,input);
  }

  async function Reminder(element,id){
    if(element.checked)
    {
      let value=element.parentElement.parentElement.children[0].value;
      let buffer=await fetch('/user/dashboard/sendMail',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({time:value,id})
      })
      let answer=await buffer.json();
      console.log(answer);
    }
    else{
      element.parentElement.parentElement.children[0].value=0;
      let buffer=await fetch('/user/dashboard/cancelMail',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id})
      })
      let answer=await buffer.json();
      console.log(answer);
      // console.log(value);
    }
  }



  //Search Algorithm

  function getSearchResults(value) {
    let div = document.getElementById("project-boxes");
  if (value != "") {
    let insideHtml = ``;
    user.activities.forEach((element) => {
        console.log(element);
        // str = str.replace(/\s/g, '');
        let x=element.activity.name.replace(/\s/g, '').toLowerCase();
        let y=value.replace(/\s/g, '').toLowerCase();
        // console.log(x,y);
      if (x.includes(y)) {
        insideHtml += `
        <div class="project-box-wrapper">
        <div class="project-box" style="background-color: #fee4cb;">
            <div class="project-box-header">
            <span>December 10, 2020</span>
            <div class="more-wrapper" onclick="changeState('${element.activity._id}',this)">
            <svg xmlns="http://www.w3.org/2000/svg" style="opacity:${(element.progress==100)?0:1}" id="uncheck" width="30" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" style="opacity:${(element.progress==100)?1:0}" id="check" width="30" height="30" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
        </div>
        </div>
        <div class="project-box-content-header">
        <p class="box-content-header">${element.activity.name}</p>
        <p class="box-content-subheader">${element.activity.description}</p>
        </div>
        <div class="box-progress-wrapper">
        <p class="box-progress-header">Progress</p>
    
        
        <div class="slider">
              <input type = "range" id="strength" min="0" max="100" value='${element.progress}'  onclick="valueChange('${element.activity._id}',this.value,this)" onchange="rangevalue.value=${element.progress}"/>
              <output id="rangevalue">${element.progress}%</output>
        
        </div>
        </div>
        <div class="project-box-footer">
          <input style="width:40px;height:40px;background-color:transparent;border:none" type="number" placeholder="0"></input>
          <div class="form-check form-switch" style="cursor:pointer">
            <input class="form-check-input" type="checkbox" role="switch" onclick="Reminder(this,'${element.activity._id}')" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault"></label>
          </div>
        <div class="days-left" style="color: #ff942e;">
        <p>${element.activity.docter.name}<p>
        </div>
        </div>
        </div>
        </div>
        `;
      }
    });
    
    div.innerHTML = insideHtml;
  }
  else{
      div.innerHTML=html;
  }
}
document.getElementById("search-input").addEventListener("keyup", () => {
  getSearchResults(document.getElementById("search-input").value);
});

// leaderboard javascript
