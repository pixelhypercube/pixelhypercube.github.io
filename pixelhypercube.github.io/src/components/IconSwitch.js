import React from "react";
import HoverDialog from "./HoverDialog";

export default class IconSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHoveringGridView:false,
            isHoveringListView:false,
        };
    }

    render() {
        let {value,imgLeftUrl,imgRightUrl,width} = this.props;
        let {isHoveringGridView,isHoveringListView} = this.state;
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
                    position:"relative",
                }} 
                onMouseEnter={()=>this.setState({isHoveringGridView:true})} 
                onMouseLeave={()=>this.setState({isHoveringGridView:false})}
                className="switch-left d-flex align-items-center justify-content-center">
                    <img 
                    style={{
                        width:`${width}px`,
                        filter:value===0 ? "none" : "invert()",
                        userSelect:"none"
                    }}
                    src={imgLeftUrl} alt="switch-img-left"/>
                    <HoverDialog
                        visible={isHoveringGridView}
                        dialogWidth={50}
                        name={"Grid View"}
                    />
                </div>
                <div style={{
                    width:"50%",
                    border:"2px solid white",
                    borderRadius:"0px 20px 20px 0px",
                    background: `rgba(255,255,255,${value})`,
                    position:"relative",
                }}
                onMouseEnter={()=>this.setState({isHoveringListView:true})} 
                onMouseLeave={()=>this.setState({isHoveringListView:false})}
                className="switch-right d-flex align-items-center justify-content-center">
                    <img 
                    style={{
                        width:`${width}px`,
                        filter:value===0 ? "invert()" : "none",
                        userSelect:"none"
                    }}
                    src={imgRightUrl} alt="switch-img-right"/>
                    <HoverDialog
                        visible={isHoveringListView}
                        dialogWidth={50}
                        name={"List View"}
                    />
                </div>
            </div>
        )
    }
}