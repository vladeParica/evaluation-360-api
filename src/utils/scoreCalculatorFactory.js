
class ScoreCalculator {
    calculate(responses) {
        throw new Error('El metodo calculate debe ser implementado');
    }
}

class SimpleScoreCalculator extends ScoreCalculator {
    calculate(responses) {
        if (!responses || responses.length === 0) {
            return { average: 0, details: {} };
        }

        let totalScore = 0;
        let count = 0;
        const categoryScores = {};

        for (const response of responses) {
            if (response.numericalResponse) {
                totalScore += response.numericalResponse;
                count++;

                if (response.question && response.question.category) {
                    const category = response.question.category;

                    if (!categoryScores[category]) {
                        categoryScores[category] = { total: 0, count: 0 };
                    }

                    categoryScores[category].total += response.numericalResponse;
                    categoryScores[category].count++;
                }
            }
        }

        const details = {};
        for (const [category, data] of Object.entries(categoryScores)) {
            details[category] = data.count > 0 ? data.total / data.count : 0;
        }

        return {
            average: count > 0 ? totalScore / count : 0,
            details
        };
    }
}

class WeightedScoreCalculator extends ScoreCalculator {
    constructor(weights = {}) {
        super();
        this.weights = {
            leadership: weights.leadership || 1,
            communication: weights.communication || 1,
            teamwork: weights.teamwork || 1,
            technical: weights.technical || 1,
            productivity: weights.productivity || 1
        };
    }

    calculate(responses) {
        if (!responses || responses.length === 0) {
            return { average: 0, details: {} };
        }

        const categoryScores = {};
        let weightedTotal = 0;
        let totalWeight = 0;

        for (const response of responses) {
            if (response.numericalResponse && response.question && response.question.category) {
                const category = response.question.category;

                if (!categoryScores[category]) {
                    categoryScores[category] = { total: 0, count: 0 };
                }

                categoryScores[category].total += response.numericalResponse;
                categoryScores[category].count++;
            }
        }

        const details = {};
        for (const [category, data] of Object.entries(categoryScores)) {
            const weight = this.weights[category] || 1;
            const average = data.count > 0 ? data.total / data.count : 0;

            details[category] = average;
            weightedTotal += average * weight;
            totalWeight += weight;
        }

        return {
            average: totalWeight > 0 ? weightedTotal / totalWeight : 0,
            details,
            weightedDetails: details
        };
    }
}

class ScoreCalculatorFactory {
    createCalculator(evaluationType) {
        switch (evaluationType) {
            case 'self':
                return new WeightedScoreCalculator({
                    productivity: 1.5,
                    technical: 1.2
                });
            case 'peer':
                return new WeightedScoreCalculator({
                    teamwork: 1.5,
                    communication: 1.2
                });
            case 'manager':
                return new WeightedScoreCalculator({
                    leadership: 1.5,
                    communication: 1.2
                });
            case 'subordinate':
                return new WeightedScoreCalculator({
                    leadership: 1.5,
                    communication: 1.2
                });
            case 'complete360':
                return new WeightedScoreCalculator();
            default:
                return new SimpleScoreCalculator();
        }
    }
}

module.exports = { ScoreCalculatorFactory };