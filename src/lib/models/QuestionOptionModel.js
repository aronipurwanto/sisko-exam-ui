export default class QuestionOptionModel {
    constructor({id = '', questionId = '', label = '', content = '', correct = false, orderIndex = 10} = {}) {
        this.id = id;
        this.questionId = questionId;
        this.label = label;
        this.content = content;
        this.correct = correct;
        this.orderIndex = orderIndex;
    }
}