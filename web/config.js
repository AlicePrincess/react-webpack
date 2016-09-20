// App config the for development environment.

const serverURL = 'http://ngs-children.oss-cn-shanghai.aliyuncs.com'

// const apiServerUrl = 'api.childhood.tusoapp.com'


const OSSdevConfig = {
	debug: true,
	apiServerUrl: serverURL,
	api: {
	}
}

const devConfig = {
	debug: true,
	apiServerUrl: serverURL,
	api: {
	}
}

// App config the for production environment.
const proConfig = {
	debug: false,
	apiServerUrl: serverURL,
	api: {
	}
}

const config = (process.env.NODE_ENV === "production") ? proConfig : devConfig
export default config
