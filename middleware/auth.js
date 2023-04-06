module.exports = isAuth = async (req,res,next) =>{
    if(req.session.isAuth){
        return next();
    }
    res.redirect('/')
}