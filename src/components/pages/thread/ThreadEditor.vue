<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <label for="thread_title">Title:</label>
            <input v-model="data.title" type="text" id="thread_title" class="form-input">
        </div>

        <div class="form-group">
            <label for="thread_content">Content:</label>
            <textarea v-model="data.text" id="thread_content" class="form-input" rows="8" cols="140"></textarea>
        </div>

        <div class="btn-group">
            <button @click="cancel" class="btn btn-ghost">Cancel</button>
            <button class="btn btn-blue" type="submit" name="Publish">{{ existing ? 'Update' : 'Publish' }} </button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        thread: {
            required: false,
            default: () => {
                return {
                    title: '',
                    text: '',
                }
            },
            type: Object,
        }
    },

    data() {
        return {
            data: { ...this.thread },
        };
    },
    computed: {
        existing() {
            return !!this.thread.title;
        }
    },
    methods: {
        save() {
            this.$emit('save', { ...this.data });
        },
        cancel() {
            this.$emit('cancel');
        },
    },
}
</script>

<style scoped>

</style>