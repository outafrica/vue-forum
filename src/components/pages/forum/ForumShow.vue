<template>
    <div class="col-full push-top">
        <div class="forum-header">
            <div class="forum-details">
                <h1>{{ forum.name }}</h1>
                <p class="text-lead">{{ forum.description }}</p>
            </div>
            <router-link :to="{ name: 'threadcreate', params: { 'forumId': forum.id } }" :forum="forum"
                class="btn-green btn-small">Start a
                thread</router-link>
        </div>
    </div>

    <thread-list :threads="threads" />

</template>
<script>
import ThreadList from '../thread/ThreadList.vue';
export default {
    components: { ThreadList, },
    props: {
        id: {
            required: true,
            type: String,
        }
    },
    computed: {
        forum() {
            return this.$store.state.sourceData.forums.find(forum => forum.id === this.id);
        },
        threads() {
            return this.$store.state.sourceData.threads.filter(thread => thread.forumId === this.id);
        }
    },
}
</script>

<style scoped>

</style>