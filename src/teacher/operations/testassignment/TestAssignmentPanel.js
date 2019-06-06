import React from 'react'
import TestAssignmentBinder from './TestAssignmentBinder'
import TestAssignmentCreator from './TestAssignmentCreator'

class TestAssignmentPanel extends React.Component {

    state = {action: 'binder'};

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setState({action: 'creator'})}>Создать тест</button>
                    <button onClick={() => this.setState({action: 'binder'})}>Привязать тест к группе</button>
                </div>
                <div>
                    {this.state.action === 'creator' && <TestAssignmentCreator user={this.props.user}/>}
                    {this.state.action === 'binder' && <TestAssignmentBinder user={this.props.user}/>}
                </div>
            </div>
        );
    }
}

export default TestAssignmentPanel