<template>
    <div>
        <div id="course-contents">
            <h3>{{course_data["dcterms:title"][0]["@value"]}} ({{ course_data["dcterms:date"][0]["@value"] }})</h3>
            <span> {{ course_data["dcterms:description"][0]["@value"] }} </span> <br/><br/>
            <span> <strong>Course Code</strong>: {{ course_data["HERO_:CourseCode"][0]["@value"] }} </span> <br/>
            <span> <strong>Department</strong>: </span>
            <span>
                <ul>
                    <li v-for="department in course_data['HERO_:DepartmentName']"> 
                        {{ department["@value"] }}  
                    </li>
                </ul>
            </span>

            <span> <strong>University</strong>: </span>
            <span>
                <router-link :to="{name: 'hbrowser', params: {type: 'institution', id: course_data['HERO_:University'][0]['value_resource_id']}}">
                    {{ course_data["HERO_:University"][0]["display_title"] }} 
                </router-link>
            </span>
            <br/>

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

import { mapState } from 'vuex'

export default {
    name: "Course",
    props: [
        "course_data",
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
            'resource_type'
        ])
    }
}

</script>

<style scoped>
#course-contents {
    text-align: left;
}

li {
    list-style-type: none;
    display: inline;
}
</style>
