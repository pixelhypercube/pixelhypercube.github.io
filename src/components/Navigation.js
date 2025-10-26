import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HoverDialog from "./HoverDialog";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            githubIsHovering:false,
            linkedinIsHovering:false,
            emailIsHovering:false,
            resumeIsHovering:false
        };

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
        let {githubIsHovering,linkedinIsHovering,emailIsHovering,resumeIsHovering} = this.state;
        return (
            <Navbar style={{
                background:"rgb(30, 28, 27)",
                zIndex:2
                }} 
                // className="d-md-block d-none" 
                ref={this.navbarElem} sticky="top" variant="dark"
            >
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
                                    },300);
                                } else this.redirectProj();
                            }}>Projects</Link>
                            <Link style={{textDecoration:"none",marginLeft:"15px"}} to="/blogs">Blogs</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <div 
                            onMouseEnter={()=>this.setState({githubIsHovering:true})} 
                            onMouseLeave={()=>this.setState({githubIsHovering:false})}
                            style={{position:"relative"}}>
                                <Nav.Link href="https://github.com/pixelhypercube"><img alt="github-icon" style={{
                                width:"25px",
                                filter:"brightness(0) invert()"
                                }} src={"./assets/img/icons/github.svg"}/></Nav.Link>
                                <HoverDialog
                                    visible={githubIsHovering}
                                    dialogWidth={60}
                                    name={"Github"}
                                />
                            </div>
                            <div 
                            onMouseEnter={()=>this.setState({linkedinIsHovering:true})} 
                            onMouseLeave={()=>this.setState({linkedinIsHovering:false})}
                            style={{position:"relative"}}>
                                <Nav.Link href="https://www.linkedin.com/in/kai-jie-teo/"><img alt="linkedin-icon" style={{
                                width:"25px",
                                filter:"brightness(0) invert()"
                                }} src={"./assets/img/icons/linkedin.svg"}/></Nav.Link>
                                <HoverDialog
                                    visible={linkedinIsHovering}
                                    dialogWidth={70}
                                    name={"Linkedin"}
                                />
                            </div>
                            <div 
                            onMouseEnter={()=>this.setState({emailIsHovering:true})} 
                            onMouseLeave={()=>this.setState({emailIsHovering:false})}
                            style={{position:"relative"}}>
                                <Nav.Link href="mailto:6thetce@gmail.com">
                                    <img alt="envelope-icon" style={{
                                    width:"25px",
                                    filter:"brightness(0) invert()"
                                    }} src={"./assets/img/icons/envelope.svg"}/>
                                </Nav.Link>
                                <HoverDialog
                                    visible={emailIsHovering}
                                    dialogWidth={50}
                                    name={"Email"}
                                />
                            </div>
                            <div 
                            onMouseEnter={()=>this.setState({resumeIsHovering:true})} 
                            onMouseLeave={()=>this.setState({resumeIsHovering:false})} 
                            style={{position:"relative"}}>
                                <Nav.Link href="./Resume_TeoKaiJie.pdf">
                                    <img alt="resume-icon" style={{
                                    width:"25px",
                                    filter:"brightness(0) invert()"
                                    }} src={"./assets/img/icons/resume.svg"}/>
                                </Nav.Link>
                                <HoverDialog
                                    visible={resumeIsHovering}
                                    dialogWidth={70}
                                    name={"View Résumé"}
                                />
                            </div>
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