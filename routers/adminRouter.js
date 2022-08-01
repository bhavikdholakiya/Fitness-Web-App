const express=require('express');
const router=express.Router();
const Activity=require('../models/activities');
const setName=require('../models/setNames');
const isAuth=require('../config/isAuth');
const isDocter=require('../config/isDocter');
const Set=require('../models/sets');
const multer=require('multer');
const Video=require('../models/video');


const cookieParser=require('cookie-parser');
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

const videoUpload = multer({
    limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
})

router.post('/uploadVideo/:id', videoUpload.single('video'),async (req, res,next) => {
    try{
        let ac=await Activity.findById(req.params.id);
        const video=new Video({file:req.file.buffer});
        console.log(video);
        ac.video=video.file;
        // console.log('hello');
        // res.send(req.file)
        await video.save();
        await ac.save();
        // console.log(video);
        // console.log(video._id);
        res.send({id:video._id});
    }
    catch(err)
    {
        next(err);
    }
 });
router.get('/getVideo/:id',isAuth,async(req,res,next)=>{
    console.log("Hi");
    res.set('Content-Type', 'video/mp4');
    let ac=await Activity.findById(req.params.id);
    console.log(ac);
    res.send(ac.video);
})
router.get('/video',isAuth,async(req,res,next)=>{
    try{
        res.render('video');
    }
    catch(err)
    {
        next(err);
    }
})
router.route('/set')
    .post(isAuth,isDocter,async (req,res,next)=>{
        try{
            // let obj=new Object();
            req.body.admin=req.user._id;
            // let name=await setName.find({name:req.body})
            // console.log(req.body);
            let newSet=new Set(req.body);
            console.log(newSet);
            // console.log(newSet);
            await newSet.save();
            let obj=await Set.findById(newSet._id).populate('activity');
            console.log(obj);
            res.send(obj);
        }
        catch(err)
        {
            next(err);
        }
    })
router.post('/singleActivity',isAuth,isDocter,async (req,res,next)=>{
    try{
        let ac=await Activity.findById(req.body.id,['name','docter','description','count']).populate('docter');
        res.send(ac);
    }
    catch(err)
    {
        next(err);
    }
})
router.route('/activities')
    .get(isAuth,isDocter,async (req,res,next)=>{
        try{
            let ac=new Array;
            console.log("hello");
            ac=await Activity.find({},['name','docter','description','count']).populate('docter','name').limit(9).skip(req.query.skip*9);
            console.log(ac);
            // console.log('he')
            res.send(ac);
        }
        catch(err)
        {
            next(err);
        }
    })
    .post(isAuth,isDocter,async (req,res,next)=>{
        try{
            console.log('hello');
            req.body.docter=req.user._id;
            let ac=new Activity(req.body);
            await ac.save();
            let obj=await Activity.findById(ac._id).populate('docter','name');
            // console.log(obj+'check this log');
            // res.redirect(`/video/${ac._id}`)
            res.send({id:ac._id});
        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/deleteAc')
    .post(isAuth,isDocter,async (req,res,next)=>{
        try{
            let ac=await Activity.findByIdAndDelete(req.body.id);
            res.send({status:'Success'});
        }
        catch(err)
        {
            next(err);
        }
    })
module.exports=router;