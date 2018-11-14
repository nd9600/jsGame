var Place;
(function (Place) {
    Place["Character"] = "c";
    Place["Wall"] = "x";
    Place["Empty"] = " ";
    Place["End"] = "end";
})(Place || (Place = {}));
var Status;
(function (Status) {
    Status["NotStarted"] = "NotStarted";
    Status["PlacingWalls"] = "PlacingWalls";
    Status["Playing"] = "Playing";
    Status["Finished"] = "Finished";
})(Status || (Status = {}));
export { Place, Status };
//# sourceMappingURL=BoardTypes.js.map