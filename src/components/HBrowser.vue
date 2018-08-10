<template>
    <div>
        <b-row>
            <b-col cols="7">
                <h2 id="headline"> Omeka Hierarchical Browser </h2>
            </b-col>
            <b-col cols="2"></b-col>
            <b-col cols="3">
                <b-button size="sm" variant="primary" :to="{ name: 'search' }"> <icon name="search" scale=".9"></icon> Search Again</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col id="sidebar" cols="6">
                <sidebar></sidebar>
            </b-col>

            <b-col cols="6">
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
import Icon from 'vue-awesome/components/Icon'

export default {
    name: "HBrowser",
    components: {
        'course': Course,
        'professor': Professor,
        'courseleaf': CourseLeaf,
        'sidebar': Sidebar,
        'search': Search,
        'institution': Institution,
        'Icon': Icon
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
    border-right: 1px solid #0091ff42;
    text-align: left;
    font-size: 14px;
}

#headline {
    text-align: left;
    margin-bottom: 40px;
    border-bottom: 1px solid #0091ff42;
}
</style>

