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
    }),
    methods: {
        // TODO: make sure the hierarchy path is falls through (for example: Art should only contain professors in Umass Amherst in the art department there. It shouldn't contain all professors in the art department across the database)
        findDepartmentsInInstition(institution) {
            var deps =  this.all_items.filter(element => {
                if("HERO_:DepartmentName" in element) {
                    if("HERO_:University" in element && element["HERO_:University"][0]["value_resource_id"] == institution) {
                        return true;
                    }
                    if("HERO_:College" in element && element["HERO_:College"][0]["value_resource_id"] == institution) {
                        return true;
                    }
                }
                return false;
            }).reduce((courses,course) => {
                var all_departments = [];
                for(var idx in course["HERO_:DepartmentName"]) {
                    all_departments.push({"name": course["HERO_:DepartmentName"][idx]["@value"], route: "hbrowser/university/10/department/id/", children: this.findProfessorInDepartment(course["HERO_:DepartmentName"][idx]["@value"], institution)});
                }
                return courses.concat(all_departments);
            }, []);

            var sortedDeps = this.sortByName(deps); // sort the departments in the institution by name
            var removedDuplicateItems = this.removeDuplicateItems(sortedDeps); // removed duplicate departments in the institution
            //console.log(removedDuplicateItems);
            return removedDuplicateItems;
        },

        findProfessorInDepartment(department_name, institution) {
            var professors =  this.all_items.filter(element => {
                if(element["o:resource_template"] !== null && element["o:resource_template"]["o:id"] == 6) {
                    if("HERO_:University" in element || "HERO_:College" in element) {
                        var institution_key = ("HERO_:University" in element) ? "HERO_:University" : "HERO_:College"
                        if(Number(element[institution_key][0]["value_resource_id"]) == institution) {
                            if("HERO_:DepartmentName" in element) {
                                var departments = element["HERO_:DepartmentName"].map(dep => dep["@value"]);
                                if(departments.includes(department_name)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }).map(professor => {
                return {"name": professor["dcterms:title"][0]["@value"], "id": professor["o:id"], "route": "hbrowser/professor/" + String(professor["o:id"]), children: this.findCoursesTaughtByProfessor(professor["o:id"], department_name, institution)}
            });

            return this.sortByName(professors);
        },

        findCoursesTaughtByProfessor(professor, department_name, institution) {
            var courses =  this.all_items.filter(element => {
                if(element["o:resource_template"] !== null) {
                    if("HERO_:University" in element || "HERO_:College" in element) {
                        var institution_key = ("HERO_:University" in element) ? "HERO_:University" : "HERO_:College"
                        if(Number(element[institution_key][0]["value_resource_id"]) == institution) {
                            if("HERO_:DepartmentName" in element) {
                                var departments = element["HERO_:DepartmentName"].map(dep => dep["@value"]);
                                if(departments.includes(department_name)) {
                                    if(Number(element["o:resource_template"]["o:id"]) == 5 && "gvp:ulan2675_professor_was" in element) {
                                        if(Number(element["gvp:ulan2675_professor_was"][0]["value_resource_id"]) == professor) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            }).map(course => {
                return {"name": course["dcterms:title"][0]["@value"], "id": course["o:id"], "route": "hbrowser/course/" + String(course["o:id"]), children: this.findCourseLeafItems(course["o:id"])}
            });

            return this.sortByName(courses);
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
            //text = text.trim();
            return text
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
                var tree =  this.getAllInstitutions.map(element => {
                    return {"name": element["dcterms:title"][0]["@value"], "id": element["o:id"], "route": "hbrowser/institution/" + String(element["o:id"]), children: this.findDepartmentsInInstition(element["o:id"])}
                });

                tree = this.sortByName(tree); // sort the institutions by name

                //var institutions_with_professors = institutions.map(element => {
                //    var o = Object.assign({}, element);
                 //   o.children = [{"name": "Departments", "children": this.findDepartmentsInInstition(element["id"])}];
                  //  return o;
               // });


                return tree;
            }
    }
}

</script>

<style scoped>
a {
    color: #0091ff;
}
</style>

