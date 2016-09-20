// App config the for development environment.

const serverURL = 'http://ngs-public.oss-cn-hangzhou.aliyuncs.com/share'
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
