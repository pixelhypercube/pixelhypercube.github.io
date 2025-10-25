import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Tag from "./Tag";

export default class GridDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width:window.innerWidth,
            height:window.innerHeight,

            isMouseHoveringCloseBtn:false,
        };
        this.closeBtnRef = React.createRef();
        this.mainContainerRef = React.createRef();
        this.outsideContainerRef = React.createRef();
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.visible !== this.props.visible) {
            if (!this.closeBtnRef) this.closeBtnRef = React.createRef();
            if (!this.mainContainerRef) this.mainContainerRef = React.createRef();
            if (!this.outsideContainerRef) this.outsideContainerRef = React.createRef();
        }
    }

    componentDidMount() {
        if (!this.closeBtnRef) this.closeBtnRef = React.createRef();
        if (!this.mainContainerRef) this.mainContainerRef = React.createRef();
        if (!this.outsideContainerRef) this.outsideContainerRef = React.createRef();
        window.addEventListener("resize",()=>{
            this.setState({
                width:window.innerWidth,
                height:window.innerHeight
            })
        });
    }

    render() {
        const {title, updated, subtitle1, subtitle2, desc, imageUrl, techStack, videoUrl, ghLink, webLink} = this.props;
        // const {colWidthL, colWidthS, topRightBtn, topRightBtnLink, topRightBtnCaption, bottomLeftBtn, bottomLeftBtnCaption, bottomLeftBtnLink, bottomLeftBtnIconUrl} = this.props;
        
        // define video extension (if it exists)
        let videoExtension = null;
        if (videoUrl) videoExtension = videoUrl.match(/\.[0-9a-z]+$/i)[0];

        const videoExtensions = [
            ".mp4", ".mov", ".avi", ".wmv", ".flv", ".mkv", ".webm",
            ".mpg", ".mpeg", ".3gp", ".3g2", ".m4v", ".ogv", ".mts", ".m2ts",
            ".vob", ".f4v", ".divx", ".rm", ".rmvb", ".ts", ".mxf", ".asf",
            ".drc", ".amv", ".ivf", ".nut", ".ogm", ".yuv",
            ".swf", ".fli", ".flc", ".mng", ".camrec", ".camproj", ".screenflow",
            ".ismv", ".isma", ".trp", ".pva", ".str", ".bik", ".bk2", ".roq", ".nsv"
        ];
                
        let {visible} = this.props;
        let {width,height,isMouseHoveringCloseBtn} = this.state;
        return (
            <div style={{
                background:"rgba(0,0,0,0.5)",
                position:"fixed",
                overflowY:width<768 ? "scroll" : "auto",
                top:0,
                left:0,
                width:`${width}px`,
                height:`${height}px`,
                animationDelay:"1s",
                // transition: "opacity 0.5s ease 0s",
                opacity:visible ? 1 : 0,
                pointerEvents: visible ? "all" : "none",
                zIndex:10,
                jusitfyContent:width<768 ? "normal" : "center",
                alignItems:width<768 ? "normal" : "center"
                // maxHeight:width<768 ? "95vh" : "auto"
            }} ref={this.outsideContainerRef} className="grid-dialog d-flex">
                <Container style={{
                    width:"90%",
                    marginTop: width<768 ? "20px" : "100px",
                    marginBottom: width<768 ? "20px" : "100px",
                    height:"fit-content",
                    // maxHeight:width<768 ? "95vh" : "auto",
                    border:"1px solid rgba(255,255,255,0.2)",
                    borderRadius:"30px",
                    padding:"20px",
                    background:"rgb(30, 28, 27)",
                    zIndex:11,
                }}
                ref={this.mainContainerRef}
                className="proj-dialog">
                    {/* HEADER */}
                    <div style={{
                        justifyContent:"space-between",
                    }} className="d-flex">
                        <div>
                            {title ? <h1 className="m-0">{title}</h1> : null}
                            {subtitle1 ? <h2>{subtitle1}</h2> : null}
                            {subtitle2 ? <h2>{subtitle2}</h2> : null}
                            {updated ? <p style={{fontWeight:100}} className="m-0">Updated on {updated ? <i>{updated}</i> : null}</p> : null}
                        </div>
                        <span ref={this.closeBtnRef}>
                            <FontAwesomeIcon 
                            onMouseEnter={()=>this.setState({isMouseHoveringCloseBtn:true})}
                            onMouseLeave={()=>this.setState({isMouseHoveringCloseBtn:false})}
                            className="grid-dialog-close-btn"
                            style={{
                                width:"30px",
                                height:"30px",
                                opacity:isMouseHoveringCloseBtn ? 0.5 : 1
                            }} 
                            
                            icon={faXmark}/>
                        </span>
                    </div>
                    <hr style={{margin:"0px 0px 10px 0px"}} />
                    {/* BODY */}
                    <div className="d-md-flex flex-wrap">
                        <div style={{
                            width:`${width<768 ? 100 : 50}%`,
                        }} className="col-lg-6 col-md-12 pe-2">
                            {desc ? <p style={{
                                fontSize:`${width < 768 ? 16 : 18}px`,
                            }}>{desc}</p> : null}
                            {techStack ? <h5 style={{fontSize:"22px"}}><u>Tech Stack:</u></h5> : null}
                            <div className="gridbox-techstack d-flex flex-wrap">
                                {
                                    techStack 
                                    ? 
                                    techStack.map((tag,index) => {
                                        return (
                                            <Tag 
                                            tag={tag}
                                            key={index}
                                            />
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                        <div style={{
                            width:`${width<768 ? 100 : 50}%`,
                        }} className="d-md-flex flex-column col-lg-6 ps-2">
                            <hr className="d-md-none" style={{borderStyle:"dashed"}}/>
                            {videoUrl ? <h4 className="mb-3"><u>Demo</u></h4> : null}
                            <div style={{
                                flex:1,
                                maxHeight:width<768 ? "67%" : "400px"
                            }} className="d-flex justify-content-center align-items-center mb-2">
                                {videoUrl && videoExtension!=null && videoExtensions.includes(videoExtension) ? 
                                <video style={{
                                    width:"100%",
                                    maxWidth:"600px",
                                    maxHeight:"100%",
                                    objectFit:"contain",
                                    borderRadius:"10px",
                                    marginBottom:"10px",
                                }} 
                                autoPlay
                                muted
                                src={videoUrl}></video>
                                // detect whether it's a gif or not
                                : imageUrl ? <img
                                    src={videoExtension ? videoUrl : imageUrl}
                                    style={{
                                        width:"100%",
                                        maxWidth:"600px",
                                        maxHeight:"100%",
                                        objectFit:"contain",
                                        borderRadius:"10px",
                                        marginBottom:"10px",
                                    }}
                                    alt="grid-img"
                                /> : (
                                <img
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        margin: "10px",
                                        flexShrink: 0,
                                        alignSelf: "center"
                                    }}
                                    src="./assets/img/icons/spinner.gif"
                                    alt="loading-icon"
                                />
                            )}
                            </div>
                            <div style={{
                                justifyContent:"space-between",
                            }} className="btns-list d-flex">
                                {
                                    ghLink ? 
                                    <Button style={{
                                        // width:"48%",
                                        marginRight:"5px",
                                        justifyContent:"center",
                                        fontWeight:500,
                                    }} className="col d-flex align-items-center"
                                    href={ghLink} variant="light">
                                        <img alt="github-icon" style={{
                                        width:`${width<576 ? 16 : width<768 ? 24 : 32}px`,
                                        filter:"brightness(0)",
                                        marginRight:"5px"
                                        }} src={"./assets/img/icons/github.svg"}/>
                                        <span style={{
                                            fontSize:`${width<576 ? 15 : width<768 ? 18 : 22}px`,
                                        }}>Github Link</span>
                                    </Button> : null 
                                }
                                {
                                    webLink ? 
                                    <Button style={{
                                        // width:"48%",
                                        marginLeft:"5px",
                                        justifyContent:"center",
                                        fontWeight:500,
                                    }} className="col d-flex align-items-center"
                                    href={webLink}  variant="light">
                                        <img alt="view-icon" style={{
                                        width:`${width<576 ? 16 : width<768 ? 24 : 32}px`,
                                        filter:"brightness(0)",
                                        marginRight:"5px"
                                        }} src={"./assets/img/icons/web_browser.svg"}/>
                                        <span style={{
                                            fontSize:`${width<576 ? 15 : width<768 ? 18 : 22}px`,
                                        }}>Web Link</span>
                                    </Button> : null
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}