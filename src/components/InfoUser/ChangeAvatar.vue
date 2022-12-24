<template>

    <div class="contai">

        <div class="up">

            <div class="file-search-button">
                <label for="file-upload" class="custom-file-upload">
                    Chọn ảnh từ máy
                </label>
                <input id="file-upload" type="file" @change=uploadImage />
            </div>


        </div>
    </div>

</template>

<script>
import { storage, firestoreDb } from '../../database/index';
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export default ({
    props: ['info','method'],
    data: () => ({
        fileImage: null,
    }),
    mounted() {

    },
    methods: {
        uploadImage(e) {
            const image = e.target.files[0];
            // const reader = new FileReader();
            // this.fileImage = image;
            // console.log(image)
            // reader.readAsDataURL(image);
            // reader.onload = e => {
            //     this.previewImage = e.target.result;
            //     // console.log(this.previewImage);
            // };

            const handleUpdate = async (url) => {

                this.info.avatar = url;
                console.log(this.info)
                await setDoc(doc(firestoreDb, "users", this.info.id), this.info);
                localStorage.setItem('user', JSON.stringify(this.info))
                this.method();
            }


            const upload = async (image) => {
                // console.log(image.name)

                const storageRef = ref(storage, "images/" + image.name);
                // 'file' comes from the Blob or File API
                await uploadBytes(storageRef, image).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    getDownloadURL(snapshot.ref).then((url) => {
                        // console.log(url)
                        handleUpdate(url);
                    })
                });
            };
            upload(image);
        },
        
    }
})

</script>

<style scoped>
.contai {
    position: fixed;
    z-index: 12;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    align-items: center;
    transform: translate(-50%, -50%);
    width: 383px;
    height: 231px;
    background-color: white;

}

.up {
    /* margin: 0 auto; */
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