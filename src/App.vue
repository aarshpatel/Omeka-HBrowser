<template>
    <div id="app">
        <b-container>
            <transition name="fade">
                <router-view />
            </transition>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: 2s;
}

.fade-enter-active {
    transition-delay: 2s;
}

.fade-enter, .fade-leave-active {
    opacity: 0
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
