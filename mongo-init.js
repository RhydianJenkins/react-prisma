// eslint-disable-next-line no-undef
db.createUser({
  user: 'username', // TODO get this from an env variable?
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'test_db_name',
    },
  ],
})
