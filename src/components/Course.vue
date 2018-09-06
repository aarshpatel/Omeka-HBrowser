<template>
    <div>
       <div id="course-contents">
            <h3> {{course_data["dcterms:title"][0]["@value"]}} </h3> <h3 v-if="'dcterms:date' in course_data"> ({{ course_data["dcterms:date"][0]["@value"] }}) </h3>

            <span v-if="'dcterms:description' in course_data">
                    {{ course_data["dcterms:description"][0]["@value"] }}
            </span> <br/><br/>

            <span v-if="'HERO_:CourseCode' in course_data">
                    <icon name="hashtag" scale=".8"></icon>
                    <strong>Course Code</strong>: {{ course_data["HERO_:CourseCode"][0]["@value"] }}
            </span> <br/>

            <span v-if="'HERO_:DepartmentName' in course_data">
                    <icon name="hashtag" scale=".8"></icon>
                    <strong>Department</strong>: {{ course_data["HERO_:DepartmentName"][0]["@value"] }}
            </span> <br/>

            <span v-if="'HERO_:University' in course_data">
                <icon name="university" scale=".8"></icon>
                <strong>University</strong>:
                <ol>
                    <li v-for="university in course_data['HERO_:University']">
                        <router-link :to="{name: 'hbrowser', query: {'inst': String(university['value_resource_id'])}}">
                            {{ university["display_title"] }}
                        </router-link>
                    </li>
                </ol>
            </span>

            <span v-if="'HERO_:College' in course_data">
                <icon name="university" scale=".8"></icon>
                <strong>College</strong>:
                <ol>
                    <li v-for="college in course_data['HERO_:College']">
                        <router-link :to="{name: 'hbrowser', query: {'inst': String(college['value_resource_id'])}}">
                            {{ college["display_title"] }}
                        </router-link>
                    </li>
                </ol>
            </span>

            <span v-if="'gvp:ulan2675_professor_was' in course_data">
                <icon name="user" scale=".8"></icon>
                <strong>Professors</strong>:
                <ol>
                    <li v-for="professor in course_data['gvp:ulan2675_professor_was']">
                        <router-link :to="{name: 'hbrowser', query: {'prof': String(professor['value_resource_id'])}}">
                            {{ professor["display_title"] }}
                        </router-link>
                    </li>
                </ol>
            </span>

            <span v-if="courseLeafItems.length > 0">
                <icon name="file" scale=".8"></icon>
                <strong>Course Leaf Items</strong>:
                <ol>
                    <li v-for="courseLeaf in courseLeafItems">
                        <router-link :to="{name: 'hbrowser', query: {'leaf': String(courseLeaf['id'])}}">
                            {{courseLeaf["name"]}}
                        </router-link>
                    </li>
                </ol>
            </span>

        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import Icon from 'vue-awesome/components/Icon'

export default {
    name: "Course",
    props: [
        "course_data",
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
        courseLeafItems() {
            return this.all_items.filter(result => {
                if("HERO_:CourseTitle" in result) {
                    if(Number(result["HERO_:CourseTitle"][0]["value_resource_id"]) == this.course_data["o:id"]) {
                        return true
                    }
                }
                return false
            }).map(leaf_item => {
                return {"name": leaf_item["dcterms:title"][0]["@value"], "id": leaf_item["o:id"]}
            });
        },
        coursePath() {
            // TODO: build the course path
            var path = [{text: '', href: ''}, {text: '', href: ''}, {text: '', href: ''}, {text: '', href: ''}];

            var inst_id = None
            var dep_name = None
            var prof_id = None

            if("HERO_:University" in this.course_data || "HERO_:College" in this.course_data) {
                const institution_key = ("HERO_:University" in this.course_data) ? "HERO_:University" : "HERO_:College";
                path[0].href = '#/hbrowser?inst=' + this.course_data[institution_key][0]["value_resource_id"]
                path[0].text = this.course_data[institution_key][0]["display_title"]
                inst_id = this.course_data[institution_key][0]["value_resource_id"]
            }

            if("HERO_:DepartmentName" in this.course_data) {
                dep_name = this.course_data["HERO_:DepartmentName"][0]["@value"]
                path[1].text = dep_name
            }

            if("gvp:ulan2675_professor_was" in this.course_data) {
                prof_id = this.course_data["gvp:ulan2675_professor_was"][0]["value_resource_id"]
                path[2].text = this.course_data["gvp:ulan2675_professor_was"][0]["@value"]
                path[2].href = "#/hbrowser?isnt=" + inst_id + "&dep=" + dep_name + "&prof=" + prof_id
            }

            path[3].text = this.course_data["dcterms:title"][0]["@value"]
            path[3].href = path[2].href + "&course=" + this.course_data["o:id"]

            return path;

        }
    }
}

</script>

<style scoped>
#course-contents {
    text-align: left;
}

ul>li {
    list-style-type: none;
    display: inline;
}

svg {
    margin-right: 10px;
}
</style>
