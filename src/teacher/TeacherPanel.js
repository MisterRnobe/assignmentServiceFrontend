import React from 'react';
import Subject from './operations/subject/SubjectBinder'
import AssignmentPanel from "./operations/assignment/AssignmentPanel";
import TestAssignmentPanel from "./operations/testassignment/TestAssignmentPanel";

class TeacherPanel extends React.Component {

    defaultUser = {login: "prepod"};

    state = {
        selected: 'assignment-test-panel'
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setState({selected: 'subject'})}>Привязаться к дисциплине</button>
                    <button onClick={() => this.setState({selected: 'assignment-panel'})}>Работа с заданиями</button>
                    <button onClick={() => this.setState({selected: 'assignment-test-panel'})}>Работа с тестами</button>
                </div>
                <div>
                    {this.state.selected === 'subject' && <Subject user={this.defaultUser}/>}
                    {this.state.selected === 'assignment-panel' && <AssignmentPanel user={this.defaultUser}/>}
                    {this.state.selected === 'assignment-test-panel' && <TestAssignmentPanel user={this.defaultUser}/>}
                </div>
            </div>

        );
    }
}

export default TeacherPanel