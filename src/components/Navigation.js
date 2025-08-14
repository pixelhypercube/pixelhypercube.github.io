import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

class Navigation extends React.Component {
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

    redirectProj() {
        let elem = document.getElementById("side-projects-container");
        if (elem) elem.scrollIntoView({behavior:"smooth",block:"start"});
    }

    render() {
        const {pathname} = this.props.location;
        return (
            <Navbar style={{
                background:"rgb(30, 28, 27)",
                }} 
                // className="d-md-block d-none" 
                ref={this.navbarElem} sticky="top" variant="dark">
                <Container>
                    <Navbar.Brand style={{fontSize:"24px",fontWeight:600}} href="/">
                    KJ
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse className="d-flex">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="projects">Projects</Nav.Link>
                            <Nav.Link href="about">25 Facts About Me</Nav.Link> */}
                            <Link style={{textDecoration:"none"}} to="../" onClick={()=>{
                                if (pathname!=="/") {
                                    setTimeout(()=>{
                                        this.redirectProj();
                                    },100);
                                } else this.redirectProj();
                            }}>Projects</Link>
                            <Link style={{textDecoration:"none",marginLeft:"15px"}} to="/blogs">Blogs</Link>
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
        )
    }
}

export default function NavigationWithLocation(props) {
    const location = useLocation();
    return <Navigation {...props} location={location}/>;
}