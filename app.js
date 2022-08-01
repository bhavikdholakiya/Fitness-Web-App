const express=require('express');
const path=require('path');
const http=require('http');
const ejs=require('ejs');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const app=express();
const User=require('./models/users');
// const isAuth=require('./config/isAuth');
const setName=require('./models/setNames');
require('./config/mongoose');
const sendMailContact=require('./config/sendMailContact');
const Query=require('./models/queries');
const isAuth=require('./config/isAuth');
const isDocter=require('./config/isDocter');
const server=http.createServer(app);
const userRouter=require('./routers/userRouter');
const adminRouter=require('./routers/adminRouter');
const sendMail=require('./config/sendMail');
const Video=require('./models/video');
// Dev
//middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//Serving static files
app.use(express.static(path.join(__dirname, 'static')));
//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));

app.get('/',(req,res)=>{
    res.render('homepage');
});
app.post('/',isAuth,async (req,res,next)=>{
    try{
        res.send({status:'Success'});
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/update/:id',async (req,res,next)=>{
    try{
        let user=await User.findById(req.params.id);
        user.isDocter=true;
        await user.save();
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.post('/contact',async(req,res)=>{
    try{
        let query=new Query(req.body);
        await query.save();
        sendMail(req.body.email);
        res.send({status:'done'});
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/admin',isAuth,isDocter,async (req,res)=>{
    let arr=await setName.find({});
    console.log(arr);
    res.render('admin',{arr});
})
app.get('/contact',async (req,res)=>{
    res.render('contact');
})
app.get('/team',async (req,res)=>{
    res.render('team');
})
app.get('/policies',async (req,res,next)=>{
    res.render('policies');
})
app.use('/user',userRouter);
app.use('/docter',adminRouter);
app.use(function (err, req, res, next) {
    res.status(err.status||500).send({status:err.status||500,error:err.message});
  })
app.listen(process.env.PORT || 3000,(err)=>{
    if(err)
    {
        console.log('There is an error');
    }
    else{
        console.log('Server Started on port 3000');
    }
})