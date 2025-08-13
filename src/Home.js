import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import GridBox from "./components/GridBox";
import projInfo from "./data/projInfo";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faProjectDiagram, faSchool, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import SkillBox from "./components/SkillBox";

import tagObj from "./data/tags";
const {tags,tagKeys} = tagObj;

export default class Home extends React.Component {
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
          navbarElem.style.borderBottom = "2px solid rgb(50,50,50)";
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
            height:"95vh"
          }}>
            <div>
              <h4>Hi there! My name is
              </h4>
              <h1 style={{fontSize:"80px"}}>{this.state.name} <span id="typer"></span></h1>
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
                marginBottom:"40px",
                maxWidth:"300px",
                height:"auto",
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
              <p>Hi!👋 I'm currently a second year undergraduate reading Computer Science at Nanyang Technological University (NTU)!</p>
              <p>I'd describe myself as a part nerd, part geek and part jock - someone who enjoys both techie stuff and fitness!</p>
              <p>
                I enjoy tinkering with <a href="./proj">projects</a>, sharing knowledge on my <a href="./blogs">blogs</a>, 
                  and maintaining my <a href="https://pixelhypercube.github.io/ntu">NTU Coursework Portfolio Website</a> 📚.
              </p>
              <p>In my spare time, I enjoy playing Minecraft 🎮, speedsolving Rubik's Cubes 🧊, learning new languages 🌐, reading books 📖 and working out at the gym 🏋️‍♂️!</p>
              <p>Enjoy your stay here ;)</p>
            </Container>
          </Container>
        </header>
        <main>
          <Container style={{marginBottom:"150px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"50px"}}><FontAwesomeIcon icon={faGear} /> Skills</h1>
            {
              tagKeys.map((type,typeIndex)=>(
                <div key={typeIndex}>
                  <h2 style={{textAlign:"center"}}>{type}</h2>
                  <div style={{marginBottom:"15px"}} className="d-flex flex-wrap justify-content-center">
                    {
                      Object.keys(tags)
                      .filter(item=>tags[item]["type"]===type)
                      .map((item,skillIndex)=>(
                        <SkillBox
                        key={skillIndex}
                        skill={item}/>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </Container>
          <Container style={{marginBottom:"150px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"50px"}}><FontAwesomeIcon icon={faSuitcase} /> Experience</h1>
            <div className="container-experiences d-flex flex-wrap justify-content-center">
              <GridBox
              colWidthL={9}
              colWidthS={12}
              title={"Admin Support Assistant (NSF)"}
              subtitle1={"Singapore Armed Forces"}
              subtitle2={(
                <div>
                  <span>Dec 2022 - Aug 2024, </span>
                  <span><sup>*</sup>May 2025 - Jul 2025</span>
                </div>
              )}
              // subtitle2={"Dec 2022 - Aug 2024 & May 2025 - Jul 2025"}
              desc={(
                <div>
                  <ul>
                    <li>Developed a QR Code attendance tracking system that lets attendees speedrun through tedious attendance tracking methods via the usage of email-generated QR Codes 📨</li>
                    <li style={{marginLeft:"20px",listStyle:"circle"}}>One of my biggest achievements was that I allowed 200+ participants to mark their attendance efficiently at the SAF Pers Hubs' Total Defence Day event in February 2023! 🍾</li>
                    <li style={{marginLeft:"20px",listStyle:"circle"}}>Featured in <a href="https://www.facebook.com/photo/?fbid=615021920650301&set=pcb.615023607316799">Army News</a> 📰 for my contributions to the programming team 🎉</li>
                    <li>Sucessfully speedran through the testing phase of Telegram chatbots and killed many bugs in them (in an eco-friendly way)! 🧹</li>
                    <li>Upon my resumption in May 2025, I joined the <sup>†</sup>PAL (Personnel Admin Link) programming team to again, speedrun the development process, where rounds of operational testing of the app & came up with new features, including a mobile app variant.</li>
                  </ul>

                  <h6 style={{fontSize:"22px"}}>Awards 🎖️</h6>
                  <ul>
                    <li>Outstanding Soldier of the Month (June 2025)</li>
                  </ul>

                  <small><sup>*</sup>Disrupted my service in Aug 2024 to pursue my 1st year in NTU.</small>
                  <br/>
                  <small><sup>†</sup>A Microsoft PowerApps-based tasking platform for managing manpower assignments across Personnel Nodes (Persnodes) in Singapore.</small>
                </div>
              )}
              techStack={["HTML","CSS","Javascript","EJS","MS Office Suite","MongoDB","Postman","Node.js"]}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Web Developer"}
              subtitle1={"Freelance"}
              subtitle2={"Feb 2022 - Oct 2022"}
              desc={(
                <div>
                  <ul>
                    <li>Decided to extend my Polytechnic's FYP project to create more features, fix pesky bugs, and resolve customers' issues for EcoExchange Pte Ltd's intranet website.</li>
                    <li>Created test cards using React.js for Autodesk, improving testing workflows and UI stability—because flaky UIs are the final boss no one asked for.</li>
                  </ul>
                </div>
              )}
              techStack={["HTML","CSS","Javascript","Postman","React.js"]}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Software Engineer Intern"}
              subtitle1={"Leaptron Engineering Pte. Ltd."}
              subtitle2={"Feb 2021 - Aug 2021"}
              desc={(
                <div>
                  <ul>
                    <li>Created Android apps (Java), C# programs, and Node.js servers integrated with MySQL databases designed for scalability and reliability — basically, a one-person full-stack buffet.</li>
                    <li>Used Appgyver (now SAP Build Apps) and Modbus to connect IoT devices, impressing everyone who thought IoT was just "Wi-Fi for fridges."</li>
                  </ul>
                </div>
              )}
              techStack={["C#","Java","Android Studio","Node.js","SQL","Postman"]}
              />
            </div>
            <div style={{
              justifyContent:"center"
            }} className="d-flex">
              <Button 
              style={{
                fontSize:"24px",
                fontWeight:500,
              }}
              variant="light" className="d-flex" href="./Resume_Kendrick.pdf">
              <img alt="resume-icon" style={{
                width:"25px",
                filter:"brightness(0)",
                marginRight:"5px"
              }} src={"./assets/img/icons/resume.svg"}/>
              Résumé
              </Button>
            </div>
          </Container>
          <Container style={{marginBottom:"150px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px",marginBottom:"50px"}}><FontAwesomeIcon icon={faSchool} /> Education</h1>
            <div className="container-education d-flex flex-wrap justify-content-center">
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Nanyang Technological University"}
              subtitle1={"Bachelor of Computing (Honours) in Computer Science"}
              subtitle2={"2024 - Present"}
              desc={(
                <div>
                  <ul>
                    <li>Clinched my childhood dream of studying computer science, kudos to <a href="https://www.youtube.com/@SethBling">Sethbling</a> for the inspiration!</li>
                    <li>Currently a Hall 10 Resident 🏘️ & Hall 10 Road Relay Member 🏃 (since 2024)!</li>
                    <li>Snagged my first runner-up medal with my Hall 10 Road Relay team at the <sup>*</sup>IHG 2025! 🥈</li>
                  </ul>
                  <small><sup>*</sup>Inter Hall Games</small>
                </div>
              )}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Singapore Polytechnic"}
              subtitle1={"Diploma in Information Technology"}
              subtitle2={"2019 - 2022"}
              desc={(
                <div>
                  <ul>
                    <li>Specialized in Software & Applications</li>
                    <li>Decided with Polytechnic instead of IB as I wanted to continue being a tech nerd 🧑‍💻</li>
                  </ul>
                  <h6 style={{fontSize:"22px"}}>Awards 🎖️</h6>
                  <ul>
                    <li>Director's Honour Roll for AY2019/2020</li>
                    <li>Edusave Certificate of Academic Achievement (2019-2021)</li>
                  </ul>
                </div>
              )}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Anglo-Chinese School (International)"}
              subtitle1={"Cambridge IGCSE"}
              subtitle2={"2016 - 2018"}
              desc={(
                <div>
                  <ul>
                    <li>Was previously an Archery CCA member in 2016, but decided to change to philharmonic orchestra to join my sister in the CCA.</li>
                    <li>Despite having little to no musical background, I played the double bass 🎻 and was surprisingly promoted to section lead!</li>
                  </ul>
                </div>
              )}
              />
              <GridBox
              colWidthL={6}
              colWidthS={12}
              title={"Anglo-Chinese School (Barker Road)"}
              subtitle2={"2015"}
              desc={
                <div>
                  <ul>
                    <li>Member of Robotics CCA, where I get to have hands-on interaction with LEGO Mindstorms robots! 🤖</li>
                    <li>Transferred to ACS (International) after Sec 1, to pursue the Cambridge IGCSE curriculum</li>
                  </ul>
                  <h6 style={{fontSize:"22px"}}>Awards 🎖️</h6>
                  <ul>
                    <li>Edusave Good Progress Award (2015)</li>
                  </ul>
                </div>
              }
              />
            </div>
          </Container>
          <Container style={{marginBottom:"150px"}}>
            <h1 style={{textAlign:"center",fontSize:"55px"}}><FontAwesomeIcon icon={faProjectDiagram} /> Side Projects</h1>
            <h5 style={{textAlign:"center",marginBottom:"50px"}}>Click on each project to expand!</h5>
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
                    bottomLeftBtn={true}
                    bottomLeftBtnCaption={"Project Link"}
                    bottomLeftBtnLink={proj["link"]}
                    bottomLeftBtnIconUrl={"./assets/img/icons/link.svg"}
                  />
                ))
              }
            </div>
            <div className="d-flex justify-content-center">
              {/* <Button variant="light" style={{
                fontWeight:500,
                fontSize:"24px"
              }} href="./proj">
                Click to view more!
              </Button> */}
            </div>
          </Container>
        </main>
        <footer style={{
          padding:"30px"
        }}>
          <Container className="d-flex justify-content-center" style={{fontWeight:500}}>
            <h4>Made with ❤️ by <a href="https://github.com/pixelhypercube">@pixelhypercube</a> using <a href="https://react.dev/">React.js</a></h4>
          </Container>
          {/* <Container style={{
            justifyContent:"space-evenly"
          }} className="d-flex flex-wrap">
            <div className="col-md-6 col-12 d-flex align-items-center">
              <h1 style={{fontSize:"60px"}}>Have a question? Ask me about anything! <br/> I won't bite 👌</h1>
            </div>
            <div className="col-md-6 col-12">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"20px"}}>Name</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter your name"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"20px"}}>Email</Form.Label>
                  <Form.Control 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"20px"}}>Message</Form.Label>
                  <Form.Control 
                  as="textarea" 
                  rows={4}
                  placeholder="Type your message"
                  className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Button style={{fontSize:"20px"}} variant="outline-light" type="submit">
                  Send Message
                </Button>
              </Form>
            </div>
          </Container> */}
        </footer>
      </div>
    )
  }
}