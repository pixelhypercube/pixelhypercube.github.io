function Ball(x,y,vx,vy,r,color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.color = color;

    this.show = () => {
        push();
        noStroke();
        ellipseMode(CENTER);
        fill(this.color);
        circle(this.x,this.y,this.r);
        pop();
    }
    this.update = () => {
        this.x+=this.vx;
        this.y+=this.vy;
        this.vx/=1.01;
        this.vy/=1.01;
        if (this.x<0) {
            this.x = 0;
            this.vx = -this.vx;
        } else if (this.x>width) {
            this.x = width;
            this.vx = -this.vx;
        } else if (this.y<0) {
            this.y = 0;
            this.vy = -this.vy;
        } else if (this.y>height) {
            this.y = height;
            this.vy = -this.vy;
        }
    }
    this.repel = (x,y) => {
        var d = dist(x,y,this.x,this.y);
        this.vx -= (d**-1)*cos(atan2(y-this.y,x-this.x));
        this.vy -= (d**-1)*sin(atan2(y-this.y,x-this.x));
    }
    this.attract = (x,y) => {
        var d = dist(x,y,this.x,this.y);
        this.vx += (d*0.0001)*cos(atan2(y-this.y,x-this.x));
        this.vy += (d*0.0001)*sin(atan2(y-this.y,x-this.x));
    }
    this.swoosh = (x,y,vx,vy) => {
        var d = dist(x,y,this.x,this.y);
        if (d<this.r) {
            this.vx = vx;
            this.vy = vy;
        }
        // console.log(this.vx);
    }
    this.intersect = (other) => {
        var d = dist(this.x,this.y,other.x,other.y);
        if (d<this.r) {
            return true;
        } else {
            return false;
        }
    }
    this.collide = (other) => {
        var d = dist(this.x,this.y,other.x,other.y);
        var minDist = this.r/2 + other.r/2;
        if (d<minDist) {
            let angle = atan2(this.y-other.y,this.x-other.x);
            this.vx += cos(angle)*0.1;
            this.vy += sin(angle)*0.1;
            other.vx -= cos(angle)*0.1;
            other.vy -= sin(angle)*0.1;
        }
    }
}