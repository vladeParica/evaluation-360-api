class Evaluation {
    constructor(data) {
        this.title = data.title || `Evaluación ${data.type}`;
        this.period = data.period;
        this.status = data.status || 'draft';
        this.type = data.type;
        this.employee = data.employee;
        this.evaluator = data.evaluator;
        this.completed = false;
        this.questionSet = [];
    }
}

class SelfEvaluation extends Evaluation {
    constructor(data) {
        super(data);
        this.title = data.title || 'Autoevaluación';
    }
}

class PeerEvaluation extends Evaluation {
    constructor(data) {
        super(data);
        this.title = data.title || 'Evaluación de compañero';
    }
}

class ManagerEvaluation extends Evaluation {
    constructor(data) {
        super(data);
        this.title = data.title || 'Evaluación de superior';
    }
}

class SubordinateEvaluation extends Evaluation {
    constructor(data) {
        super(data);
        this.title = data.title || 'Evaluación de subordinado';
    }
}

class Complete360Evaluation extends Evaluation {
    constructor(data) {
        super(data);
        this.title = data.title || 'Evaluación 360 completa';
    }
}

class EvaluationFactory {
    createEvaluation(type, data) {
        switch (type) {
            case 'self':
                return new SelfEvaluation(data);
            case 'peer':
                return new PeerEvaluation(data);
            case 'manager':
                return new ManagerEvaluation(data);
            case 'subordinate':
                return new SubordinateEvaluation(data);
            case 'complete360':
                return new Complete360Evaluation(data);
            default:
                return new Evaluation(data);
        }
    }
}

module.exports = { EvaluationFactory };