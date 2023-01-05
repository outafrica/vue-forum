<template>
    <forum-list v-for="category in categories" :key="category.id" :forums="getForumByCategory(category)"
        :categoryName="category.name" :categoryId="category.id" />
</template>
<script>
import ForumList from '../forum/ForumList.vue'
export default {
    components: { ForumList },
    props: {
        categories: {
            required: true,
            type: Object,
        }

    },
    computed: {
        forums() {
            return this.$store.state.sourceData.forums;
        }
    },
    methods: {
        getForumByCategory(category) {

            return this.forums.filter(forum => forum.categoryId === category.id);

        },

    },
}
</script>
<style scoped>

</style>