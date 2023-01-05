<template>
    <div class="col-full push-top">

        <h1>Update<i>{{ thread.title }}</i></h1>

        <thread-editor :thread="passThread" @save="save" @cancel="cancel"></thread-editor>

    </div>
</template>
<script>
import ThreadEditor from './ThreadEditor.vue';
export default {
    components: {
        ThreadEditor,
    },
    props: {
        id: {
            required: true,
            type: String,
        }
    },
    computed: {
        thread() {
            return this.$store.state.sourceData.threads.find(thread => thread.id === this.id);
        },
        threadText() {
            return this.$store.state.sourceData.posts.find(post => post.id === this.thread.posts[0]).text;
        },
        passThread() {
            return {
                title: this.thread.title,
                text: this.threadText,
            };
        }
    },
    methods: {
        async save(thread) {
            // dispatch vuex action
            thread.id = this.id;
            const result = await this.$store.dispatch('updateThread', { ...thread });
            this.$router.push({ name: 'threadshow', params: { id: result.id } });
        },
        cancel() {
            this.$router.push({ name: 'threadshow', params: { id: this.id } });
        },
    },
}
</script>

<style scoped>

</style>