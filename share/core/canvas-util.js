// Draws a rounded rectangle on a 2D context.
export const drawRoundedRect = function(context, x, y, width, height, borderRadius,type,spacing,diff){
    if (borderRadius === 0){
      if(type!=="threeCol"){
        context.rect(x, y, width, height)
      }else{
        const itemWidth=(width-spacing*2)/3
        context.rect(x, y-diff/2, itemWidth, height+diff)
        context.rect(x+itemWidth+spacing, y-diff/2, itemWidth, height+diff)
        context.rect(x+itemWidth*2+spacing*2, y-diff/2, itemWidth, height+diff)
      }
    } else {
        var widthMinusRad = width - borderRadius
        var heightMinusRad = height - borderRadius
        context.translate(x, y)
        context.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5)
        context.lineTo(widthMinusRad, 0)
        context.arc(widthMinusRad, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 2)
        context.lineTo(width, heightMinusRad)
        context.arc(widthMinusRad, heightMinusRad, borderRadius, Math.PI * 2, Math.PI * 0.5)
        context.lineTo(borderRadius, height)
        context.arc(borderRadius, heightMinusRad, borderRadius, Math.PI * 0.5, Math.PI)
        context.translate(-x, -y)
    }
}
