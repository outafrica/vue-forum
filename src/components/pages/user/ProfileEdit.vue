<template>
    <div class="col-3 push-top">
        <div class="profile-card">
            <form @submit.prevent="save">
                <p class="text-center">
                    <img :src="user.avatar" :alt="`${user.username} profile picture`" class="avatar-xlarge">
                </p>

                <div class="form-group">
                    <input type="text" v-model="profile.username" placeholder="Username"
                        class="form-input text-lead text-bold">
                </div>

                <div class="form-group">
                    <input type="text" v-model="profile.name" placeholder="Full Name" class="form-input text-lead">
                </div>

                <div class="form-group">
                    <label for="user_bio">Bio</label>
                    <textarea v-model="profile.bio" class="form-input" id="user_bio"
                        placeholder="Write a few words about yourself."></textarea>
                </div>

                <div class="stats">
                    <span>{{ user.postsCount }} posts</span>
                    <span>{{ user.threadsCount }} threads</span>
                </div>

                <hr>

                <div class="form-group">
                    <label class="form-label" for="user_website">Website</label>
                    <input autocomplete="off" v-model="profile.website" class="form-input" id="user_website">
                </div>

                <div class="form-group">
                    <label class="form-label" for="user_email">Email</label>
                    <input autocomplete="off" v-model="profile.email" class="form-input" id="user_email">
                </div>

                <div class="form-group">
                    <label class="form-label" for="user_location">Location</label>
                    <input autocomplete="off" v-model="profile.location" class="form-input" id="user_location">
                </div>

                <div class="btn-group space-between">
                    <button class="btn-ghost" @click="cancelUpdate">Cancel</button>
                    <button type="submit" class="btn-blue" @click="updateProfile">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            profile: {
                ...this.user,
            },
        };
    },
    methods: {
        updateProfile() {
            this.$store.dispatch('saveProfile', { ...this.profile });
            this.$router.push({ name: 'profileshow' });
        },
        cancelUpdate() {
            this.$router.push({ name: 'profileshow' }); 
        },
    },
}
</script>
<style scoped>

</style>