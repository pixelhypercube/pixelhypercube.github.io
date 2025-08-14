import React from "react";
import tagsObj from "../data/tags";
const {tags} = tagsObj;

export default class SkillBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {skill} = this.props;
        return (
            <div style={{
                background:"white",
                borderRadius:"10px",
                width:"fit-content",
                color:"black",
                padding:"6px",
                margin:"10px",
            }} className="d-flex justify-content-center align-items-center">
                <img style={{
                    height:"20px",
                    margin:"5px",
                    filter:"brightness(0)"
                }} src={tags[skill]["icon_path"]} alt={skill}/>
                <h5 style={{
                    marginBottom:"0",
                    marginRight:"2px",
                    fontSize:"20px"
                }}>{skill}</h5>
            </div>
        )
    }
}