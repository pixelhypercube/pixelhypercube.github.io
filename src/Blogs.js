import React from "react";
import { Container } from "react-bootstrap";
import blogsObj from "./data/blogsList";
import BlogContainer from "./components/BlogContainer";
import "./Blogs.css";
import Footer from "./components/Footer";
import OverlayCanvas from "./components/OverlayCanvas";
import Navigation from "./components/Navigation";
import BlogGrid from "./components/BlogGrid";
import Switch from "./components/Switch";
const {blogsList} = blogsObj;

export default class Blogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType:0,

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
        const {viewType, mouseX, mouseY, mouseIsDown} = this.state;
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
                    <div style={{
                        justifyContent:"space-between",
                    }} className="d-flex flex-wrap">
                        <p>Feel free to have a read on one of my blogs!</p>
                        <Switch
                        onClick={()=>this.setState({viewType:viewType===0 ? 1 : 0})}
                        imgLeftUrl={"./assets/img/icons/grid.svg"}
                        imgRightUrl={"./assets/img/icons/list.svg"}
                        width={25}
                        value={viewType}
                        />
                    </div>
                    {
                        viewType === 1 ? 

                        blogsList.map((blog,index)=>(
                            <BlogContainer
                                key={index}
                                blog={blog}
                            />
                        )).reverse() :

                    <div style={{
                        justifyContent:"space-between"
                    }} className="d-flex flex-wrap">
                        {
                            blogsList.map((blog,index)=>(
                                <BlogGrid
                                    colWidthL={4}
                                    colWidthM={6}
                                    colWidthS={12}
                                    key={index}
                                    blog={blog}
                                />
                            )).reverse()
                        }
                    </div>
                    }
                </Container>
                <Footer/>
            </div>
        )
    }
}