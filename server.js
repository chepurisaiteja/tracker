const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile('/tracker/index.html')
  
})
var mongoUrl ='mongodb+srv://sai:sai@cluster0.uhyla.mongodb.net/test?retryWrites=true&w=majority';


MongoClient.connect('mongodb+srv://vnr:vnr@cluster0.o3b4y.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}, (err, client) => {
    const db=client.db('star-wars-quotes');
    const usercol=db.collection('quotes');

app.post('/entries',(req,res)=>{
    usercol.insertOne(req.body)
    .then(result=>{
        console.log(req.body);
        res.redirect('/');
    })
})


 
app.post('/data',(req,res)=>{

    let curr = new Date('08-07-2020');
        last=new Date(curr);
        if(curr.getDay()==0)
        {
            curr.setDate(curr.getDate() - 1);  
        }
        
  let day = curr.getDate() - curr.getDay() + 1;
  let first = new Date(curr.setDate(day)).toISOString().slice(0, 10);
last=last.toISOString().slice(0,10);
    var query={date: {$gte: first, $lt: last}};

    usercol.find(query).toArray(function(err, result) {
        if (err) throw err;
        let dist=0;
        let time=0;
        let l=result.length;
        console.log(l);
        for(i=0;i<l;i++)
        {
            dist+=Number(result[i]['distance']);
            time+=Number(result[i]['duration']);

        }
       console.log('average distance '  +Math.round(dist/l));
       console.log('average speed' +    Math.round(dist/time));
       console.log(first);
       console.log(last);
        
        res.redirect('/');
      });

})


    if (err) return console.error(err)
console.log('Connected to Database')

  })
 



app.listen(3000, function() {
    console.log('listening on 3000')
  })    
