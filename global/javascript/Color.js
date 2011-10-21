HEX=function(r,g,b){
	if(arguments.length==1){
		this.value=[r.substr(0,2),r.substr(2,2),r.substr(4,2)];
	}else{
		this.value=[r,g,b];
	}
}
HEX.prototype={
	toRGB: function(){
		return new RGB(parseInt(this.value[0],16),parseInt(this.value[1],16),parseInt(this.value[2],16));
	},
	toHSV: function(){
		return this.toRGB().toHSV();
	},
	toString: function(){
		return this.value.join('');
	}
}
RGB=function(r,g,b){
	if(arguments.length==1){
		this.value=r.split(",");
		this.value=[parseInt(this.value[0]),parseInt(this.value[1]),parseInt(this.value[2])];
	}else{
		this.value=[r,g,b];
		this.value=[Math.round(this.value[0]),Math.round(this.value[1]),Math.round(this.value[2])];
	}
}
RGB.prototype={
	tohex: function(i){
		var s=i.toString(16);
		if(s.length==1)s='0'+s;
		return s;
	},
	toHEX: function(){
		return this.tohex(this.value[0])+this.tohex(this.value[1])+this.tohex(this.value[2]);
	},
	toHSV: function(){
		var R=this.value[0]/255,G=this.value[1]/255,B=this.value[2]/255;
		var v=Math.min(R,G,B),V=Math.max(R,G,B);
		var D=V-v;
		if(D==0)return new HSV(0,0,V*100);
		var S=D/V;
		if(R==V)var H=(G-B)/6/D;
		else if(G==V)var H=1/3+(B-R)/6/D;
		else if(B==V)var H=2/3+(R-G)/6/D;
		if(H<0)H+=1;
		else if(H>1)H-=1;
		return new HSV(H*360,S*100,V*100);
	},
	toString: function(){
		return this.value.toString();
	}
}
HSV=function(h,s,v){
	if(arguments.length==1){
		this.value=h.split(",");
		this.value=[parseInt(this.value[0]),parseInt(this.value[1]),parseInt(this.value[2])];
	}else{
		this.value=[h,s,v];
		this.value=[Math.round(this.value[0]),Math.round(this.value[1]),Math.round(this.value[2])];
	}
}
HSV.prototype={
	toRGB: function(){
		var H=this.value[0]/60,S=this.value[1]/100,V=this.value[2]/100*255;
		if(S==0)return new RGB(V,V,V);
		var h=Math.floor(H);
		var f=[V*(1-S),V*(1-S*(H-h)),V*(1-S*(1-(H-h)))];
		if(h==0)return new RGB(V,f[2],f[0]);
		if(h==1)return new RGB(f[1],V,f[0]);
		if(h==2)return new RGB(f[0],V,f[2]);
		if(h==3)return new RGB(f[0],f[1],V);
		if(h==4)return new RGB(f[2],f[0],V);
		return new RGB(V,f[0],f[2]);
	},
	toHEX: function(){
		return this.toRGB().toHEX();
	},
	toString: function(){
		return this.value.toString();
	}
}
