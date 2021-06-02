const getCircleColour = require('./VisualizationForTest')


test('Return coldest colour standard', () => {
    expect(getCircleColour(-40)).toBe("#000000")
})
test('Return 2nd coldest colour standard', () => {
    expect(getCircleColour(-18)).toBe("#00008B")
})
test('Return 3rd coldest colour standard', () => {
    expect(getCircleColour(-12)).toBe("#0000FF")
})
test('Return 4th coldest colour standard', () => {
    expect(getCircleColour(-7)).toBe("#00FFFF")
})
test('Return 5th coldest colour standard', () => {
    expect(getCircleColour(1)).toBe("#ADD8E6")
})
test('Return 6th coldest colour standard', () => {
    expect(getCircleColour(5)).toBe("#006400")
})
test('Return 7th coldest colour standard', () => {
    expect(getCircleColour(12)).toBe("#ADFF2F")
})
test('Return 3rd warmest colour standard', () => {
    expect(getCircleColour(20)).toBe("#FFD700")
})
test('Return 2nd warmestcolour standard', () => {
    expect(getCircleColour(25)).toBe("#FF8C00")
})
test('Return warmest colour standard', () => {
    expect(getCircleColour(33)).toBe("#FF0000")
})
test('Return default colour standard', () => {
    expect(getCircleColour(-500)).toBe("#ffffff")
})