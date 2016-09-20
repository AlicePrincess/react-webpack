// App config the for development environment.
const serverURL = 'ngs-children.oss-cn-shanghai.aliyuncs.com'
const apiServerUrl = 'api.childhood.tusoapp.com'


const OSSdevConfig = {
	debug: false,

	apiServerUrl: serverURL,
	api: {
		questions: {
			get: `https://${serverURL}/mimicapi/question.json`,
			check: `https://${serverURL}/mimicapi/check.json`,
			other:`https://${serverURL}/mimicapi/check.json`,
		},
		report: {
			get: `https://${serverURL}/mimicapi/report.json`
		},
		sheets: {
			get:`https://${serverURL}/mimicapi/sheets.json`
		},
		user: {
			get: `https://${serverURL}/mimicapi/user.json`
		},
		weChat:{
			get:'https://api.childhood.tusoapp.com/tool/wechat'
		}

	}
}

const devConfig = {
	debug: false,
	api: {
		questions: {
			get: `https://${apiServerUrl}/ac/q_list`,
			check: `https://${apiServerUrl}/ac/q_check`,
			other:`https://${apiServerUrl}/ac/result_info`,
		},
		user: {
			get: `https://${apiServerUrl}/user/info`
		},
		weChat:{
			get:'https://api.dev.tusoapp.com:8080/v1/wechat/js_ticket/'
		}
	}
}

// App config the for production environment.
const proConfig = {
	debug: false,
	apiServerUrl: serverURL,
	api: {
		questions: {
			get: `https://${apiServerUrl}/ac/q_list`,
			check: `https://${apiServerUrl}/ac/q_check`,
			other:`https://${apiServerUrl}/ac/result_info`,
		},
		user: {
			get: `https://${apiServerUrl}/user/info`
		},
		weChat:{
			get:'https://api.childhood.tusoapp.com/tool/wechat'
		}
	}
}

const config = (process.env.NODE_ENV === "production") ? proConfig : devConfig
export default config
