<template>

    <div class="col-full">
        <div class="forum-list">

            <h2 class="list-title">
                <router-link v-if="categoryId" :to="{name: 'categoryshow', params: {id: categoryId,}}">{{categoryName}}</router-link>
                <span v-else> {{categoryName}}</span>
            </h2>

            <div class="forum-listing" v-for="forum in forums" :key="forum.id">
                <div class="forum-details">
                    <router-link class="text-xlarge" :to="{name: 'forumshow', params: {id: forum.id}}">
                        {{forum.name}}
                    </router-link>
                    <p>{{forum.description}}</p>
                </div>

                <div class="threads-count">
                    <p>
                        <span class="count">
                            {{forum.threads?.length ? forum.threads?.length : 0}}
                        </span>
                        {{forum.threads?.length ? forum.threads?.length > 1 ? 'threads' : 'thread' : 'threads'}}
                    </p>
                </div>

                <div class="last-thread">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        forums: {
            required: true,
            type: Array,
        },
        categoryName: {
            required: false,
            type: String,
            default: 'Forums',
        },
        categoryId: {
            required: false,
            type: String,
        }
    }

}
</script>
<style scoped>

</style>