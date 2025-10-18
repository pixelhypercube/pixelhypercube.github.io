import React from "react"
import { Button, Container } from "react-bootstrap";
import Tag from "./Tag";

import "./GridBox.css";

export default class GridBox extends React.Component {
    constructor(props) {
        super(props);
        const {colWidthL,colWidthS} = this.props;
        this.state = {
            flex:`0 0 calc(${100 / (12 / colWidthL)}% - 10%)`,
            maxWidth:`calc(${100 / (12 / colWidthL)}% - 10%)`,
            hovering:false,
            colWidthL,
            colWidthS
        };
    }

    updateSize() {
        const {colWidthL, colWidthS} = this.state;
        if (colWidthL && colWidthS) {
            if (window.innerWidth<992) {
                this.setState({
                    flex:`0 0 calc(${100 / (12 / colWidthS)}% - 10%)`,
                    maxWidth:`calc(${100 / (12 / colWidthS)}% - 10%)`,
                });
            } else {
                this.setState({
                    flex:`0 0 calc(${100 / (12 / colWidthL)}% - 10%)`,
                    maxWidth:`calc(${100 / (12 / colWidthL)}% - 10%)`,
                });
            }
        }
    }

    componentDidMount() {
        this.updateSize();
        window.addEventListener("resize",()=>{this.updateSize()});
    }
    
    render() {
        const {title, subtitle1, subtitle2, updated, desc, imageUrl, techStack, colWidthL, colWidthS, topRightBtn, topRightBtnLink, topRightBtnCaption, bottomLeftBtn, bottomLeftBtnCaption, bottomLeftBtnLink, bottomLeftBtnIconUrl, onClick} = this.props;
        let {flex, maxWidth, isHovering} = this.state;
        return (
            <Container
            style={{
                borderRadius:"20px",
                background:`rgba(255,255,255,${isHovering ? "0.2" : "0.1"})`,
                padding:"20px",
                flex,
                maxWidth,
                margin:"30px"
            }}
            onClick={onClick}
            onMouseOver={()=>this.setState({isHovering:true})}
            onMouseLeave={()=>this.setState({isHovering:false})}
            className={`gridbox col-md-${colWidthL} col-${colWidthS}`}>
                <div style={{
                    justifyContent:"space-between",
                }} className="d-flex">
                    {title ? <h3 style={{marginBottom:"3px"}}>{title}</h3> : null}
                    {topRightBtn ? <Button
                    href={topRightBtnLink}
                    style={{height:"fit-content",marginBottom:"10px"}}
                    variant="light">{topRightBtnCaption}</Button> : null}
                </div>
                {subtitle1 ? <h5 style={{fontWeight:400,fontSize:"20px"}}>{subtitle1}</h5> : null}
                {subtitle2 ? <h6 style={{fontWeight:400,fontSize:"18px"}}>{subtitle2}</h6> : null}
                {updated ? <h6 style={{fontWeight:100,fontSize:"18px"}}>Updated on <i>{updated}</i></h6> : null}
                {imageUrl ? <img src={imageUrl} style={{
                    width:"100%",
                    height:"250px",
                    objectFit:"cover",
                    borderRadius:"10px",
                    marginBottom:"10px"
                }} alt="grid-img"/> : null}
                {
                    desc ? (
                        <div style={{
                            fontWeight:100,
                            marginBottom:"10px",
                            fontSize:"18px"
                        }} className="gridbox-desc">
                            <hr></hr>
                            {desc}
                        </div>
                    ) : null
                }
                {/* {techStack ? <hr></hr> : null} */}
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
                        })
                        : null
                    }
                </div>
                {bottomLeftBtn ? <div>
                    <hr></hr>
                    <Button
                href={bottomLeftBtnLink}
                className="d-flex align-items-center"
                style={{height:"fit-content", width:"fit-content",fontSize:"24px",fontWeight:600}}
                variant="light">
                    {bottomLeftBtnIconUrl ? <img style={{width:"25px",marginRight:"7px"}} src={bottomLeftBtnIconUrl} alt={bottomLeftBtnCaption}/> : null}
                    {bottomLeftBtnCaption}
                    </Button>
                </div> : null}
            </Container>
        )
    }
}