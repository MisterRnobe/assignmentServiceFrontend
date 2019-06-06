import React from 'react';
import AssignmentCreator from "./AssignmentCreator";
import AssignmentBinder from "./AssignmentBinder";

class AssignmentPanel extends React.Component {

    state = {action: 'binder'};

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setState({action: 'creator'})}>Создать задание</button>
                    <button onClick={() => this.setState({action: 'binder'})}>Привязать задание к группе</button>
                </div>
                <div>
                    {this.state.action === 'creator' && <AssignmentCreator user={this.props.user}/>}
                    {this.state.action === 'binder' && <AssignmentBinder user={this.props.user}/>}
                </div>
            </div>
        );
    }
}

export default AssignmentPanel