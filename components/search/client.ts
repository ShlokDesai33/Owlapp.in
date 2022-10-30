import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  '0Q9AHOYTD6',
  '1082e2607eb9dfe00542fd25210af538'
);

const resources_ind = client.initIndex('resources');
const users_ind = client.initIndex('users');
const forums_ind = client.initIndex('forums');

function searchResources(query: string) {
  return resources_ind.search(query);
}

function searchUsers(query: string) {
  return users_ind.search(query);
}

function searchForums(query: string) {
  return forums_ind.search(query);
}

export { resources_ind, users_ind, forums_ind };