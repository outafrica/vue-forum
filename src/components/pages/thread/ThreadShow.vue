<template>
    <div class="col-large push-top">
        <h1>{{ thread.title }}
            <router-link class="btn-green btn-small" :to="{ name: 'threadedit', id: thread.id }">
                Edit Thread
            </router-link>
        </h1>

        <post-list :posts="threadPosts" />

        <post-edit @save="addPost" />

    </div>
</template>


<script>
import PostList from '@/components/pages/post/PostList'
import PostEdit from '@/components/pages/post/PostEdit'
export default {
    components: {
        PostList,
        PostEdit
    },
    props: {
        id: {
            required: true,
            type: String,
        }
    },
    computed: {
        posts() {
            return this.$store.state.sourceData.posts
        },
        threads() {
            return this.$store.state.sourceData.threads
        },
        thread() {
            return this.threads.find(th => th.id === this.id); //also available in this.$route.params.id
        },
        threadPosts() {
            return this.posts.filter(post => post.threadId === this.id);
        }
    },
    methods: {

        addPost(eventData) {

            const post = {
                ...eventData.post,
                threadId: this.id,
            }

            this.$store.dispatch('addPost', post);
        }

    },
}
</script>