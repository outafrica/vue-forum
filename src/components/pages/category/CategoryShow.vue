<template>
    <div class="col-full push-top">
        <h1>{{ getCategory.name }}</h1>
    </div>

    <forum-list :forums="getForumByCategory(getCategory)" :categoryName="getCategory.name"
        :categoryId="getCategory.id" />



</template>
<script>
import ForumList from '../forum/ForumList.vue'
export default {
    props: {
        id: {
            reuired: true,
            type: String,
        },
    },
    components: {
        ForumList,
    },
    computed: {
        forums() {
            return this.$store.state.sourceData.forums;
        },
        categories() {
            return this.$store.state.sourceData.categories;
        },
        getCategory() {
            return this.categories.find(category => category.id === this.id);
        },

    },
    methods: {
        getForumByCategory(category) {

            return this.forums.filter(forum => forum.categoryId === category.id);

        },
    }
}
</script>
<style scoped>

</style>