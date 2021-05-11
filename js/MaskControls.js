import{EventDispatcher as t,Clock as e,Vector2 as o}from"https://unpkg.com/three@0.110.0/build/three.module.js";export default class i{constructor(t,i,s){this.camera=t,this.canvas=i,this.object=s,this.clock=new e,this.mouseStarted=!1,i.addEventListener("mousedown",()=>this.mouseStarted=!0),i.addEventListener("mouseup",this.onMouseLeave.bind(this)),i.addEventListener("mouseleave",this.onMouseLeave.bind(this)),i.addEventListener("mousemove",this.onMouseMove.bind(this)),this.touch=null,this.lastVector=new o,this.newVector=new o,this.deltaVector=new o,i.addEventListener("touchstart",t=>{this.touch||(this.touch=t.touches.item(0),this.lastVector.set(this.touch.pageX,this.touch.pageY))}),i.addEventListener("touchmove",this.onTouchMove.bind(this)),i.addEventListener("touchend",this.onTouchLeave.bind(this)),i.addEventListener("touchcancel",this.onTouchLeave.bind(this))}onMouseMove(t){if(!this.mouseStarted)return;t.preventDefault();const e=2*Math.PI*t.movementX/this.canvas.width,o=this.object.rotation.x,i=this.object.rotation.z;this.object.rotation.x+=2*Math.PI*t.movementY/this.canvas.height,o>=-1&&o<=2&&i>=-1&&i<=2?this.object.rotation.y+=e:this.object.rotation.y-=e,this.dispatchEvent({type:"move"})}onMouseLeave(){this.mouseStarted=!1,this.clock.getDelta(),requestAnimationFrame(this.updateRotation.bind(this))}onTouchMove(t){t.preventDefault();for(const e of t.changedTouches){if(e.identifier!==this.touch.identifier)continue;this.newVector.set(e.pageX,e.pageY),this.deltaVector.subVectors(this.newVector,this.lastVector);const t=2*Math.PI*this.deltaVector.x/this.canvas.width,o=this.object.rotation.x,i=this.object.rotation.z;o>=-1&&o<=2&&i>=-1&&i<=2?this.object.rotation.y+=t:this.object.rotation.y-=t,this.object.rotation.x+=2*Math.PI*this.deltaVector.y/this.canvas.width,this.lastVector.copy(this.newVector);break}this.dispatchEvent({type:"move"})}onTouchLeave(t){let e=!1;for(const o of t.touches)o.identifier===this.touch.identifier&&(e=!0);if(e||(this.touch=null),t.touches.length>0)return this.touch=t.touches.item(0),void this.lastVector.set(this.touch.pageX,this.touch.pageY);this.clock.getDelta(),requestAnimationFrame(this.updateRotation.bind(this))}updateRotation(){if(this.mouseStarted||this.touch)return;const t=this.object.quaternion.clone();t.x=0,t.z=0,this.object.quaternion.slerp(t,2*this.clock.getDelta()),this.object.quaternion.x<=.001&&this.object.quaternion.z<=.001&&this.object.quaternion.x>=-.001&&this.object.quaternion.z>=-.001||(requestAnimationFrame(this.updateRotation.bind(this)),this.dispatchEvent({type:"move"}))}}Object.assign(i.prototype,t.prototype);
