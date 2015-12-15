<template>
	<main>
		<template v-if="!loadingUser">
			<h2 v-text="user.username + ' profile'"></h2>
			<router-view class="fade" transition="fade-" transition-mode="out-in" keep-alive></router-view>
		</template>
		<span v-else>Loading...</span>
	</main>
</template>

<script>
	export default {

		route: {
			data({ to: { params: { username } }, next }) {
				this.$http.get('users/' + username, user => {
					next({ user, loadingUser: false })
				}).error(err => {
					this.$route.router.go({ name: 'home' })
				})
			}
		},

		data() {
			return {
				user: {},
				loadingUser: true,
			}
		},

	}
</script>
