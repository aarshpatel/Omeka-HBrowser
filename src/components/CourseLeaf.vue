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

export default {
    name: "CourseLeaf",
    props: [
        "course_leaf_data",
    ],
    data: () => ({
        resource_type: {
            5: "course",
            6: "professor",
            2: "course_leaf",
            3: "course_leaf",
            9: "course_leaf",
            7: "course_leaf"
        }
    }),
    mounted() {
    },
    methods: {
    }
}

</script>

<style scoped>
#course-leaf-contents {
    text-align: left;
}
</style>
