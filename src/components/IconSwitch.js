import React from "react";

export default class IconSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {value,imgLeftUrl,imgRightUrl,width} = this.props;
        return (
            <div 
            onClick={this.props.onClick}
            style={{
                width:`${width*5}px`,
                height:`${width*2}px`,
            }} className="d-flex">
                <div style={{
                    width:"50%",
                    border:"2px solid white",
                    borderRadius: "20px 0px 0px 20px",
                    background: `rgba(255,255,255,${value===0 ? 1 : 0})`,
                }} className="switch-left d-flex align-items-center justify-content-center">
                    <img 
                    style={{
                        width:`${width}px`,
                        filter:value===0 ? "none" : "invert()",
                        userSelect:"none"
                    }}
                    src={imgLeftUrl} alt="switch-img-left"/>
                </div>
                <div style={{
                    width:"50%",
                    border:"2px solid white",
                    borderRadius:"0px 20px 20px 0px",
                    background: `rgba(255,255,255,${value})`,
                }} className="switch-right d-flex align-items-center justify-content-center">
                    <img 
                    style={{
                        width:`${width}px`,
                        filter:value===0 ? "invert()" : "none",
                        userSelect:"none"
                    }}
                    src={imgRightUrl} alt="switch-img-right"/>
                </div>
            </div>
        )
    }
}