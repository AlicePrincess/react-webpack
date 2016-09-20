import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import ShareHeader from '../components/share/ShareHeader'
import ShareContent from '../components/share/ShareContent'
import ShareFooter from '../components/share/ShareFooter'
import {requestSharePhotoInfo} from '../actions/share'
import Component from '../../components/Component'
import {bindActionCreators} from 'redux'

const AppContainer = React.createClass({
	componentDidMount:function() {
        this.props.requestSharePhotoInfo()
        // this.props.requestUserInfo()
    },
	render: function() {
		 if(!this.props.user||!this.props.photo){
         return null;
        }
		  const shareHeaderProps = {
            username: this.props.user.get('name'),
            datetime: new Date(this.props.photo.get('datetime')),
            locale: this.props.photo.get('address'),
            userAvatar: this.props.user.get('avatar')
        }
        const shareContentProps = {
            datetime: new Date(this.props.photo.get('datetime')),
            title: this.props.photo.get('title'),
            description: this.props.photo.get('description'),
            img: this.props.photo.get('url')
        }
		return (
				 <DocumentTitle title="分享">
                <div>

                    <ShareHeader {...shareHeaderProps}></ShareHeader>
                    <ShareContent {...shareContentProps}></ShareContent>
                    <ShareFooter></ShareFooter>

                </div>
            </DocumentTitle>
		)
	}
})

function mapStateToProps(state) {
	return {
  user: state.getIn(['share', 'user']),
        photo: state.getIn(['share', 'photo'])
	}
}

function mapDispatchToProps(dispatch) {
	return {
        requestSharePhotoInfo: bindActionCreators(requestSharePhotoInfo, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
