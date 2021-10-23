<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
         <router-link to="/" class="text-white" style="text-decoration: none"> <div class="text-h6" style="display:inline"> Tmq-motel</div></router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-ajax-bar position="top" size="4px" color="red" skip-hijack/>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
