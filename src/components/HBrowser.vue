<template>
    <div>
        <b-row>

            <b-col cols="4">
                <sidebar></sidebar>
            </b-col>

            <b-col cols="8">
                <div v-if="$route.params.type == 'course'">
                    <course v-bind:course_data="getCurrentItem"></course>
                </div>
                <div v-if="$route.params.type == 'professor'">
                    <professor v-bind:professor_data="getCurrentItem" ></professor>
                </div>
                <div v-if="$route.params.type == 'course_leaf'">
                    <courseleaf v-bind:course_leaf_data="getCurrentItem" ></courseleaf>
                </div>
            </b-col>
        </b-row>

    </div>
</template>

<script>
import {mapState} from 'vuex' 
import Course from './Course.vue'
import Professor from './Professor.vue'
import CourseLeaf from './CourseLeaf.vue'
import Sidebar from './Sidebar.vue'

export default {
    name: "HBrowser",
    components: {
        'course': Course,
        'professor': Professor,
        'courseleaf': CourseLeaf,
        'sidebar': Sidebar
    },
    data: () => ({
    }),
    mounted() {
    },
    methods: {
    },
    computed: {
        ...mapState([
            'all_items'
        ]),
        getCurrentItem(){
            var currentItem = null;
            for(var idx in this.all_items) {
                if(Number(this.all_items[idx]["o:id"]) == Number(this.$route.params.id)) {
                    currentItem = this.all_items[idx];
                    console.log("Current Item: ", currentItem);
                    break;
                }
            }
            return currentItem;
        }
    }
}

</script>

<style scoped>
</style>
