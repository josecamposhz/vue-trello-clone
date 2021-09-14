import Navbar from '@/components/core/Navbar.vue';
import TrelloColumn from '@/components/Column.vue';
import TrelloCard from '@/components/Card.vue';

function registerComponents(app) {
  app.component('core-navbar', Navbar);
  app.component('trello-column', TrelloColumn);
  app.component('trello-card', TrelloCard);
}

export default registerComponents;
