import _ from 'underscore'

export const calculateLayoutPositions = (gridRectArray, colCount, sidesMargin)=>{
	if (!gridRectArray || gridRectArray.length === 0) {
		return null
	}

	// all grids must have same width
	const gridWidth = gridRectArray[0].width
	if(!_.every(gridRectArray, item => item.width === gridWidth)){
		throw new Error('calculateLayoutPositions: all grids must have same width.')
	}

	const averageHeight = _.reduce(_.map(gridRectArray, item => item.height + sidesMargin[0] + sidesMargin[2]), (memo, num) => memo + num, 0) / gridRectArray.length

	let anchor = Array.apply(null, Array(colCount)).map(() => 0);
	let rectArray = []

	const nextCol = function(anchor, currentCol, deltaHeight, heightTolerance){
		const minHeightIndex = _.indexOf(anchor, _.min(anchor))

		for (var i = 0; i < anchor.length; i++) {
			let nextCol = (currentCol + 1) % anchor.length
			// check the current image flow is a flat flow (every column appears approximately tall)
			if (anchor[nextCol] + deltaHeight - anchor[minHeightIndex] <= deltaHeight) {
				return nextCol
			} else {
				currentCol = nextCol
				continue
			}
		}

		// tall candidates fall back
		return minHeightIndex
	}

	let currentCol = 0
	_.map(gridRectArray, item => {
		// push grid into image flow
		const boxHeight = item.height + sidesMargin[0] + sidesMargin[2]
		const boxWidth = item.width + sidesMargin[1] + sidesMargin[3]
		
		rectArray.push({
			top: Math.round(anchor[currentCol]),
			left: Math.round(boxWidth * currentCol),
			heightWithMargin: Math.round(boxHeight)
		})

		anchor[currentCol] += boxHeight
		currentCol = nextCol(anchor, currentCol, boxHeight, averageHeight)
	})

	return {
		gridLayout: rectArray,
		maxHeight: _.max(rectArray.map(item => item.top + item.heightWithMargin))
	}
}

export const getCoodinateInFlow = function(index, colCount){
	return {
		row: Math.floor(index / 3),
		col: index % 3
	}
}
