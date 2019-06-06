export const getAllAvailableGroupsFor = (callback) => {
    fetch(`http://localhost:21043/group/get-all`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Groups: ");
                console.log(result);
                callback(result);
            },
            (error) => {
            }
        );

};

export const getAllCurrentAssignments = ({user: {login}}, callback) => {
    fetch(`http://localhost:21043/assignment/get-by-creator/${login}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Assignments: ");
                console.log(result);
                callback(result);
            },
            (error) => {
            }
        );
};

export const getAllCurrentTestAssignments = ({user: {login}}, callback) => {
    fetch(`http://localhost:21043/assignment-test/get-by-creator/${login}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Test assignments: ");
                console.log(result);
                callback(result);
            },
            (error) => {
            }
        );
};


export const getAllSemesters = (callback) => {
    fetch(`http://localhost:21043/semester/get-all`, {
            method: 'GET'
        }
    )
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Semesters: ");
                console.log(result);
                callback(result);
            },
            (error) => {
            }
        );
};

export const getAllCurrentSubjects = ({user: {login}}, callback) => {
    fetch(`http://localhost:21043/subject/get-all/${login}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Subjects: ");
                console.log(result.current);
                callback(result.current);
            },
            (error) => {
            }
        );
};

export const getAllCurrentAssignmentTests = ({user: {login}}, callback) => {
    fetch(`http://localhost:21043/assignment-test/get-by-creator/${login}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Current tests: ");
                console.log(result);
                callback(result);
            },
            (error) => {
            }
        );

};
