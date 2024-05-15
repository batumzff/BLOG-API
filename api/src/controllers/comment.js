"use strict";

const Comment = require("../models/comment");
const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */
    let customFilters = {
      isDeleted: false,
    };

    // const data = await Comment.find({ isDeleted: false }).populate([
    //   "userId",
    //   "blogId",
    // ]);
    const data = await res.getModelList(Comment, customFilters,{
        path: 'userId',
        select: ["username", "image"],
        
        
      },
    
    );

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */

    req.body.userId = req.user._id;
    const data = await Comment.create(req.body);
    //    console.log(data)
    const commentsOfBlog = await Comment.find({ blogId: data.blogId });
    //    console.log("*******************",commentsOfBlog)
    const updatedData = await Blog.updateOne(
      { _id: data.blogId },
      { comments: commentsOfBlog }
    );
    console.log(updatedData);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */

    const data = await Comment.findOne({
      _id: req.params.commentId,
      isDeleted: false,
    }).populate(["userId", "blogId",]);

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */

    const data = await Comment.updateOne(
      { _id: req.params.commentId, isDeleted: false },
      req.body,
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
      updatedData: await Comment.findOne({ _id: req.params.commentId }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */

    const { deletedCount } = await Comment.updateOne(
      { _id: req.params.commentId },
      { isDeleted: true }
    );

    res.status(deletedCount ? 204 : 404).send({
      error: !!!deletedCount,
    });
  },
};
