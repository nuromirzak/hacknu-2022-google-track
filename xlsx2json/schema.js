// An example *.xlsx document:
// -----------------------------------------------------------------------------------------
// | START DATE | NUMBER OF STUDENTS | IS FREE | COURSE TITLE |    CONTACT     |  STATUS   |
// -----------------------------------------------------------------------------------------
// | 03/24/2018 |         10         |   true  |  Chemistry   | (123) 456-7890 | SCHEDULED |
// -----------------------------------------------------------------------------------------

const schema = {
  Latitude: {
    // JSON object property name.
    prop: "lat",
    type: Number,
  },
  Longitude: {
    prop: "lng",
    type: Number,
  },
  Altitude: {
    prop: "alt",
    type: Number,
  },
  Identifier: {
    prop: "id",
    type: String,
  },
  Timestamp: {
    prop: "timestamp",
    type: Number,
  },
  "Floor label": {
    prop: "floor",
    type: String,
  },
  "Horizontal accuracy": {
    prop: "horizontalAccuracy",
    type: Number,
  },
  "Vertical accuracy": {
    prop: "verticalAccuracy",
    type: Number,
  },
  "Confidence in location accuracy": {
    prop: "confidence",
    type: Number,
  },
  Activity: {
    prop: "activity",
    type: String,
    oneOf: ["walking", "running", "driving", "cycling", "swimming", null],
  },
};

module.exports = schema;
