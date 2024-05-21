"use strict"

const Blog = require("../models/blog")
const User = require("../models/user")

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);



module.exports = {
    list: async (req, res) => {

          /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "List Blogs"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
       
        // const data = await Blog.find()
        const blogFilters = !(req.user?._id)
        const blogStatus = !(req.user?.isAdmin || req.user?.isStaff )  ? {isDeleted:false} : {}
        const blogs = await Blog.find({userId: req.user?._id})
        console.log(blogs);
     
        const data = await res.getModelList(Blog, {...blogStatus},["userId","categoryId"])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Blog),
            data
        })
    },

    create: async (req, res) => {

          /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blogs"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: 'Test Blog'
            }
        }
    */

         req.body.userId = req.user._id
         req.body.categoryId = req.body.categories
         const { content } = req.body

         
         const sanitizedContent = DOMPurify.sanitize(content);
        
        const data = await Blog.create({...req.body, content:sanitizedContent})
        
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
       

         /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
    */


        const userId = req.user?._id
        const customFilter = !(req.user?.isAdmin || req.user?.isStaff) ? {isDeleted: false,isPublish: true} : {}
        const data = await Blog.findOne({ _id: req.params.blogId, ...customFilter }).populate("userId")
       
        if(!data){
            throw new Error("There is no such a blog, it is removed sorry")
        }

        if(!data.countOfViews.includes(userId)){
            data.countOfViews.push(userId) 
             await data.save()
        }

    //    console.log("countOfViews",data.countOfViews);
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
      

          /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Update Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: 'Test Blog'
            }
        }
    */

        const blog = await Blog.findOne({_id: req.params.blogId})
        if(!(req.user?.isAdmin || req.user?.isStaff ) || (blog?.userId !== req.user?._id)) {
            res.status(403).send({
                error: true,
                message:"You are not the owner of the blog to update it"
            })
        }
        const data = await Blog.updateOne({ _id: req.params.blogId}, req.body, { runValidators: true })
       
        res.status(202).send({
            error: false,
            data,
            updatedData: await Blog.findOne({ _id: req.params.blogId })
        })
    },

    delete: async (req, res) => {
      

          /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete Blog"
    */

        // const { deletedCount } = await Blog.deleteOne({ _id: req.params.blogId })
        const blogs = await Blog.findOne({userId: req.user?._id})

        if(!(req.user?.isAdmin || req.user?.isStaff) || req.user?._id !== blogs?.userId){
           res.status(403).send({
            message: "You are not the owner of the blog to do this operation"
           })
        }
         if(req.user?.isAdmin || req.user?.isStaff) {
            const { deletedCount } = await Blog.deleteOne({ _id: req.params.blogId })
            res.status(deletedCount ? 204 : 404).send({
                message:"Blog deleted by the authorized person permanently"
            })
         }
         const deletedBlog = await Blog.updateOne({ _id: req.params.blogId },{isDeleted: true})

        res.status(deletedBlog ? 204 : 404).send({
            // error: !(!!deletedBlog)
            message: "Deleted successfully"
        })
    },
}