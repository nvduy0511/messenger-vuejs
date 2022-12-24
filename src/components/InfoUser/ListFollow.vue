<template>

    <div class="container">
        <h1>{{ this.type === 'Followers' ? 'Người theo dõi' : 'Người đang theo dõi' }}</h1>
        <div class="line"></div>
        <div class="list">

            <div v-if="this.type === 'Followers'" v-for="i in this.followers" class="item">
                <img :src="i.avatarFollowing" alt="avatar">
                <div>
                    <router-link :to="{ name: 'account', params: { id: i.idFollowing } }" style="text-decoration: none;">
                        <p class="userName">{{ i.nameFollowing }}</p>
                        <!-- <p class="name" >{{i.name}}</p> -->
                    </router-link>
                </div>
            </div>


            <div v-if="this.type !== 'Followers'" v-for="i in this.following" class="item">
                <img :src="i.avatar" alt="avatar">
                <div>
                    <router-link :to="{ name: 'account', params: { id: i.idFollowers } }" style="text-decoration: none;">
                        <p class="userName">{{ i.nameFollowers }}</p>
                        <!-- <p class="name" >{{i.name}}</p> -->
                    </router-link>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

export default ({
    props: ['type', 'followers', 'following'],
    data: () => ({

    }),
    mounted(){
        console.log(this.followers)
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');

.container {
    width: 400px;
    height: 400px;
    background-color: white;
    z-index: 22;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    display: block;
    padding: 10px 6px;
    /* overflow-y: scroll; */
    /* border-left: 20px; */
}

h1 {
    margin: 0;
    text-align: center;
    font-family: 'Roboto Slab', serif;
    font-size: 18px;
    color: #262626;
}

.line {
    padding: 0 20px;
    width: auto;
    background-color: black;
    margin: 10px 0;
    height: 1px;
    color: rgb(142, 142, 142);

}

.list {
    overflow-y: scroll;
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 10px;
}

.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.item>img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
}

.item>div>p {
    margin: 0;
    padding: 0;
    font-family: 'Roboto Slab', serif;
}

.userName {
    color: #262626;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
}

.name {
    color: rgb(142, 142, 142);
    font-size: 14px;
    font-weight: 400px;
}
</style>