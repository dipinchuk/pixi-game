import*as PIXI from"pixi.js";import*as shapes from"./shapes";class Game{constructor(){this.canvasWidth=/Mobi/.test(navigator.userAgent)?300:700,this.canvasHeight=400,this.app=new PIXI.Application({width:this.canvasWidth,height:this.canvasHeight,backgroundColor:16777215}),this.canvasContainer=document.getElementById("canva"),this.canvasContainer.appendChild(this.app.view),this.canvas=new PIXI.Graphics,this.app.stage.addChild(this.canvas),this.shapes=[],this.timer=0,this.timeInterval=3e3,this.shapeCreationInterval=null,this.gravity=1,this.totalCount=0,this.createdCountPerTimeInterval=1,this.visibleShapesCount=0,this.shapeTypes=["triangle","rectangle","pentagon","hexagon","circle","ellipse","star"],this.grayColors=[8421504,11119017,12632256,13882323,14474460],this.allShapesCheckbox=document.getElementById("include-all-shapes"),this.shapeCheckboxes=document.querySelectorAll('input[type="checkbox"][id^="include-shape"]'),this.allColorCheckbox=document.getElementById("include-all-colors"),this.colorCheckboxes=document.querySelectorAll('input[type="checkbox"][id^="include-color"]'),this.startShapeCreation(),this.initEventListeners(),this.checkSelectAllShapes(),this.checkSelectAllColors(),this.createRandomShape(),setInterval((()=>this.updateTimer()),1e3),this.app.ticker.add((e=>{this.updateShapes(e)}))}randomInRange(e,t){return Math.random()*(t-e)+e}getRandomGrayColor(){const e=this.grayColors.filter((e=>document.getElementById(`include-color-${e}`).checked)).map((e=>e));if(0!==e.length)return e[Math.floor(Math.random()*e.length)];alert("Please select at least one color to include.")}createRandomShapeInstance(e,t,a,s,i){switch(e){case"triangle":return new shapes.triangle(t,a,s,i);case"rectangle":return new shapes.rectangle(t,a,s,i);case"pentagon":return new shapes.pentagon(t,a,s,i);case"hexagon":return new shapes.hexagon(t,a,s,i);case"circle":return new shapes.circle(t,a,s,i);case"ellipse":return new shapes.ellipse(t,a,s,i);case"star":return new shapes.star(t,a,s,i)}}createRandomShape(e,t){const a=this.shapeTypes.filter((e=>document.getElementById(`include-shape-${e}`).checked)).map((e=>e));if(0===a.length)return void alert("Please select at least one shape to include.");const s=a[Math.floor(Math.random()*a.length)],i=this.getRandomGrayColor(),h=e||this.randomInRange(0,this.app.view.width-50),l=t||-50,n=this.createRandomShapeInstance(s,i,0,h,l);n.graphics.on("pointerdown",(e=>{this.app.stage.removeChild(n.graphics),this.shapes=this.shapes.filter((e=>e!==n))})),this.app.stage.addChild(n.graphics),this.shapes.push(n),this.updateVisibleShapesCount(),document.getElementById("shape-count").textContent="Shapes: "+ ++this.totalCount}updateTimer(){this.timer>=this.timeInterval/1e3?this.timer=1:this.timer++,document.getElementById("timer").textContent=`Time: ${this.timer} s`}startShapeCreation(){clearInterval(this.shapeCreationInterval),this.timer=0,this.updateTimer(),this.shapeCreationInterval=setInterval((()=>this.createMultipleShapes()),this.timeInterval)}createMultipleShapes(){for(let e=0;e<this.createdCountPerTimeInterval;e++)this.createRandomShape()}updateVisibleShapesCount(){this.visibleShapesCount=this.countVisibleShapes(),document.getElementById("visible-shapes-count").textContent=`Visible shapes: ${this.visibleShapesCount}`}countVisibleShapes(){let e=0;for(const t of this.shapes)t.isVisible(this.app.view.height)&&e++;return e}updateShapes(e){for(const t of this.shapes)t.move(e,this.gravity);this.updateVisibleShapesCount(),this.updateTotalArea()}updateTotalArea(){let e=0;for(const t of this.shapes)t.isVisible(this.app.view.height)&&(e+=t.calculateArea(t.type));document.getElementById("total-area").textContent=`Total Area: ${e.toFixed(0)} px²`}initEventListeners(){document.getElementById("decrease-gravity").disabled=!0,document.getElementById("decrease-shapes").disabled=!0,this.app.renderer.view.addEventListener("mousedown",(e=>this.handleCanvasClick(e))),document.getElementById("increase-gravity").addEventListener("click",(()=>this.increaseGravity())),document.getElementById("decrease-gravity").addEventListener("click",(()=>this.decreaseGravity())),document.getElementById("increase-interval").addEventListener("click",(()=>this.increaseInterval())),document.getElementById("decrease-interval").addEventListener("click",(()=>this.decreaseInterval())),document.getElementById("increase-shapes").addEventListener("click",(()=>this.increaseShapes())),document.getElementById("decrease-shapes").addEventListener("click",(()=>this.decreaseShapes())),document.getElementById("shapes-value").addEventListener("input",(e=>this.handleShapesInput(e))),document.getElementById("interval-value").addEventListener("input",(e=>this.handleIntervalInput(e))),document.getElementById("gravity-value").addEventListener("input",(e=>this.handleGravityInput(e))),this.allShapesCheckbox.addEventListener("change",(()=>this.handleAllShapesChange()));for(const e of this.shapeCheckboxes)e.addEventListener("change",(()=>this.handleShapeChange(e)));this.allColorCheckbox.addEventListener("change",(()=>this.handleAllColorsChange(this.allColorCheckbox)));for(const e of this.colorCheckboxes)e.addEventListener("change",(()=>this.handleColorChange(e)));this.startShapeCreation()}handleCanvasClick(e){const t=e.clientX-this.app.renderer.view.getBoundingClientRect().left,a=e.clientY-this.app.renderer.view.getBoundingClientRect().top;let s=null;for(const e of this.shapes)e.graphics.containsPoint(new PIXI.Point(t,a))&&(!s||this.app.stage.getChildIndex(e.graphics)>this.app.stage.getChildIndex(s.graphics))&&(s=e);s?(this.app.stage.removeChild(s.graphics),this.shapes=this.shapes.filter((e=>e!==s))):this.createRandomShape(t,a),this.updateVisibleShapesCount(),this.updateTotalArea()}updateIntervalDisplay(){document.getElementById("interval-value").value=this.timeInterval}updateGravityDisplay(){document.getElementById("gravity-value").value=this.gravity}updateCountPerTimeIntervalDisplay(){document.getElementById("shapes-value").value=this.createdCountPerTimeInterval}increaseInterval(){this.timeInterval+=1e3,this.updateIntervalDisplay(),document.getElementById("decrease-interval").disabled=!1,clearInterval(this.shapeCreationInterval),this.startShapeCreation(),this.updateTimer()}decreaseInterval(){this.timeInterval>2e3?this.timeInterval-=1e3:(this.timeInterval=1e3,document.getElementById("decrease-interval").disabled=!0),this.updateIntervalDisplay(),clearInterval(this.shapeCreationInterval),this.startShapeCreation(),this.updateTimer()}increaseShapes(){this.createdCountPerTimeInterval+=1,this.updateCountPerTimeIntervalDisplay(),document.getElementById("decrease-shapes").disabled=!1}decreaseShapes(){this.createdCountPerTimeInterval>2?this.createdCountPerTimeInterval-=1:(this.createdCountPerTimeInterval=1,document.getElementById("decrease-shapes").disabled=!0),this.updateCountPerTimeIntervalDisplay()}increaseGravity(){this.gravity+=1,this.updateGravityDisplay(),document.getElementById("decrease-gravity").disabled=!1}decreaseGravity(){this.gravity>2?this.gravity-=1:(this.gravity=1,document.getElementById("decrease-gravity").disabled=!0),this.updateGravityDisplay()}handleShapesInput(e){const t=parseInt(e.target.value);isNaN(t)||t<=1?(this.createdCountPerTimeInterval=1,document.getElementById("decrease-shapes").disabled=!0):(this.createdCountPerTimeInterval=t,document.getElementById("decrease-shapes").disabled=!1),this.updateCountPerTimeIntervalDisplay()}handleIntervalInput(e){const t=parseInt(e.target.value);!isNaN(t)&&t>=1e3?t<=1e3?(this.timeInterval=1e3,document.getElementById("decrease-interval").disabled=!0):(this.timeInterval=t,document.getElementById("decrease-interval").disabled=!1):(this.timeInterval=1e3,document.getElementById("decrease-interval").disabled=!0),this.updateIntervalDisplay(),clearInterval(this.shapeCreationInterval),this.startShapeCreation(),this.updateTimer()}handleGravityInput(e){const t=parseFloat(e.target.value);isNaN(t)||t<=1?(this.gravity=1,document.getElementById("decrease-gravity").disabled=!0):(this.gravity=t,document.getElementById("decrease-gravity").disabled=!1),this.updateGravityDisplay()}handleAllShapesChange(){for(const e of this.shapeCheckboxes)e.checked=this.allShapesCheckbox.checked;this.checkSelectAllShapes()}handleShapeChange(e){if(this.checkSelectAllShapes(),e.checked){const e=Array.from(this.shapeCheckboxes).filter((e=>!e.checked));0===e.length?this.allShapesCheckbox.disabled=!0:this.allShapesCheckbox.disabled=!1}else this.allShapesCheckbox.checked=!1}checkSelectAllShapes(){const e=Array.from(this.shapeCheckboxes).filter((e=>e.checked)),t=e.length===this.shapeCheckboxes.length;this.allShapesCheckbox.disabled=t;for(const e of this.shapeCheckboxes)e!==this.allShapesCheckbox&&(e.disabled=!1);if(e.length<=1){for(const t of e)t.checked=!1;if(1===e.length){const t=e[0];t.checked=!0,t.disabled=!0}}const a=Array.from(this.shapeCheckboxes).filter((e=>!e.checked));1===a.length?(this.allShapesCheckbox.checked=!1,this.allShapesCheckbox.disabled=!1):0===a.length?(this.allShapesCheckbox.checked=!0,this.allShapesCheckbox.disabled=!0):this.allShapesCheckbox.disabled=!1}handleAllColorsChange(){for(const e of this.colorCheckboxes)e.checked=this.allColorCheckbox.checked;this.checkSelectAllColors()}handleColorChange(e){this.checkSelectAllColors(),e.checked?0===Array.from(e).filter((e=>!e.checked)).length?this.allColorCheckbox.disabled=!0:this.allColorCheckbox.disabled=!1:this.allColorCheckbox.checked=!1}checkSelectAllColors(){const e=Array.from(this.colorCheckboxes).filter((e=>e.checked)),t=e.length===this.colorCheckboxes.length;this.allColorCheckbox.disabled=t;for(const e of this.colorCheckboxes)e!==this.allColorCheckbox&&(e.disabled=!1);if(e.length<=1){for(const t of e)t.checked=!1;if(1===e.length){const t=e[0];t.checked=!0,t.disabled=!0}}const a=Array.from(this.colorCheckboxes).filter((e=>!e.checked));1===a.length?(this.allColorCheckbox.checked=!1,this.allColorCheckbox.disabled=!1):0===a.length?(this.allColorCheckbox.checked=!0,this.allColorCheckbox.disabled=!0):this.allColorCheckbox.disabled=!1}}const game=new Game;