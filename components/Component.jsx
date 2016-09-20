import React from 'react'
import styles from './Component.less'
import styles1 from './Component.scss'

export default class MyComponent extends React.Component{
  constructor(props) {
    super(props)
  }
	render() {
    return (
      <div className={`${styles.root} ${styles1.root}`}>组件</div>
    )
	}
}
