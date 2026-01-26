import React from "react";

import blogsObj from "../data/blogsList";
const {blogTagsList} = blogsObj;

export default class BlogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {blog} = this.props;
        const {id,title,publishDate,duration,previewText,tags} = blog;
        return (
            <div onClick={()=>window.location.href="/#/blogs/"+id} className="blog">
                <h6 className="blog-title">{title}</h6>
                <p className="blog-timestamp">{publishDate} | {duration} min read</p>
                <hr style={{border:"1px solid grey",margin:"8px 0px"}}/>
                <p className="blog-meta">{previewText}...</p>
                {/* <hr style={{border:"1px solid grey",margin:"8px 0px"}}/> */}
                {/* <h6>Tags:</h6> */}
                <div className="post-tags d-flex flex-wrap">
                    {tags.map((item,index)=><p key={index} className="tag-cell">{blogTagsList[item]}</p>)}
                </div>
            </div>
        )    
    }
}