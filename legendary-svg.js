function LegendarySvg(){
    this.svg;
	this.node;
}

LegendarySvg.prototype.init = function (svgId) {
	this.svg = document.getElementById(svgId);	
	this.setWidth("100%");
	this.setHeight("100%");
}

LegendarySvg.prototype.setHeight = function(height) {
	this.svg.setAttribute("height",height);
}

LegendarySvg.prototype.setViewBox = function(viewBox) {
	this.svg.setAttribute("viewBox",viewBox);
}

LegendarySvg.prototype.setWidth = function(width) {
	this.svg.setAttribute("width",width);
}

LegendarySvg.prototype.getHeight = function(){
	return parseInt(this.svg.getAttribute("height"));
}

LegendarySvg.prototype.getWidth = function(){
	return parseInt(this.svg.getAttribute("width"));
}

LegendarySvg.prototype.createNode = function(node){	
	this.node = document.createElementNS("http://www.w3.org/2000/svg", node);
	return this.node;
}

LegendarySvg.prototype.getNode = function(){	
		return this.node;	
}

LegendarySvg.prototype.setStrokeWidth = function (strokeWidth){
	 this.node.setAttribute("stroke-width",strokeWidth);
}

LegendarySvg.prototype.getStrokeWidth = function (){
	//return this.node.getAttributes();
}


LegendarySvg.prototype.setStrokeColor = function (strokeColor){
	this.node.setAttribute("stroke",strokeColor);
}

LegendarySvg.prototype.setFillColor = function (fillColor){
	this.node.setAttribute("fill",fillColor);
}

LegendarySvg.prototype.render = function (){
	this.svg.appendChild(this.node);
}
LegendarySvg.prototype.set = function (property,value){
	this.node.setAttribute(property,value);
}

//draws a line
LegendarySvg.prototype.drawLine = function (x1, y1, x2, y2, thick, color) {
	var line = this.createNode('line');	
	this.set("x1",x1);	
	this.set("y1",y1);	
	this.set("x2",x2);		
	this.set("y2",y2);	
	this.setStrokeWidth(thick);
	this.setStrokeColor(color);
	this.render();
}

LegendarySvg.prototype.drawLineSlope = function (x1, y1, slope, thick, color) {
	var line = this.createNode('line');	
	this.set("x1",x1);	
	this.set("y1",y1);	
	this.set("x2",x2);		
	this.set("y2",y2);	
	this.setStrokeWidth(thick);
	this.setStrokeColor(color);
	this.render();
}

//draws a rectangle
LegendarySvg.prototype.drawRectangle = function (x, y, rx, ry, width, height, thick, strokeColor, fillColor) {	
	var rect = this.createNode('rect');	
	this.set("x",x);	
	this.set("y",y);
	this.set("rx",rx);	
	this.set("ry",ry);	
	this.set("width",width);	
	this.set("height",width);	
	this.setStrokeWidth(thick);
	this.setStrokeColor(strokeColor);
	this.setFillColor(fillColor);
	this.render();
}


LegendarySvg.prototype.drawCircle = function (h, k, r, thick, strokeColor, fillColor) {
	var circle = this.createNode('circle');	
	this.set("cx",h);	
	this.set("cy",k);
	this.set("r",r);			
	this.setStrokeWidth(thick);
	this.setStrokeColor(strokeColor);
	this.setFillColor(fillColor);
	this.render();
}

LegendarySvg.prototype.drawTrianlge = function (x1,y1,x2,y2,x3,y3,thick,strokeColor,fillColor){
	var path = this.createNode("path");
	var d = [
	"M", x1, y1, 
	"C", x2, y2, x3, y3,x3+100,y3+100
	].join(" ");
	this.set("d",d);
	this.setStrokeWidth(thick);
	this.setStrokeColor(strokeColor);
	this.setFillColor(fillColor);
	this.render();
}

LegendarySvg.prototype.sineCurve = function (x1,y1,x2,y2){
	var path = this.createNode("path");
	var d = "";
}



LegendarySvg.prototype.drawText = function (textContent,x,y,fontSize,color,fill,position){
	var text = this.createNode("text");
	this.set("x",x);
	this.set("y",y);
	if(position == null){
		this.set("text-anchor","middle");
	} else {
		this.set("text-anchor",position);
	}
	this.setStrokeColor(color);
	this.setFillColor(fill);
	this.set("font-size",fontSize);
	this.render();
	var textNode = document.createTextNode(textContent);
	this.node.appendChild(textNode);

}

LegendarySvg.prototype.setAnimation = function (attributeName,from,to,start,duration){
	var animateNode = this.createNode("animate");
	this.set("attributeName",attributeName);
	this.set("from",from);
	this.set("to",to);
	this.set("begin",start);
	this.set("dur",duration);
	this.set("fill","freeze");
	return animateNode;
//from="120" to="40" begin="0s" dur="1s" fill="freeze"	

}

LegendarySvg.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
				var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
				return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
				};
}

LegendarySvg.prototype.makePath = function(x, y, radius, startAngle,endAngle){
				var start = this.polarToCartesian(x, y, radius, endAngle);
				var end = this.polarToCartesian(x, y, radius, startAngle);								
				var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";				
				var sweepFlag =0;
				var xAxisRotation = 0;
				var d = [
				"M", start.x, start.y, 
				"A", radius, radius, xAxisRotation, largeArcFlag, sweepFlag, end.x, end.y
				].join(" ");
				//this.set("d",d);
				return d;
				//var animation = this.setAnimation("d",d,d,'0s','3s');
				//this.node.appendChild(animation);	
}

LegendarySvg.prototype.drawArc = function(x, y, radius, startAngle,endAngle,thickness,color) {
				var arc = this.createNode("path");
				//x=parseInt(x);
				//y=parseInt(y);
				var start = this.polarToCartesian(x, y, radius, endAngle);
				var end = this.polarToCartesian(x, y, radius, startAngle);								
				var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";				
				var sweepFlag =0;
				var xAxisRotation = 0;
				var d = [
				"M", start.x, start.y, 
				"A", radius, radius, xAxisRotation, largeArcFlag, sweepFlag, end.x, end.y
				].join(" ");	
				
				this.set("d",d);
				this.setStrokeWidth(thickness);
				this.setStrokeColor(color);
				this.setFillColor("none");	
				this.render();
					
												
			}	

LegendarySvg.prototype.roundedProgress = function (Settings) {
	this.setViewBox("0 0 100 100");	
	this.svg.setAttribute("preserveAspectRatio","xMidYMid meet");
	//center the circle
	if(!Settings.x || !Settings.y) {
		Settings.x= this.getWidth()/2;
		Settings.y= this.getHeight()/2;		
	}
	
    //start angle for progress. This is at 135 deg
    var startAngle = -(Settings.totalArcAngle) / 2;
    
	//total length to be completed
	this.drawCircle(Settings.x,Settings.y,Settings.radius+Settings.thickness/2,0,"#999","#555");

    var oneUnit = Settings.totalArcAngle / (Settings.label.endValue - Settings.label.startValue);
 
    //finally tracing the completed arc	
    for (i = 0; i < Settings.ranges.length; i++) {
        currentRange = Settings.ranges[i];
        rangeStartAngle = startAngle + currentRange.startValue * oneUnit;
        rangeEndAngle = startAngle + currentRange.endValue * oneUnit;
		this.drawArc(Settings.x, Settings.y, Settings.radius,rangeStartAngle, rangeEndAngle, Settings.thickness, currentRange.color);
		
	   //console.log(arc);
	   //this.setAnimation("r",Settings.radius,Settings.radius+50,'0s','3s');
    }
	
    //inner circle
	if(Settings.innerCircle.radius) {
		innerCircleRadius = Settings.innerCircle.radius;
	} else {
		innerCircleRadius = Settings.radius-Settings.thickness/2;
	}
	
	//inner filled circle for text
    this.drawCircle(Settings.x, Settings.y,innerCircleRadius, Settings.innerCircle.lineWidth, Settings.innerCircle.strokeColor, Settings.innerCircle.fillColor);
	//var innerTextWidth = this.getTextWidth(Settings.innerCircle.text,Settings.innerCircle.textSize,"bold","Arial");
	//inner text 
	this.drawText(Settings.innerCircle.text,Settings.x,Settings.y+5,Settings.innerCircle.textSize,'none',Settings.innerCircle.textColor);
	this.set("font-weight","bold");
	
	//title text
	this.drawText(Settings.title.text,Settings.x,Settings.y-10,Settings.title.size,'none',Settings.title.color);
	
      
    //outer circle
    //for label point	
    this.drawCircle(Settings.x, Settings.y, Settings.radius+Settings.label.distance, Settings.label.strokeWidth, Settings.label.strokeColor,"none");	
    //for label text
    var textLabelRadius = Settings.radius + Settings.label.distance + Settings.label.textDistance;
   // this.drawCircle(Settings.x, Settings.y, textLabelRadius, 1, "rgba(0,0,0,1)","none");

    
    label = Settings.label
    if (label.num) {
        interval = (label.endValue - label.startValue) / label.num;
    } else {
        interval = Settings.label.interval;
    }
    numOfLabels = (label.endValue - label.startValue) / interval;
    angleInterval = (Settings.totalArcAngle) / numOfLabels;

    labels = new Array();
    angle = startAngle;

    for (value = label.startValue; value <= label.endValue; value += interval) {        
        labels.push({
            angle: angle,
            value: value
        });
        angle += angleInterval;
    }
	
	//loop for label and text
    for (i = 0; i < labels.length; i++) {
        angle = labels[i].angle;
        value = labels[i].value;
		if(Settings.label.precision == null){
			if( value%1 !== 0){
			value = value.toFixed(2);
			}
		} else {
			value = value.toFixed(Settings.label.precision);
		}
        pointRadius = Settings.radius + label.distance;		
		DotPoints = this.polarToCartesian(Settings.x,Settings.y,pointRadius,angle);
		TextPoints = this.polarToCartesian(Settings.x,Settings.y,textLabelRadius,angle);
		//this draws small point	
       this.drawCircle(DotPoints.x, DotPoints.y,Settings.label.pointThickness,'','',Settings.label.pointColor);
       //var labelTextWidth = this.getTextWidth(value,Settings.label.textSize);        
       this.drawText(value, TextPoints.x, TextPoints.y+2,Settings.label.textSize,'none',Settings.label.textColor);		
    }   

}




/*
Multiple round progress
*/

LegendarySvg.prototype.multipleRoundedProgress = function (Settings) {
	
	this.setViewBox("0 0 100 100");
	this.svg.setAttribute("preserveAspectRatio","xMidYMid meet");
	//center the circle
	Settings.x= this.getWidth()/2;
	Settings.y= this.getHeight()/2;		
	//console.log(this.getHeight());
	
    //start angle for progress. This is at 135 deg
    var startAngle = -(Settings.totalArcAngle) / 2;
    
	//total length to be completed
	var numOfMultipleProgress = Settings.multiple.length;
	this.drawCircle(Settings.x,Settings.y,Settings.radius+Settings.thickness * numOfMultipleProgress - Settings.thickness/2 ,0,"#999","#555");
    
	 //inner circle
	if(Settings.innerCircle.radius) {
		innerCircleRadius = Settings.innerCircle.radius;
	} else {
		innerCircleRadius = Settings.radius-Settings.thickness/2;
	}
	//inner filled circle for text
    this.drawCircle(Settings.x, Settings.y,innerCircleRadius, Settings.innerCircle.lineWidth, Settings.innerCircle.strokeColor, Settings.innerCircle.fillColor);
	
	var oneUnit = Settings.totalArcAngle / (Settings.label.endValue - Settings.label.startValue);
    //console.log(oneUnit);
    //finally tracing the completed arc	
	var progressThickness = 0;
	var multipleTextValueYpos =0;
	for(j =0; j < Settings.multiple.length; j++) {
		for (i = 0; i < Settings.multiple[j].ranges.length; i++) {			
			currentRange = Settings.multiple[j].ranges[i];
			rangeStartAngle = startAngle + currentRange.startValue * oneUnit;
			rangeEndAngle = startAngle + currentRange.endValue * oneUnit;			
			this.drawArc(Settings.x, Settings.y, Settings.radius + progressThickness,rangeStartAngle, rangeEndAngle, Settings.thickness, currentRange.color);		   			
		}
		//increase the thickness for outer progress
		progressThickness +=Settings.thickness
		
		//draw text in the center for each progress
		this.drawText(Settings.multiple[j].text.value,Settings.x,Settings.y-2 + multipleTextValueYpos,Settings.innerCircle.textSize,'none',Settings.multiple[j].text.color);		
		multipleTextValueYpos +=5;
	}   	
	
	//title text
	this.drawText(Settings.title.text,Settings.x,Settings.y-10,Settings.title.size,'none',Settings.title.color);
	
      
    //outer circle
    //for label point	
    this.drawCircle(Settings.x, Settings.y, Settings.radius+Settings.thickness/2 * numOfMultipleProgress +Settings.label.distance, Settings.label.strokeWidth, Settings.label.strokeColor,"none");	
    //for label text
    var textLabelRadius = Settings.radius +Settings.thickness/2 * numOfMultipleProgress+Settings.label.distance + Settings.label.textDistance;
   // this.drawCircle(Settings.x, Settings.y, textLabelRadius, 1, "rgba(0,0,0,1)","none");

    
    label = Settings.label
    if (label.num) {
        interval = (label.endValue - label.startValue) / label.num;
    } else {
        interval = Settings.label.interval;
    }
    numOfLabels = (label.endValue - label.startValue) / interval;
    angleInterval = (Settings.totalArcAngle) / numOfLabels;

    labels = new Array();
    angle = startAngle;

    for (value = label.startValue; value <= label.endValue; value += interval) {        
        labels.push({
            angle: angle,
            value: value
        });
        angle += angleInterval;
    }
	
	//loop for label and text
    for (i = 0; i < labels.length; i++) {
        angle = labels[i].angle;
        value = labels[i].value;
		if(Settings.label.precision == null){
			if( value%1 !== 0){
			value = value.toFixed(2);
			}
		} else {
			value = value.toFixed(Settings.label.precision);
		}
        pointRadius = Settings.radius +Settings.thickness/2 * numOfMultipleProgress+ label.distance;		
		DotPoints = this.polarToCartesian(Settings.x,Settings.y,pointRadius,angle);
		TextPoints = this.polarToCartesian(Settings.x,Settings.y,textLabelRadius,angle);
		//this draws small point	
       this.drawCircle(DotPoints.x, DotPoints.y,Settings.label.pointThickness,'','',Settings.label.pointColor);
       //var labelTextWidth = this.getTextWidth(value,Settings.label.textSize);        
       this.drawText(value, TextPoints.x, TextPoints.y+2,Settings.label.textSize,'none',Settings.label.textColor);		
    }   

}



LegendarySvg.prototype.historyGraph = function(Settings){

	//this.setHeight(Settings.height);
	//this.setWidth(Settings.width);
	//this.setViewBox("0 0 "+Settings.height+" "+Settings.width);
		this.setViewBox("0 0 100 100");
	this.svg.setAttribute("preserveAspectRatio","xMinYMid meet");
	
	//this.drawLine(5,5,5,Settings.height,0.25,"#000");
	//this.drawLine(5,Settings.height,Settings.width,Settings.height,0.25,"#000");	
	
	//vertical line
	if (Settings.xLabel.num == null){
		var xInterval = Settings.xLabel.interval
	} else {
		var xInterval = (Settings.xLabel.endValue- Settings.xLabel.startValue)/Settings.xLabel.num;
	}
	
	var vertical_max = 350;
	
	for(i = 20;i <= vertical_max; i += xInterval ){
		this.drawLine(i,5,i,90,Settings.xLabel.strokeWidth,Settings.xLabel.strokeColor);
		//this.drawText(i, i,90+Settings.xLabel.textDistance,Settings.xLabel.textSize,'none',Settings.xLabel.textColor);
	}
	
	
	//horizontal lines
	if(Settings.yLabel.num == null) {
		var yInterval = Settings.yLabel.interval;
	} else {
		var yInterval = (Settings.yLabel.endValue- Settings.yLabel.startValue)/Settings.yLabel.num;
	}

	for(i = 90;i >= 5; i -= yInterval ){
		this.drawLine(20,i,vertical_max,i,0.5,Settings.yLabel.strokeColor);		
		this.drawText(i, Settings.yLabel.textDistance,i,Settings.yLabel.textSize,'none',Settings.yLabel.textColor);		
	}
	
}

LegendarySvg.prototype.lineGraph = function(Settings){

	//this.setHeight(Settings.height);
	//this.setWidth(Settings.width);
	//this.setViewBox("0 0 "+Settings.height+" "+Settings.width);
		this.setViewBox("0 0 100 100");
	this.svg.setAttribute("preserveAspectRatio","xMinYMid meet");
	
	//this.drawLine(5,5,5,Settings.height,0.25,"#000");
	//this.drawLine(5,Settings.height,Settings.width,Settings.height,0.25,"#000");	
	
	//vertical line
	if (Settings.xLabel.num == null){
		var xInterval = Settings.xLabel.interval
	} else {
		var xInterval = (Settings.xLabel.endValue- Settings.xLabel.startValue)/Settings.xLabel.num;
	}
	
	var vertical_max = 350;
	
	for(i = 20;i <= vertical_max; i += xInterval ){
		this.drawLine(i,5,i,90,1,Settings.xLabel.strokeColor);
		this.drawText(i, i,90+Settings.xLabel.textDistance,Settings.xLabel.textSize,'none',Settings.xLabel.textColor);
	}
	
	
	//horizontal lines
	if(Settings.yLabel.num == null) {
		var yInterval = Settings.yLabel.interval;
	} else {
		var yInterval = (Settings.yLabel.endValue- Settings.yLabel.startValue)/Settings.yLabel.num;
	}

	for(i = 90;i >= 5; i -= yInterval ){
		this.drawLine(20,i,vertical_max,i,1,Settings.yLabel.strokeColor);		
		this.drawText(i, Settings.yLabel.textDistance,i,Settings.yLabel.textSize,'none',Settings.yLabel.textColor);		
	}
	
}

