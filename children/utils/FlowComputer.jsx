import _ from 'underscore'	

export function FlowComputer0(imgSrc, width, height){
	const crackWidth = 2
	const gridHeight = (height-crackWidth)/2
	const columnCount = ~~(width/gridHeight)
	const gridWidth = gridHeight+(width-columnCount*gridHeight)/columnCount

	// layout from left to right, from up to bottom 
	return _.map(imgSrc, (img, index)=>{
		const rowIndex = ~~(index/columnCount)
		const colIndex = index%columnCount   

		return {
			top: rowIndex*(gridHeight+crackWidth),
			left: colIndex*gridWidth,
			width: gridWidth,
			height: gridHeight,
		}	
	})
}