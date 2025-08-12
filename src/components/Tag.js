import React from "react";
import tags from "../data/tags";

export default class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {tag, color} = this.props;
        return tags[tag] ? (
            <div className="d-flex"
            style={{
                border:`1px solid ${color}`,
                marginRight:"5px",
                color,
                borderRadius:"10px",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <img alt={tag} style={{width:"15px",margin:"0px 5px 0px 5px"}} src={tags[tag]["icon_path"]} />
                <span style={{margin:"0px 5px 0px 5px"}}>{tag}</span>
            </div>
        ) : <></>
    }
}