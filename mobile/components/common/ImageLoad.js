import React, {PropTypes} from 'react'

import EXIF from 'exif-js'
export default class MyComponent extends React.Component{
	constructor(props) {
			super(props)
			this.handleLoad=this.handleLoad.bind(this)
	}

	handleLoad(){
		let img=new Image()
		img.src=this.props.photo
		var u = navigator.userAgent
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
		var temp=this.refs.photo;
		var type=this.props.type;
var maxW=parseInt(document.body.clientHeight);
var maxH=parseInt(document.body.clientWidth);
if(type=="imageShow"){
	temp.style.maxWidth="90%";
	temp.style.maxHeight="90%";
}



		EXIF.getData(this.props.imgAdd, function() {
			// temp.style.transform="rotate(90deg)"

			if(isAndroid){
				if(EXIF.getTag(this, 'Orientation')==6){
					// rotate=90;

					temp.style.transform="rotate(90deg)";

					if(type=="imageShow"){
						temp.style.maxWidth=maxH+"px";
						temp.style.maxHeight=maxW+"px";
					}
				}
				if(EXIF.getTag(this, 'Orientation')==1){
					temp.style.transform="rotate(0deg)";

				}
				if(EXIF.getTag(this, 'Orientation')==3){
				// rotate=180;
					temp.style.transform="rotate(180deg)";

				}
				if(EXIF.getTag(this, 'Orientation')==8){
				// rotate=270;
					temp.style.transform="rotate(270deg)";
					if(type=="imageShow"){
						temp.style.maxWidth=maxH+"px";
						temp.style.maxHeight=maxW+"px";
					}
				}
			}
	 })
	 if(this.props.type=="addTitle"){
		 if(img.width<img.height){
		 	this.refs.photo.style.width="100%"
		 	this.refs.photo.style.height="auto"
		 }
		 else{
		 	this.refs.photo.style.width="auto"
		 	this.refs.photo.style.height="100%"
		 }
	 }


	}

	render(){
		return(
			<div><img src={this.props.photo} onClick={this.props.handleViewToggle}/></div>
		)
	}
}
