import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication({
	auth: {
		clientId: '97de7c9d-6efc-491e-8058-31ec46205048'
	},
	cache: {
		cacheLocation: 'localStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
	}
});

export default msalInstance;