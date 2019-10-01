import express from 'express';
import favicon from'serve-favicon';
import path from 'path';

import data from './data/data.json';

const app = express();
const PORT = 3000;

//this is for the public folder on path /
app.use(express.static('public'));

// method to use json
app.use(express.urlencoded({extended:true}));//json());

//this is for proxies
app.set('trust proxy','loopback');

// this is for images folder on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.get('/',(req,res,next)=>{
    //res.send(`a get request with / route on port ${PORT}`);
    // get data first
    res.json(data);
});

// JSON data
/* { "hello" : "JSON is cool"}
URLEncoded data
hello=URLEncoded_is+cool
*/

app.post('/newItem',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id',(req,res,next)=>{
    // this isthe middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    //middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.send(data[user]);
    next();
}, (req,res) => console.log('Did you get the right data?'));

app.post('/item',(req,res,next)=>{
    res.send(`a POST request with /newItem route on port ${PORT}`);
});

app.route('/item')
    .get((req,res)=>{
        //res.send(`A GET request with /item on route port ${PORT}`)
        throw new Error();
    
    })
    .put((req,res)=>{
        res.send(`a PUT request with /item route on port ${PORT}`);
    })

    .delete((req,res)=>{
        res.send(`a DELETE request with /item route on port ${PORT}`);
    });

// Error handling function
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send(`Red alert! ${err.stack}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    //console.log(data);
});
