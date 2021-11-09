const express= require('express');
const multer= require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        const {originalname} = file;
        cb(null,originalname)
    }
   });

   const upload= multer({ storage });
   
app.post('/images',upload.single('image'),(req,res) =>{
   try{
    const file = req.file;
    console.log(file);
   }catch(err){
       console.log({message:err});
   }    
});
//const express = require('express');
const fs = require('fs');
const download = require('download');

const url="https://images.pexels.com/photos/5919667/pexels-photo-5919667.jpeg";
(async () => {
    await download(url,'dist');

    fs.writeFileSync('dist/pexels-photo-5919667.jpeg',await download(url));

    download('images.pexels.com/photos/5919667/pexels-photo-5919667.jpeg')
    .pipe(fs.createWriteStream('dist/foo.jpg'));

    //download array of images
    await Promise.all([
        'images.pexels.com/photos/5919667/pexels-photo-5919667.jpeg',
        'images.pexels.com/photos/248159/pexels-photo-248159.jpeg',
        'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg',
    ].map(url => download(url, 'dist')));
})();

app.listen(8080,()=>{console.log("listening port 8080")});