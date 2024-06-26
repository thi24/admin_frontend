<template>
  <div class="account-layout">
    <nav class="nav-bar">
      <NuxtLink :to="'/event-dashboard/' + eventId">
        Veranstaltung
      </NuxtLink>
      <NuxtLink :to="'/event-dashboard/' + eventId + '/ticket-typen'">Tickettypen</NuxtLink>
      <NuxtLink :to="'/event-dashboard/' + eventId + '/sales/buchungen/0'"
                :class="{ active: useRoute().fullPath.includes('buchungen') || useRoute().fullPath.includes('tickets') }"
                @click="toggleSidebar">Sales
      </NuxtLink>
      <NuxtLink :to="'/event-dashboard/' + eventId + '/analyse'">Analyse</NuxtLink>
      <NuxtLink :to="'/event-dashboard/' + eventId + '/storno-buchung'">Stornierung</NuxtLink>
      <p v-if="event?.entryStarted" class="entry-button" @click="() => entryComponent.show()">Einlass</p>
    </nav>

    <nav class="toggled-nav-bar">
      <div class="nav">
        <UiButton icon="list" @click="toggleSidebar()"></UiButton>
        <h2>Benevolo</h2>
      </div>
      <div class="sidebar" :class="{ 'sidebar-visible': visible }">
        <div class="sidebar-menue">
          <UiButton icon="close" @click="toggleSidebar()"></UiButton>
        </div>
        <div class="link-list">
          <NuxtLink :to="'/event-dashboard/' + eventId" @click="toggleSidebar">
            Veranstaltung
          </NuxtLink>
          <NuxtLink :to="'/event-dashboard/' + eventId + '/ticket-typen'" @click="toggleSidebar">Tickettypen
          </NuxtLink>
          <NuxtLink :to="'/event-dashboard/' + eventId + '/sales/buchungen/0'"
                    :class="{ active: useRoute().fullPath.includes('buchungen') || useRoute().fullPath.includes('tickets') }"
                    @click="toggleSidebar">Sales
          </NuxtLink>
          <NuxtLink :to="'/event-dashboard/' + eventId + '/analyse'" @click="toggleSidebar">Analyse
          </NuxtLink>
          <NuxtLink :to="'/event-dashboard/' + eventId + '/storno-buchung'" @click="toggleSidebar">Stornierung
          </NuxtLink>
          <NuxtLink v-if="event?.entryStarted" @click="toggleSidebar(); entryComponent.show()">Einlass</NuxtLink>
          <NuxtLink :to="'../../veranstaltungen'">Zurück zu allen Veranstaltungen</NuxtLink>
        </div>
      </div>
    </nav>
    <div>
      <NuxtPage></NuxtPage>
    </div>
  </div>
  <EntryComponent v-if="event?.entryStarted" ref="entryComponent"></EntryComponent>
</template>

<script setup lang="ts">
import {useEventStore} from '~/stores/EventStore';
import EntryComponent from '~/components/EntryComponent.vue';

const eventId = useRoute().params.id as string;
const visible = ref(false);
const event = ref(computed(() => useEventStore().getEvent()));

onMounted(() => {
  useEventStore().init(eventId);
});

const entryComponent = ref();

function toggleSidebar() {
  visible.value = !visible.value;
}

</script>

<style scoped>
.account-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  align-self: stretch;
}

.nav-bar {
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-right: 1px solid #eaeaea;
  padding: 1rem 2rem;
}

.nav-bar > * {
  padding: 0.5rem 0.75rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
}

.nav-bar > *.router-link-active, .nav-bar > *.active {
  background-color: var(--primary-color);
  color: white;
  border-radius: 10rem;
}

.scroll-container {
  position: relative;
  width: 100vh;
  height: 100%;
  overflow: scroll;
}

.scrolling-div {
  padding: 1rem;
  height: 100vh;
  position: absolute;
}

.entry-button {
  border: 3px solid black;
  border-radius: 2.5rem;
  cursor: pointer;
}

.toggled-nav-bar {
  display: none;
}

@media (max-width: 576px) {
  .account-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .nav-bar {
    display: none;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    background-color: white;
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    transform: translateX(-100%);
    transition: transform 0.5s ease-in-out;
    z-index: 1000;
  }

  .sidebar-visible {
    transform: translateX(0);
  }

  .sidebar-menue {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  a {
    padding: 0.5rem;
  }

  .toggled-nav-bar {
    display: block;
  }
}
</style>