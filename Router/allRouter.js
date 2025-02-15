// this folder contain on all router or التوجيهات which must work after run app.js


const express = require('express')
const router = express.Router()

const moment = require('moment'); // this for the time and date and also for the auto-reload
const Mydata = require("../models/customerSchema");
const userController = require("../Controller/userController");
//router.use =(userController) can write this  like that in the end..   but also can use  userController direct in router




// this for appear the data in page 
router.get('/', userController.user_index_get);


router.get('/user/add.html', userController.user_add_get);

router.get('/edit/:id', userController.user_edit_get);


router.get('/view/:id', userController.user_view_get);
// end this


// this for send data to database 
router.post('/user/add.html',userController.user_post);
// end this


// this for search about the data from database 
router.post('/search', userController.user_search_post);
// end this



// this for delete data from database  
router.delete('/edit/:id', userController.user_delete);
// end this


// this for updete or edit the data from database  
router.put('/edit/:id', userController.user_put);
// end this 

module.exports = router
 
