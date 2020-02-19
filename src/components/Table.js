import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/PersonAdd'
import TopIcon from '@material-ui/icons/Star'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);



class MyTable extends React.Component {
    constructor() {
        super();
        this.state = {
            'courses': [],
            'showForm': false,
            'selectedCourse': ''
        }

        this.getTopStudent = this.getTopStudent.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)
        this.showNewStudentForm = this.showNewStudentForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        this.getCourses();
    }

    getCourses() {
        fetch("http://localhost:8080/courses")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    'courses': data.message
                })
            });
    }

    getTopStudent(_id) {
        const endPoint = "http://localhost:8080/courses/" + _id + '/students/top';
        fetch(endPoint)
            .then(response => response.json())
            .then(data => {
                this.setState(state => {
                    return {
                        'top': data.message.student
                    }
                })
                console.log(this.state)
            });
    }

    deleteCourse(_id) {
        const config = {method: 'DELETE'};
        const endPoint = "http://localhost:8080/courses/" + _id;
        fetch(endPoint, config)
            .then(response => response.json())
            .then(() => this.getCourses());
    }

    showNewStudentForm(_id) {
        this.setState({"showForm": !this.state.showForm, "selectedCourse": _id})
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target;
        console.log(name, ' ', value);
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        this.addStudent();
        console.log(this.state)
        event.preventDefault();
    }

    addStudent() {
        const aStudent = {

                name: this.state.name,
                surname: this.state.surname,
                DNI: this.state.dni,
                address: this.state.address,

            grade: this.state.grade,
        };
        const config = {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(aStudent), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const endPoint = "http://localhost:8080/courses/" + this.state.selectedCourse + '/student';
        fetch(endPoint, config)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => this.getCourses());

    }


    useStyles = () => makeStyles({
        table: {
            minWidth: 700,
        },
    });

    render() {
        const classes = this.useStyles();
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table classes={classes} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell> Tema </StyledTableCell>
                                <StyledTableCell align="left"> Año </StyledTableCell>
                                <StyledTableCell align="left"> Duracion </StyledTableCell>
                                <StyledTableCell align="left"> Alumnos </StyledTableCell>
                                <StyledTableCell align="left"> Acciones </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.courses.map(course => (
                                <StyledTableRow key={course._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {course.subject}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {course.year}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {course.duration} Horas
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {course.students.map(student => student.student.name + ' ' + student.student.surname).join(', ')}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton aria-label="add"
                                                    onClick={() => this.showNewStudentForm(course._id)}>
                                            <AddIcon/>
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => this.deleteCourse(course._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton aria-label="top" onClick={() => this.getTopStudent(course._id)}>
                                            <TopIcon/>
                                        </IconButton>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {this.state.showForm &&
                <form method="post" onSubmit={this.handleSubmit}>

                    <TextField

                        style={{marginTop: '0.5em'}}
                        value={this.state.name}
                        name="name"
                        placeholder="Nombre"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Nombre"/>
                    <br/>


                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.surname}
                        name="surname"
                        placeholder="Apellido"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Apellido"/>
                    <br/>

                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.dni}
                        name="dni"
                        type="number"
                        placeholder="DNI"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="DNI"/>
                    <br/>

                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.address}
                        name="address"
                        placeholder="Dirección"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Dirección"/>
                    <br/>

                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.grade}
                        name="grade"
                        type="number"
                        placeholder="Nota"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Nota"/>
                    <br/>


                    <Button type="submit" style={{marginTop: '1em'}} variant="contained" color="primary">
                        Agregar!
                    </Button>
                </form>
                }
                <div>
                    {
                        this.state.top &&
                        <h2>El alumno top es {this.state.top.name + ' ' + this.state.top.surname}</h2>
                    }
                </div>

            </div>

        )
    }
}

export default MyTable
