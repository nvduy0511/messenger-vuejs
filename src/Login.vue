<template>
    <div class="container" >
        <div id="firebaseui-auth-container" class="m-auto" />
    </div>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth } from 'firebase/auth'
import { uiConfig } from './configs/firebaseConfig'
const auth = getAuth()
export default {
    data () {
      return {
        dialog: false,
      }
    },
    setup() {
        const user = ref('nvduy')
        var ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
        return { user }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>
