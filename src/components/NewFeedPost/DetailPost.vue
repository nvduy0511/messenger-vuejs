<template>
    <div :key="dataPost.id" class="detailPost">
        <img :src="dataPost.image" />
        <div>
            <!-- <h1>{{data}}</h1> -->
            <div class="top">
                <div class="userDetails">
                    <div class="profilepic">
                        <div class="profile_img">
                            <div class="image">
                                <img :src="dataPost.avatar" alt="img8">
                            </div>
                        </div>
                    </div>
                    <h3>{{ dataPost.author }}
                        <!-- <br>
                                <span>Mumbai, India</span> -->
                    </h3>
                </div>

                <div>
                    <span class="dot">
                        <i class="fas fa-ellipsis-h"></i>
                    </span>
                </div>
            </div>

            <div class="comment">

                <div v-for="comment in comments" class="oneComment">
                    <img :src="comment.avatar" />
                    <div>
                        <div class="nameAuth">
                            <a>{{ comment.name }}</a>
                        </div>
                        <div class="body">
                            <p>{{ comment.body }}</p>
                        </div>
                    </div>
                </div>


            </div>

            <div>
                <div class="actionBtns">
                    <div class="left">
                        <span class="heart" v-on:click="handleLikePost(dataPost.id)">
                            <span>
                                <svg v-if="handleLikePostStatus(dataPost.id) === false" aria-label="Like" color="#262626"
                                    fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
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
    
                                <svg v-else aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24"
                                    role="img" viewBox="0 0 48 48" width="24">
                                    <path
                                        d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                                    </path>
                                </svg>
                            </span>
                        </span>
                        <label for="comment">
                            <svg aria-label="Comment" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
                                viewBox="0 0 48 48" width="24">
    
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
                        <svg aria-label="Share Post" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
                            viewBox="0 0 48 48" width="24">
                            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3
                                            3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6
                                            1 1.2 1.1h.2c.5 0 1-.3
                                            1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2
                                            6.1h35.5L18 18.7 5.2 6.1zm18.7
                                            33.6l-4.4-18.4L42.4 8.6 23.9 39.7z">
                            </path>
                        </svg>
                    </div>
                </div>
    
                <a href="#">
                    <p ref="likePost" class="likes">{{ dataPost.likes }} lượt thích</p>
    
                </a>
                
                <a href="#">
                    <h5 class="postTime">2 hours ago</h5>
                </a>
                <div class="addComments">
                    <div class="reaction">
                        <h3>
                            <i class="far fa-smile"></i>
                        </h3>
                    </div>
                    <input id="comment" type="text" v-model="message" class="text" placeholder="Nhập bình luận...">
                    <a v-on:click="handleSubmitComment(dataPost.id)">Gửi</a>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import { firestoreDb } from '../../database/index';
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";


export default {
    props: ['dataPost', 'posts', 'likes', 'method'],
    name: "DetailPost",
    data: () => ({
        post: {},
        // likes: [],
        comments: '',
        message: '',
        // openPost: "",
        // like: false,
    }),
    // computed: {
    //     getComment() {
    //         console.log("run")
    //         // return axios.get(`http://localhost:3000/comments?postId=${this.dataPost.id}`)
    //         // .then(response => this.comments = response.data)
    //     }
    // },
    mounted() {

        const getAllCommentForPost = async () => {
            let data = [];
            const querySnapshot = await getDocs(collection(firestoreDb, "comments"));
            querySnapshot.forEach((doc) => {
                if (doc.data().postId === this.dataPost.id) {
                    return data.push({ ...doc.data(), id: doc.id });
                }
            });
            data.sort((a, b) => {
                return new Date(a.dateComment).getTime() > new Date(b.dateComment).getTime() ? 1 : -1;
            })

            this.comments = data;
        }

        getAllCommentForPost();

    },
    unmounted() {
        // window.location.reload(true);
    },
    methods: {
        handleSubmitComment(id) {
            if (this.message !== '') {
                const dateComment = new Date();
                const handleComment = async () => {

                    const docRef = await addDoc(collection(fireStore, "comments"), {
                        body: this.message,
                        dateComment: dateComment,
                        name: "loiphan",
                        avatar: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/94788962_1735590786592292_2879927579450540032_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yeNuCcYYZXoAX9DaJTi&tn=ClkyF_n1-sJve_dM&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBkQhqaHfwigciH3tGU1NYt3PrP4v01GUK5a3bBnnX7dQ&oe=63ABD1C6",
                        postId: id,
                        dateComment: dateComment.toUTCString(),
                    })

                    this.comments.push(
                        {
                            id: docRef.id,
                            body: this.message,
                            dateComment: dateComment,
                            name: "loiphan",
                            avatar: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/94788962_1735590786592292_2879927579450540032_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yeNuCcYYZXoAX9DaJTi&tn=ClkyF_n1-sJve_dM&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBkQhqaHfwigciH3tGU1NYt3PrP4v01GUK5a3bBnnX7dQ&oe=63ABD1C6",
                            postId: id,
                            dateComment: dateComment.toUTCString(),
                        }
                    )
                    this.message = '';
                }

                handleComment();
            }
            // else{
            //     alert("Bạn chưa nhập nội dung bình luận")
            // }
        },
        handleLikePostStatus(postId) {
            const checkLike = this.likes.filter((i) => { return i.idPost === postId })
            if (checkLike.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        handleLikePost(postId) {
            this.method(postId);
        },
    }
}
</script>

<style scoped>
.detailPost {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 92vh;
    /* overflow-y: scroll; */
    display: flex;
    flex-direction: row;
    /* box-sizing: border-box; */
    background: white;
}

.detailPost>img {
    width: 50%;
    height: inherit;
}

.detailPost>div {
    width: 50%;
    height: inherit;
}

.top {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top a {
    color: #1d92ff;
}

.top .userDetails {
    width: 100%;
    display: flex;
    align-items: center;
}

.top .userDetails h3 {
    font-size: 16px;
    color: #4d4d4f;
    font-weight: 500;
    line-height: 1em;
}

.top .userDetails h3 span {
    font-size: 0.75em;
}

.top .userDetails h3 span {
    font-size: 0.75em;
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

.userDetails h3 {
    /* width: 100%; */
    font-size: 16px;
    color: #4d4d4f;
    font-weight: 500;
    line-height: 1em;
}

.userDetails h3 span {
    font-size: 0.75em;
}

.userDetails h3 span {
    font-size: 0.75em;
}

/* Comment */
.comment {
    width: 100%;
    height: 69%;
    padding: 0px 12px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.comment::-webkit-scrollbar {
    display: none;
}

.oneComment {
    display: flex;
    width: inherit;
    gap: 20px;
    height: fit-content;

}

.oneComment>img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.oneComment>div {
    display: inline-block;
}

.body {
    display: block;
}

.body>p {
    display: inline;
    word-wrap: break-word;
    font-size: 14px;
    color: #262626;
}

.actionBtns {
    display: flex;
    padding: 0px 12px;
    /* gap: 20px; */
    justify-content: space-between;
    align-items: center;
}

.actionBtns svg {
    cursor: pointer;
}

.actionBtns .left svg {
    margin-right: 20px;
}

.likes {
    font-weight: 500;
    text-decoration: none;
    padding: 0px 12px;
    font-size: 14px;
    color: #4d4d4f;
}

.postTime {
    text-decoration: none;
    padding: 0px 12px;
    color: #4d4d4f;
}

a {
    text-decoration: none;
}

.addComments {
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding: 10px 10px;
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

@media screen and (max-width: 1000px) {
    .detailPost {
        width: 85%;
        height: 40%;
    }
}

@media screen and (max-width: 600px) {
    .detailPost {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 20;
        transform: translate(-50%, -50%);
        width: 70vw;
        height: 72vh;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 10px;
    }

    .detailPost>img {
        width: auto;
        height: inherit;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .comment {
        display: none;
    }

    .actionBtns {
        display: flex;
        width: 100%;
        padding: 0px 12px;
        /* gap: 20px; */
        justify-content: space-between;
        align-items: center;
    }
}
</style>