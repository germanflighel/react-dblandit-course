import React, {Component} from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import LessIcon from '@material-ui/icons/ExpandLess';

class App extends Component {
    constructor() {
        super()
        this.state = {
            'showForm': false,
            subject: "",
            duration: '',
            year: 2020,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showForm = this.showForm.bind(this)
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target;
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        this.createCourse();
        event.preventDefault();
    }

    createCourse() {
        const config = {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const endPoint = "http://localhost:8080/courses/";
        fetch(endPoint, config)
            .then(response => response.json())
            .then(data => console.log(data));

    }

    showForm() {
        this.setState({"showForm": !this.state.showForm})
    }

    render() {
        return (
            <div>
                <Fab style={{marginTop: '1em'}} color="primary" aria-label="add" onClick={this.showForm}>
                    {this.state.showForm ? <LessIcon/> : <AddIcon/>}
                </Fab>

                {this.state.showForm &&
                <form method="post" onSubmit={this.handleSubmit}>

                    <TextField

                        style={{marginTop: '0.5em'}}
                        value={this.state.subject}
                        name="subject"
                        placeholder="Tema"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Tema"/>
                    <br/>


                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.duration}
                        name="duration"
                        type="number"
                        placeholder="Duración"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Duración"/>
                    <br/>

                    <TextField
                        style={{marginTop: '0.5em'}}
                        value={this.state.year}
                        name="year"
                        type="number"
                        placeholder="Año"
                        onChange={this.handleChange}
                        id="standard-basic"
                        label="Año"/>
                    <br/>

                    <Button type="submit" style={{marginTop: '1em'}} variant="contained" color="primary">
                        Agregar!
                    </Button>
                </form>
                }
            </div>

        )
    }
}

export default App
