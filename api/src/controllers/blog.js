"use strict"

const Blog = require("../models/blog")
const User = require("../models/user")

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
        const data = await res.getModelList(Blog, {},["userId","categoryId"])

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
        //  req.body.categoryId = req.body.categories
         console.log(req.body.userId);
         console.log(req.body);
        const data = await Blog.create(req.body)
        
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

        const data = await Blog.findOne({ _id: req.params.blogId })
        data.countOfViews++
        await data.save()

       console.log("countOfViews",data.countOfViews);
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

        const { deletedCount } = await Blog.deleteOne({ _id: req.params.blogId })

        res.status(deletedCount ? 204 : 404).send({
            error: !(!!deletedCount)
        })
    },
}