function iaPlay() {
  var bestRotation = 0;
  var bestRotationScore = 0;
  var mainHexAngle = ((MainHex.angle) / 60 + 60000 - 0.5) % 6;

  var lowestHeight = _.minBy(blocks, 'distFromHex').distFromHex;
  var lowestBlocks = _.filter(blocks, function (block) {
    return block.distFromHex < lowestHeight + 10;
  });

  for (rotation = 0; rotation < 6; rotation++) {
    var matches = [0,0,0,0,0,0];
    lowestBlocks.forEach(function (block) {
      var hexIndex = (MainHex.getLaneOfFallingBlock(block) + rotation) % 6;
      if (_.last(MainHex.blocks[hexIndex])) {
        if (_.last(MainHex.blocks[hexIndex]).color === block.color) {
          console.log("ok");
          matches[hexIndex] = matches[hexIndex] + 1;
        }
      }
    });
    var numberOfMatches = _.sum(matches);
    if (numberOfMatches > bestRotationScore) {
      console.log("Found better rotation: " + rotation + ", had " + numberOfMatches + " score.");
      bestRotation = rotation;
      bestRotationScore = numberOfMatches;
    }
  }
  if (bestRotation !== 0 && MainHex.targetAngle === MainHex.angle) {
    console.log("Found good rotation: " + bestRotation + ", had " + bestRotationScore + " score.");
    MainHex.rotate(bestRotation);
  }
}
