import React from "react";
import { useParams } from "react-router-dom";

import blogsObj from "./data/blogsList";
import { Button, Container } from "react-bootstrap";

import "./Blog.css";
import Footer from "./components/Footer";
import OverlayCanvas from "./components/OverlayCanvas";
import Navigation from "./components/Navigation";

const {blogsList} = blogsObj;

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // overlay canvas props
            mouseX:0,
            mouseY:0,
            mouseIsDown:false,
        };
        this.navbarElem = React.createRef();
    }
    
    componentDidMount() {
        // set web title name
        const {id} = this.props.params;
        const {blogsList} = blogsObj;
        document.title = `${blogsList?.[id-1] ? blogsList?.[id-1].title : "Blog Not Found"} | KJ's Blogs`;

        // to pass to overlay canvas

        window.addEventListener("mousedown",(e)=>{
            this.setState({
                mouseX:e.clientX,
                mouseY:e.clientY,
                mouseIsDown:true
            });
        });

        window.addEventListener("mousedown",(e)=>{
            this.setState({
                mouseIsDown:false,
            });
        });
    }

    render() {
        const {id} = this.props.params;
        const {mouseX, mouseY, mouseIsDown} = this.state;
        if (!blogsList[id-1]) return (
            <div>
                <OverlayCanvas
                mouseX={mouseX}
                mouseY={mouseY}
                mouseIsDown={mouseIsDown}
                />
                <Navigation/>
                <Container style={{
                    height:"90vh"
                }} className="d-flex flex-column justify-content-center align-items-center">
                    <h1 style={{fontSize:"100px"}}>🙇‍♂️</h1>
                    <h1>Sorry, the requested blog does not exist.</h1>
                    <Button variant="light" style={{fontSize:"24px",fontWeight:500}} onClick={()=>window.history.back()}>↩️ Back to previous page</Button>
                </Container>
            </div>
        )
        const {title,publishDate,duration,htmlContent} = blogsList[id-1];
        return (
            <div>
                <OverlayCanvas
                        mouseX={mouseX}
                        mouseY={mouseY}
                        mouseIsDown={mouseIsDown}
                        />
                <Navigation/>
                <Container>
                    <div id="blog">
                        <div className="mb-2 mt-3" id="blogHeader">
                            <h4 className="d-flex" style={{justifyContent:"space-between"}}>
                                <span id="publishDate">{publishDate}</span> 
                                <span id="duration">{duration} min read</span>
                            </h4>
                            <h1 id="title">{title}</h1>
                        </div>
                        <hr style={{border:"1px solid grey"}} />
                        <div className="container" id="blogBody" style={{
                            maxWidth:"900px",
                            marginBottom:"100px",
                        }}>
                            {htmlContent}
                        </div>
                        {/* <div className="d-flex justify-content-center">
                            <Button variant="light" onClick={()=>window.history.back()}>
                                Back
                            </Button>
                        </div> */}
                    </div>
                </Container>
                <Footer/>
            </div>
        )
    }
}

export default function BlogWithParaams(props) {
    const params = useParams();
    return <Blog {...props} params={params}/>;
}