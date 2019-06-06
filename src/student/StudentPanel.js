import React from 'react'
import AssignmentPanel from './operations/assignment/AssignmentPanel'

class StudentPanel extends React.Component {

    defaultUser = {
        login: "student"
    };

    state = {
        selected: 'assignment',
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setState({selected: 'assignment'})}>Доступные задания</button>
                </div>
                <div>
                    {this.state.selected === 'assignment' && (
                        <AssignmentPanel user={this.defaultUser}/>
                    )}
                </div>
            </div>
        );
    }
}

export default StudentPanel;