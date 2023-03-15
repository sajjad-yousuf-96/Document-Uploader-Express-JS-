
const express = require('express');
const uuid = require('uuid')
const fs = require('fs')
const router = express.Router();
const members = require('../../Members');

const new_member = require('../../models/new_member');
const multer = require('multer'); // for image upload



var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./routes/api/uploads')
},
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now() + "_" + file.originalname);
    }
});

var uploads = multer({
    storage:storage,
}).single("image")


router.get('/',(req,res) => {
    // res.render('index',{
    //         title: 'MY NAME IS SAJJAD'
    //     })
    new_member.find({}).lean().exec((err,users) => {
        if(err){
            res.json({message:err.message})
        } else{
            // console.log(users)
            res.render('index',{
                title: 'HOME PAGE',
                users: users
            })
        }
    })
});

// router.get('/:id',(req,res) => {
//     const found = members.some(members => members.ids === req.params.id)
//     if (found){
//         res.json(members.filter(members => members.ids === req.params.id))
//     }
//     else{
//         res.status(400).json({msg:'Member not found'})
//     }
    
// });


router.post('/',uploads,(req,res)=>{
    // console.log(typeof(newMembers['ids']))
    // console.log(typeof(newMembers['names']))
    // console.log(typeof(newMembers['email']))
    // console.log(typeof(newMembers['statuss']))
    // const ids = '4'
    // const names = req.body.names
    // const email = req.body.email
    // const statuss = 'active'
    // console.log(req.body.names)
    // pool.query('insert into members_user (id,email,names,statuss) values ($1,$2,$3,$4)' [ids,email,names,statuss])
    // // members.push(newMembers);
    // // res.json(members);
    // res.redirect('/');
    const user = new new_member({
        name:req.body.names,
        email:req.body.email,
        image:req.file.filename,
    })
    user.save((err) => {
        if (err){
            res.json({message:err.message,type:'danger'});
        } else{
            res.redirect('/')
        }
    })

});

router.put('/:id',(req,res) => {
    const found = members.some(members => members.ids === req.params.id)
    // console.log(found)
    if (found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.ids === req.params.id){
                member.names = updMember.names ? updMember.names : member.names;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg:'Member Updated.',member});
            }
        });
    }
    else{
        res.status(400).json({msg:'Member not found'})
    }
    
});
router.get('/delete/:id',(req,res) => {
    let id = req.params.id;
    new_member.findByIdAndDelete(id,(err,result) =>
    {
        if (result.image != ''){
            try{
                fs.unlinkSync('./routes/api/uploads',+result.image);
            } catch(err){
                console.log("SAJJAd")
            }
        }
        if (err){
            res.json({message:err.message})
        } else{
            res.redirect('/')
        }
    })
});


// router.delete('/:id',(req,res) => {
//     const found = members.some(members => members.ids === req.params.id)
//     console.log(found)
//     if (found){
//         res.json({msg: 'Member Deleted',
//         members:members.filter(member => member.ids  !== req.params.id)});
        
//     }
//     else{
//         res.status(400).json({msg:'Member not found'})
//     }
    
// });

// eDit and User 
router.get('/edit/:id',(req,res) => {
    let id = req.params.id;
    // console.log(id)
    new_member.findById(id,(err,users)=>{
        if (err){
            res.redirect('/');
        } else{ 
            if (users==null){
                res.redirect('/');
            }
            else{
                console.log(users['email'])
                res.render('edit_user',{
                        title: 'Edit USer',
                        users: users,
                });
            }
        }
    }).lean();
});

// update user route
router.post('/update/:id',uploads,(req,res) => {
    let id = req.params.id;
    let new_image = '';
    if (req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync('./routes/api/uploads',+req.body.old_image);
        } catch(err){
            console.log(err)
        }
    }
    else{
        new_image = req.body.old_image
    }
    new_member.findByIdAndUpdate(id,{
        names:req.body.name,
        email:req.body.email,
        image:new_image
    }, (err,result)=>
    {
        if (err){
            res.json({message:err.message,type:'danger'})
        } else{
            res.redirect('/')
        }

    });
})

module.exports = router;