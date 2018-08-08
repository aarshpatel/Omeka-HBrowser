<template>
    <div>
        <vue-tree-navigation :items="items" :defaultOpenLevel="1" />
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
}

</script>

<style scoped>
</style>
