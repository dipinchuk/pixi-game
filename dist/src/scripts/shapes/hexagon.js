import Shape from"./shape.js";export default class Hexagon extends Shape{constructor(s,a,t,h){super("hexagon",s,a,t,h),this.graphics.drawPolygon([25,0,5,15,5,35,25,50,45,35,45,15]),this.graphics.endFill(),this.graphics.x=this.x,this.graphics.y=this.y}calculateArea(){return 3*Math.sqrt(3)*50*50/2}}