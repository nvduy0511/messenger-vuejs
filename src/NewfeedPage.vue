<template>

    <Header :posts="this.posts"></Header>
    <main>
        <div class="container">
            <div class="col-9">
                <div v-if="this.listFollow.length > 0" class="statuses">
                    <div v-for="item in this.listFollow"
                        style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <router-link :to="{ name: 'account', params: { id: item.idFollowers } }">
                            <div class="status">
                                <div class="image">
                                    <img :src="item.avatar" alt="img3">
                                </div>
                            </div>
                        </router-link>
                        <div style="text-align: center; margin-left: 10px; font-size: 10px;">{{ item.nameFollowers }}
                        </div>
                    </div>

                    <div v-on:click="scroll_left()" class="scrollLeft">
                        <i class="fas fa-angle-left"></i>
                    </div>

                    <div v-on:click="scroll_right()" class="scrollRight">
                        <i class="fas fa-angle-right"></i>
                    </div>
                </div>

                <!-- Code for viewing the Post -->
                <div v-for="post in posts" class="card">
                    <div class="top">
                        <router-link :to="{ name: 'account', params: { id: post.idAuthor } }">
                            <div class="userDetails">
                                <div class="profilepic">
                                    <div class="profile_img">
                                        <div class="image">
                                            <img :src="post.avatar" alt="img8">
                                        </div>
                                    </div>
                                </div>
                                <h3>{{ post.author }}
                                    <!-- <br>
                                    <span>Mumbai, India</span> -->
                                </h3>
                            </div>
                        </router-link>

                        <div>
                            <span class="dot">
                                <i class="fas fa-ellipsis-h"></i>
                            </span>
                        </div>
                    </div>

                    <div class="imgBx">
                        <img v-bind:src="post.image" alt="post-1" class="cover">
                    </div>

                    <div class="bottom">
                        <div class="actionBtns">
                            <div class="left">
                                <span class="heart" v-on:click="handleLikePost(post.id)">
                                    <span>
                                        <svg v-if="handleLikePostStatus(post.id) === false" aria-label="Like"
                                            color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48"
                                            width="24">
                                            <!-- Coordinate path -->

                                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4
												11.5 0 6.8-5.9 11-11.5 16S25 41.3 24
												41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3
												11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3
												1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9
												1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9
												1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1
												0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3
												1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3
												1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2
												7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6
												48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                                            </path>
                                        </svg>

                                        <svg v-else aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956"
                                            height="24" role="img" viewBox="0 0 48 48" width="24">
                                            <path
                                                d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                                            </path>
                                        </svg>
                                    </span>
                                </span>

                                <label v-on:click="handleWatchAllComment(post.id)">
                                    <svg aria-label="Comment" class="_8-yf5 " color="#262626" fill="#262626" height="24"
                                        role="img" viewBox="0 0 48 48" width="24">

                                        <!-- Coordinate path -->
                                        <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5
                                            11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0
                                            7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0
                                            4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1
                                            8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10
                                            2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5
                                            44.5 12.7 44.5 24z" fill-rule="evenodd">
                                        </path>
                                    </svg>
                                </label>

                                <!-- <svg aria-label="Share Post" class="_8-yf5 " color="#262626" fill="#262626" height="24"
                                    role="img" viewBox="0 0 48 48" width="24">
                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3
										3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6
										1 1.2 1.1h.2c.5 0 1-.3
										1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2
										6.1h35.5L18 18.7 5.2 6.1zm18.7
										33.6l-4.4-18.4L42.4 8.6 23.9 39.7z">
                                    </path>
                                </svg> -->
                            </div>
                        </div>
                        <a style="cursor: pointer;" v-on:click="handleGetListLike(post.id)">
                            <p ref="likePost" class="likes">{{ post.likes }} lượt thích</p>

                        </a>
                        <a href="#">
                            <p class="message">
                                <b>{{ post.author }}</b>
                            </p>
                            <p class="message">{{ post.title }}</p>

                        </a>
                        <a style="cursor: pointer;" v-on:click="handleWatchAllComment(post.id)">
                            <h4 class="comments">Xem tất cả bình luận</h4>
                        </a>
                        <a href="#">
                            <h5 class="postTime">{{ handleDisplayTime(post.dateCreate) }}</h5>
                        </a>
                        <div class="addComments">
                            <div class="reaction">
                                <h3>
                                    <i class="far fa-smile"></i>
                                </h3>
                            </div>
                            <input type="text" v-model="message" class="text" placeholder="Nhập bình luận...">
                            <a v-on:click="handleSubmitComment(post.id)">Gửi</a>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-3">
                <div class="card">
                    <h4>Gợi ý cho bạn</h4>
                    <div v-for="item in handleDisplayFolow(listFollowers)" class="top">
                        <router-link :to="{ name: 'account', params: { id: item.idFollowing } }">
                            <div class="userDetails">
                                <div class="profilepic">
                                    <div class="profile_img">
                                        <div class="image">
                                            <img :src="item.avatarFollowing" alt="img12">
                                        </div>
                                    </div>
                                </div>
                                <h3>{{ item.nameFollowing }}<br>
                                    <span>Đang theo dõi bạn</span>
                                </h3>
                            </div>
                        </router-link>
                        <div>
                            <a v-on:click="handleFollow(item)" href="#" class="follow">Theo dõi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>



    <!-- Post detail -->
    <Backdrop v-if="openPost !== ''" @open="openPost = ''" />
    <DetailPost v-if="openPost !== ''" :key="openPost.id" :dataPost="this.openPost" :posts="this.posts"
        :likes="this.likes" :method="handleLikePost" />

    <!-- Like list -->
    <Backdrop v-if="this.openLike !== ''" @open="this.openLike = ''" />
    <ListLike v-if="this.openLike !== ''" :listLike="this.postDetailLike" />

</template>

<script>
import Backdrop from './components/Backdrop.vue';
import DetailPost from './components/NewFeedPost/DetailPost.vue';
import Header from './components/Header/Header.vue';
import { getDataFromStorage } from './database/storage'
import ListLike from './components/NewFeedPost/ListLike.vue';
import { firestoreDb } from './database/index';
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";




export default ({
    name: "homePage",
    data: () => ({
        posts: [],
        likes: [],
        postDetailLike: [],
        openPost: "",
        openLike: '',
        listFollow: [],
        listFollowers: [],
        listSearch: [],
        searchText: '',
        message: '',
    }),
    components: {
        Backdrop,
        DetailPost,
        Header,
        ListLike
    },
    mounted() {

        getDataFromStorage(firestoreDb, 'follow')
            .then(res =>
                // this.listFollow = 
                res.map(i => {
                    if (i.idFollowing === JSON.parse(localStorage.getItem('user')).id) {
                        return this.listFollow.push(i)
                    } else {
                        return this.listFollowers.push(i)
                    }
                })
            );

        const getAllPost = async () => {
            let data = [];
            const querySnapshot = await getDocs(collection(firestoreDb, "posts"));
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().dateCreate)
                return data.push({ ...doc.data(), id: doc.id });
            });
            // console.log(data);
            data.sort((a, b) => {
                // console.log(a.dateCreate.toString())
                return new Date(a.dateCreate).getTime() < new Date(b.dateCreate).getTime() ? 1 : -1;
            })
            this.posts = data;
        }

        getAllPost();

        const getLikePostForAccount = async () => {
            let data = [];
            const querySnapshot = await getDocs(collection(firestoreDb, "like"));
            querySnapshot.forEach((doc) => {
                return data.push({ ...doc.data(), id: doc.id });
            });
            // console.log(data);
            data.sort((a, b) => {
                return new Date(a.dateCreate).getTime() > new Date(b.dateCreate).getTime() ? 1 : -1;
            })
            this.likes = data;
        }

        getLikePostForAccount();

    },
    methods: {
        async handleLikePost(postId) {
            const arr = this.likes.filter(i => { return i.idPost === postId });
            if (arr.length !== 0) {
                // Trường hợp unlike

                let idToRemove = "";
                let postObject = {};

                this.posts.map(i => {
                    if (i.id === postId) {
                        i.likes = i.likes - 1;
                        return postObject = i;
                    }
                })

                await setDoc(doc(firestoreDb, "posts", postId), postObject);

                this.likes.map(i => {
                    if (i.idPost.trim().toString() === postId) {
                        // i.likes = i.likes - 1;
                        idToRemove = i.id;
                        return;
                    }
                })

                await deleteDoc(doc(firestoreDb, "like", idToRemove));

                return this.likes = this.likes.filter(i => { return i.idPost.trim().toString() !== postId })
            } else {
                // Trường hợp like
                const fetchData = async () => {

                    let object = {};

                    this.posts.map(i => {
                        if (i.id === postId) {
                            i.likes = +i.likes + 1;
                            return object = i;
                        }
                    })

                    await setDoc(doc(firestoreDb, "posts", postId), object);

                    const docRef = await addDoc(collection(firestoreDb, "like"), {
                        idPost: postId,
                        idUser: JSON.parse(localStorage.getItem('user')).id,
                        name: JSON.parse(localStorage.getItem('user')).username,
                        userName: JSON.parse(localStorage.getItem('user')).username,
                        avatar: JSON.parse(localStorage.getItem('user')).avatar
                    })
                    this.likes.push(
                        { id: docRef.id, idPost: postId, uid: JSON.parse(localStorage.getItem('user')).id }
                    )
                }

                fetchData();
            }
        },
        handleLikePostStatus(postId) {
            const checkLike = this.likes.filter((i) => { return i.idPost === postId })
            if (checkLike.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        handleWatchAllComment(postId) {
            // console.log(postId)
            this.posts.map(i => { if (i.id === postId) { return this.openPost = i } return });
            // return post;
            // const originalStyle = window.getComputedStyle(document.body).overflow;

            // document.body.style.overflow = 'hidden';
            // return () => document.body.style.overflow = originalStyle;
            // console.log(this.openPost)
        },
        async handleSubmitComment(id) {
            if (this.message !== '') {
                const dateComment = new Date();
                const handleComment = async () => {

                    const docRef = await addDoc(collection(firestoreDb, "comments"), {
                        body: this.message,
                        dateComment: dateComment,
                        name: JSON.parse(localStorage.getItem('user')).username,
                        avatar: JSON.parse(localStorage.getItem('user')).avatar,
                        postId: id,
                        dateComment: dateComment.toUTCString(),
                    })

                    this.message = '';
                }

                let postObject = null;
                this.posts.filter(i => { if (i.id === id) i.comments++; return postObject = i; return })
                // console.log(postObject)
                await setDoc(doc(firestoreDb, "posts", id), postObject);
                handleComment();
            }
            // else{
            //     alert("Bạn chưa nhập nội dung bình luận")
            // }
        },
        handleGetListLike(id) {
            this.openLike = id;
            const getListLike = async () => {
                let data = [];
                const querySnapshot = await getDocs(collection(firestoreDb, "like"));
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data());
                    if (doc.data().idPost.trim() !== id) return;
                    return data.push({ ...doc.data(), id: doc.id });
                });
                // console.log(data);
                data.sort((a, b) => {
                    return new Date(a.dateCreate).getTime() > new Date(b.dateCreate).getTime() ? 1 : -1;
                })
                this.postDetailLike = data;
            }
            getListLike()
        },
        handleDisplayTime(date) {
            const time =

                new Date(Date.now()).getDate()
                - new Date(date).getDate();
            if (time > 0) {
                return `${time} Ngày trước`;
            } else {
                const calculateTime =
                    new Date(Date.now())
                    - new Date(date);
                let day = new Date(calculateTime).toUTCString().split(' ')[4];
                let hours = day.split(':')[0];
                let minute = day.split(':')[1];
                let seconds = day.split(':')[2];
                if (+hours > 0) {
                    return `${+hours} Tiếng trước`;
                } else {
                    if (+minute > 0) {
                        return `${+minute} Phút trước`;
                    } else {
                        return `${+seconds} Giấy trước`;
                    }
                }
            }
        },
        scroll_left() {
            let content = document.querySelector(".statuses");
            content.scrollLeft -= 1000;
        },
        scroll_right() {
            let content = document.querySelector(".statuses");
            content.scrollLeft += 900;
        },
        handleDisplayFolow(arr) {
            let res = [];
            this.listFollow.map(
                a => {
                    arr.map(b => {
                        if (a.idFollowing !== b.idFollowers) {
                            res.push(b)
                        }
                    })
                }
            )
            if (res.length > 0) {
                return res
            }
            else return arr;
        },
        async handleFollow(item) {

            const obj = {
                dateFollow: new Date(Date.now()).toUTCString(),
                avatar: item.avatarFollowing,
                nameFollowers: item.nameFollowing,
                idFollowers: item.idFollowing,
                idFollowing: JSON.parse(localStorage.getItem('user')).id,
                nameFollowing: JSON.parse(localStorage.getItem('user')).username,
                avatarFollowing: JSON.parse(localStorage.getItem('user')).avatar,
            }

            await addDoc(collection(firestoreDb, "follow"), obj)

            this.listFollowers = this.listFollowers.filter(i => { return i.idFollowers !== item.idFollowers })
            this.listFollow.push(obj);
        },

    }
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
        Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: #fafafa;
}

/* Header Start */
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
    display: inline-block;
    cursor: pointer;
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

    width: 100%;
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
    align-items: center;
    gap: 20px;
    justify-content: center;
}

.action .profile {
    position: relative;
    width: 25px;
    height: 25px;
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

/* End */
/*Main Start */
main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

main .container {
    position: relative;
    margin-top: 60px;
    width: 75%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /* background: #ddd; */
}

.col-9 {
    width: 65%;
    margin-top: 30px;
}

.statuses {
    margin-bottom: 30px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px 0;
    border-radius: 2px;
    border: 1px solid rgb(218, 217, 217);
    overflow: hidden;
    scroll-behavior: smooth;
}

.statuses .status {
    display: inline-block;
    border-radius: 50%;
    overflow: auto;
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
    background: linear-gradient(to right, red, orange);
    padding: 2px;
    margin-left: 15px;
    cursor: pointer;
}

.statuses .status .image {
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

.statuses .status img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.scrollLeft {
    position: absolute;
    left: 0.5%;
    background-color: white;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
}

.scrollRight {
    position: absolute;
    right: 35.5%;
    background-color: white;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
}

.col-3 {
    width: 33%;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
}

.col-3 h4 {
    color: rgb(100, 100, 100);
}

.col-3 .card {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    /* min-height: 400px; */
    display: inline-block;
}

.col-3 .card .top {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.col-3 .card .top a {
    color: #1d92ff;
}

.col-3 .card .bottom {
    padding: 10px 20px;
}

.col-3 .card .top .userDetails {
    width: 100%;
    display: flex;
    align-items: center;
}

.col-3 .card .top .userDetails h3 {
    font-size: 16px;
    color: #4d4d4f;
    font-weight: 500;
    line-height: 1em;
}

.col-3 .card .top .userDetails h3 span {
    font-size: 0.75em;
}

.col-3 .card .top .userDetails h3 span {
    font-size: 0.75em;
}

.col-9 .card {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    /* min-height: 400px; */
    display: inline-block;
    border: 1px solid rgba(7, 7, 7, 0.24);
}

.col-9 .card .top {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.col-9 .card .bottom {
    padding: 10px 20px;
}

.col-9 .card .top .userDetails {
    width: 100%;
    display: flex;
    align-items: center;
}

.profilepic {
    display: inline-block;
    cursor: pointer;
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

.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.col-9 .card .top .userDetails h3 {
    /* width: 100%; */
    font-size: 16px;
    color: #4d4d4f;
    font-weight: 500;
    line-height: 1em;
}

.col-9 .card .top .userDetails h3 span {
    font-size: 0.75em;
}

.col-9 .card .top .userDetails h3 span {
    font-size: 0.75em;
}

.dot {
    transform: scale(0.6);
    cursor: pointer;
}

.imgBx {
    position: relative;
    width: 100%;
    min-height: 600px;
    margin: 10px 0 15px;
    background-color: black;
}

.actionBtns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actionBtns svg {
    cursor: pointer;
}

.actionBtns .left svg {
    margin-right: 8px;
}

.likes {
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
    color: #4d4d4f;
}

.message {
    font-weight: 400;
    margin-top: 5px;
    font-size: 14px;
    color: #777;
    line-height: 1.5em;
}

.message b {
    color: #262626;
}

.message span {
    cursor: pointer;
    color: #1d92ff;
}

.comments {
    margin-top: 10px;
    font-weight: 400;
    color: #999;
}

.addComments {
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding: 10px 0;
}

.addComments a {
    color: #1d92ffcb;
    font-weight: 500;
}

.addComments .reaction {
    position: relative;
    font-size: 1.3rem;
    margin-right: 10px;
    color: rgb(88, 88, 88);
}

input.text {
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
}

.postTime {
    margin-top: 8px;
    font-weight: lighter;
    color: rgb(163, 163, 163);
    font-size: 12px;
    text-transform: uppercase;
}

a {
    text-decoration: none;
}

.hidden {
    display: none;
}

/* End */
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
    .container {
        width: 100% !important;
    }

    .navbar .container {
        padding: 15px 10px !important;
    }

    .col-9 {
        margin-top: 4px;
        min-width: 100%;
    }

    .statuses {
        margin-bottom: 0px;
    }

    .scrollRight {
        position: absolute;
        right: 0.5%;
        background-color: #1d92ff;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 50%;
    }

    .col-9 .card {
        margin-bottom: 0px;
        width: 100%;
        border: none;
    }

    .imgBx {
        position: relative;
        width: 100%;
        min-height: 400px;
        margin: 10px 0 15px;
    }

    .searchbar {
        display: none;
    }
}

.footer .footer-section {
    margin-left: 0.5rem;
    color: #999999;
    font-size: 14px;
    font-family: sans-serif;
}

.footer a:hover {
    color: #ff0000;
}
</style>