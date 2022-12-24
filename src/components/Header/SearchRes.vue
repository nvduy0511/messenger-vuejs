<template #content >
    <div class="containerSearch">

        <div v-for="item in this.listSearch" :key="item.id" v-on:click="redirectId(item.id)" class="searchItem">
            <img :src="item.avatar" />
            <div>
                <p class="userName">{{ item.username }}</p>
                <!-- <p class="name">{{ item.name }}</p> -->
            </div>
        </div>

    </div>
</template>
<script>
import { Tippy } from 'vue-tippy';

export default ({
    props: ['listSearch'],
    name: "SearchRes",
    components: [Tippy],
    data: () => ({
        listRes: [],
    }),
    methods: {
        redirectId(id) {
            this.$router.push({
                name: 'account',
                params: {
                    id: id
                }
            })
        }
    },
})
</script>

<style scoped>
.containerSearch {
    width: 400px;
    height: 300px;
    background-color: white;
    border-radius: 7px;
    margin-top: 20px;
    margin-left: -11%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
}

.searchItem {
    /* background-color: red; */
    z-index: 10;
    display: flex;
    margin-left: 0;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    cursor: pointer;

}

.searchItem>img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline;
    /* margin-left: 100px; */
}

.searchItem>div p {
    margin: 0;
    padding: 0;
    /* width: 100px; */
}

.userName {
    color: rgb(38, 38, 38);
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