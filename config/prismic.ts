import * as prismic from '@prismicio/client'
import config from '.'

// Fill in your repository name
export const repositoryName = config.PRISMIC.repo as string
const endpoint = prismic.getEndpoint(repositoryName)

export const client = prismic.createClient(endpoint, {
  // If your repo is private, add an access token
  accessToken: config.PRISMIC.token as string,
})