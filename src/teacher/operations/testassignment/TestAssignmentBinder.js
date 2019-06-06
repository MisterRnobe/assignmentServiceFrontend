import React from 'react'
import {
    getAllAvailableGroupsFor,
    getAllCurrentAssignmentTests,
    getAllCurrentSubjects,
    getAllSemesters
} from "../common/Queries";

class TestAssignmentBinder extends React.Component {
    state = {
        availableGroups: [],
        availableTestAssignments: [],
        availableSemesters: [],
        availableSubjects: [],
        currentBindings: [],
        selectedGroup: undefined,
        selectedTestAssignment: undefined,
        selectedScore: undefined,
        selectedSubject: undefined,
        selectedStartDate: undefined,
        selectedSemester: undefined,
        selectedDuration: undefined
    };

    constructor(props) {
        super(props);
        this.getAvailableGroups();
        this.getAvailableTestAssignments();
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

    getAvailableTestAssignments = () => {
        getAllCurrentAssignmentTests(this.props, (result) => this.setState({availableTestAssignments: result}));
    };

    getAvailableSemesters = () => {
        getAllSemesters((result) => this.setState({availableSemesters: result}));
    };

    getAllCurrentBinding = () => {
        fetch(`http://localhost:21043/assignment-test-binding/get-all/${this.props.user.login}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
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
        fetch(`http://localhost:21043/assignment-test-binding/add/${this.props.user.login}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                assignmentTestId: this.state.selectedTestAssignment,
                groupId: this.state.selectedGroup,
                scores: this.state.selectedScore,
                subjectId: this.state.selectedSubject,
                startDate: this.state.selectedStartDate,
                semesterId: this.state.selectedSemester,
                duration: parseInt(this.state.selectedDuration)
            })
        }).then((result) => {
                this.getAllCurrentBinding();
                this.setState({
                    selectedGroup: undefined,
                    selectedTestAssignment: undefined,
                    selectedScore: undefined,
                    selectedSubject: undefined,
                    selectedStartDate: undefined,
                    selectedSemester: undefined,
                    selectedDuration: undefined
                });
                document.getElementById("bind-assignment-test-form").reset();
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

    handleSelectTestAssignment = ({target: {value}}) => {
        const found = this.state.availableTestAssignments.filter(({name}) => {
            return name === value;
        });
        this.setState({
            selectedTestAssignment: found[0].id
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
    handleSelectDuration = ({target: {value}}) => {
        this.setState({
            selectedDuration: value
        })
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
        const availableGroups = this.state.availableGroups.slice();
        const availableTestAssignments = this.state.availableTestAssignments.slice();
        const availableSemesters = this.state.availableSemesters.slice();
        const availableSubjects = this.state.availableSubjects.slice();
        const currentBindings = this.state.currentBindings.slice();

        availableGroups.unshift({name: "", id: ""});
        availableTestAssignments.unshift({name: "", id: ""});
        availableSemesters.unshift({name: "", id: ""});
        availableSubjects.unshift({name: "", id: ""});

        return (
            <div>
                <form onSubmit={this.sendBinding} id={"bind-assignment-test-form"}>
                    <label>Задание
                        <select onChange={this.handleSelectTestAssignment.bind(this)}>
                            {availableTestAssignments.map(({name, id}) => (
                                <option key={'assignment-test-' + id} name={id} value={name}>{name}</option>
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
                    <label>
                        Длительность (минуты)
                        <input type={"text"} onChange={this.handleSelectDuration.bind(this)}/>
                    </label>
                    <button>Отправить</button>
                </form>
                {currentBindings.map((binding) => (
                    <BindingDisplayer key={"foo"} binding={binding}/>
                ))}
            </div>

        );
    }
}

class BindingDisplayer extends React.Component {
    render() {
        const binding = this.props.binding;
        console.log("Got binding: ");
        console.log(binding);
        return (
            <div style={{border: "1px red solid", margin: "2px"}}>
                <h2>Тест:</h2>
                <p>Название: {binding.assignmentTest.name}</p>
                <p>Семестр: {binding.semester.name}</p>
                <p>Группа: {binding.group.name}</p>
                <p>Дисциплина: {binding.subject.name}</p>
                <p>Максимальное число баллов: {binding.scores}</p>
                <p>Начало работы: {binding.starts}</p>
                <p>Длительность: {binding.duration} мин</p>
            </div>
        )
    }
}

export default TestAssignmentBinder