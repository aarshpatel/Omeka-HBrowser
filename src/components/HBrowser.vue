<template>
    <div>
        <b-breadcrumb id="breadcrumb_path" :items="items"/>
        <div v-if="getRouteType == 'course'">
            <course v-bind:course_data="getCurrentItem"></course>
        </div>
        <div v-if="getRouteType == 'professor'">
            <professor v-bind:professor_data="getCurrentItem" ></professor>
        </div>
        <div v-if="getRouteType == 'course_leaf'">
            <courseleaf v-bind:course_leaf_data="getCurrentItem" ></courseleaf>
        </div>
        <div v-if="getRouteType == 'institution'">
            <institution v-bind:institution_data="getCurrentItem" ></institution>
        </div>
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
        items: [{
            text: 'University of Massachusetts Amherst',
            href: '#/hbrowser?inst=12'
        }, {
            text: 'Music',
        }, {
            text: 'Christopher White',
            href: '#/hbrowser?inst=12&dep=Music&prof=58'
        },{
            text: 'Fundamentals of Music Theory',
            href: '#/hbrowser?inst=12&dep=Music&prof=58&course=202',
            active: true
        }]
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
            var item_id = null;
            if(this.$route.query.leaf) item_id = Number(this.$route.query.leaf.replace("/", ""))
            else if(this.$route.query.course) item_id = Number(this.$route.query.course.replace("/", ""))
            else if(this.$route.query.prof) item_id = Number(this.$route.query.prof.replace("/", ""))
            else if(this.$route.query.inst) item_id = Number(this.$route.query.inst.replace("/", ""))

            var currentItem = null;
            for(var idx in this.all_items) {
                if(Number(this.all_items[idx]["o:id"]) == item_id) {
                    currentItem = this.all_items[idx];
                    break;
                }
            }
            return currentItem;
        },
        getRouteType() {
            var type = "institution"
            if(this.$route.query.leaf) type = "course_leaf"
            else if(this.$route.query.course) type = "course"
            else if(this.$route.query.prof) type = "professor"
            return type;
        }
    }
}

</script>

<style scoped>
#sidebar {
    border-right: 1px solid #0091ff42;
    text-align: left;
}

#headline {
    text-align: left;
    margin-bottom: 40px;
    border-bottom: 1px solid #0091ff42;
}

#breadcrumb_path {
    font-size: 14px;
}
</style>
