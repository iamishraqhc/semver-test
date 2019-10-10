window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  const refreshInterval = interval || 5000;
  setInterval(() => { 
    window.location.reload();
  }, refreshInterval);
});
