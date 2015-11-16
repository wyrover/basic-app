module.exports = {
	route: {
		activate: function() {
			this.$dispatch('userHasLoggedOut')
		}
	}
}
