db.createUser({
  user: 'authflow_user',
  pwd: 'authflow_pass',
  roles: [
    {
      role: 'readWrite',
      db: 'authflow',
    },
  ],
});

db = db.getSiblingDB('authflow');
db.createCollection('users');
db.createCollection('refresh_tokens');