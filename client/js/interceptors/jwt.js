export default {
	request() {
		return function(next) {
			const token = localStorage.getItem('token')
			let headers = next.headers || (next.headers = {})
			if(token)
				headers.Authorization = token
			return next
		}
	},

	response() {
		return function(next) {
			if (next.status && next.status.code == 401)
				localStorage.removeItem('token')
			return next
		}
	}
}
