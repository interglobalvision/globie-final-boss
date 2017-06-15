export let CustomerSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: SimpleSchema.RegEx.Email,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  country: {
    type: String,
    optional: true,
  },
  currency: {
    type: String,
    optional: true,
  },
});
