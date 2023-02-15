export interface Environment {
    production: boolean    
    movieAPIEndpoint: string    
    oktaIssuer: string
    oktaClientId: string,
    allowedOrigins: string[]
  }