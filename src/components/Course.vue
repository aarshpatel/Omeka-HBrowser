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
