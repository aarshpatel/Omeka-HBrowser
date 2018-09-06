<template>
    <div>
        <vue-tree-navigation :items="hierarchy" :defaultOpenLevel="0"/>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Sidebar",
    data: () => ({
    }),
    methods: {
        findDepartmentsInInstition(institution) {
            const deps =  this.all_items.filter(element => {
                if("HERO_:DepartmentName" in element) {
                    const keys = ["HERO_:University", "HERO_:College"];
                    keys.forEach((key) => {
                        if(key in element) {
                            const key_ids = element[key].map(obj => Number(obj["value_resource_id"]))
                            if(key_ids.includes(institution)) return true
                        }
                    });
                }
                return false;
            }).reduce((courses,course) => {
                const all_departments = [];
                course["HERO_:DepartmentName"].forEach((dep) => {
                    all_departments.push({"name": this.normalize(dep["@value"]), children: this.findProfessorInDepartment(this.normalize(dep["@value"]), institution)});
                });
                return courses.concat(all_departments);
            }, []);

            const sortedDeps = this.sortByName(deps); // sort the departments in the institution by name
            const removedDuplicateItems = this.removeDuplicateItems(sortedDeps); // removed duplicate departments in the institution
            return removedDuplicateItems;
        },

        findProfessorInDepartment(department_name, institution) {
            var professors =  this.all_items.filter(element => {
                if(element["o:resource_template"] !== null && element["o:resource_template"]["o:id"] == 6) {
                    if("HERO_:University" in element || "HERO_:College" in element) {
                        const institution_key = ("HERO_:University" in element) ? "HERO_:University" : "HERO_:College"
                        const institution_ids = element[institution_key].map(obj => Number(obj["value_resource_id"]))
                        if(institution_ids.includes(institution) && "HERO_:DepartmentName" in element) {
                            var departments = element["HERO_:DepartmentName"].map(dep => this.normalize(dep["@value"]));
                            if(departments.includes(department_name)) return true;
                        }
                    }
                }
                return false;
            }).map(professor => {
                return {"name": professor["dcterms:title"][0]["@value"], "id": professor["o:id"], "route": "&prof=" + String(professor["o:id"]), children: this.findCoursesTaughtByProfessor(professor["o:id"], department_name, institution)}
            });

            return this.sortByName(professors);
        },

        findCoursesTaughtByProfessor(professor, department_name, institution) {
            var courses =  this.all_items.filter(element => {
                if(element["o:resource_template"] !== null) {
                    if("HERO_:University" in element || "HERO_:College" in element) {
                        var institution_key = ("HERO_:University" in element) ? "HERO_:University" : "HERO_:College"
                        const institution_ids = element[institution_key].map(obj => Number(obj["value_resource_id"]));
                        if(institution_ids.includes(institution) && "HERO_:DepartmentName" in element) {
                            var departments = element["HERO_:DepartmentName"].map(dep => this.normalize(dep["@value"]));
                            if(departments.includes(department_name)) {
                                if(Number(element["o:resource_template"]["o:id"]) == 5 && "gvp:ulan2675_professor_was" in element) {
                                    var professors_ids = element["gvp:ulan2675_professor_was"].map(obj => Number(obj["value_resource_id"]))
                                    if(professors_ids.includes(Number(professor))) return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }).map(course => {
                return {"name": course["dcterms:title"][0]["@value"], "id": course["o:id"], "route": "&course=" + String(course["o:id"]), children: this.findCourseLeafItems(course["o:id"])}
            });

            return this.sortByName(courses);
        },

        findCourseLeafItems(course) {
            return this.all_items.filter(result => {
                if("HERO_:CourseTitle" in result) {
                    if(Number(result["HERO_:CourseTitle"][0]["value_resource_id"]) == course) return true
                }
                return false
            }).map(leaf_item => {
                return {"name": leaf_item["dcterms:title"][0]["@value"], "id": leaf_item["o:id"], "route": "&leaf=" + String(leaf_item["o:id"])}
            });
        },
        sortByName(items) {
            return items.sort(function(a, b) {
                var nameA = a["name"].toLowerCase();
                var nameB = b["name"].toLowerCase();
                if(nameA < nameB) return -1;
                if(nameA > nameB) return 1;
                return 0
            });
        },
        removeDuplicateItems(items) {
            var names = [];
            var newItems = [];
            for(var idx in items) {
                name = items[idx]["name"];
                if(!(names.includes(name))) {
                    names.push(name);
                    newItems.push(items[idx]);
                }
            }
            return newItems;
        },
        normalize(text) {
            var text = text.replace(/(\r\n\t|\n|\r\t)/gm,"");
            text = text.trim();
            return text
        }
    },
    computed: {
        ...mapState([
            'all_items'
        ]),
        getAllInstitutions() {
            // get all of the institutions in the Omeka Database
            return this.all_items.filter(element => {
                if(element["o:item_set"].length > 0) {
                    if(element["o:item_set"][0]["o:id"] == 7) return true;
                }
                return false;
            });
        },
        hierarchy() {
            // this method will build the hbrowser hierarchy for the sidebar
            var root =  this.getAllInstitutions.map(element => {
                return {"name": element["dcterms:title"][0]["@value"], "id": element["o:id"], "route": "hbrowser?inst=" + String(element["o:id"]), children: this.findDepartmentsInInstition(element["o:id"])}
            });

            root = this.sortByName(root); // sort the institutions (root-level) of the tree by name
            return root;
        }
    }
}

</script>

<style scoped>
a {
    color: #0091ff;
}

.NavigationLevel__children {
    padding-left: 10px;
}

.NavigationLevel__parent {
    font-weight:    600;
    padding-bottom: 5px;
}

.NavigationItem {
    color:   #545454;
    padding: 0;
}

.NavigationItem--active {
    color: #42b883;
}

.NavigationToggle__icon {
    border-color: #42b883;
}
</style>

