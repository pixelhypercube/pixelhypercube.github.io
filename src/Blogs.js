import React from "react";
import { Container } from "react-bootstrap";
import blogsObj from "./data/blogsList";
import BlogContainer from "./components/BlogContainer";
import "./Blogs.css";
import Footer from "./components/Footer";
import OverlayCanvas from "./components/OverlayCanvas";
import Navigation from "./components/Navigation";
const {blogsList} = blogsObj;

export default class Blogs extends React.Component {
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
        const {mouseX, mouseY, mouseIsDown} = this.state;
        return (
            <div>
                <OverlayCanvas
                    mouseX={mouseX}
                    mouseY={mouseY}
                    mouseIsDown={mouseIsDown}
                />
                <Navigation/>
                <Container>
                    <h1>My Blogs</h1>
                    <p>Feel free to have a read on one of my blogs!</p>
                    {
                        blogsList.map((blog,index)=>(
                            <BlogContainer
                            key={index}
                            blog={blog}
                            />
                        )).reverse()
                    }
                </Container>
                <Footer/>
            </div>
        )
    }
}