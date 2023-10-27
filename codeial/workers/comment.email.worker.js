import queue from "../config/kue.js";

import CommentMailer from "../mailers/comments.mailers.js";


queue.process('emails',(job,done)=>{
    console.log('emails worker is processing a job');
    CommentMailer.newComment(job.data);
    done();
})

export default queue;