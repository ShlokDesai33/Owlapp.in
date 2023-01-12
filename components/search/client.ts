import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  '0Q9AHOYTD6',
  '5578e22efbe2f4a04a7de60ee356fb0a' // restricted search api key
);

const resources_ind = client.initIndex('resources');
const users_ind = client.initIndex('users');
const forums_ind = client.initIndex('forums');

export { resources_ind, users_ind, forums_ind };