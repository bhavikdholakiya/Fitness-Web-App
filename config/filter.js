let filter=(user)=>{
    user.email=undefined;
    user.password=undefined;
    user.age=undefined;
    user.gender=undefined;
    user.token=undefined;
}
module.exports=filter;