import React from 'react';

class AssignmentCreator extends React.Component {

    state = {
        assignmentName: '',
        file: []
    };

    sendRequest = (e) => {
        e.preventDefault();
        console.log("Props are: ");
        console.log(this.props);
        const formData = new FormData();

        formData.append("file", this.state.file);

        fetch(`http://localhost:21043/assignment/create/${this.props.user.login}?name=${this.state.assignmentName}`, {
            method: 'POST',
            body: formData
        }).then(function (response) {
            console.log(response)
        });
    };


    fileNameHandler = ({target: {value}}) => {
        this.setState({assignmentName: value})
    };

    fileHandler = ({target: {files}}) => {
        this.setState({file: files[0]});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.sendRequest}>
                    <label>
                        Введите название
                        <input type={"text"} onChange={this.fileNameHandler.bind(this)}/>
                    </label>
                    <label>
                        Выберите файл
                        <input type="file" onChange={this.fileHandler}/>
                    </label>
                    <button>Отправить</button>
                </form>
                <div>
                    <AssignmentGetter user={this.props.user}/>
                </div>
            </div>
        );
    }
}

class AssignmentGetter extends React.Component {

    state = {
        currentAssignments: []
    };

    constructor(props) {
        super(props);
        this.getAllAssignments();
    }

    getAllAssignments = () => {
        fetch(`http://localhost:21043/assignment/get-by-creator/${this.props.user.login}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        currentAssignments: result
                    });
                },
                (error) => {
                }
            );

    };

    render() {
        const assignments = this.state.currentAssignments;
        return (
            <div>
                {assignments.map((assignment) => (
                    <AssignmentDisplayer key={assignment.assignmentId} assignment={assignment}/>
                ))}
            </div>

        );
    }
}

class AssignmentDisplayer extends React.Component {

    state = {
        assignment: {},
        mode: 'view'
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Название: {this.props.assignment.name}</h2>
                <a href={this.props.assignment.fileId}>Задание</a>
                <button onChange={() => this.setState({mode: 'edit'})}>Изменить</button>
            </div>
        );
    }
}

export default AssignmentCreator