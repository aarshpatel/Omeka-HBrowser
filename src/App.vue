<template>
    <div id="app">
        <b-container>
            <transition name="">
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
    transition-duration: .05s;
}

.fade-enter-active {
    transition-delay: .05s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}

.slide-fade-enter-active {
  transition: all .05s ease;
}
.slide-fade-leave-active {
  transition: all .05s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
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

.TreeNavigation {
    text-align: left;
}
</style>
