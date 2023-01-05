<template>
    <div class="col-full">
        <form @submit.prevent="save" action="">
            <div class="form-group">
                <textarea v-model="postText" name="" id="" rows="8" cols="110"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-green">Submit Post</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            postText: '',
        };
    },
    methods: {

        save() {

            const post = {
                text: this.postText,
            }

            this.$emit('save', { post })
            this.postText = '';
        }

    },
}
</script>
<style scoped>

</style>