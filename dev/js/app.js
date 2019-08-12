import '../node_modules/babel-polyfill';
import LocalList from './localist';

// Expose localist to Drupal.
window.CWD_LocalList = LocalList;
