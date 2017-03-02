export let ProjectSchema = new SimpleSchema({
  name: {
    type: String,
  },
  url: {
    type: SimpleSchema.RegEx.Url,
  },
  client: {
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
