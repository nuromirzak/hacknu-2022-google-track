class Location {
    constructor(data) {
        this.latitude = data.latitude;
        this.Longitude = data.Longitude;
        this.Altitude = data.Altitude;
        this.Identifier = data.Identifier;
        this.timestamp = data.timestamp;
        this.floor_label = data.floor_label;
        this.horizontal_accuracy = data.horizontal_accuracy;
        this.vertical_accuracy = data.vertical_accuracy;
        this.accuracy = data.accuracy;
        this.activity = data.activity;
    }
}