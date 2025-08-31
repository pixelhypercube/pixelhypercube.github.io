import React from "react";

export default class HoverDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {name,dialogWidth,visible} = this.props;
        return (
            <div style={{
                position:"absolute",
                left:`${-dialogWidth/8}px`,
                top:40,
                padding:"3px",
                borderRadius:"5px",
                width:`${dialogWidth}px`,
                background:"rgb(30, 28, 27)",
                border:"2px solid white",
                textAlign:"center",
                boxShadow:"4px 4px 20px rgba(0,0,0,0.5)",
                animationDuration:"1s",
                display:visible ? "block" : "none",
                pointerEvents:"none",
                zIndex:5,
            }}>
                <p style={{
                    fontSize:"16px",
                    lineHeight:"1",
                    margin:0
                }}>{name}</p>
            </div>
        )
    }
}