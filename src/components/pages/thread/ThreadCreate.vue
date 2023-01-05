<template>
    <div class="col-full push-top">

        <h1>Create new thread in <i>{{ forum.name }}</i></h1>

        <thread-editor @save="save" @cancel="cancel"></thread-editor>

    </div>
</template>
<script>
import ThreadEditor from './ThreadEditor.vue';
export default {
    components: {
        ThreadEditor,
    },
    props: {
        forumId: {
            required: true,
            type: String,
        }
    },
    computed: {

        forum() {
            return this.$store.state.sourceData.forums.find(forum => forum.id === this.forumId);
        }
    },
    methods: {
        async save(thread) {
            // dispatch vuex action
            thread.forumId = this.forumId;
            const result = await this.$store.dispatch('addThread', { ...thread });
            this.$router.push({ name: 'threadshow', params: { id: result.id } });
        },
        cancel() {
            this.$router.push({ name: 'forumshow', params: { id: this.forumId } });
        },
    },
}
</script>

<style scoped>

</style>