<template>
	<div>
		<div
			class="app-container" style="position: relative;"
			:class="{ 'app-mobile': isDevice, 'app-mobile-dark': theme === 'dark' }"
		>
			<chat-container
				v-if="showChat"
				:current-user-id="currentUserId"
				:theme="theme"
				:is-device="isDevice"
				@show-demo-options="showDemoOptions = $event"
			/>
			<!-- <div style="position: fixed; bottom:10px; left:20px;" >
				<v-switch  label="dark" color="red" />	
			</div> -->
			<!-- <div class="version-container">
				v1.0.0
			</div> -->
		</div>
	</div>
</template>

<script>
import * as firestoreService from '@/database/firestore'
import * as storageService from '@/database/storage'

import ChatContainer from './ChatContainer'

export default {
	components: {
		ChatContainer
	},

	data() {
		const user  = JSON.parse(localStorage.getItem('user'))
			
		return {
			theme: 'light',
			showChat: true,
			users: [
				{
					_id: 'jctm4gV6GUPrhU0AyaYj',
					username: 'huong',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj'
				},
				{
					_id: 'Tm3QRWz1EmZjDWQRir8b',
					username: 'nvduy',
					avatar: 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'
				},
				{
					_id: 'no2LE3XEGwpn8GKkixgA',
					username: 'Leia',
					avatar:
						'https://vignette.wikia.nocookie.net/teamavatarone/images/4/45/Yoda.jpg/revision/latest?cb=20130224160049'
				}
			],
			currentUserId: user.id,
			isDevice: false,
			showDemoOptions: true,
			isShowDialog:false
			// updatingData: false
		}
	},

	computed: {
		showOptions() {
			return !this.isDevice || this.showDemoOptions
		}
	},

	watch: {
		currentUserId() {
			this.showChat = false
			setTimeout(() => (this.showChat = true), 150)
		}
	},

	mounted() {
		const user  = JSON.parse(localStorage.getItem('user'))
		if(user == null){
			this.$route.push({ path: '/login' })
		}	
		this.isDevice = window.innerWidth < 500
		window.addEventListener('resize', ev => {
			if (ev.isTrusted) this.isDevice = window.innerWidth < 500
		})
	},

	methods: {
		// resetData() {
		// 	firestoreService.getAllRooms().then(({ data }) => {
		// 		data.forEach(async room => {
		// 			await firestoreService.getMessages(room.id).then(({ data }) => {
		// 				data.forEach(message => {
		// 					firestoreService.deleteMessage(room.id, message.id)
		// 					if (message.files) {
		// 						message.files.forEach(file => {
		// 							storageService.deleteFile(
		// 								this.currentUserId,
		// 								message.id,
		// 								file
		// 							)
		// 						})
		// 					}
		// 				})
		// 			})

		// 			firestoreService.deleteRoom(room.id)
		// 		})
		// 	})

		// 	firestoreService.getAllUsers().then(({ data }) => {
		// 		data.forEach(user => {
		// 			firestoreService.deleteUser(user.id)
		// 		})
		// 	})
		// },
		// async addData() {
		// 	this.updatingData = true

		// 	const user1 = this.users[0]
		// 	await firestoreService.addIdentifiedUser(user1._id, user1)

		// 	const user2 = this.users[1]
		// 	await firestoreService.addIdentifiedUser(user2._id, user2)

		// 	const user3 = this.users[2]
		// 	await firestoreService.addIdentifiedUser(user3._id, user3)

		// 	await firestoreService.addRoom({
		// 		users: [user1._id, user2._id],
		// 		lastUpdated: new Date()
		// 	})
		// 	await firestoreService.addRoom({
		// 		users: [user1._id, user3._id],
		// 		lastUpdated: new Date()
		// 	})
		// 	await firestoreService.addRoom({
		// 		users: [user2._id, user3._id],
		// 		lastUpdated: new Date()
		// 	})
		// 	await firestoreService.addRoom({
		// 		users: [user1._id, user2._id, user3._id],
		// 		lastUpdated: new Date()
		// 	})

		// 	this.updatingData = false
		// 	location.reload()
		// }
	}
}
</script>

<style lang="scss">
body {
	background: #fafafa;
	margin: 0;
}

input {
	-webkit-appearance: none;
}

.app-container {
	font-family: 'Quicksand', sans-serif;
	padding: 0px;
}

.app-mobile {
	padding: 0;

	&.app-mobile-dark {
		background: #131415;
	}

	.user-logged {
		margin: 10px 5px 0 10px;
	}

	select {
		margin: 10px 0;
	}

	.button-theme {
		margin: 10px 10px 0 0;

		.button-github {
			height: 23px;
		}
	}
}

.user-logged {
	font-size: 12px;
	margin-right: 5px;
	margin-top: 10px;

	&.user-logged-dark {
		color: #fff;
	}
}

select {
	height: 20px;
	outline: none;
	border: 1px solid #e0e2e4;
	border-radius: 4px;
	background: #fff;
	margin-bottom: 20px;
}

.button-theme {
	float: right;
	display: flex;
	align-items: center;

	.button-light {
		background: #fff;
		border: 1px solid #46484e;
		color: #46484e;
	}

	.button-dark {
		background: #1c1d21;
		border: 1px solid #1c1d21;
	}

	button {
		color: #fff;
		outline: none;
		cursor: pointer;
		border-radius: 4px;
		padding: 6px 12px;
		margin-left: 10px;
		border: none;
		font-size: 14px;
		transition: 0.3s;
		vertical-align: middle;

		&.button-github {
			height: 30px;
			background: #46484e;
			padding: 5px;
			margin-left: 20px;

			a {
				text-decoration: none;
				color: white;
			}
		}

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 0.6;
		}

		@media only screen and (max-width: 768px) {
			padding: 3px 6px;
			font-size: 13px;
		}
	}
}

.version-container {
	padding-top: 20px;
	text-align: right;
	font-size: 14px;
	color: grey;
}
</style>
