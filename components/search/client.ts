import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  '0Q9AHOYTD6',
  'bac156bf6503389605b448c08aa6bc0f' // owlapp.in restricted api key
);

const resources_ind = client.initIndex('resources');
const users_ind = client.initIndex('users');
const forums_ind = client.initIndex('forums');

export { resources_ind, users_ind, forums_ind };