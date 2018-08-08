<template>
    <div>

        <b-row>
            <b-col cols="9">
                <h2 id="headline"> Omeka Hierarchical Browser </h2>
            </b-col>

            <b-col cols="3">
                <b-button size="sm" variant="secondary" :to="{ name: 'search' }">Search Again</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col id="sidebar" cols="5">
                <sidebar></sidebar>
            </b-col>

            <b-col cols="7">

                <div v-if="$route.params.type == 'course'">
                    <course v-bind:course_data="getCurrentItem"></course>
                </div>
                <div v-if="$route.params.type == 'professor'">
                    <professor v-bind:professor_data="getCurrentItem" ></professor>
                </div>
                <div v-if="$route.params.type == 'course_leaf'">
                    <courseleaf v-bind:course_leaf_data="getCurrentItem" ></courseleaf>
                </div>
                <div v-if="$route.params.type == 'institution'">
                    <institution v-bind:institution_data="getCurrentItem" ></institution>
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
import Search from './Search.vue'
import Institution from './Institution.vue'

export default {
    name: "HBrowser",
    components: {
        'course': Course,
        'professor': Professor,
        'courseleaf': CourseLeaf,
        'sidebar': Sidebar,
        'search': Search,
        'institution': Institution
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
#sidebar {
    border-right: 1px solid #0000001c;
}

#headline {
    text-align: left;
    margin-bottom: 40px;
    border-bottom: .5px solid #0000000d;
}
</style>

