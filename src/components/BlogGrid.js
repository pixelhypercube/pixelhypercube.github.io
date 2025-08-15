import React from "react";

// import blogsObj from "../data/blogsList";
// const {blogTagsList} = blogsObj;
const thumbnailUrlFolder = "./assets/img/blogs/thumbnails/";

export default class BlogGrid extends React.Component {
    constructor(props) {
        super(props);
        const {colWidthL} = this.props;
        this.state = {
            flex:`0 0 calc(${100 / (12 / colWidthL)}% - 2.5%)`,
            maxWidth:`calc(${100 / (12 / colWidthL)}% - 2.5%)`,   
        };
    }

    updateSize() {
        const {colWidthL,colWidthM,colWidthS} = this.props;
        if (colWidthL && colWidthS) {
            if (window.innerWidth<768) {
                this.setState({
                    flex:`0 0 calc(${100 / (12 / colWidthS)}% - 2.5%)`,
                    maxWidth:`calc(${100 / (12 / colWidthS)}% - 2.5%)`,
                });
            } else if (window.innerWidth<992) {
                this.setState({
                    flex:`0 0 calc(${100 / (12 / colWidthM)}% - 2.5%)`,
                    maxWidth:`calc(${100 / (12 / colWidthM)}% - 2.5%)`,
                });
            } else {
                this.setState({
                    flex:`0 0 calc(${100 / (12 / colWidthL)}% - 2.5%)`,
                    maxWidth:`calc(${100 / (12 / colWidthL)}% - 2.5%)`,
                });
            }
        }
    }

    componentDidMount() {
        this.updateSize();
        window.addEventListener("resize",()=>{this.updateSize();});
    }

    render() {
        const {blog,colWidthL,colWidthM,colWidthS} = this.props;
        const {id,title,publishDate,duration,thumbnailImg,thumbnailAttr} = blog;
        let {flex, maxWidth} = this.state;
        return (
            <div 
            style={{
                // margin:"20px",
                padding:"0px",
                flex,
                maxWidth,
            }}
            onClick={()=>window.location.href="/#/blogs/"+id} className={`blog col-md-${colWidthL} col-sm-${colWidthM} col-${colWidthS}`}>
                <div>
                    <img 
                    style={{
                        width:"100%",
                        maxHeight:"175px",
                        objectFit:"cover",
                        borderRadius:"20px 20px 0px 0px"
                    }}
                    src={thumbnailUrlFolder+thumbnailImg} alt={`thumbnail-${id}`}/>
                    {thumbnailAttr}
                </div>
                <div
                style={{
                    padding:"15px",
                }}
                >
                    <h6 className="blog-title">{title}</h6>
                    <p className="blog-timestamp">{publishDate} | {duration} min read</p>
                    {/* <div className="post-tags d-flex flex-wrap">
                        {tags.map((item,index)=><p key={index} className="tag-cell">{blogTagsList[item]}</p>)}
                    </div> */}
                </div>
            </div>
        )
    }
}