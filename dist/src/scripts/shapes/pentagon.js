import Shape from"./shape.js";export default class Pentagon extends Shape{constructor(t,a,s,h){super("pentagon",t,a,s,h),this.graphics.drawPolygon([25,0,0,20,10,50,40,50,50,20]),this.graphics.endFill(),this.graphics.x=this.x,this.graphics.y=this.y}calculateArea(){return 12500/(4*Math.tan(Math.PI/5))}}