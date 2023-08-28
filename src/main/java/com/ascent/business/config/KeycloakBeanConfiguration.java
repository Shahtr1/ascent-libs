package com.ascent.business.config;

import java.util.ArrayList;
import java.util.List;
import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "keycloak")
public class KeycloakBeanConfiguration {

    private List<String> keycloak = new ArrayList<>();

    private String realm;

    private String auth_server_url;

    private String resource;

    private String secretKey;

    private Credentials credentials = new Credentials();

    public class Credentials {

        private String secret;

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
            secretKey = secret;
        }
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public String getAuth_server_url() {
        return auth_server_url;
    }

    public void setAuth_server_url(String auth_server_url) {
        this.auth_server_url = auth_server_url;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(String realm) {
        this.realm = realm;
    }

    public List<String> getKeycloak() {
        return keycloak;
    }

    public void setKeycloak(List<String> keycloak) {
        this.keycloak = keycloak;
    }

    @Bean
    public RealmResource getKeycloakBean() {
        Keycloak keycloakConfig = KeycloakBuilder
            .builder() //
            .serverUrl(this.getAuth_server_url())
            .realm(this.getRealm()) //
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS) //
            .clientId(this.getResource()) //
            .clientSecret(secretKey)
            .resteasyClient(new ResteasyClientBuilderImpl().connectionPoolSize(10).build())
            .build();
        return keycloakConfig.realm(this.getRealm());
    }
}
