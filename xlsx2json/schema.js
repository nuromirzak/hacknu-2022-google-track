// An example *.xlsx document:
// -----------------------------------------------------------------------------------------
// | START DATE | NUMBER OF STUDENTS | IS FREE | COURSE TITLE |    CONTACT     |  STATUS   |
// -----------------------------------------------------------------------------------------
// | 03/24/2018 |         10         |   true  |  Chemistry   | (123) 456-7890 | SCHEDULED |
// -----------------------------------------------------------------------------------------

const schema = {
  Latitude: {
    // JSON object property name.
    prop: "latitude",
    type: Number,
  },
  Longitude: {
    prop: "longitude",
    type: Number,
  },
  Altitude: {
    prop: "altitude",
    type: Number,
  },
  Identifier: {
    prop: "identifier",
    type: String,
  },
  Timestamp: {
    prop: "timestamp",
    type: Number,
  },
  "Floor label": {
    prop: "floor_label",
    type: String,
  },
  "Horizontal accuracy": {
    prop: "horizontal_accuracy",
    type: Number,
  },
  "Vertical accuracy": {
    prop: "vertical_accuracy",
    type: Number,
  },
  "Confidence in location accuracy": {
    prop: "accuracy",
    type: Number,
  },
  Activity: {
    prop: "activity",
    type: String,
    oneOf: ["walking", "running", "driving", "cycling", "swimming", "UNKNOWN", null],
  },
};

module.exports = schema;
