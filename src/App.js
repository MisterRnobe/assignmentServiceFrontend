import React from "react";
import TeacherPanel from "./teacher/TeacherPanel"
import StudentPanel from "./student/StudentPanel"


class App extends React.Component {

    state = {
        whoIs: 'teacher'
    };

    render() {
        return (
            <div>
                {this.state.whoIs === 'admin' && (
                    <div>Admin</div>
                )}
                {this.state.whoIs === 'teacher' && (
                    <TeacherPanel/>
                )}
                {this.state.whoIs === 'student' && (
                    <StudentPanel/>
                )}
                {this.state.whoIs === undefined && (
                    <div>
                        <h1>Пользователь:</h1>
                        <button onClick={() => this.setState({whoIs: 'admin'})}> Админ</button>
                        <button onClick={() => this.setState({whoIs: 'teacher'})}>Препод</button>
                        <button onClick={() => this.setState({whoIs: 'student'})}>Студент</button>
                    </div>
                )}
            </div>
        );
    }

}

export default App