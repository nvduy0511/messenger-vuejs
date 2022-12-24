<template>
    <Header />

    <div class="container">

        <div>
            <div class="left">
                <ul>
                    <li>Chỉnh sửa thông tin</li>
                    <!-- <li>Thay</li> -->
                </ul>
            </div>
            <div class="right">
                <div class="infoAvatar">
                    <img :src="this.info.avatar" alt="avatar" />
                    <div>
                        <p class="userName">{{ this.info.username }}</p>
                        <p v-on:click="this.openChangePhoto = true" class="changePhoto">Thay đổi hình</p>
                    </div>
                </div>

                <div class="infoInput">
                    <div>
                        <aside>
                            <label for="name">Tên tài khoản</label>
                        </aside>
                        <input :value="this.info.username" @change="updateUserName($event.target.value)" />
                    </div>

                    <div>
                        <aside>
                            <label for="name">Mô tả</label>
                        </aside>
                        <textarea :value="this.info.bio !== undefined ? this.info.bio : ''"
                            @change="updateValue($event.target.value)"></textarea>
                    </div>

                    <div>
                        <aside>
                            <label for="name"></label>
                        </aside>
                        <button v-on:click="saveChangeInfo()">Lưu chỉnh sửa</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

    <Backdrop v-if="this.openChangePhoto" @open="this.openChangePhoto = false" />
    <ChangeAvatar v-if="this.openChangePhoto" :info="this.info" :method="close" />
</template>

<script>
import Header from './components/Header/Header.vue';
import Backdrop from './components/Backdrop.vue';
import ChangeAvatar from './components/InfoUser/ChangeAvatar.vue';
import { getDataFromStorage } from './database/storage';
import { firestoreDb } from './database/index';
import { collection, doc, setDoc } from "firebase/firestore";

export default ({
    name: 'Edit',
    components: {
        Header,
        Backdrop,
        ChangeAvatar,
    },
    data: () => ({
        openChangePhoto: false,
        info: {},
    }),
    mounted() {
        getDataFromStorage(firestoreDb, 'users')
            .then(res =>
                res.filter(i => {
                    if (i.id === JSON.parse(localStorage.getItem('user')).id) {
                        return this.info = i;
                    }
                }))
    },
    methods: {
        close() {
            this.openChangePhoto = !this.openChangePhoto;
        },
        updateValue(e) {
            if (this.info.bio === undefined) {
                const data = { ...this.info, bio: e };
                console.log(data)
                return this.info = data;
            } else {
                this.info.bio = e;
            }
        },
        updateUserName(e) {
            this.info.username = e;
        },
        async saveChangeInfo() {
            // console.log(this.info)
            await setDoc(doc(firestoreDb, "users", this.info.id), this.info);
            alert('Chỉnh sửa thông tin thành công!');
        }
    },
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');

:root {
    --ig-primary-text: 38, 38, 38;
}



* {
    font-family: 'Roboto Slab', serif;
}

.container {
    width: 100%;
    height: 100vh;
    /* background-color: red; */
    margin-top: 70px;
    padding: 20px 15%;
}

.container>div {
    width: auto;
    height: 600px;
    display: flex;
    flex-direction: row;
    border: 0.5px solid rgb(218, 217, 217);
    /* background-color: aqua; */
}

.left {
    width: 25%;
    border: 0.5px solid rgb(218, 217, 217);
    padding: 10px 10px;
    /* background-color: red; */
}

.left>ul {
    font-family: 'Roboto Slab', serif;
    font-weight: 500;
    list-style: none;
    cursor: pointer;
}

.right {
    width: 75%;
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    padding: 40px 0;
    flex-direction: column;
    border: 0.5px solid rgb(218, 217, 217);
    gap: 20px;
    /* background-color: aqua; */
}

.infoAvatar {
    display: flex;
    flex-direction: row;
    gap: 30px;
    padding-left: 104px;
    align-items: center;
}

.infoAvatar>img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.userName {
    font-size: 25px;
}

.changePhoto {
    color: #0095F6;
    margin-top: 2px;
    font-size: 14px;
    cursor: pointer;
}

.infoInput {
    align-items: stretch;
    border: 0;
    display: flex;
    flex-direction: column;
    font: inherit;
    font-size: 100%;
    margin: 0;
    margin-bottom: 16px;
    margin-top: 16px;
    padding: 0;
    vertical-align: baseline;
}

.infoInput>div {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
}

.infoInput>div>aside {
    box-sizing: border-box;
    color: rgb(38, 38, 38);
    flex: 0 0 194px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 6px;
}

.infoInput>div>input {
    background: transparent;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    box-sizing: border-box;
    color: rgb(var(--ig-primary-text));
    flex: 0 1 355px;
    font-size: 16px;
    height: 32px;
    padding: 0 10px;
    width: 100%;
}

.infoInput>div>textarea {
    background: transparent;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    box-sizing: border-box;
    color: rgb(var(--ig-primary-text));
    flex: 0 1 355px;
    font-size: 16px;
    height: 200px;
    padding: 0 10px;
    width: 100%;
}

.infoInput>div>input:focus {
    border: 1px solid rgb(219, 219, 219);
}

.infoInput>div>button {
    background-color: rgba(0, 149, 246);
    /* opacity: 1; */
    border-radius: 4px;
    color: rgb(255, 255, 255);
    padding: 5px;
}

@media screen and (min-width: 736px) {
    .infoInput>div>aside {
        padding-left: 52px;
        padding-right: 32px;
        text-align: right;
    }
}
</style>