function getCircleColourCB(temp) {
    /*
    Colour codes:
    "#EDF13B" (30 +)
     "#9BFDD2" ( 24 -> 29)
     "#38FBD2" (18 -> 23)
    "#72C7B7" (11 -> 17)
     "#AFC192" (+4 -> 10)
     "#798A66" (-2 -> + 3)
     "#5F5B45" (-8 -> -3)
    "#29402B" (-14 -> -9)
     "#093328" (-20 -> -15)
     "#000000" (-21 and colder)
    GhostWhite: "#F8F8FF"
    */
    if (temp == -500) {
        return "#ffffff";
    } else if (temp <= -21) {
        return "#000000";
    } else if (temp <= -15) {
        return "#093328";
    } else if (temp <= -9) {
        return "#29402B";
    } else if (temp <= -3) {
        return "#5F5B45";
    } else if (temp <= 3) {
        return "#798A66";
    } else if (temp <= 10) {
        return "#AFC192";
    } else if (temp <= 17) {
        return "#72C7B7";
    } else if (temp <= 23) {
        return "#38FBD2";
    } else if (temp <= 29) {
        return "#9BFDD2";
    } else if (temp > 29) {
        return "#EDF13B";
    } else return "#ffffff";

}
module.exports = getCircleColourCB;