<template>
    <header>
        <nav class="navbar">
            <div class="container">
                <router-link to="/" style="text-decoration: none;">
                    <div class="logo">
                        <img src="../../assets/logo_transparent.png" />
                    </div>
                </router-link>
                <div class="searchbar">
                    <svg aria-label="Search" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img"
                        viewBox="0 0 24 24" width="16">
                        <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                    </svg>
                    <tippy interactive :animate-fill="false" aria-expanded="true" placement="bottom" distant="6"
                        theme="light" animation="fade" trigger="click" style="width: 100%">
                        <template #default>

                            <input type="text" :value="searchText"
                                @input="debounce(() => { handleSearch($event.target.value) })" class="search"
                                placeholder="Tìm kiếm..." />
                        </template>
                        <template #content>
                            <SearchRes :listSearch="this.listSearch" />
                        </template>
                    </tippy>
                </div>

                <div class="nav-links">
                    <ul class="nav-group">
                        <li>
                            <router-link to="/">
                                <svg aria-label="Home" class="_ab6-" color="#262626" fill="#262626" height="24"
                                    role="img" viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z">
                                    </path>
                                </svg>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/chat">
                                <svg aria-label="Direct" class="_ab6-" color="#262626" fill="#262626" height="24"
                                    role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                                        x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                    <polygon fill="none"
                                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                        stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                </svg>
                            </router-link>
                        </li>

                        <li v-on:click="this.createNewPost = true">
                            <svg aria-label="New post" class="_ab6-" color="#262626" fill="#262626" height="24"
                                role="img" viewBox="0 0 24 24" width="24">
                                <path
                                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2">
                                </path>
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                            </svg>
                        </li>

                        <li>

                            <tippy interactive :animate-fill="false" aria-expanded="true" placement="bottom" distant="6"
                                theme="light" animation="fade" trigger="click" style="width: 100%">
                                <template #default>
                                    <div class="profilepic">
                                        <div class="profile_img">
                                            <div class="image">
                                                <img :src="getAvatar" alt="img8">
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #content>
                                    <!-- <SearchRes :listSearch="this.listSearch" /> -->
                                    <div class="userNavbar">
                                        <ul>
                                            <li v-on:click="redirectId" >
                                                <!-- <router-link :to="{ name: 'account', params: { idU: getId } }" -->
                                                    <!-- style="text-decoration: none; color: rgb(172, 172, 172);"> -->
                                                    <i class="far fa-user-circle"></i>
                                                    <span style="margin-left: 10px;">Tài khoản</span>
                                                <!-- </router-link> -->
                                            </li>
                                            <li v-on:click="handleLogOut()">
                                                <!-- <router-link to="/login"> -->
                                                Đăng xuất
                                                <!-- </router-link> -->
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </tippy>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hiện thị khung tạo bài viết mới -->
    <Backdrop v-if="this.createNewPost" @open="createNewPost = !createNewPost" />
    <CreateNewPost v-if="this.createNewPost" :posts="this.posts" :method="closeCreatePost" />

</template>

<script>

// import axios from 'axios';
import SearchRes from './SearchRes.vue';
import Backdrop from '../../components/Backdrop.vue';
import CreateNewPost from '../CreateNewPost/CreateNewPost.vue';
import { directive, Tippy } from 'vue-tippy';
import { firestoreDb } from '../../database/index';
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";

function createDebounce() {
    let timeout = null;
    return function (fnc, delayMs) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}

export default ({
    props: ['posts'],
    name: 'Header',
    data: () => ({
        listSearch: [],
        searchText: '',
        createNewPost: false,
        idUser: null,
        debounce: createDebounce(),
    }),
    components: {
        SearchRes,
        Tippy,
        CreateNewPost,
        Backdrop,
    },
    directives: {
        tippy: directive,
    },
    methods: {
        handleSearch(value) {
            const fetchData = async () => {

                let data = [];
                const querySnapshot = await getDocs(collection(firestoreDb, "users"));
                querySnapshot.forEach((doc) => {
                    if (doc.data().username === value) {
                        return data.push({ ...doc.data(), id: doc.id });
                    }
                });
                // console.log(data);
                this.listSearch = data;
            }
            this.searchText = value;
            fetchData();
        },
        closeCreatePost() {
            this.createNewPost = !this.createNewPost;
        },
        redirectId() {
            this.$router.push({
                name: 'account',
                params: {
                    id: JSON.parse(localStorage.getItem('user')).id
                }
            })
        },
        handleLogOut(){
            localStorage.clear();
            this.$router.push('/login');
            window.location.reload(true)
        }
    },
    computed: {
        getAvatar() {
            return JSON.parse(localStorage.getItem('user')).avatar;
        }
    }
})

</script>

<style  scoped>
.navbar {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    width: 100%;
    height: 70px;
    border: 1px solid rgb(218, 217, 217);
}

.navbar .container {
    /* background-color: #555; */
    padding: 15px 0;
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin: 0 auto; */
}

.container .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.logo>img {
    width: 90px;
}

.searchbar {
    /* width: -10%;
    text-align: end; */
    width: 384px;
    height: 36px;
    background: #EFEFEF;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    padding: 0px 10px;
    align-items: center;
}

.search {
    /* background-color: #fafafa;
    padding: 5px;
    text-indent: 21px;
    outline: none;
    border: 1px solid rgb(218, 217, 217);
    border-radius: 2px;
    color: rgb(77, 77, 77); */

    width: inherit;
    background-color: #EFEFEF;
    border-style: none;
}

.searchbar input:focus {
    outline: none;
}

.searchbar img {
    position: absolute;
    margin-left: -10.5rem;
    margin-top: 0.25rem;
}

.searchbar input::placeholder {
    font-weight: lighter;
    color: rgb(172, 172, 172);
}

.nav-links {
    font-weight: lighter;
    color: rgb(172, 172, 172);
    /* background: #333 ; */
}

.nav-group .nav-item {
    list-style-type: none;
    margin: 0 8px;
}

.nav-group .nav-item a {
    font-size: 22px;
    display: block;
    color: black;
}

.nav-group {
    list-style: none;
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 20px;
    justify-content: center;
}

.action .profile {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profilepic .profile_img {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    background: linear-gradient(to right, red, orange);
    padding: 2px;
    margin-right: 8px;
    cursor: pointer;
}

.profilepic .profile_img .image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
}

.profilepic .profile_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* input.text {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    color: #262626;
    background: none;
}

input.text::placeholder {
    color: #777;
} */
.userNavbar {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    height: fit-content;
    width: 200px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-decoration: none;
}

.userNavbar ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@media screen and (max-width: 1000px) {
    .col-9 {
        width: 100%;
        background: #fafafa;
    }

    .col-3 {
        display: none;
    }
}

@media screen and (max-width: 600px) {

    .searchbar {
        display: none;
    }
}
</style>