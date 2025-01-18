import { type Writable, writable } from "svelte/store";

class User {
	private accessToken?: string;
	private idToken?: string;
	private refreshToken?: string;
	isAuthenticated: boolean = false;

	setTokens(idToken?: string, accessToken?: string, refreshToken?: string) {
		this.accessToken = accessToken;
		this.idToken = idToken;
		this.refreshToken = refreshToken;
		if (this.accessToken && this.idToken && this.refreshToken) {
			this.isAuthenticated = true;
		}
	}

	removeToken() {
		console.log("Removing token");
		this.accessToken = "";
		this.idToken = "";
		this.refreshToken = "";
		this.isAuthenticated = false;
	}
}

const userStore: Writable<User> = writable(new User());

export { userStore, User };