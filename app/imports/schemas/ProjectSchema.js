export let ProjectSchema = new SimpleSchema({
  name: {
    type: String,
  },
  url: {
    type: SimpleSchema.RegEx.Url,
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
