<template>
    <div>
        <div id="course-leaf-contents">
            <h3>{{course_leaf_data["dcterms:title"][0]["@value"]}}</h3>
            <span> Description: {{ course_leaf_data["dcterms:description"][0]["@value"] }} </span> <br/>
            <span>Course:
                <router-link :to="{name: 'hbrowser', params: {type: 'course', id: course_leaf_data['HERO_:CourseTitle'][0]['value_resource_id']}}">
                {{ course_leaf_data["HERO_:CourseTitle"][0]["display_title"] }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "CourseLeaf",
    props: [
        "course_leaf_data",
    ],
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
</style>
