<template>
    <div>
        <vue-tree-navigation :items="hierarchy" />
    </div>
</template>

<script>
import {mapState} from 'vuex' 

export default {
    name: "Sidebar",
    data: () => ({
        items: [
              { name: 'Blended Learning' },              // /products
              { name: 'Universities', children: [          // /about
                { name: 'UMass Amherst', children: [    // /about/contact
                  { name: 'Christopher White', route: 'hbrowser/professor/58', children: [
                      {name: 'Fundamentals of Music Theory', route: '/hbrowser/course/202'}
                  ]},               // /about/contact/email
                  { name: 'Eric Poehler', route: 'hbrowser/professor/60' },                // /about/contact/phone
                ]},
              ]},
        ], 
    }),
    methods: {
        findDepartmentsInInstition(institution) {
            // TODO:
        },

        findProfessorInInstitution(institution) {
            return this.all_items.filter(element => {
                if(element["o:resource_template"] !== null && element["o:resource_template"]["o:id"] == 6) {
                    if("HERO_:University" in element) {
                        if(Number(element["HERO_:University"][0]["value_resource_id"]) == institution) {
                            return true;
                        }
                    }

                    if("HERO_:College" in element) {
                        if(Number(element["HERO_:College"][0]["value_resource_id"]) == institution) {
                            return true;
                        }
                    }
                }
                return false;
            }).map(professor => {
                return {"name": professor["dcterms:title"][0]["@value"], "id": professor["o:id"], "route": "hbrowser/professor/" + String(professor["o:id"]), children: this.findCoursesTaughtByProfessor(professor["o:id"])}
            });
        },

        findCoursesTaughtByProfessor(professor) {
            return this.all_items.filter(result => {
                if(result["o:resource_template"] !== null) {
                    if(Number(result["o:resource_template"]["o:id"]) == 5 && "gvp:ulan2675_professor_was" in result) {
                        if(Number(result["gvp:ulan2675_professor_was"][0]["value_resource_id"]) == professor) {
                            return true;
                        }
                    }
                }
                return false;
            }).map(course => { 
                return {"name": course["dcterms:title"][0]["@value"], "id": course["o:id"], "route": "hbrowser/course/" + String(course["o:id"]), children: this.findCourseLeafItems(course["o:id"])}
            });
        },

        findCourseLeafItems(course) {
            return this.all_items.filter(result => {
               if("HERO_:CourseTitle" in result) {
                   if(Number(result["HERO_:CourseTitle"][0]["value_resource_id"]) == course) {
                       return true
                   }
               }
               return false
            }).map(leaf_item => {
                return {"name": leaf_item["dcterms:title"][0]["@value"], "id": leaf_item["o:id"], "route": "hbrowser/course_leaf/" + String(leaf_item["o:id"])} 
            });
        }
    },
    computed: {
        ...mapState([
            'all_items'
        ]),
        getAllInstitutions() {
            return this.all_items.filter(element => {
               if(element["o:item_set"].length > 0) {
                   console.log(element);
                    if(element["o:item_set"][0]["o:id"] == 7) {
                        return true;
                    }
                } 
                return false;
            });
        },
        hierarchy() {
            // this method will build the hbrowser hierarchy for the sidebar
            var institutions =  this.getAllInstitutions.map(element => {
                return {"name": element["dcterms:title"][0]["@value"], "id": element["o:id"], "route": "hbrowser/institution/" + String(element["o:id"])}
            });

            var institutions_with_professors = institutions.map(element => {
                var o = Object.assign({}, element);
                o.children = [{"name": "Professors", "children": this.findProfessorInInstitution(element["id"])}];
                return o;
            });


            return institutions_with_professors;
        }
    }
}

</script>

<style scoped>
</style>

