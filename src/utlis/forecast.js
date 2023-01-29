const request= require('request');

const forecast=( latitude , longitude, callback)=>
{
   const url='http://api.weatherstack.com/current?access_key=611b3a9784a6e6704eb0fec92584f07d&query='+latitude+','+longitude;

   request({url:url, json:true},(error , response)=>{
    if( error)
    {
        callback('not connected to internet forecast', undefined);
    }
    else if( response.body.error)
    {
        callback('location not found forecast', undefined);
    }
    else{
        callback(undefined , response.body.current.temperature)
    }
});
}

module.exports= forecast;