<template>

    <span :title="humFriDate()">
        {{ diffForHumans()}}
    </span>

</template>

<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedYime from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedYime)

export default {

    props: {

        timestamp: {
            required: true,
            type: Number,
        }

    },
    methods: {

        diffForHumans() {
            return dayjs.unix(this.timestamp).fromNow();
        },
        humFriDate() {
            return dayjs.unix(this.timestamp).format('llll');
        },
    },


}
</script>

<style scoped>

</style>