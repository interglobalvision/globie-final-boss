export let ProjectSchema = new SimpleSchema({
  name: {
    type: String,
  },
  url: {
    type: SimpleSchema.RegEx.Url,
  },
  customerId: {
    type: String,
    optional: true,
  },
  customer: {
    type: String,
  },
  minDays: {
    type: Number,
  },
  maxDays: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  currency: {
    type: String,
  },
  minQuote: {
    type: Number,
  },
  maxQuote: {
    type: Number,
  },
});
