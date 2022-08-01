const showDetailsInMobile=(element)=>{
    if(window.innerWidth<=600)
    {

        const popupDiv=Array.from(element.children)[0];
        console.log(popupDiv);
        popupDiv.style.transform='translateY(-100px)';
    }
    else{
        return;
    }
}
const hideDetailsInMobile=(element)=>{
    console.log('hi');
    if(window.innerWidth<=600)
    {
        console.log('hi');
        const popupDiv=Array.from(element.children)[0];
        console.log(popupDiv);
        popupDiv.style.transform='translateY(0px)';
    }
    else{
        return;
    }
}