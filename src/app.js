const express = require('express');
const path= require('path');
const hbs=require('hbs');
const { title } = require('process');
const geocode= require('./utlis/geocode');
const forecast= require('./utlis/forecast');

const app = express();
const port = process.env.PORT || 3000;

console.log(path.join(__dirname,'../public'));

app.set('view engine' , 'hbs');


const staticPath= path.join(__dirname,'../public');
const viewPath= path.join(__dirname ,'../templates/views' )
const partialPath= path.join(__dirname ,'../templates/partials' )


app.set( 'views' , viewPath);
hbs.registerPartials(partialPath)
app.use(express.static(staticPath));



app.get('' , (req , res)=>{
    res.render('index' , {
        title:'Weather App',
        name:'jatin sonwal'
    })
})

app.get( '/about' , (req , res)=>{
    res.render( 'About' , {
        title:'About me',
        name:'jatin sonwal'
    })
})


app.get('/help' , (req , res)=>{
    res.render('Help', {
        help: ' Here is the help section',
        title:'Help',
        name:'jatin sonwal'
    })
})

app.get('/weather' , (req ,res)=>{
    if( !req.query.address)
    {
        return res.send( {
            error:'must provide address'
        })
    }
    else{
        geocode( req.query.address, (error , data)=>{
            if(error)
            {
                return res.send({error});
            }
            forecast(data.latitude,data.longitude, (error , foreCastData)=>{
               if( error)
               {
                    return res.send({error});
               }
                console.log('place is ' , data.label);
                console.log('temp is ', foreCastData);
                return res.send({
                    address: req.query.address,
                    location:data.label,
                    forecast:foreCastData,
                })

           });
        })
    }
})

app.get( '/help/*' , (req , res)=>
{
    res.render('404', {
        title:'404',
        name:'jatin sonwal',
        errorMessage: 'Help page not found!'
    });
})
app.get( '*' , ( req , res)=>{
    res.render('404', {
        title:'404',
        name:'jatin sonwal',
        errorMessage: 'Page not found'
    })

})

app.listen(port, ()=>{
    console.log('server running successfully on port' + port);
})