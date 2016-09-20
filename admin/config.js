// App config the for development environment.

// const serverURL = 'http://ngs-children.oss-cn-shanghai.aliyuncs.com'
const serverURL = 'http://api.dev.tusoapp.com'
const apiServerUrl = 'api.childhood.tusoapp.com'

const config = {
	debug: (process.env.NODE_ENV === "production") ? false : true,
	api: {
		user: {
			login: `${serverURL}:9000/hera/v1/account/login`,
			get: (uuid) => `${serverURL}:9000/v1/user/${uuid}`,
		},
		handnote: {
			getMine: (uuid) => `${serverURL}:9000/v1/user/${uuid}/photos`,
			create: (uuid) => `${serverURL}:9000/v1/photo/${uuid}/note`,
			update: (uuid) => `${serverURL}:9000/v1/note/${uuid}`,
		},
		tuso: {
			getMine: (uuid) => `${serverURL}:9000/v1/user/${uuid}/tusos`,
			get: (uuid) => `${serverURL}:9000/v1/tuso/${uuid}`,
			getAll: `${serverURL}:9000/hera/v1/news`,
			create: `${serverURL}:9000/v1/tuso`,
			delete: (uuid) => `${serverURL}:9000/v1/tuso/${uuid}`,
			like: (uuid) => `${serverURL}:9000/v1/tuso/${uuid}/star`,
			dislike: (uuid) => `${serverURL}:9000/v1/tuso/${uuid}/unstar`,
		},
		image: {
			upload: "https://up.qbox.me",
			getUploadToken: `${serverURL}:9000/v1/photo_token`,
		},
		account: {
			get: `${serverURL}:9000/hera/v1/account/user`
		},
		puppet: {
			post: `${serverURL}:9000/hera/v1/pup/`,
			delete: `${serverURL}:9000/hera/v1/pup/`,
			put: `${serverURL}:9000/hera/v1/pup/`,
			get: `${serverURL}:9000/hera/v1/account/pup`,
			like: {
				post:`${serverURL}:9000/hera/v1/pup/star`, 
			},
			follow: {
				post:`${serverURL}:9000/hera/v1/pup/followee`, 
				delete:`${serverURL}:9000/hera/v1/pup/unfollowee`, 
			},
			password: {
				put: `${serverURL}:9000/hera/v1/pup/pwd`
			},
		},
	},
	deviceToken: "aaa",
}

export default config
