import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import blogsObj from "./data/blogsList";
import BlogContainer from "./components/BlogContainer";
import "./Blogs.css";
const {blogsList} = blogsObj;

export default class Blogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navbarElem = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("scroll",()=>{
            let navbarElem = this.navbarElem.current;
            // disable navbar border when scrollY < 50
            if (navbarElem) {
                if (window.scrollY<100) {
                    console.log("HERE")
                    navbarElem.style.borderBottom = "none";
                    navbarElem.style.boxShadow = "none";
                }
                else {
                    navbarElem.style.borderBottom = "2px solid rgb(50,50,50)";
                    navbarElem.style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
                }
            }
        });
    }

    render() {
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
                            <Nav.Link href="blogs">Blogs</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="https://github.com/pixelhypercube"><img alt="github-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"./assets/img/icons/github.svg"}/></Nav.Link>
                            <Nav.Link href="https://www.linkedin.com/in/kai-jie-teo/"><img alt="linkedin-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"./assets/img/icons/linkedin.svg"}/></Nav.Link>
                            <Nav.Link href="./Resume_Kendrick.pdf"><img alt="resume-icon" style={{
                            width:"25px",
                            filter:"brightness(0) invert()"
                            }} src={"./assets/img/icons/resume.svg"}/></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
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