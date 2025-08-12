import React from "react"
import { Container } from "react-bootstrap";
import Tag from "./Tag";

export default class GridBox extends React.Component {
    constructor(props) {
        super(props);
        const {colWidthL} = this.props;
        this.state = {
            flex:`0 0 calc(${100 / (12 / colWidthL)}% - 10%)`,
            maxWidth:`calc(${100 / (12 / colWidthL)}% - 10%)`,
        };
    }

    componentDidMount() {
        const {colWidthL, colWidthS} = this.props;
        window.addEventListener("resize",()=>{
            if (window.innerWidth<768) {
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
        });
    }
    
    render() {
        const {title, subtitle1, subtitle2, desc, imageUrl, techStack, colWidthL, colWidthS} = this.props;
        let {flex,maxWidth} = this.state;
        return (
            <Container
            style={{
                borderRadius:"30px",
                border:"2px solid white",
                padding:"20px",
                flex,
                maxWidth,
                margin:"30px"
            }}
            ref={this.divRef}
            className={`gridbox col-md-${colWidthL} col-${colWidthS}`}>
                {imageUrl ? <img src={imageUrl} style={{
                    width:"100%",
                    borderRadius:"10px",
                    marginBottom:"10px"
                }} alt="grid-img"/> : <></>}
                {title ? <h3>{title}</h3> : <></>}
                {subtitle1 ? <h5 style={{fontWeight:400}}>{subtitle1}</h5> : <></>}
                {subtitle2 ? <h6 style={{fontWeight:400}}>{subtitle2}</h6> : <></>}
                {
                    desc ? (
                        <div className="gridbox-desc">
                            <hr></hr>
                            <p>{desc}</p>
                        </div>
                    ) : <></>
                }
                <div className="gridbox-techstack d-flex flex-wrap">
                    {
                        techStack 
                        ? 
                        techStack.map((tag,index) => {
                            return (
                                <Tag 
                                color={"white"}
                                tag={tag}
                                key={index}
                                />
                            )
                        })
                        : <></>
                    }
                </div>
            </Container>
        )
    }
}