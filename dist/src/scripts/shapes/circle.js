import Shape from"./shape.js";export default class Circle extends Shape{constructor(r,s,t,a){super("circle",r,s,t,a),this.graphics.drawCircle(0,0,25),this.graphics.endFill(),this.graphics.x=this.x,this.graphics.y=this.y}calculateArea(){return Math.PI*Math.pow(25,2)}}