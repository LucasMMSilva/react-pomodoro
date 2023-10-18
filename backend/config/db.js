const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/pomodoro');
    console.log('Conectado ao mongodb');
}
main().catch((err)=>console.log(err));

module.exports = mongoose;