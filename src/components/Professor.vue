<template>
    <div>
        <div id="professor-content">
            <h3> {{ professor_data["dcterms:title"][0]["@value"] }} </h3>

            <span v-if="'HERO_:DepartmentName' in professor_data">
                <icon name="hashtag" scale=".8"></icon>
                <strong>Department</strong>:
                <ol>
                    <li v-for="dep in professor_data['HERO_:DepartmentName']">
                        {{ dep["@value"] }}
                    </li>
                </ol>
            </span>

            <span v-if="'HERO_:University' in professor_data">
                <icon name="university" scale=".8"></icon>
                <strong>University</strong>:
                <router-link :to="{name: 'hbrowser', query: {'inst': String(professor_data['HERO_:University'][0]['value_resource_id'])}}">
                    {{ professor_data["HERO_:University"][0]["display_title"] }}
                </router-link>
            </span><br/>

            <span v-if="'HERO_:College' in professor_data">
                <icon name="university" scale=".8"></icon>
                <strong>College</strong>:
                <router-link :to="{name: 'hbrowser', query: {'inst': professor_data['HERO_:College'][0]['value_resource_id']}}">
                    {{ professor_data["HERO_:College"][0]["display_title"] }}
                </router-link>
            </span><br/>

            <span v-if="'HERO_:TeacherRank' in professor_data">
                <icon name="apple-alt" scale=".8"></icon>
                <strong>Teacher Rank</strong>:
                <ol>
                    <li v-for="rank in professor_data['HERO_:TeacherRank']">
                        {{ rank["@value"] }}
                    </li>
                </ol>
            </span> <br/>

            <span v-if="'HERO_:TeacherHomePageURL' in professor_data">
                <icon name="home" scale=".8"></icon>
                <strong>Homepage Url</strong>:
                <a :href="professor_data['HERO_:TeacherHomePageURL'][0]['@id']">{{ professor_data["HERO_:TeacherHomePageURL"][0]["@id"] }}</a>
            </span><br/>
            <br/>

            <span> <icon name="chalkboard" scale=".8"></icon> <strong>Courses Taught</strong>: </span>
            <ol>
                <li v-for="course in courses_taught_by_professor">
                    <router-link :to="{name: 'hbrowser', query: {'course': String(course['o:id'])}}">
                        {{course["dcterms:title"][0]["@value"]}}
                    </router-link>
                </li>
            </ol>
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
                        const professor_ids = result["gvp:ulan2675_professor_was"].map(obj => Number(obj["value_resource_id"])) // there could be multiple professors who teach the same course
                        if(professor_ids.includes(Number(this.professor_data["o:id"]))) return true
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

svg {
    margin-right: 10px;
}
</style>
