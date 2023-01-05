<template>
    <div class="container">
        <div class="flex-grid">
            <div class="col-3 push-top">

                <profile-card v-if="!isEdit" :user="user" />
                <profile-edit v-else :user="user" />

                <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

                <div class="text-center">
                    <hr>
                    <router-link :to="{ name: 'editprofile' }" class="btn-green btn-small" v-if="!isEdit">Edit
                        Profile
                    </router-link>
                </div>

            </div>

            <div class="col-7 push-top">

                <div class="profile-header">
                    <span class="text-lead">
                        {{ user.username }}'s recent activity
                    </span>
                    <a href="#">See only started threads?</a>
                </div>

                <hr>

                <post-list :posts="user.posts" />

                <!-- <div class="activity-list">
                    <div class="activity">
                        <div class="activity-header">
                            <img src="https://i.imgur.com/OqlZN48.jpg" alt="" class="hide-mobile avatar-small">
                            <p class="title">
                                How can I chop onions without crying?
                                <span>Joker started a topic in Cooking</span>
                            </p>

                        </div>

                        <div class="post-content">
                            <div>
                                <p>I absolutely love onions, but they hurt my eyes! Is there a way where you can chop
                                    onions without crying?</p>
                            </div>
                        </div>

                        <div class="thread-details">
                            <span>4 minutes ago</span>
                            <span>1 comments</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

    <div class="forum-stats desktop-only">
        <hr>
        <ul>
            <li><i class="fa fa-user-circle-o"></i>47 users online</li>
            <li><i class="fa fa-user-o"></i>497 users registered</li>
            <li><i class="fa fa-comments-o"></i>49 threads</li>
            <li><i class="fa fa-comment-o"></i>763 posts</li>
        </ul>
    </div>
</template>
<script>
import PostList from '../post/PostList.vue'
import ProfileCard from './ProfileCard.vue';
import ProfileEdit from './ProfileEdit.vue';
import { mapGetters } from 'vuex';
export default {
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        PostList,
        ProfileCard,
        ProfileEdit,
    },
    computed: {
        ...mapGetters({
            user: 'getAuthUser',
        }),
    }


}
</script>
<style scoped>

</style>