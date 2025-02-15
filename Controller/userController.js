// this folder contain on all function which must work after run allRouter.js which must work when go to path of this function in allRoouter folder

const moment = require('moment'); // this for the time and date and also for the auto-reload
const Mydata = require("../models/customerSchema");



// can named varable below any name but standard consists of three sections  aaa_ddd_ggg
        // first section indicate to any name indication to your project
        // second section indicate to name of file render or rediredct 
        // third section indicate  to name of router --> get or post or put or delete



// .get('/')
const user_index_get = (req, res) => {
    Mydata.find()
        .then((result) => {
            res.render("index", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to retch data from database");
        });
}


// .get('/user/add.html');
const user_add_get = (req, res) => {
    res.render("user/add");
}


// .get('/edit/:id');
const user_edit_get = (req, res) => {
    Mydata.findById(req.params.id)
        .then((result) => {  
            res.render("user/edit", { ed: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to fetch this one data from database");
        });
}



// .get('/view/:id');
const user_view_get = (req, res) => {
    Mydata.findById(req.params.id)
        .then((result) => {
            res.render('user/view', { item: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to fetch this one data from database");
        });
}



//.post('/user/add.html'); 
const user_post = (req, res) => {
    if (req.body.firstName) {

        Mydata.create(req.body)
            .then((we) => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err, "Unable to save to database");
                res.status(400).send("Unable to save to database");
            });


    } else {
        res.redirect('/user/add.html');
        console.log("No data to send to database");
    }
}


// .post('/search');
const user_search_post = (req, res) => {
    const search = req.body.query.trim();            // query is value which use enter in buttom of search.ejs   .trim()  remove space from this value
    if(req.body.query){
    Mydata.find({
        $or: [                                    //this style not sensetive to char , the important is kye : value  i take value "query" from buttom of search
            { firstName: { $regex: search, $options: 'i' } }, // بحث غير حساس لحالة الأحرف  // $regex  and $options: 'i' just for make not sensetive to char
            { lastName: { $regex: search, $options: 'i' } },                
            { country: { $regex: search, $options: 'i' } },                
        ]
    })
        .then((result) => {
            console.log("***")
            console.log(result)
            res.render('user/search', { sear: result, moment: moment });
        })
        .catch((err) => {
            console.log(err, "Unable to save to database");
            res.status(400).send("Unable to save to database");
        });
    }else{  
         res.redirect('/');
}
}


// .delete('/edit/:id');
const user_delete = (req, res) => {
    Mydata.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.redirect('/');  
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to delete this one data from database");
        });
}



// .put('/edit/:id');
const user_put = (req, res) => {
    Mydata.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to update this one data from database");
        });
}



module.exports = {user_index_get, user_add_get, user_edit_get, user_view_get, user_post, user_search_post, user_delete, user_put};
