import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak!: Keycloak;

  async init(): Promise<void> {
    const keycloakConfig = environment.keycloakConfig;

    this.keycloak = new Keycloak(keycloakConfig);

    try {
      await this.keycloak.init({ onLoad: 'login-required' });

      if (this.keycloak.authenticated) {
        console.log('User is authenticated');
      }

      return Promise.resolve(); // No need to use resolve(), just return the value
    } catch (error) {
      console.error('Keycloak initialization error', error);
      return Promise.reject(error); // No need to use reject(), just throw the error
    }
  }

  getToken(): string {
    return this.keycloak.token || '';
  }

  // Add methods to handle logout, checking roles, etc.
}
