export default class middleware{
    static setFlash(req,res,next){
        res.locals.flash= {
            'success': req.flash('success'),
            'error': req.flash('error')
        }
        next();
    }
}