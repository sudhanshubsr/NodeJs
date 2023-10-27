import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'sudhanshusharma103@gmail.com',
        pass:'wqqhnulflwedqxlh'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(path.resolve(),"views","mailers",relativePath),
        data,
        (err,template)=>{
            if(err){
                console.log('error in rendering template',err); 
                return;
            }
            mailHTML = template;
        }
    
    )
    return mailHTML;
}


export default {transporter,renderTemplate};