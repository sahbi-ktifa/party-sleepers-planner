<template>
    <div class="home row">
        <div class="col-md-3">
            <span class="hipster img-fluid rounded"></span>
        </div>
        <div class="col-md-9">
            <h1 class="display-4" jhiTranslate="home.title">Welcome, Java Hipster!</h1>
            <p class="lead" jhiTranslate="home.subtitle">This is your homepage</p>

            <div>
                <div class="alert alert-success" v-if="authenticated">
                <span v-if="account" jhiTranslate="home.logged.message"
                      v-bind:translateValues="{username: '{{account.login}}'}"> You are logged in as user "{{account.login}}". </span>
                </div>

                <div class="alert alert-warning" v-if="!authenticated">
                    <span jhiTranslate="global.messages.info.authenticated.prefix">If you want to </span>
                    <a class="alert-link" v-on:click="login()" jhiTranslate="global.messages.info.authenticated.link">sign in</a><span jhiTranslate="global.messages.info.authenticated.suffix">, you can try the default accounts:<br/>- Administrator (login="admin" and password="admin") <br/>- User (login="user" and password="user").</span>
                </div>
                <div class="alert alert-warning" v-if="!authenticated">
                    <span jhiTranslate="global.messages.info.register.noaccount">You don't have an account yet?</span>&nbsp;
                    <router-link class="alert-link" to="/register" jhiTranslate="global.messages.info.register.link">Register a new account</router-link>
                </div>
            </div>

            <p jhiTranslate="home.question">
                If you have any question on JHipster:
            </p>

            <ul>
                <li><a href="https://www.jhipster.tech/" target="_blank" rel="noopener" jhiTranslate="home.link.homepage">JHipster homepage</a></li>
                <li><a href="http://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener" jhiTranslate="home.link.stackoverflow">JHipster on Stack Overflow</a></li>
                <li><a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener" jhiTranslate="home.link.bugtracker">JHipster bug tracker</a></li>
                <li><a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener" jhiTranslate="home.link.chat">JHipster public chat room</a></li>
                <li><a href="https://twitter.com/java_hipster" target="_blank" rel="noopener" jhiTranslate="home.link.follow">follow @java_hipster on Twitter</a></li>
            </ul>

            <p>
                <span jhiTranslate="home.like">If you like JHipster, don't forget to give us a star on</span> <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener" jhiTranslate="home.github">GitHub</a>!
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                account: null
            }
        },
        computed:{
            authenticated(){
                return false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* ==========================================================================
Main page styles
========================================================================== */

    .hipster {
        display: inline-block;
        width: 347px;
        height: 497px;
        background: url('../../content/images/hipster.png') no-repeat center top;
        background-size: contain;
    }

    /* wait autoprefixer update to allow simple generation of high pixel density media query */
    @media only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min--moz-device-pixel-ratio: 2),
    only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 192dpi),
    only screen and (min-resolution: 2dppx) {
        .hipster {
            background: url('../../content/images/hipster2x.png') no-repeat center top;
            background-size: contain;
        }
    }

</style>
