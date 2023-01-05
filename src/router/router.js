import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/pages/WelcomeHome'
import ThreadShow from '@/components/pages/thread/ThreadShow'
import ThreadCreate from '@/components/pages/thread/ThreadCreate'
import ThreadUpdate from '@/components/pages/thread/ThreadUpdate'
import NotFoundPage from '@/components/pages/error/NotFound'
import ForumShow from '@/components/pages/forum/ForumShow'
import CategoryShow from '@/components/pages/category/CategoryShow'
import ProfileShow from '@/components/pages/user/ProfileShow'



import sourceData from '@/data.json'


const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },

    {
        path: '/thread/:id',
        component: ThreadShow,
        name: 'threadshow',
        props: true,
        beforeEnter(to, from, next) {
            // check if thread exists
            const threadExists = sourceData.threads.find(th => th.id === to.params.id);
            //if exists continue
            //if not redirect to not found page
            if (threadExists) {

                return next();

            } else {

                return next({
                    name: 'notfound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    //preserve query and hash
                    query: to.query,
                    hash: to.hash,

                });
            }

        },
    },
    {
        path: '/forum/:forumId/thread/create',
        component: ThreadCreate,
        name: 'threadcreate',
        props: true,
    },
    {
        path: '/thread/:id/edit',
        component: ThreadUpdate,
        name: 'threadedit',
        props: true,
    },
    {
        path: '/forum/:id',
        component: ForumShow,
        name: 'forumshow',
        props: true,
    },
    {
        path: '/category/:id',
        component: CategoryShow,
        name: 'categoryshow',
        props: true,
    },
    {
        path: '/me',
        component: ProfileShow,
        name: 'profileshow',
        props: true,
        meta: {
            toTop: true,
            smoothScroll: true,
        }
    },
    {
        path: '/me/edit',
        component: ProfileShow,
        name: 'editprofile',
        props: { isEdit: true },
    },
    // will match everything and put it under `$route.params.pathMatch`
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFoundPage,
    },
]

export default createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    scrollBehavior(to) {
        const scroll = {};
        if (to.meta.toTop) scroll.top = 0;
        if (to.meta.smoothScroll) scroll.behavior = 'smooth';

        return scroll;
    },
});