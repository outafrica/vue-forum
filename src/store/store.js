import { createStore } from 'vuex';
import sourceData from '@/data.json';
import { findById, createResource } from '@/helpers/helpers'



export default createStore({
    modules: {

    },
    state: {
        sourceData: sourceData,
        authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
    },
    getters: {
        getAuthUser(state) {
            const user = findById(state.sourceData.users, state.authId);
            if (!user) return null;
            return {
                ...user,
                get posts() {
                    return state.sourceData.posts.filter(post => post.userId === user.id);
                },
                get threads() {
                    return state.sourceData.threads.filter(thread => thread.userId === user.id);
                },
                get postsCount() {
                    return this.posts.length;
                },

                get threadsCount() {
                    return this.threads.length;
                },

            };
        },
        getForum(state, forumId) {
            return findById(state.sourceData.forums, forumId)
        },
        getThreads(state, forumId) {
            return state.sourceData.threads.filter(thread => thread.forumId === forumId);
        }
    },
    actions: {
        addPost({ commit, state }, post) {
            post.id = 'ggg' + Math.random();
            post.userId = state.authId;
            post.publishedAt = Math.floor(Date.now() / 1000);
            commit('createPost', { post });
            commit('updateThreadPost', { postId: post.id, threadId: post.threadId });
        },
        async addThread({ commit, state, dispatch }, thread) {
            thread.id = 'thr' + Math.random();
            thread.userId = state.authId;
            thread.publishedAt = Math.floor(Date.now() / 1000);
            commit('createThread', { thread });
            commit('updateThreadUser', { threadId: thread.id, userId: thread.userId });
            commit('updateThreadForum', { threadId: thread.id, forumId: thread.forumId });
            dispatch('addPost', { text: thread.text, threadId: thread.id });

            return findById(state.sourceData.threads, thread.id);
        },
        async updateThread({ commit, state }, data) {
            const thread = findById(state.sourceData.threads, data.id);
            const post = findById(state.sourceData.posts, thread.posts[0]);
            const newThread = { ...thread, title: data.title };
            const newPost = { ...post, text: data.text };
            commit('createThread', { thread: newThread });
            commit('createPost', { post: newPost });
            return newThread;
        },
        saveProfile({ commit }, user) {
            commit('updateProfile', { user, userId: user.id });
        }

    },
    mutations: {
        createPost(state, { post }) {
            createResource(state.sourceData.posts, post);
            // const index = state.sourceData.posts.findIndex(p => p.id === post.id);
            // if (post.id && index !== -1) {
            //     state.sourceData.posts[index] = post;
            // } else {
            //     state.sourceData.posts.push(post);
            // }
        },
        createThread(state, { thread }) {
            createResource(state.sourceData.threads, thread);
            // const index = state.sourceData.threads.findIndex(t => t.id === thread.id);
            // if (thread.id && index !== -1) {
            //     state.sourceData.threads[index] = thread;
            // } else {
            //     state.sourceData.threads.push(thread);
            // }
        },
        updateThreadPost(state, { postId, threadId }) {
            const thread = findById(state.sourceData.threads, threadId);
            thread.posts = thread.posts || [];
            thread.posts.push(postId);
        },
        updateThreadForum(state, { threadId, forumId }) {
            const forum = findById(state.sourceData.forums, forumId);
            forum.posts = forum.posts || [];
            forum.posts.push(threadId);
        },
        updateThreadUser(state, { threadId, userId }) {
            const user = findById(state.sourceData.users, userId);
            user.posts = user.posts || [];
            user.posts.push(threadId);
        },
        updateProfile(state, { user, userId }) {
            const userIndex = state.sourceData.users.findIndex(user => user.id === userId);
            state.sourceData.users[userIndex] = user;
        }
    },
});