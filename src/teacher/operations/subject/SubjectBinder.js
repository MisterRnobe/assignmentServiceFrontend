import React from 'react';

class SubjectBinder extends React.Component {

    state = {
        availableSubjects: [],
        currentSubjects: [],
        selectedSubject: undefined
    };

    constructor(props) {
        super(props);
        this.getSubjects();
    }


    sendSubjectBinding = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:21043/subject/bind/${this.props.user.login}/${this.state.selectedSubject}`, {
            method: 'POST'
        })
            .then(
                (res) => {
                    console.log("Success");
                    return fetch(`http://localhost:21043/subject/get-all/${this.props.user.login}`, {
                        method: 'GET'
                    });
                },
                (error) => {
                }
            )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        availableSubjects: result.available,
                        currentSubjects: result.current
                    });
                },
                (error) => {
                }
            );
    };

    getSubjects = () => {
        return fetch(`http://localhost:21043/subject/get-all/${this.props.user.login}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        availableSubjects: result.available,
                        currentSubjects: result.current
                    });
                },
                (error) => {
                }
            );
    };

    handleSelect = ({target: {value}}) => {
        const found = this.state.availableSubjects.filter(({name}) => {
            return name === value;
        });
        console.log(found);
        this.setState({
            selectedSubject: found[0].id
        })
    };

    render() {
        const available = this.state.availableSubjects;
        const current = this.state.currentSubjects;
        return (
            <div>
                <form>
                    <label>
                        Дисциплина
                        <select onChange={this.handleSelect.bind(this)}>
                            {available.map(({name, id}) => (
                                <option key={id} name={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={this.sendSubjectBinding}>Отправить</button>
                </form>
                {current.map(({name}) => (
                    <p key={name}>{name}</p>
                ))}
            </div>

        );
    }
}

export default SubjectBinder