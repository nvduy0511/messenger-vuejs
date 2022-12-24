<template>

    <div v-bind:class="this.previewImage === null ? 'container' : 'containerWidthImage'">
        <div class="body">
            <div class="head">
                <div v-bind:class="this.previewImage !== null ? 'active' : 'noneActive'">
                    <i v-if="this.previewImage !== null" class="fas fa-long-arrow-alt-left"
                        v-on:click="this.previewImage = null"></i>
                    <h2>Tạo bài viết</h2>
                    <p v-if="this.previewImage !== null" v-on:click="handleCreatePost()">Đăng</p>
                </div>
            </div>

            <div v-if="this.previewImage === null" class="upload">
                <svg aria-label="Icon to represent media such as images or videos" class="_ab6-" color="#262626"
                    fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                    <path
                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                        fill="currentColor"></path>
                    <path
                        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                        fill="currentColor"></path>
                    <path
                        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                        fill="currentColor"></path>
                </svg>


                <div class="up">

                    <div class="file-search-button">
                        <label for="file-upload" class="custom-file-upload">
                            Chọn ảnh từ máy
                        </label>
                        <input id="file-upload" type="file" @change=uploadImage />
                    </div>


                </div>
            </div>
            <div v-else class="editPost">
                <div class="editPostImage">
                    <img :src="this.previewImage" />
                </div>
                <div class="editPostRight">
                    <div>
                        <img :src="getImage" />
                        <p>{{ getUserName }}</p>
                    </div>

                    <textarea placeholder="Viết cảm nghĩ" :value="caption"
                        @input="caption = $event.target.value"></textarea>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { storage, firestoreDb } from '../../database/index';
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default ({
    props: ['posts','method'],
    emits: ['open'],
    name: 'CreatePost',
    data: () => ({
        previewImage: null,
        caption: "",
        fileImage: null,
        link: null,

    }),
    computed: {
        getImage() {
            const user = localStorage.getItem('user')
            return JSON.parse(user).avatar;
        },
        getUserName() {
            const user = localStorage.getItem('user')
            return JSON.parse(user).username;
        }
    },
    methods: {
        uploadImage(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            this.fileImage = image;
            // console.log(image)
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.previewImage = e.target.result;
                // console.log(this.previewImage);
            };
        },
        handleCaption(value) {
            this.caption = value;
        },
        async handleCreatePost() {
            const date = new Date(Date.now());
            const handleCreate = async (url) => {

                const object = {
                    idAuthor: JSON.parse(localStorage.getItem('user')).id,
                    author: JSON.parse(localStorage.getItem('user')).username,
                    dateCreate: date.toUTCString(),
                    image: url,
                    avatar: JSON.parse(localStorage.getItem('user')).avatar,
                    likes: 0,
                    comments: 0,
                    title: this.caption
                }
                const docRef = await addDoc(collection(firestoreDb, "posts"), object)

                const idPost = docRef.id;
                this.method()
                this.posts.unshift({...object, idPost});
            }

            const storageRef = ref(storage, "images/" + this.fileImage.name);
            // 'file' comes from the Blob or File API
            await uploadBytes(storageRef, this.fileImage).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then((url) => {
                    // console.log(url)
                    handleCreate(url);
                })
            });
        }
    }
})

</script>

<style scoped>
body {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu,
        Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: #fafafa;
}

.container {
    position: fixed;
    z-index: 12;
    top: 50%;
    left: 50%;
    padding: 20px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    width: 483px;
    height: 531px;
}

.containerWidthImage {
    position: fixed;
    z-index: 12;
    top: 50%;
    left: 50%;
    padding: 20px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 531px;
    transition: width 1s;
}

.body {
    background-color: white;
    border-radius: 10px;
    width: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.noneActive {
    text-align: center;
    width: inherit;
    font-size: 12px;
}

.head {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 36px;
    padding-top: 10px;
}

.head>.active {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

}

.head>.active>h2 {
    font-size: 16px;
    color: #262626;
}

.active>i {
    color: rgb(0, 149, 246);
    cursor: pointer;
}

.active>p {
    color: rgb(0, 149, 246);
    cursor: pointer;
}

.head::after {
    content: "";
    width: inherit;
    margin-top: 1px;
    box-sizing: border-box;
    height: 1px;
    background-color: black;
}

.upload {
    width: inherit;
    height: inherit;
    padding-bottom: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

.editPost {
    width: inherit;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 10px;
}

.editPostImage  {
    display: block;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: black;
    position: relative;
}
.editPostImage > img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
    position: absolute;
}

.editPostRight>div {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
}

.editPostRight>div>img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.editPostRight>textarea {
    width: 90%;
    height: 250px;
    margin-top: 5px;
    overflow: auto;
    resize: none;
    border: none;
    outline: none;
}

.up {
    margin: 0 auto;
    text-align: center;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    color: rgb(255, 255, 255);
    display: inline-block;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgb(0, 149, 246);
    border: none;
    font-weight: bold;
}
</style>
