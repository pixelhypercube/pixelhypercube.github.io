import React from "react";
import { useParams } from "react-router-dom";

import blogsObj from "./data/blogsList";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import "./Blog.css";

const {blogsList} = blogsObj;

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navbarElem = React.createRef();
    }

    render() {
        const {id} = this.props.params;
        if (!blogsList[id-1]) return (
            <div>
                <Navbar style={{
                    background:"rgb(30, 28, 27)",
                    }} 
                    // className="d-md-block d-none" 
                    ref={this.navbarElem} sticky="top" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                        KJ
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                        <Navbar.Collapse className="d-flex">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="projects">Projects</Nav.Link>
                            <Nav.Link href="about">25 Facts About Me</Nav.Link> */}
                            <Nav.Link href="/blogs">Blogs</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="https://github.com/pixelhypercube"><img alt="github-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/github.svg"}/></Nav.Link>
                            <Nav.Link href="https://www.linkedin.com/in/kai-jie-teo/"><img alt="linkedin-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/linkedin.svg"}/></Nav.Link>
                            <Nav.Link href="./Resume_Kendrick.pdf"><img alt="resume-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/resume.svg"}/></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
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
                <Navbar style={{
                    background:"rgb(30, 28, 27)",
                    }} 
                    // className="d-md-block d-none" 
                    ref={this.navbarElem} sticky="top" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                        KJ
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                        <Navbar.Collapse className="d-flex">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="projects">Projects</Nav.Link>
                            <Nav.Link href="about">25 Facts About Me</Nav.Link> */}
                            <Nav.Link href="/blogs">Blogs</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="https://github.com/pixelhypercube"><img alt="github-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/github.svg"}/></Nav.Link>
                            <Nav.Link href="https://www.linkedin.com/in/kai-jie-teo/"><img alt="linkedin-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/linkedin.svg"}/></Nav.Link>
                            <Nav.Link href="./Resume_Kendrick.pdf"><img alt="resume-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"/assets/img/icons/resume.svg"}/></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
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
                <footer style={{
                    padding:"30px"
                }}>
                    <Container className="d-flex justify-content-center" style={{fontWeight:500}}>
                        <h4>Made with ❤️ by <a href="https://github.com/pixelhypercube">@pixelhypercube</a> using <a href="https://react.dev/">React.js</a></h4>
                    </Container>
                </footer>
            </div>
        )
    }
}

export default function BlogWithParaams(props) {
    const params = useParams();
    return <Blog {...props} params={params}/>;
}