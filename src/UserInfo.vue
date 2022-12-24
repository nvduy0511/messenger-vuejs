<template>
    <Header />

    <!-- <header> -->

    <div class="container">

        <div class="profile">

            <div class="profile-image">

                <img :src="this.info.avatar" alt="avartar">

            </div>

            <div class="profile-user-settings">

                <h1 class="profile-user-name">{{ this.info.username }}</h1>

                <button class="btn profile-edit-btn">Chỉnh sửa thông tin</button>

                <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog"
                        aria-hidden="true"></i></button>

                <button v-if="handleDisplayFollow()" v-on:click="handleFollow()" class="btn profile-edit-btn">
                    {{ this.isFollow === false ? 'Theo dõi' : 'Đang theo dõi' }}</button>

            </div>

            <div class="profile-stats">

                <ul>
                    <li><span class="profile-stat-count">{{ this.posts.length }}</span> bài viết</li>
                    <li v-on:click="this.openList = true; this.type = 'Followers'"><span class="profile-stat-count">{{ this.followers.length }}</span> Người theo dõi</li>
                    <li  v-on:click="this.openList = true; this.type = 'Following'"><span class="profile-stat-count">{{ this.following.length }}</span> đang theo dõi</li>
                </ul>

            </div>

            <div class="profile-bio">

                <p><span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit 📷✈️🏕️</p>

            </div>

        </div>
        <!-- End of profile section -->

    </div>
    <!-- End of container -->

    <!-- </header> -->

    <main>

        <div class="container">

            <div class="gallery">

                <div v-for="item in this.posts" class="gallery-item" tabindex="0">

                    <img :src="item.image" class="gallery-image" alt="">

                    <div class="gallery-item-info">

                        <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span>
                                <i class="fas fa-heart"></i> {{ item.likes }}
                            </li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i
                                    class="fas fa-comment" aria-hidden="true"></i> {{ item.comments }}</li>
                        </ul>

                    </div>

                </div>
            </div>
            <!-- End of gallery -->

            <!-- <div class="loader"></div> -->

        </div>
        <!-- End of container -->

    </main>

    <Backdrop  v-if="openList" @open="openList = false"  />
    <ListFollow v-if="openList" :type="this.type" :followers="this.followers" :following="this.following" />
</template>

<script>

import Header from './components/Header/Header.vue';
import Backdrop from './components/Backdrop.vue';
import ListFollow from './components/InfoUser/ListFollow.vue';
import { firestoreDb } from './database/index';
import { getDataFromStorage } from './database/storage';
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";


export default ({

    name: "user",
    data: () => ({
        info: {},
        posts: [],
        isFollow: false,
        infoFollow: null,
        openList: false,
        type: null,
        following: [],
        followers: [],
    }),
    components: {
        Header,
        ListFollow,
        Backdrop,
    },
    mounted() {
        // this.info = JSON.parse(localStorage.getItem('user'));
        getDataFromStorage(firestoreDb, 'users')
            .then(res =>
                res.filter(i => {
                    if (i.id === this.$route.params.id) {
                        return this.info = i;
                    }
                }))

        // Lấy danh sách bài đăng
        getDataFromStorage(firestoreDb, 'posts')
            .then(res => this.posts = res.filter(i => i.idAuthor === this.info.id))

            // Lấy danh sách người theo dõi
        getDataFromStorage(firestoreDb, 'follow')
            .then(res => this.followers = res.filter(i => i.idFollowers === this.$route.params.id))

        // Lấy danh sách người đang theo dõi
        getDataFromStorage(firestoreDb, 'follow')
            .then(res => this.following = res.filter(i => i.idFollowing === this.$route.params.id))
    },
    methods: {
        handleDisplayFollow() {
            if (this.info.id === JSON.parse(localStorage.getItem('user')).id) return false;

            getDataFromStorage(firestoreDb, 'follow')
                .then(res => {
                    const arr = res.filter(i => i.idFollowing === JSON.parse(localStorage.getItem('user')).id && i.idFollowers === this.$route.params.id);
                    if (arr.length > 0) {
                        arr.map(i => this.infoFollow = i)
                        return this.isFollow = true;
                    }
                    return;
                })

            // console.log(this.following)

            return true;
        },
        async handleFollow() {
            // console.log(this.$route.params.id)
            if (this.isFollow === false) {
                const docRef = await addDoc(collection(firestoreDb, "follow"), {
                    dateFollow: new Date(Date.now()).toUTCString(),
                    avatar: this.info.avatar,
                    nameFollowers: this.info.username,
                    idFollowers: this.$route.params.id,
                    idFollowing: JSON.parse(localStorage.getItem('user')).id,
                    nameFollowing: JSON.parse(localStorage.getItem('user')).username,
                    avatarFollowing: JSON.parse(localStorage.getItem('user')).avatar,
                })
                return this.isFollow = true;
            }
            // console.log(this.infoFollow.id)
            await deleteDoc(doc(firestoreDb, "follow", this.infoFollow.id));
            return this.isFollow = false;
        }
    },
}
)
</script>

<style scoped >
:root {
    font-size: 10px;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    font-family: "Open Sans", Arial, sans-serif;
    min-height: 100vh;
    background-color: #fafafa;
    color: #262626;
    padding-bottom: 3rem;
}

img {
    display: block;
}

.container {
    /* padding: 0 30px; */
    /* margin: 0 167px; */
    max-width: auto;
    margin: 0 auto;
    padding: 0 1 0rem;
}

.btn {
    display: inline-block;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.btn:focus {
    outline: 0.5rem auto #4d90fe;
}

.visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}

/* Profile Section */

.profile {
    padding: 5rem 0;
}

.profile::after {
    content: "";
    display: block;
    clear: both;
}

.profile-image {
    float: left;
    width: calc(33.333% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
}

.profile-image img {
    border-radius: 50%;
}

.profile-user-settings,
.profile-stats,
.profile-bio {
    float: left;
    width: calc(66.666% - 2rem);
}

.profile-user-settings {
    margin-top: 1.1rem;
}

.profile-user-name {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 300;
}

.profile-edit-btn {
    font-size: 1.4rem;
    line-height: 1.8;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.3rem;
    padding: 0 2.4rem;
    margin-left: 2rem;
}

.profile-settings-btn {
    font-size: 2rem;
    margin-left: 1rem;
}

.profile-stats {
    margin-top: 2.3rem;
}

.profile-stats li {
    display: inline-block;
    font-size: 1.6rem;
    line-height: 1.5;
    margin-right: 4rem;
    cursor: pointer;
}

.profile-stats li:last-of-type {
    margin-right: 0;
}

.profile-bio {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 2.3rem;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
    font-weight: 600;
}

/* Gallery Section */

.gallery {
    /* display: flex;
    flex-wrap: wrap; */
    margin: -1rem -1rem;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
}

.gallery-item {
    position: relative;
    flex: 1 0 22rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
    display: none;
}

.gallery-item-info li {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
}

.gallery-item-likes {
    margin-right: 2.2rem;
}

.gallery-item-type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
    transform: rotateY(180deg);
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Loader */

.loader {
    width: 5rem;
    height: 5rem;
    border: 0.6rem solid #999;
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: 0 auto;
    animation: loader 500ms linear infinite;
}

/* Media Query */

@media screen and (max-width: 40rem) {
    .profile {
        display: flex;
        flex-wrap: wrap;
        padding: 4rem 0;
    }

    .profile::after {
        display: none;
    }

    .profile-image,
    .profile-user-settings,
    .profile-bio,
    .profile-stats {
        float: none;
        width: auto;
    }

    .profile-image img {
        width: 7.7rem;
    }

    .profile-user-settings {
        flex-basis: calc(100% - 10.7rem);
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .profile-user-name {
        font-size: 2.2rem;
    }

    .profile-edit-btn {
        order: 1;
        padding: 0;
        text-align: center;
        margin-top: 1rem;
    }

    .profile-edit-btn {
        margin-left: 0;
    }

    .profile-bio {
        font-size: 1.4rem;
        margin-top: 1.5rem;
    }

    .profile-edit-btn,
    .profile-bio,
    .profile-stats {
        flex-basis: 100%;
    }

    .profile-stats {
        order: 1;
        margin-top: 1.5rem;
    }

    .profile-stats ul {
        display: flex;
        text-align: center;
        padding: 1.2rem 0;
        border-top: 0.1rem solid #dadada;
        border-bottom: 0.1rem solid #dadada;
    }

    .profile-stats li {
        font-size: 1.4rem;
        flex: 1;
        margin: 0;
    }

    .profile-stat-count {
        display: block;
    }
}

/* Spinner Animation */

@keyframes loader {
    to {
        transform: rotate(360deg);
    }
}

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
    .profile {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, auto);
        grid-column-gap: 3rem;
        align-items: center;
    }

    .profile-image {
        grid-row: 1 / -1;
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

    .profile-image,
    .profile-user-settings,
    .profile-stats,
    .profile-bio,
    .gallery-item,
    .gallery {
        width: auto;
        margin: 0;
    }

    @media (max-width: 40rem) {
        .profile {
            grid-template-columns: auto 1fr;
            grid-row-gap: 1.5rem;
        }

        .profile-image {
            grid-row: 1 / 2;
        }

        .profile-user-settings {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
        }

        .profile-edit-btn,
        .profile-stats,
        .profile-bio {
            grid-column: 1 / -1;
        }

        .profile-user-settings,
        .profile-edit-btn,
        .profile-settings-btn,
        .profile-bio,
        .profile-stats {
            margin: 0;
        }
    }
}
</style>