export let WorkerSchema = new SimpleSchema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: SimpleSchema.RegEx.Email,
  },
});
