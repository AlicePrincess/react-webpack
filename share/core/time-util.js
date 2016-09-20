export const time = (dateStr)=>{
	let myDate = dateStr? (new Date(Date.parse(dateStr.replace(/-/g, "/")))):(new Date())
	const weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	return {
		getFullDate:`${myDate.getFullYear()}年${myDate.getMonth()+1}月${myDate.getDate()}日`,
		getDay:weekDay[myDate.getDay()]
	}
}