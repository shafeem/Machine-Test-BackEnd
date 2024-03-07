const app = require('./app');
const mongoose = require('./config/connection');

console.log(process.env.PORT,';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');

mongoose();

const port = process.env.PORT || 5001

app.listen(port, (error) => {
    if(error){
        console.log('Error Occurred',error);
    }else{
        console.log(`Server is running on port ${port}`);
    }
})
