<template>
	<main>
		<h2 v-text="user.username + ' profile'"></h2>
		<router-view class="fade" transition="fade-" transition-mode="out-in" keep-alive></router-view>
	</main>
</template>

<script>
	export default {

		route: {
			data({ to: { params: { username } }, next }) {
				this.$http.get('/api/v1/users/' + username, (user) => {
					next({ user: user })
				}).error((err) => {
					this.$route.router.go({ name: 'home' })
				})
			}
		},

		data() {
			return {
				user: {
					username: null,
					email: null,
				},
			}
		},

	}
</script>
