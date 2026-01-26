import React from "react";

export default class OverlayCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridWidth:3,
            gridHeight:3,
            width:window.innerWidth,
            height:window.innerHeight,
            grid:null,

            // from parent
            // mouseIsDown:false,
            // mouseX: 0,
            // mouseY: 0,
        };

        this.canvasRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mouseIsDown !== this.props.mouseIsDown) {
            if (this.props.mouseIsDown) {
                const {mouseX, mouseY} = this.props;
                const {gridWidth,gridHeight} = this.state;
                this.flood(Math.ceil(mouseX/gridWidth),Math.ceil(mouseY/gridHeight));
                this.lifeUpdateLoop();
            }
        }
    }

    componentDidMount() {
        const {gridWidth,gridHeight,width,height} = this.state;
        this.setState({grid:
            Array.from({length:Math.ceil(height/gridHeight)},()=>new Array(Math.ceil(width/gridWidth)).fill(0))
        },()=>{
            this.drawCanvas();
            this.lifeUpdateLoop();
        });

        // window resize
        window.addEventListener("resize",()=>{
            this.setState({
                width:window.innerWidth,
                height:window.innerHeight,
            },()=>{
                this.setState({grid:
                    Array.from({length:Math.ceil(height/gridHeight)},()=>new Array(Math.ceil(width/gridWidth)).fill(0))
                },()=>{
                    this.drawCanvas();
                    this.lifeUpdateLoop();
                });
            });
        });
    }

    // canvas methods

    drawCanvas() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const {gridWidth,gridHeight} = this.state;
        const {width,height} = this.state;

        let {grid} = this.state;
        let n = grid.length, m = grid[0].length;

        ctx.clearRect(0,0,width,height);

        for (let i = 0;i<n;i++) {
            for (let j = 0;j<m;j++) {
                const life = grid[i][j];
                if (life>0) {
                    ctx.fillStyle = `rgba(255,255,255,${life*0.01})`;
                    ctx.fillRect(j*gridWidth,i*gridHeight,gridWidth,gridHeight);
                    // ctx.fillRect(j*gridWidth+1,i*gridHeight+1,gridWidth-1,gridHeight-1);
                } 
            }
        }
    }

    flood(posX,posY,traversedTimes=0,delay=5) {
        if (this.canvasRef?.current) {
            let {grid} = this.state;
            const n = grid?.length, m = grid?.[0]?.length;
            
            // guard ting
            if (!grid || n===0 || m===0 || posX<0 || posY<0 || posX>=m || posY>=n) return;
            
            if (traversedTimes<Math.floor(Math.random()*8+1)) {
                grid[posY][posX] = 100;
                this.drawCanvas();
            }
            else return;

            const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
            
            const processNext = (i) =>{
                if (i>=dirs.length) return;

                const [dx,dy] = dirs[i];
                const ny = posY+dy, nx = posX+dx;

                if (ny>=0 && ny<=n-1 && nx>=0 && nx<=m-1 && grid[ny][nx]===0) {
                    setTimeout(()=>{
                        this.flood(nx,ny,traversedTimes+1,delay);
                        processNext(i+1);
                    },delay);
                } else processNext(i+1);
            }
            processNext(0);
        }
    }

    // helper function to decrease life

    lifeUpdateLoop(delay=2) {
        if (this.lifeUpdateInterval) clearInterval(this.lifeUpdateInterval);
        this.lifeUpdateInterval = setInterval(()=>{
            let {grid} = this.state;
            let n = grid.length, m = grid[0].length;
            let newGrid = grid.map(row=>row.slice());
            let canStop = true;

            for (let i = 0;i<n;i++) {
                for (let j = 0;j<m;j++) {
                    if (newGrid[i][j]>0) {
                        newGrid[i][j] = Math.max(newGrid[i][j]-5,0);
                        canStop = false;
                    }
                }
            }

            this.setState({grid:newGrid},()=>this.drawCanvas());

            if (canStop && this.lifeUpdateInterval) {
                clearInterval(this.lifeUpdateInterval);
                this.lifeUpdateInterval = null;  
            } 
        },delay);
    }

    componentWillUnmount() {
        clearInterval(this.lifeUpdateInterval);
    }


    render() {
        let {width,height} = this.state;
        return (
            <canvas 
            width={width}
            height={height}
            style={{
                opacity:"0.5",
                zIndex:100,
                left:0,
                top:0,
                position:"fixed",
                pointerEvents:"none"
            }}
            ref={this.canvasRef}></canvas>
        )
    }
}