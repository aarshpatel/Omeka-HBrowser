<template>
    <div>
        <div id="professor-content">
            <h3> {{ professor_data["dcterms:title"][0]["@value"] }} </h3>

            <span v-if="'HERO_:DepartmentName' in professor_data">
                <icon name="hashtag" scale=".8"></icon>
                <strong>Department</strong>:
                {{ professor_data["HERO_:DepartmentName"][0]["@value"] }}
            </span> <br/>

            <span v-if="'HERO_:University' in professor_data">
                <icon name="university" scale=".8"></icon>
                <strong>University</strong>:
                <router-link :to="{name: 'hbrowser', params: {type: 'institution', id: professor_data['HERO_:University'][0]['value_resource_id']}}">
                    {{ professor_data["HERO_:University"][0]["display_title"] }}
                </router-link>
            </span> <br/>

            <span v-if="'HERO_:College' in professor_data">
                <icon name="university" scale=".8"></icon>
                <strong>College</strong>:
                <router-link :to="{name: 'hbrowser', params: {type: 'institution', id: professor_data['HERO_:College'][0]['value_resource_id']}}">
                    {{ professor_data["HERO_:College"][0]["display_title"] }}
                </router-link>
            </span> <br/>

            <span v-if="'HERO_:TeacherRank' in professor_data"> <strong>Teacher Rank</strong>:
                <ol>
                    <li v-for="rank in professor_data['HERO_:TeacherRank']">
                        {{ rank["@value"] }}
                    </li>
                </ol>
            </span>

            <span v-if="'HERO_:TeacherHomePageURL' in professor_data">
                <icon name="home" scale=".8"></icon>
                <strong>Homepage Url</strong>:
                <a :href="professor_data['HERO_:TeacherHomePageURL'][0]['@id']">{{ professor_data["HERO_:TeacherHomePageURL"][0]["@id"] }}</a>
            </span><br/>
            <br/><br/>

            <span> <icon name="chalkboard" scale=".8"></icon> <strong>Courses Taught</strong>: </span>
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
import Icon from 'vue-awesome/components/Icon'

export default {
    name: "Professor",
    props: [
        "professor_data"
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
            'resource_type'
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

svg {
    margin-right: 10px;
}
</style>
