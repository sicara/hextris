function iaPlay() {
	var mainHexAngle = ((MainHex.angle) / 60 + 60000 - 0.5) % 6;
	var lowestHeight = _.minBy(blocks, 'distFromHex').distFromHex || 0;
	var lowestBlocks = _.filter(blocks, function (block) {
		return block.distFromHex < lowestHeight + 10;
	});

	var matchingScores = _.fill(Array(6), 0);
	var nonMatchingScores = _.fill(Array(6), 0);

	for (rotation = 0; rotation < 6; rotation++) {
		var matches = _.fill(Array(6), 0);
		var nonMatches = _.fill(Array(6), 0);
		lowestBlocks.forEach(function (block) {
			var hexIndex = (MainHex.getLaneOfFallingBlock(block) + rotation) % 6;
			if (_.last(MainHex.blocks[hexIndex])) {
				if (_.last(MainHex.blocks[hexIndex]).color === block.color) {
					matches[hexIndex]++;
				} else {
					nonMatches[hexIndex]++;
				}
			}
		});
		matchingScores[rotation] = _.sum(matches);
		nonMatchingScores[rotation] = _.sum(nonMatches);
	}
	var bestRotation = 0;
	for (rotation = 0; rotation < 6; rotation++) {
		if (matchingScores[rotation] > matchingScores[bestRotation]) {
			bestRotation = rotation;
		} else if (matchingScores[rotation] === matchingScores[bestRotation] && nonMatchingScores[rotation] < nonMatchingScores[bestRotation]) {
			bestRotation = rotation;
		}
	}
	matchingScores.indexOf(_.max(matchingScores));
	if (bestRotation !== 0 && MainHex.targetAngle === MainHex.angle) {
		console.log("Found good rotation: " + bestRotation + ", had " + matchingScores[bestRotation] + " score.");
		MainHex.rotate(bestRotation);
	}
}
