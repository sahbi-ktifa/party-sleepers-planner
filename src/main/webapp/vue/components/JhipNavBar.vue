<template>
    <nav class="navbar navbar-dark navbar-expand-md jh-navbar">
        <div class="jh-logo-container float-left">
            <!--a class="jh-navbar-toggler d-lg-none float-right" href="javascript:void(0);" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" (click)="toggleNavbar()"-->
            <a class="jh-navbar-toggler d-lg-none float-right" href="javascript:void(0);" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" >
                <font-awesome-icon icon="bars" />
            </a>
            <!--a class="navbar-brand logo float-left" routerLink="/" (click)="collapseNavbar()"-->
            <router-link class="navbar-brand logo float-left" to="/">
                <span class="logo-img"></span>
                <span jhiTranslate="global.title" class="navbar-title">PartySleeperPlanner</span> <span class="navbar-version">{{version}}</span>
            </router-link>
        </div>
        <!--<div class="navbar-collapse collapse" id="navbarResponsive" [ngbCollapse]="isNavbarCollapsed">-->
        <div class="navbar-collapse collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" >
                    <router-link class="nav-link" to="/">
                        <span>
                            <font-awesome-icon icon="home" />
                            <span jhiTranslate="global.menu.home">Home</span>
                        </span>
                    </router-link>
                </li>
                <!--<li v-if="authenticated" ngbDropdown class="nav-item dropdown pointer" >
                    <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="entity-menu">
                        <span>
                            <font-awesome-icon icon="th-list" />
                            <span jhiTranslate="global.menu.entities.main">
                                Entities
                            </span>
                        </span>
                    </a>
                    <ul class="dropdown-menu" ngbDropdownMenu>
                        <li>
                            <a class="dropdown-item" routerLink="sleeper"  v-on:click="collapseNavbar()">
                                <font-awesome-icon icon="asterisk" />
                                <span jhiTranslate="global.menu.entities.sleeper">Sleeper</span>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" routerLink="location"  v-on:click="collapseNavbar()">
                                <font-awesome-icon icon="asterisk" />
                                <span jhiTranslate="global.menu.entities.location">Location</span>
                            </a>
                        </li>
                    </ul>
                </li>-->
                <!--<li *jhiHasAnyAuthority="'ROLE_ADMIN'" ngbDropdown class="nav-item dropdown pointer" >-->
                <li class="nav-item dropdown pointer" >
                    <b-dropdown id="admin-menu" class="nav-link">
                        <template slot="button-content">
                            <font-awesome-icon icon="user-plus" />
                            <span jhiTranslate="global.menu.admin.main">Administration</span>
                        </template>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/user-management" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="user" />
                            <span jhiTranslate="global.menu.admin.userManagement">User management</span>
                        </b-dropdown-item>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/jhi-metrics" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="tachometer-alt" />
                            <span jhiTranslate="global.menu.admin.metrics">Metrics</span>
                        </b-dropdown-item>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/jhi-health" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="heart" />
                            <span jhiTranslate="global.menu.admin.health">Health</span>
                        </b-dropdown-item>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/jhi-configuration" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="list" />
                            <span jhiTranslate="global.menu.admin.configuration">Configuration</span>
                        </b-dropdown-item>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/audits" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="bell" />
                            <span jhiTranslate="global.menu.admin.audits">Audits</span>
                        </b-dropdown-item>
                        <b-dropdown-item class="dropdown-item" routerLink="admin/logs" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="tasks" />
                            <span jhiTranslate="global.menu.admin.logs">Logs</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="swaggerEnabled" class="dropdown-item" routerLink="admin/docs" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="book" />
                            <span jhiTranslate="global.menu.admin.apidocs">API</span>
                        </b-dropdown-item>

                        <b-dropdown-item v-if="!inProduction" class="dropdown-item" href='./h2-console' target="_tab" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="hdd" />
                            <span jhiTranslate="global.menu.admin.database">Database</span>
                        </b-dropdown-item>
                    </b-dropdown>
                </li>
                <li class="nav-item dropdown pointer" v-if="languages && languages.length > 1">
                    <b-dropdown id="languagesnavBarDropdown" class="nav-link">
                        <template slot="button-content">
                            <font-awesome-icon icon="flag" />
                            <span jhiTranslate="global.menu.language">Language</span>
                        </template>
                        <b-dropdown-item v-for="(language, key) in languages" :key="`lang-${key}`" v-on:click="changeLanguage(language);collapseNavbar();">
                            <!--<a class="dropdown-item" [jhiActiveMenu]="language" href="javascript:void(0);" v-on:click="changeLanguage(language);collapseNavbar();">{{language | findLanguageFromKey}}</a>-->
                            {{language}}
                        </b-dropdown-item>
                    </b-dropdown>
                </li>
                <li class="nav-item dropdown pointer" placement="bottom-right" >
                    <b-dropdown class="nav-link" href="javascript:void(0);" id="account-menu">
                        <template slot="button-content" v-if="!getImageUrl()">
                            <font-awesome-icon icon="user" />
                            <span jhiTranslate="global.menu.account.main">
                                Account
                            </span>
                        </template>
                        <template slot="button-content" v-if="getImageUrl()">
                            <img [src]="getImageUrl()" class="profile-image img-circle" alt="Avatar">
                        </template>
                        <b-dropdown-item v-if="authenticated" class="dropdown-item" routerLink="settings" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="wrench" />
                            <span jhiTranslate="global.menu.account.settings">Settings</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="authenticated" class="dropdown-item" routerLink="password" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="clock" />
                            <span jhiTranslate="global.menu.account.password">Password</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="authenticated" class="dropdown-item" routerLink="sessions" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <font-awesome-icon icon="cloud" />
                            <span jhiTranslate="global.menu.account.sessions">Sessions</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="authenticated" class="dropdown-item" v-on:click="logout()" id="logout">
                            <font-awesome-icon icon="sign-out-alt" />
                            <span jhiTranslate="global.menu.account.logout">Sign out</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="!authenticated" class="dropdown-item" v-on:click="login()" id="login">
                            <font-awesome-icon icon="sign-in-alt" />
                            <span jhiTranslate="global.menu.account.login">Sign in</span>
                        </b-dropdown-item>
                        <b-dropdown-item v-if="!authenticated" class="dropdown-item" routerLink="register" routerLinkActive="active" v-on:click="collapseNavbar()">
                            <router-link to="register">
                                <font-awesome-icon icon="user-plus" />
                                <span jhiTranslate="global.menu.account.register">Register</span>
                            </router-link>
                        </b-dropdown-item>
                    </b-dropdown>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    import {VERSION} from "../constants";

    export default {
        name: 'JhiNavBar',
        data : function() {
            return {
                version : VERSION ? 'v' + VERSION : '',
                language: 'Français',
                swaggerEnabled: false,
                inProduction: false,
                languages: ['English', 'Français'],
                isNavbarCollapsed: true
            }
        },
        methods: {
            getImageUrl: function() {
                return false;
            },
            collapseNavbar() {
                this.isNavbarCollapsed = true;
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
    Navbar
    ========================================================================== */
    .navbar-version {
        font-size: 10px;
        color: #ccc;
    }

    .jh-navbar {
        background-color: #353d47;
        padding: 0.2em 1em;
    }

    .jh-navbar .profile-image {
        margin: -10px 0px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .jh-navbar .dropdown-item.active,
    .jh-navbar .dropdown-item.active:focus,
    .jh-navbar .dropdown-item.active:hover {
        background-color: #353d47;
    }

    .jh-navbar .dropdown-toggle::after {
        margin-left: 0.15em;
    }

    .jh-navbar ul.navbar-nav {
        padding: 0.5em;
    }

    .jh-navbar .navbar-nav .nav-item {
        margin-left: 1.5rem;
    }

    .jh-navbar a.nav-link {
        font-weight: 400;
    }

    .jh-navbar .jh-navbar-toggler {
        color: #ccc;
        font-size: 1.5em;
        padding: 10px;
    }

    .jh-navbar .jh-navbar-toggler:hover {
        color: #fff;
    }

    @media screen and (min-width: 768px) {
        .jh-navbar-toggler {
            display: none;
        }
    }

    @media screen and (max-width: 992px) {
        .jh-logo-container {
            width: 100%;
        }
    }

    .navbar-title {
        display: inline-block;
        vertical-align: middle;
        color: white;
    }

    /* ==========================================================================
    Logo styles
    ========================================================================== */
    .navbar-brand.logo {
        padding: 5px 15px;
    }

    .logo .logo-img {
        height: 45px;
        display: inline-block;
        vertical-align: middle;
        width: 70px;
    }

    .logo-img {
        height: 100%;
        background: url('../assets/logo-jhipster.png') no-repeat center center;
        background-size: contain;
        width: 100%;
    }
</style>
