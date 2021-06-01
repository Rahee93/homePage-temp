const getCircleColourCB = require('./VisualizationForTestCB')


test('Return coldest colour standard', () => {
    expect(getCircleColourCB(-40)).toBe("#000000")
})
test('Return 2nd coldest colour standard', () => {
    expect(getCircleColourCB(-18)).toBe("#093328")
})
test('Return 3rd coldest colour standard', () => {
    expect(getCircleColourCB(-12)).toBe("#29402B")
})
test('Return 4th coldest colour standard', () => {
    expect(getCircleColourCB(-7)).toBe("#5F5B45")
})
test('Return 5th coldest colour standard', () => {
    expect(getCircleColourCB(1)).toBe("#798A66")
})
test('Return 6th coldest colour standard', () => {
    expect(getCircleColourCB(5)).toBe("#AFC192")
})
test('Return 7th coldest colour standard', () => {
    expect(getCircleColourCB(12)).toBe("#72C7B7")
})
test('Return 3rd warmest colour standard', () => {
    expect(getCircleColourCB(20)).toBe("#38FBD2")
})
test('Return 2nd warmestcolour standard', () => {
    expect(getCircleColourCB(25)).toBe("#9BFDD2")
})
test('Return  warmest colour standard', () => {
    expect(getCircleColourCB(33)).toBe("#EDF13B")
})
test('Return default colour standard', () => {
    expect(getCircleColourCB(-500)).toBe("#ffffff")
})