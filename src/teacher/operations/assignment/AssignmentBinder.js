import React from 'react';
import {
    getAllAvailableGroupsFor,
    getAllCurrentAssignments,
    getAllSemesters,
    getAllCurrentSubjects
} from '../common/Queries'

class AssignmentBinder extends React.Component {

    state = {
        availableGroups: [],
        availableAssignments: [],
        availableSemesters: [],
        availableSubjects: [],
        currentBindings: [],
        selectedGroup: undefined,
        selectedAssignment: undefined,
        selectedScore: undefined,
        selectedSubject: undefined,
        selectedStartDate: undefined,
        selectedSemester: undefined
    };

    constructor(props) {
        super(props);
        this.getAvailableGroups();
        this.getAvailableAssignment();
        this.getAvailableSemesters();
        this.getAvailableSubjects();
        this.getAllCurrentBinding();
    }

    getAvailableGroups = () => {
        getAllAvailableGroupsFor((result) => this.setState({availableGroups: result}));
    };

    getAvailableSubjects = () => {
        getAllCurrentSubjects(this.props, (result) => this.setState({
            availableSubjects: result,
            selectedSubject: result[0].id
        }));
    };

    getAvailableAssignment = () => {
        getAllCurrentAssignments(this.props, (result) => this.setState({availableAssignments: result}));
    };

    getAvailableSemesters = () => {
        getAllSemesters((result) => this.setState({availableSemesters: result}));
    };

    getAllCurrentBinding = () => {
        fetch(`http://localhost:21043/assignment-binding/get-all/${this.props.user.login}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Bindings: ");
                    this.setState({
                        currentBindings: result
                    });
                },
                (error) => {
                }
            );
    };

    sendBinding = async (e) => {
        e.preventDefault();
        console.log("Binding...:");
        console.log(this.state);
        fetch(`http://localhost:21043/assignment-binding/add/${this.props.user.login}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                groupId: this.state.selectedGroup,
                assignmentId: this.state.selectedAssignment,
                scores: this.state.selectedScore,
                subjectId: this.state.selectedSubject,
                startDate: this.state.selectedStartDate,
                semesterId: this.state.selectedSemester
            })
        }).then((result) => {
                this.getAllCurrentBinding();
            },
            (error) => {

            });

    };

    handleSelectGroup = ({target: {value}}) => {
        const found = this.state.availableGroups.filter(({name}) => {
            return name === value;
        });
        this.setState({
            selectedGroup: found[0].id
        });
    };

    handleSelectAssignment = ({target: {value}}) => {
        const found = this.state.availableAssignments.filter(({name}) => {
            return name === value;
        });
        this.setState({
            selectedAssignment: found[0].id
        });
    };

    handleSelectScore = ({target: {value}}) => {
        this.setState({
            selectedScore: value
        });
    };

    handleSelectStartDate = ({target: {value}}) => {
        this.setState({
            selectedStartDate: value
        });
    };

    handleSelectSemester = ({target: {value}}) => {
        const found = this.state.availableSemesters.filter(({name}) => {
            return name === value;
        });
        this.setState({
            selectedSemester: found[0].id
        });
    };

    handleSelectSubject = ({target: {value}}) => {
        console.log("Changed subject: " + value);
        const found = this.state.availableSubjects.filter(({name}) => {
            return name === value;
        });
        this.setState({
            selectedSubject: found[0].id
        });
    };

    render() {
        const availableGroups = this.state.availableGroups;
        const availableAssignments = this.state.availableAssignments;
        const availableSemesters = this.state.availableSemesters;
        const availableSubjects = this.state.availableSubjects;
        const currentBindings = this.state.currentBindings;
        return (
            <div>
                <form onSubmit={this.sendBinding}>
                    <label>Задание
                        <select onChange={this.handleSelectAssignment.bind(this)}>
                            {availableAssignments.map(({name, id}) => (
                                <option key={'assignment-' + id} name={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Группа
                        <select onChange={this.handleSelectGroup.bind(this)}>
                            {availableGroups.map(({name, id}) => (
                                <option key={'group-' + id} name={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Дисциплина
                        <select onChange={this.handleSelectSubject.bind(this)}>
                            {availableSubjects.map(({name, id}) => (
                                <option key={'subject-' + id} name={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>

                    <label>Максимальное число баллов</label>
                    <select onChange={this.handleSelectScore.bind(this)}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    <label>Начало действия</label>
                    <input type={"date"} onChange={this.handleSelectStartDate.bind(this)}/>
                    <label>
                        Семестр
                        <select onChange={this.handleSelectSemester.bind(this)}>
                            {availableSemesters.map(({name, id}) => (
                                <option key={'semester-' + id} name={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>
                    <button>Отправить</button>
                </form>
                {currentBindings.map((binding) => (
                    <BingingDisplayer key={"foo"} binding={binding}/>
                ))}
            </div>

        );
    }
}

class BingingDisplayer extends React.Component {

    render() {
        const binding = this.props.binding;
        return (
            <div style={{border: "1px red solid", margin: "2px"}}>
                <h2>Задание:</h2>
                <p>Название: {binding.assignment.name}</p>
                <p>Файл: <a>Скачать</a></p>
                <p>Семестр: {binding.semester.name}</p>
                <p>Группа: {binding.group.name}</p>
                <p>Дисциплина: {binding.subject.name}</p>
                <p>Максимальное число баллов: {binding.scores}</p>
                <p>Начало работы: {binding.starts}</p>
            </div>
        )
    }
}

export default AssignmentBinder