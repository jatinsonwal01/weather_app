const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = search.value;

    fetch('/weather?address='+location).then((response)=>
    {
        messageOne.textContent= 'Loading...';
        messageTwo.textContent= ' ';
        response.json().then((data)=>{
            if( data.error)
            {
                messageOne.textContent= data.error;
                console.log(data.error);
            }
            else{
                messageOne.textContent= 'place is:- '+ data.location;
                messageTwo.textContent= 'temp is:- ' + data.forecast + ' degree celsius';
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })
})


