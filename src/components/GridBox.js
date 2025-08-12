import React from "react"
import { Container } from "react-bootstrap";
import Tag from "./Tag";

export default class GridBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {title, subtitle1, subtitle2, desc, imageUrl, techStack, colWidth} = this.props;
        return (
            <Container
            style={{
                borderRadius:"30px",
                border:"1px solid white",
                padding:"10px",
            }}
            className={`gridbox col-md-${colWidth} col-12`}>
                {imageUrl ? <img src={imageUrl} alt="grid-img"/> : <></>}
                {title ? <h2>{title}</h2> : <></>}
                {subtitle1 ? <h4>{subtitle1}</h4> : <></>}
                {subtitle2 ? <h5>{subtitle2}</h5> : <></>}
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