function getCircleColour(temp) {
    /*
    Colour codes:
    Red: "#FF0000" (30 +)
    Dark Orange: "#FF8C00" ( 24 -> 29)
    Gold: "#FFD700" (18 -> 23)
    GreenYellow: "#ADFF2F" (11 -> 17)
    Dark Green: "#006400" (+4 -> 10)
    Aqua: "#00FFFF" (-2 -> + 3)
    Light Blue: "#ADD8E6" (-8 -> -3)
    Blue: "#0000FF" (-14 -> -9)
    Dark Blue: "#00008B" (-20 -> -15)
    Black: "#000000" (-21 and colder)
    GhostWhite: "#F8F8FF"
    */
    if (temp == -500) {
        return "#ffffff";
    } else if (temp <= -21) {
        return "#000000";
    } else if (temp <= -15) {
        return "#00008B";
    } else if (temp <= -9) {
        return "#0000FF";
    } else if (temp <= -3) {
        return "#00FFFF";
    } else if (temp <= 3) {
        return "#ADD8E6";
    } else if (temp <= 10) {
        return "#006400";
    } else if (temp <= 17) {
        return "#ADFF2F";
    } else if (temp <= 23) {
        return "#FFD700";
    } else if (temp <= 29) {
        return "#FF8C00";
    } else if (temp > 29) {
        return "#FF0000";
    } else return "#ffffff";

}
module.exports = getCircleColour;