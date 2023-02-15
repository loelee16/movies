import {Environment} from './ienvironment'

export const environment: Environment = {
    production: false,
    movieAPIEndpoint: 'https://35.244.178.223.nip.io/avela/movie',
    oktaIssuer: 'https://login.mondevwork.com/oauth2/default',
    oktaClientId: '0oa73vuiisN7NBJHB5d7',
    allowedOrigins: ['http://localhost', '35.244.178.223.nip.io']
}