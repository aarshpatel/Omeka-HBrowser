<template>
    <div>
        <div id="professor-content">
            <h3> {{ professor_data["dcterms:title"][0]["@value"] }} </h3>
            <span> <strong>Department</strong>: {{ professor_data["HERO_:DepartmentName"][0]["@value"] }} </span> <br/> 
            <span> <strong>University</strong>: {{ professor_data["HERO_:University"][0]["display_title"] }} </span><br/>
            <span> <strong>Teacher Rank</strong>: {{ professor_data["HERO_:TeacherRank"][0]["@value"] }} </span><br/>
            <span> <strong>Homepage Url</strong>: {{ professor_data["HERO_:TeacherHomePageURL"][0]["@id"]}} </span><br/>
            <br/><br/>
            <h5> Courses Taught: </h5>
            <ul>
                <li v-for="course in courses_taught_by_professor">
                    <router-link :to="{name: 'hbrowser', params: {type: 'course', id: course['o:id']}}">
                        {{course["dcterms:title"][0]["@value"]}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Professor",
    props: [
        "professor_data"
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
    },
    computed: {
        ...mapState([
            'all_items'
        ]),
        courses_taught_by_professor() {
            return this.all_items.filter(result => {
                if(result["o:resource_template"] !== null) {
                    if(Number(result["o:resource_template"]["o:id"]) == 5 && "gvp:ulan2675_professor_was" in result) {
                        if(Number(result["gvp:ulan2675_professor_was"][0]["value_resource_id"]) == Number(this.professor_data["o:id"])) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
    } 
}

</script>

<style scoped>
    #professor-content {
        text-align: left;
    }

    li {
        list-style-type: none;
    }
</style>
