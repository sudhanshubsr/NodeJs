import Comment from '../model/comments.js';
import Post from '../model/post.js';
import CommentMailer from '../mailers/comments.mailers.js';
import commentEmailWorker from '../workers/comment.email.worker.js';
import queue from '../config/kue.js';


export default class commentController {
    static async createComment(req, res) {
        try {
            const post = await Post.findById(req.body.post);
            if (post) {
                const comment = await Comment.create({
                    content: req.body.content,
                    post: post._id,
                    user: req.user._id,
                });
                post.comments.push(comment);
                await post.save();
                
                let CommentPopulated = await Comment.findById(comment._id).populate('user', 'name email').exec();
                let job = queue.create('emails', CommentPopulated).save((err) => {
                    if (err) {
                        console.log('Error in creating a job', err);
                        return
                    }
                    console.log('job enqueued', job.id );
                });
                // CommentMailer.newComment(CommentPopulated);

                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment: comment,
                        },
                        message: "Comment Created!",
                    });
                }

                req.flash('success', 'Comment Added');
                return res.redirect('back');
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            req.flash('error', err.message); // Use err.message to set the flash message
            return res.status(500).send('Internal Server Error');
        }
    }

    static async deleteComment(req, res) {
        try {
            const comment = await Comment.findById(req.params.id);
            if (comment.user == req.user.id) {
                const postId = comment.post;
                await comment.deleteOne();
                await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
                req.flash('success', 'Comment Deleted');
                return res.redirect('back');
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            req.flash('error', err.message); // Use err.message to set the flash message
            return res.status(500).send('Internal Server Error');
        }
    }
}
