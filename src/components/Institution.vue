<template>
    <div>
        <div id="institution-contents">
            <h3> {{ institution_data["dcterms:title"][0]["@value"] }} </h3>
            <span> <strong>Description</strong>: {{ institution_data["dcterms:description"][0]["@value"] }} </span> <br/>
            <span> <strong>Website</strong>: <a :href="institution_data['dcterms:description'][1]['@id']">{{institution_data['dcterms:description'][1]['@id']}}</a>  </span>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: "Institution",
    props: [
        "institution_data",
    ],
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
        ])
    }
}

</script>

<style scoped>
#institution-contents {
    text-align: left;
}
</style>
