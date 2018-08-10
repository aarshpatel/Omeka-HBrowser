<template>
    <div>
        <div id="department-content">
            Department
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Department",
    props: [
        "department_data"
    ],
    components: {
    },
    data: () => ({
    }),
    mounted() {
    },
    methods: {
    },
    computed: {
        ...mapState([
            'all_items',
            'resource_type'
        ])
    }
}

</script>

<style scoped>
</style>
