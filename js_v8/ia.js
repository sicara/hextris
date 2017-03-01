function iaPlay() {
	var mainHexAngle = ((MainHex.angle) / 60 + 60000 - 0.5) % 6;
	var lowestHeight = _.get(_.minBy(blocks, 'distFromHex'), 'distFromHex', 0);
	var lowestBlocks = _.filter(blocks, function (block) {
		return block.distFromHex < lowestHeight + 10;
	});

	var scores = [];
	for (rotation = 0; rotation < 6; rotation++) {
		scores.push({
			matches: 0,
			mismatches: 0,
		});
		lowestBlocks.forEach(function (block) {
			var hexIndex = (MainHex.getLaneOfFallingBlock(block) + rotation) % 6;
			if (_.last(MainHex.blocks[hexIndex])) {
				if (_.last(MainHex.blocks[hexIndex]).color === block.color) {
					scores[rotation].matches++;
				} else {
					scores[rotation].mismatches++;
				}
			}
		});
	}

	var bestRotation = 0;
	for (rotation = 0; rotation < 6; rotation++) {
		if (scores[rotation].matches > scores[bestRotation].matches) {
			bestRotation = rotation;
		} else if (scores[rotation].matches === scores[bestRotation].matches && scores[rotation].mismatches < scores[bestRotation].mismatches) {
			bestRotation = rotation;
		}
	}

	if (bestRotation !== 0 && MainHex.targetAngle === MainHex.angle) {
		// console.log("Found good rotation: " + bestRotation + ", had " + scores[bestRotation].matches + " score.");
		if (bestRotation > 3) {
			bestRotation -= 6; // For visual effect
		}
		MainHex.rotate(bestRotation);
	}
}
