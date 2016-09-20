import React, {PropTypes} from 'react'
import _ from 'underscore'
import circle0 from '../../public/images/examination/circle_0.png'
import circle1 from '../../public/images/examination/circle_1.png'
import TimerMixin from 'react-timer-mixin'

const CIRCLES = [circle0, circle1]

const OptionSelected = React.createClass({
    propTypes: {
      className: PropTypes.string,
      duration: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      emergency: PropTypes.bool.isRequired,
    }, 
    mixins: [TimerMixin],
    getInitialState: function(){
      return {
        strokeVar: (Math.random()*2-1)/10, // generate one type stroke randomly
      }
    },
    componentDidMount: function(){
      this._animationStartTime = Date.now()
      this._canvsRect = this.refs._canvas.getBoundingClientRect()
      this.refs._canvas.width = 600
      this.refs._canvas.height = 600

      this._circle = null
      const img = new Image()
      img.onload = ()=>{
        this._circle = img
      }
      img.src = _.sample(CIRCLES)
      this.setTimeout(()=>{
        window.requestAnimationFrame(this.draw)
      }, 150)
    },

    // renders
    draw: function(){
      if (this.refs._canvas && this.refs._canvas.getContext) {
        const ctx = this.refs._canvas.getContext('2d')
        const width = 600
        const height = 600
        const deltaTime = Math.min(Date.now() - this._animationStartTime, this.props.duration)

        if (this._circle) {
          ctx.drawImage(this._circle, width*.02, width*.1, width*.95, width*.93)
        }

        // cover circle
        ctx.beginPath()
        ctx.arc(width/2, width/2, width/2, Math.PI, (deltaTime/this.props.duration-0.5)*2*Math.PI, true)
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = .35*width
        ctx.stroke() 
        ctx.closePath()

        if (deltaTime < this.props.duration) {
          window.requestAnimationFrame(this.draw)
        }
      }
    },
    render: function(){
      return <canvas className={this.props.className} style={{opacity: 0.5}} ref="_canvas"></canvas>
    },
})

export default OptionSelected