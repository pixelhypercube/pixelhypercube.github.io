import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import GridBox from "./components/GridBox";
import projInfo from "./data/projInfo";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age:this.calculateAge(),
      nameCycle: ["Kai Jie","KJ","Kendrick"],
      nameIndex: 0,
      name:"Kai Jie"
    };
    this.navbarElem = React.createRef();
  }

  // helper function to cycle names

  typeName(nextIndex,typeDelay=50) {
    // delete name first, then reinstate it with another name
    // let {name,nameCycle} = this.state;
    // let delInterval = setInterval(()=>{
    //   name = name.substring(0,name.length-1);
    //   this.setState({name},()=>{
    //     if (name.length==0) clearInterval(delInterval);
    //   });
    // },typeDelay);
    
    // const newName = nameCycle[nextIndex];
    // let newNameIndex = 0;
    // let createInterval = setInterval(()=>{
    //   name += newName[newNameIndex++];
    //   this.setState({name},()=>{
    //     if (name == newName) clearInterval(createInterval);
    //   });
    // },typeDelay);
  }

  cycleNames(delay) {
    setInterval(()=>{
      const {nameIndex} = this.state;
      // incl helper function for to enable typing animation
      // this.setState({
      //   nameIndex: (nameIndex + 1) % this.state.nameCycle.length
      // });
      this.typeName((nameIndex + 1) % this.state.nameCycle.length);
    },delay);
  }

  // helper function to calculate age :)
  calculateAge() {
    const today = new Date();
    const birthDate = new Date("09/30/2002");

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference<0 || (monthDifference===0 && today.getDate()<birthDate.getDate())) age--;
    return age;
  }

  componentDidMount() {
    this.cycleNames(5000);
    window.addEventListener("scroll",()=>{
      let navbarElem = this.navbarElem.current;
      // disable navbar border when scrollY < 50
      if (navbarElem) {
        if (window.scrollY<100) navbarElem.style.borderBottom = "none";
        else navbarElem.style.borderBottom = "2px solid rgb(127,127,127)";
      }
    });
  }

  render() {
    const {age, nameIndex, nameCycle} = this.state;
    return (
      <div>
        <Navbar style={{
          background:"rgb(27,27,27)"
        }} ref={this.navbarElem} sticky="top" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              Home
              {/* <img style={{
                width:"64px",
                imageRendering:"pixelated"
              }} src={"./assets/img/avatar/avatar_default.png"} alt="avatar-default"/> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse className="d-flex">
              <Nav className="me-auto">
                <Nav.Link href="projects">Projects</Nav.Link>
                <Nav.Link href="about">25 Facts About Me</Nav.Link>
                <Nav.Link href="blogs">Blogs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link>English</Nav.Link>
                <Nav.Link>简体中文</Nav.Link>
                <Nav.Link>日本語</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <header
        style={{
          marginTop:"2vh",
          flexDirection:"column"
        }}
        className="d-flex">
          <Container id="header-1"
          style={{
            display:"flex",
            textAlign:"center",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"20px",
            height:"100vh"
          }}>
            <div>
              <h4>Hi there! I'm
              </h4>
              <h1 style={{fontSize:"100px"}}>{nameCycle[nameIndex]}</h1>
              {/* <img src={"./assets/img/avatar/avatar_default.png"} 
              style={{
                width:"100%",
                imageRendering:"pixelated"
              }}
              alt="avatar-default" /> */}
            </div>
            {/* <div className="col-md-8">
              <h4><span>{age}</span> y.o. Computer Science Undergraduate @ NTU</h4>
            </div> */}
          </Container>
          <Container
          style={{
            borderRadius:"20px",
            background:`rgba(255,255,255,0.1)`,
            padding:"20px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            fontSize:"20px",
          }}
          id="header-2">
            <p>Hi!👋 I'm currently a second year undergraduate student reading Computer Science at Nanyang Technological University (NTU)!</p>
            <p>I'd describe myself as a part nerd, part geek and part jock - someone who craves techie stuff and fitness!</p>
            <p>
              I enjoy tinkering with <a href="./side_projects.html">projects</a>, sharing knowledge on my <a href="./blog.html">blogs</a>, 
                and maintaining my <a href="https://pixelhypercube.github.io/ntu/" target="_blank">NTU Coursework Portfolio Website</a> 📚.
            </p>
            <p>In my spare time, I enjoy playing Minecraft 🎮, learning new languages 🌐, reading 📖 and gymming 🏋️‍♂️!</p>
            <p>Enjoy your stay here ;)</p>
          </Container>
        </header>
        <main>
          <Container>
            <h2>Experience</h2>
            <div className="container-experiences d-flex flex-wrap g-3">
              <GridBox
              colWidth={6}
              title={"Admin Support Assistant (NSF)"}
              subtitle1={"Singapore Armed Forces"}
              subtitle2={"Dec 2022 - Aug 2024 & *May 2025 - Jul 2025"}
              desc={"*Disrupted my service in Aug 2024 to pursue my 1st year in NTU"}
              />
              <GridBox
              colWidth={6}
              title={"Freelance Web Developer"}
              subtitle2={"Feb 2022 - Oct 2022"}
              />
              <GridBox
              colWidth={6}
              title={"Software Engineer Intern"}
              subtitle1={"Leaptron Engineering Pte. Ltd."}
              subtitle2={"Feb 2021 - Aug 2021"}
              />
            </div>
          </Container>
          <Container>
            <h2>Education</h2>
            <div className="container-education d-flex flex-wrap">
              <GridBox
              colWidth={4}
              title={"Nanyang Technological University"}
              subtitle1={"Bachelor of Computing (Honours) in Computer Science"}
              subtitle2={"2024 - Present"}
              />
              <GridBox
              colWidth={4}
              title={"Singapore Polytechnic"}
              subtitle1={"Diploma in Information Technology"}
              subtitle2={"2019 - 2022"}
              desc={"Specialized in Software & Applications"}
              />
              <GridBox
              colWidth={4}
              title={"Anglo-Chinese School (International)"}
              subtitle1={"Cambridge IGCSE"}
              subtitle2={"2016 - 2018"}
              />
              <GridBox
              colWidth={4}
              title={"Anglo-Chinese School (Barker Road)"}
              subtitle2={"2015"}
              desc="* Transferred to ACS (International) after Secondary 1"
              />
            </div>
          </Container>
          <Container>
            <h2>Side Projects</h2>
            <div className="container-side-projects d-flex flex-wrap">
              {
                projInfo.map((proj,index)=>(
                  <GridBox
                    colWidth={4}
                    key={index}
                    imageUrl={proj["image_location"]}
                    title={proj["title"]}
                    desc={proj["brief_description"]}
                    techStack={proj["tech_stack"]}
                  />
                )).splice(0,5)
              }
            </div>
          </Container>
        </main>
        <footer style={{
          padding:"30px"
        }}>
          <Container style={{
            justifyContent:"space-evenly"
          }} className="d-flex">
            <div className="col-md-7 col-12">
              <h1 style={{fontSize:"60px"}}>Feel free to contact me! I won't bite :)</h1>
            </div>
            <div className="col-md-5 col-12">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter your name"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                  as="textarea" 
                  rows={4}
                  placeholder="Type your message"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
              </Form>
            </div>
          </Container>
        </footer>
      </div>
    )
  }
}