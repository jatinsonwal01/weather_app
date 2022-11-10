const request= require('request');

const geocode=(address , callback)=>{

    const geoCodeURL='http://api.positionstack.com/v1/forward?access_key=fc51974776f22e226d3aef362672dc1d&query='+encodeURIComponent(address);

    request({url:geoCodeURL, json:true},(error , response)=>{
        if( error)
        {
            callback('not connected to internet', undefined);
        }
        else if( response.body.error || response.body.data.length==0)
        {
            callback('location not found', undefined);
        }
        else{
            callback(undefined , {
                latitude:response.body.data[0].latitude,
                longitude:response.body.data[0].longitude,
                label:response.body.data[0].label

            })
        }
    });

}

module.exports=geocode;