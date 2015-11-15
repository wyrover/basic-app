<template>
	<nav>
		<a v-link="{ name: 'home' }">Home</a>
		<a v-link="{ name: 'auth.login' }">Access</a>
	</nav>
	<router-view></router-view>
</template>
