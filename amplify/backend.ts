import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { helloAmplify } from './functions/helloamplify/resource';

defineBackend({
  auth,
  data,
  helloAmplify,
});
