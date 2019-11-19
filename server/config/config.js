

//puerto

process.env.PORT=process.env.PORT || 3000

//puerto
//mongodb://localhost:27017/cafe
//mongodb+srv://OathKeeperUser:<password>@cluster0-hpjrw.mongodb.net/test

process.env.NODE_ENV=process.env.NODE_ENV || 'dev';

let urlDB;
if (process.env.NODE_ENV=='dev'){

    urlDB='mongodb://localhost:27017/cafe'
}
else{
    urlDB='mongodb+srv://OathKeeperUser:20121004294@cluster0-hpjrw.mongodb.net/test'
}

process.env.urlDB=urlDB;