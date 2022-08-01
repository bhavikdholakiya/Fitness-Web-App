const auth=async (req,res,next)=>{
    try{
        console.log(req.user.isDocter);
        if(req.user.isDocter===true)
        {
            console.log('Hi');
            next();
        }
        else{
            throw new Error();
        }
    }
    catch(err)
    {
        console.log('error');
        res.status(401).send({error:'You are not a docter'})
    }
}
module.exports=auth;