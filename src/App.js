import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Table from './components/Table'
import NewCourseForm from './components/NewCourseForm'


function App() {
    return (
        <div>

            <React.Fragment>
                <CssBaseline />
                <Container align="center">
                    <Table />
                    <NewCourseForm/>

                </Container>
            </React.Fragment>
        </div>
    );
}

export default App;
