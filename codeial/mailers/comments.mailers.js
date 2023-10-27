import nodeMailer from "../config/nodemailer.js";


export default class CommentMailer{
    static newComment(comment){
        let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new.comment.email.ejs');
         nodeMailer.transporter.sendMail({
            from: 'sudhanshusharma103@gmail.com',
            to: comment.user.email,
            subject: "New Comment Published",
            html: htmlString
        },
    
        (err,info)=>{
            if(err){
                console.log('error in sending mail',err); 
                return;
            }
            console.log('Mail Delivered');
            return;
        });

    }
}