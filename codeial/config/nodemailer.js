import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';
import env from './enviornment.js';

const transporter = nodemailer.createTransport(env.smtp);


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