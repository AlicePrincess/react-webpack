import React, {PropTypes} from 'react'
import Button from './Button'

export default class MyComponent extends React.Component{
	constructor(props) {
			super(props)
	}
	render(){
		return(
				<figure className="upload">
					<Button text={this.props.text} icon={this.props.icon}></Button>
		   		<input type="file" capture="camera" accept="image/*" id="cameraInput" name="cameraInput" onChange={this.props.handlePhotoChange}/>
				</figure>
		)
	}
}
