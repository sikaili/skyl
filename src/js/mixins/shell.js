export default {
  computed: {
    shellMxn() {
      return {
        installApp: () => {
          console.log(this.$root.deferredInstallPrompt);
          if (this.$root.deferredInstallPrompt) {
            this.$root.deferredInstallPrompt.prompt();
            this.$root.deferredInstallPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                this.$root.deferredInstallPrompt = null;
              }
            });
          }
        },
      };
    },
  },
};
