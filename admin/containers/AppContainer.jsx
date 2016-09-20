import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'underscore'
// import MenuComponent from '../components/Common/MenuComponent'
import Navigation from '../components/Common/Navigation'
import {push} from 'redux-router'
import LoginContainer from '../containers/LoginContainer'
import {logout, restoreFromToken} from '../actions/user'
// import {fetchAllAccount} from '../actions/account'
// import {fetchAllTuso} from '../actions/tuso'
// import {fetchAllPuppet, followUser, unfollowUser} from '../actions/puppet'

export function AppContainer(Component){
	class MyComponent extends React.Component{
		constructor(props) {
			super(props)

		}
		componentWillMount(){
			const {
				user
			} = this.props
			if (user.get('token') && user.get('uuid')) {
				this.props.restoreFromToken(user.get('token'), user.get('uuid'))
				// followUser(user.get('token'), [12, 33], [33, 44])
				// unfollowUser(user.get('token'), [12, 33], [33, 44])
				// this.props.fetchAllAccount(user.get('token'), 1, 33, "2016-05-12T17:08:01.982+08:00", "2016-08-12T17:08:01.982+08:00")
				// this.props.fetchAllAccount(user.get('token'), 29, 50, "2016-05-12T17:08:01.982+08:00", "2016-08-12T17:08:01.982+08:00")
				// this.props.fetchAllTuso(user.get('token'), 0, 2, "2016-05-12T17:08:01.982+08:00", "2016-08-12T17:08:01.982+08:00")
				// this.props.fetchAllTuso(user.get('token'), 1, 3, "2016-05-12T17:08:01.982+08:00", "2016-08-12T17:08:01.982+08:00")
				// this.props.fetchAllPuppet(user.get('token'), 1, 30, "2016-05-12T17:08:01.982+08:00", "2016-08-12T17:08:01.982+08:00")
			}
		}

		getMenu(key){
			//  向后台请求二级菜单
			// let pathTemp=this.props.query;
			// pathTemp["defaultNavigationKey"]=key;
			// this.props.push({
			// 	    pathname:"/contentManage/diary/my",
      //         query: pathTemp,
      //       })
			// this.setState({defaultNavigationKey:key})

		}
		handleLogOut(){
			this.props.logout()
		}
		render() {

			if(this.props.user.get('token')){
				return (
					<div>
						<Navigation {...this.props} handleLogOut={this.handleLogOut.bind(this)} getMenu={this.getMenu.bind(this)}></Navigation>
						<Component {...this.props}></Component>
					</div>
				)
			}else{
				return <LoginContainer></LoginContainer>
			}
		}
	}

	function mapStateToProps(state) {

		return {
			user: state.getIn(["user"]),
			"navigationDate": [{
				"id": 2,
				"name": "内容管理",
				"link": "",
				"menuDate": [{
					"id": 1,
					"name": "图说管理",
					"icon": "desktop",
					"childrenMenu": [{
						"id": 2,
						"name": "所有图说",
						"icon": "book",
						"link": "contentManage/tuso/all"

					}, {
						"id": 3,
						"name": "我的图说",
						"icon": "calendar",
						"link": "/contentManage/tuso/my"
					}]

				},{
					"id": 4,
					"name": "用户管理",
					"icon": "desktop",
					"childrenMenu": [{
						"id": 5,
						"name": "马甲号管理",
						"icon": "book",
						"link": "contentManage/user/majia"

					}, {
						"id": 6,
						"name": "图说用户管理",
						"icon": "calendar",
						"link": "/contentManage/user/ordinary"
					}, {
						"id": 7,
						"name": "意见箱",
						"icon": "calendar",
						"link": "/contentManage/user/draftBox"
					}]

				}
				// ,{
				// 	"id": 8,
				// 	"name": "调研管理",
				// 	"icon": "desktop",
				// 	"childrenMenu": [{
				// 		"id": 9,
				// 		"name": "调研活动",
				// 		"icon": "book",
				// 		"link": "contentManage/research/activity"
				//
				// 	}, {
				// 		"id": 10,
				// 		"name": "调研结果",
				// 		"icon": "calendar",
				// 		"link": "/contentManage/research/result"
				// 	}]
				//
				// }
			]

			}]
		}
	}

	function mapDispatchToProps(dispatch) {
		return {
			push: bindActionCreators(push, dispatch),
			logout: bindActionCreators(logout, dispatch),
			restoreFromToken: bindActionCreators(restoreFromToken, dispatch),
			// fetchAllAccount: bindActionCreators(fetchAllAccount, dispatch),
			// fetchAllTuso: bindActionCreators(fetchAllTuso, dispatch),
			// fetchAllPuppet: bindActionCreators(fetchAllPuppet, dispatch),
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(MyComponent)
}
