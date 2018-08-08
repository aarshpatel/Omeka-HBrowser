<template>
    <div>
        <div id="course-contents">
            <h3>{{course_data["dcterms:title"][0]["@value"]}} ({{ course_data["dcterms:date"][0]["@value"] }})</h3>
            <span> {{ course_data["dcterms:description"][0]["@value"] }} </span> <br/><br/>
            <span> <strong>Course Code</strong>: {{ course_data["HERO_:CourseCode"][0]["@value"] }} </span> <br/>
            <span> <strong>Department</strong>: {{ course_data["HERO_:DepartmentName"][0]["@value"] }} </span> <br/>
            <span> <strong>University</strong>: {{ course_data["HERO_:University"][0]["display_title"] }} </span><br/>
            <span> <strong>Professors</strong>: </span>
            <span>
                <router-link :to="{name: 'hbrowser', params: {type: 'professor', id: course_data['gvp:ulan2675_professor_was'][0]['value_resource_id']}}">
                    {{ course_data["gvp:ulan2675_professor_was"][0]["display_title"] }}
                </router-link>
            </span><br/>

        </div>
    </div>
</template>

<script>

export default {
    name: "Course",
    props: [
        "course_data",
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
#course-contents {
    text-align: left;
}
</style>
