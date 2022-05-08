import React, { Component } from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

class People extends Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        selectedPeople: [],
        isUpdating: false
    }
    componentDidMount = () => {
        this.reload();
    }
    onAddClick = () => {
        axios.post('api/people/add', this.state.person).then(() => {
            this.reload();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        })
    }
    onEditClick = person => {
        this.setState({ person });
        this.setState({ isUpdating: true })
    }
    onUpdateClick = () => {
        axios.post('api/people/update', this.state.person).then(() => {
            this.reload();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                isUpdating: false
            });
        })
    }
    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            isUpdating: false
        })
    }
    onDeleteClick = person => {
        axios.post('api/people/delete', person).then(() => this.reload())
    }
    onDeleteSelectedClick = () => {
        axios.post('api/people/deletemultiple', this.state.selectedPeople).then(() => {
            this.reload();
            this.setState({ selectedPeople: [] });
        });
    }
    onTextChange = e => {
        const newState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }
    reload = () => {
        axios.get('api/people/getall').then(people => {
            this.setState({ people: people.data })
        })
    }
    onCheckChange = async person => {
        const selectedPeople = this.state.selectedPeople;
        if (selectedPeople.includes(person)) {
            this.setState({ selectedPeople: selectedPeople.filter(p => p.id !== person.id) })
        }
        else {
            this.setState({ selectedPeople: [...this.state.selectedPeople, person] })
        }
    }
    onCheckAllChange = () => {
        if(!this.allChecked()){
            this.setState({ selectedPeople: this.state.people })
        }            
        else{
            this.setState({ selectedPeople: [] });        }
    }
    allChecked = () =>{
        const { people, selectedPeople } = this.state;
        return people.every(p => selectedPeople.includes(p))
    
    }
    render() {
        return (
            <div>
                <div className='container col-md-9 offset-2'>
                    {<PersonForm
                        person={this.state.person}
                        onTextChange={this.onTextChange}
                        onAddClick={this.onAddClick}
                        isUpdating={this.state.isUpdating}
                        onCancelClick={this.onCancelClick}
                        onUpdateClick={this.onUpdateClick} />}
                    <div className='row mt-5'>                      
                        <button className='btn btn-danger ml-3' onClick={this.onDeleteSelectedClick}>Delete</button>
                    </div>
                    <table className='table table-striped table-bordered table-hover mt-3'>
                <thead>
                    <tr>
                        <th><input type='checkbox' checked={this.allChecked()} 
                        className='form-control' onChange={this.onCheckAllChange}></input> </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map((p, i) =>
                        <PersonRow
                            key={i}
                            person={p}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p)}
                            onCheckChange={() => this.onCheckChange(p)}
                            isChecked={this.state.selectedPeople.includes(p)} />)
                    }
                </tbody>
            </table>
                </div>
            </div >
        );
    }
}

export default People;