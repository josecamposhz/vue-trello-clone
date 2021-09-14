function registerDirectives(app) {
  app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus();
    },
  });
}

export default registerDirectives;
