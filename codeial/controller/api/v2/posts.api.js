export default class PostAPI{
    static async index(req,res){
        return res.json(200,{
            message:"List of posts",
            posts:[]
        })
    }

}

