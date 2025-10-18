import React from "react";
import tagsObj from "../data/tags";
const {tags} = tagsObj;

export default class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {tag} = this.props;
        return tags[tag] ? (
            <div className="d-flex"
            style={{
                margin:"5px",
                color:"black",
                borderRadius:"10px",
                justifyContent:"center",
                alignItems:"center",
                background:"white",
                paddingRight:"6px",
            }}>
                <img alt={tag} style={{
                    width:"20px",
                    margin:"7px",
                    filter:"brightness(0)"
                }} src={tags[tag]["icon_path"]} />
                <span style={{margin:"0",fontWeight:500,fontSize:"18px"}}>{tag}</span>
            </div>
        ) : null
    }
}