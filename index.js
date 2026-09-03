
const express = require(`express`)
const app = express();
const path = require('path'); 
const { Worker}= require(`worker_threads`)


const createworker = async (start,end)=>{
    return new Promise ((resolve,reject)=>{
        const worker=new Worker(path.join(__dirname, 'four_worker.js'),{
            workerData:{start,end}
        });

        worker.on(`message`,(data)=>{resolve(data)});

        worker.on(`error`,(err)=>{reject({"error":err})})


    })
}
app.get(`/non_blocking`,(req,res)=>{
    res.status(200).send(`this page is non_blocking`)
})

app.get(`/blocking`,async (req,res)=>{
const allpromisies=[];
allpromisies.push(createworker(1,10000000000));
allpromisies.push(createworker(10000000001,20000000000));
allpromisies.push(createworker(20000000001,30000000000));
allpromisies.push(createworker(30000000001,40000000000));
allpromisies.push(createworker(40000000001,50000000000));

const thread_results = await Promise.all(allpromisies);

const total=thread_results[0] + thread_results[1] +thread_results[2] +thread_results[3] +thread_results[4]

res.send(`${total} this page is blocking`)


})

app.listen(5000,()=>{console.log(`the site is live at port 5000`)})