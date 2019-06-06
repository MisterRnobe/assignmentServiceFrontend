import React from 'react'
import {getAllCurrentAssignmentTests} from '../common/Queries'

class TestAssignmentCreator extends React.Component {

    state = {
        name: undefined,
        scores: 1,
        questions: [],
        currentTests: []
    };

    constructor(props) {
        super(props);
        this.getTests();
    }


    sendTest = async (e) => {
        e.preventDefault();
        console.log("State is: ");
        console.log(this.state);

        fetch(`http://localhost:21043/assignment-test/create/${this.props.user.login}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state)
        }).then(() => {
            this.getTests();
        });

    };

    getTests = () => {
        getAllCurrentAssignmentTests(this.props, (tests) => {
            this.setState({
                currentTests: tests
            })
        });
    };

    addQuestion = (e) => {
        e.preventDefault();
        const questions = this.state.questions.slice();
        questions.push({});
        this.setState({
            questions: questions
        });
    };

    handleName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleScores = ({target: {value}}) => {
        this.setState({scores: value})
    };

    setQuestion = (index, question) => {
        const questions = this.state.questions.slice();
        questions[index] = question;
        this.setState({
            questions: questions
        });
    };

    dropQuestion = (index) => {
        const questions = this.state.questions.slice();
        questions.splice(index, 1);
        this.setState({
            questions: questions
        });

    };

    render() {
        const questions = this.state.questions;
        return (
            <div>
                <form>
                    <label>
                        Название:
                        <input type={"text"} onChange={this.handleName}/>
                    </label>
                    <label>
                        Баллы
                        <select onChange={this.handleScores}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </label>
                    {questions.map((question, index) => (
                        <Question drop={this.dropQuestion} callback={this.setQuestion} index={index}
                                  key={"question-" + index}/>
                    ))}
                    <button onClick={this.addQuestion}>Добавить вопрос</button>
                    <button onClick={this.sendTest}>Отправить</button>
                </form>
                <div>
                    {this.state.currentTests.map(test => (
                        <TestAssignmentDisplayer test={test} key={"test-" + test.id}/>
                    ))}
                </div>
            </div>
        )
    }
}


class Question extends React.Component {

    state = {
        goodAnswers: [],
        badAnswers: [],
        question: undefined
    };

    handleGoodQuestionText = ({target: {value}}) => {
        const parsedGoodAnswers = this.parse(value);
        const state = this.state;
        state.goodAnswers = parsedGoodAnswers;
        this.setState({
            goodAnswers: parsedGoodAnswers
        });
        this.props.callback(this.props.index, state);
    };

    handleBadQuestionText = ({target: {value}}) => {
        const parsedBadAnswers = this.parse(value);
        const state = this.state;
        state.badAnswers = parsedBadAnswers;
        this.setState({
            badAnswers: parsedBadAnswers
        });
        this.props.callback(this.props.index, state);
    };

    parse = (text) => {
        const regex = /(.+?);/gm;
        let m;

        const found = [];
        while ((m = regex.exec(text)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            found.push(m[1]);
        }
        return found;
    };
    drop = (e) => {
        e.preventDefault();
        this.props.drop(this.props.index);
    };


    render() {
        return (
            <div style={{border: "cyan 1px solid"}}>
                <div>
                    <label>
                        Вопрос:
                        <input type={"text"} onChange={(e) => this.setState({question: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <div>
                        <p>Правильные ответы (перечисленные через точку с запятой):</p>
                        <textarea onChange={this.handleGoodQuestionText}/>
                    </div>
                </div>
                <div>
                    <p>Неправильные ответы (перечисленные через точку с запятой):</p>
                    <div>
                        <textarea onChange={this.handleBadQuestionText}/>
                    </div>
                </div>
                <button onClick={this.drop}>Удалить вопрос
                </button>
            </div>
        );
    }
}

class TestAssignmentDisplayer extends React.Component {

    render() {
        const assignmentTest = this.props.test;
        const questions = assignmentTest.questions;
        return (
            <div style={{border: "blue 2px dotted"}}>
                <h2>{assignmentTest.name}</h2>
                <div>
                    {questions.map((question, index) => (
                        <div key={"question-" + index}>
                            <div>
                                <h3>{question.question}</h3>
                                <h4>Правильные ответы</h4>
                                {question.goodAnswers.map((text, index) => (
                                    <p key={"good-answer-" + index}>{text}</p>
                                ))}
                                <h4>Неправильные ответы</h4>
                                {question.badAnswers.map((text, index) => (
                                    <p key={"bad-answer-" + index}>{text}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TestAssignmentCreator