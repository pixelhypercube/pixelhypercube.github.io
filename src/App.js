import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
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

  typeName(nextIndex,currName,mode,interval = null,wordIndex = 0,typeDelay=50) {
    const {nameCycle} = this.state;
    if (mode==="type" && currName === nameCycle[nextIndex]) clearInterval(interval);
    else if (mode==="delete" && currName.length === 0) this.typeName(nextIndex,currName,"type",interval,wordIndex,typeDelay);
    else setTimeout(()=>{
      if (mode==="delete") currName = currName.substring(0,currName.length-1);
      else if (mode==="type") currName += nameCycle[nextIndex][wordIndex++];
      this.setState({name:currName},this.typeName(nextIndex,currName,mode,interval,wordIndex,typeDelay));
    },typeDelay);
  }

  cycleNames(delay) {
    setInterval(()=>{
      this.setState({nameIndex:(this.state.nameIndex + 1) % this.state.nameCycle.length},()=>this.typeName(this.state.nameIndex,this.state.name,"delete"));
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
    this.cycleNames(4000);
    window.addEventListener("scroll",()=>{
      let navbarElem = this.navbarElem.current;
      // disable navbar border when scrollY < 50
      if (navbarElem) {
        if (window.scrollY<100) {
          navbarElem.style.borderBottom = "none";
          navbarElem.style.boxShadow = "none";
        }
        else {
          navbarElem.style.borderBottom = "2px solid rgb(127,127,127)";
          navbarElem.style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
        }
      }
    });
  }

  render() {
    const {age} = this.state;
    return (
      <div>
        <Navbar style={{
          background:"rgb(27,27,27)",
        }} className="d-md-block d-sm-none" ref={this.navbarElem} sticky="top" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              Home
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
              <h4>Hi there! My name is
              </h4>
              <h1 style={{fontSize:"100px"}}>{this.state.name} <span id="typer"></span></h1>
            </div>
            <div className="col-md-8">
              <h4><span>{age}</span> y.o. Computer Science Undergraduate @ NTU</h4>
            </div>
          </Container>
          <Container style={{
            marginBottom:"200px"
          }} className="d-flex flex-wrap">
            <Container className="col-md-4 col-12 d-flex justify-content-center">
              <img src={"./assets/img/avatar/avatar_default.png"} 
              style={{
                width:"100%",
                maxWidth:"300px",
                height:"fit-content",
                imageRendering:"pixelated",
              }}
              alt="avatar-default" />
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
            className="col-md-8 col-12"
            id="header-2">
              <p>Hi!👋 I'm currently a second year undergraduate student reading Computer Science at Nanyang Technological University (NTU)!</p>
              <p>I'd describe myself as a part nerd, part geek and part jock - someone who craves techie stuff and fitness!</p>
              <p>
                I enjoy tinkering with <a href="./proj">projects</a>, sharing knowledge on my <a href="./blogs">blogs</a>, 
                  and maintaining my <a href="https://pixelhypercube.github.io/ntu">NTU Coursework Portfolio Website</a> 📚.
              </p>
              <p>In my spare time, I enjoy playing Minecraft 🎮, learning new languages 🌐, reading books 📖 and working out at the gym 🏋️‍♂️!</p>
              <p>Enjoy your stay here ;)</p>
            </Container>
          </Container>
        </header>
        <main>
          <Container style={{marginBottom:"80px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"40px",textDecoration:"underline"}}>Experience</h1>
            <div className="container-experiences d-flex flex-wrap justify-content-center">
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Admin Support Assistant (NSF)"}
              subtitle1={"Singapore Armed Forces"}
              subtitle2={"Dec 2022 - Aug 2024, May 2025 - Jul 2025"}
              desc={"*Disrupted my service in Aug 2024 to pursue my 1st year in NTU"}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Freelance Web Developer"}
              subtitle2={"Feb 2022 - Oct 2022"}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Software Engineer Intern"}
              subtitle1={"Leaptron Engineering Pte. Ltd."}
              subtitle2={"Feb 2021 - Aug 2021"}
              />
            </div>
          </Container>
          <Container style={{marginBottom:"150px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"40px",textDecoration:"underline"}}>Education</h1>
            <div className="container-education d-flex flex-wrap justify-content-center">
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Nanyang Technological University"}
              subtitle1={"Bachelor of Computing (Honours) in Computer Science"}
              subtitle2={"2024 - Present"}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Singapore Polytechnic"}
              subtitle1={"Diploma in Information Technology"}
              subtitle2={"2019 - 2022"}
              desc={"Specialized in Software & Applications"}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Anglo-Chinese School (International)"}
              subtitle1={"Cambridge IGCSE"}
              subtitle2={"2016 - 2018"}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Anglo-Chinese School (Barker Road)"}
              subtitle2={"2015"}
              desc="* Transferred to ACS (International) after Secondary 1"
              />
            </div>
          </Container>
          <Container style={{marginBottom:"80px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"40px",textDecoration:"underline"}}>Side Projects</h1>
            <div className="container-side-projects d-flex flex-wrap justify-content-center">
              {
                projInfo.map((proj,index)=>(
                  <GridBox
                    colWidthL={6}
                    colWidthS={12}
                    key={index}
                    imageUrl={proj["image_location"]}
                    title={proj["title"]}
                    desc={proj["brief_description"]}
                    techStack={proj["tech_stack"]}
                  />
                )).splice(0,6)
              }
            </div>
          </Container>
        </main>
        <footer style={{
          padding:"30px"
        }}>
          <Container style={{
            justifyContent:"space-evenly"
          }} className="d-flex flex-wrap">
            <div className="col-md-6 col-12">
              <h1 style={{fontSize:"60px"}}>Feel free to contact me! I won't bite 👌</h1>
            </div>
            <div className="col-md-6 col-12">
              <Form style={{marginLeft:"30px"}}>
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
                <Button variant="outline-light" type="submit">
                  Send Message
                </Button>
              </Form>
            </div>
          </Container>
        </footer>
      </div>
    )
  }
}