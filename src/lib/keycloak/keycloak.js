import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', // Keycloak base URL
  realm: 'sharefiles',       // Replace with your realm name
  clientId: 'sharefiles' // Replace with your client ID
});

export default keycloak;
