import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'redux-router'
import { Input, Button } from 'antd';
import classNames from 'classnames';

const InputGroup = Input.Group;

class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          value: '',
    focus: false,
        }


    }

    handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }
    render() {
      const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
        return (
          <div className="ant-search-input-wrapper" style={style}>
     <InputGroup className={searchCls}>
     <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange.bind(this)}
         onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} onPressEnter={this.handleSearch.bind(this)}
       />
       <div className="ant-input-group-wrap">
         <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch.bind(this)} />
       </div>
     </InputGroup>
   </div>
        )
    }

}

export default MyComponent

//<CardDiary photo={this.state.photo}  handlePhotoChange={this.handlePhotoChange.bind(this)} diaryStyle={this.state.diaryStyle} changeStyle={this.changeStyle.bind(this)}></CardDiary>
