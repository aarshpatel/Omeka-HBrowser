<template>
    <div>
        <div id="course-leaf-contents">
            <h3>{{course_leaf_data["dcterms:title"][0]["@value"]}}</h3>
            <span> <strong>Description</strong>: {{ course_leaf_data["dcterms:description"][0]["@value"] }} </span> <br/>
            <span>
                <icon name="chalkboard" scale=".8"></icon>
                <strong>Course</strong>:
                <router-link :to="{name: 'hbrowser', params: {type: 'course', id: course_leaf_data['HERO_:CourseTitle'][0]['value_resource_id']}}">
                {{ course_leaf_data["HERO_:CourseTitle"][0]["display_title"] }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Icon from 'vue-awesome/components/Icon'

export default {
    name: "CourseLeaf",
    props: [
        "course_leaf_data",
    ],
    components: {
        Icon
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
            'resource_types'
        ])
    }
}

</script>

<style scoped>
#course-leaf-contents {
    text-align: left;
}

svg {
    margin-right: 10px;
}
</style>
