import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
            constructor(props){
                super(props);
            
                this.state={
                    username:'',
                    description:'',
                    duration: 0,
                    date: new Date(),
                    users:[]
                }
            
                this.handleChangeUsername=this.handleChangeUsername.bind(this);
                this.handleChangeDescription=this.handleChangeDescription.bind(this);
                this.handleChangeDuration=this.handleChangeDuration.bind(this);
                this.handleChangeDate=this.handleChangeDate.bind(this);
                this.handleSubmit=this.handleSubmit.bind(this);
            
            }
            //call before anything loads
            componentDidMount(){
                axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
                .then(response => {
                  this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                  })   
                })
                .catch(function (error) {
                  console.log(error);
                })

              axios.get("http://localhost:5000/users/")
              .then(response =>{
                if (response.data.length > 0){
              
                this.setState({
                    users:response.data.map(user=>user.username),
                   
                  })
                }
              })
            
            }
            
            
            
            handleChangeUsername=(e)=>{
                this.setState({
                    username: e.target.value
                })
            }
            handleChangeDescription=(e)=>{
                this.setState({
                    description: e.target.value
                })
            }
            handleChangeDuration=(e)=>{
                this.setState({
                    duration: e.target.value
                })
            }
            handleChangeDate=(date)=>{
                this.setState({
                    date: date
                })
            }
            
            handleSubmit =(e)=>{
                e.preventDefault();
            
                const exercise={
                    username: this.state.username,
                    description: this.state.description,
                    duration: this.state.duration,
                    date: this.state.duration
                }
            
                console.log(exercise);
            
                //post to backend 
                axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
                .then(res => console.log(res.data)
                );
            
                
                //change location to home
                window.location='/';
            
            }
            
            
                render() {
                    return (
                <div>
                  <h3>Edit Exercise Log</h3>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group"> 
                      <label>Username: </label>
                      <select ref="userInput"
                          required
                          className="form-control"
                          value={this.state.username}
                          onChange={this.handleChangeUsername}>
                          {
                            this.state.users.map(function(user) {
                              return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                          }
                      </select>
                    </div>
                    <div className="form-group"> 
                      <label>Description: </label>
                      <input  type="text"
                          required
                          className="form-control"
                          value={this.state.description}
                          onChange={this.handleChangeDescription}
                          />
                    </div>
                    <div className="form-group">
                      <label>Duration (in minutes): </label>
                      <input 
                          type="text" 
                          className="form-control"
                          value={this.state.duration}
                          onChange={this.handleChangeDuration}
                          />
                    </div>
                    <div className="form-group">
                      <label>Date: </label>
                      <div>
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.handleChangeDate}
                        />
                      </div>
                    </div>
            
                    <div className="form-group">
                      <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                  </form>
                </div>
                    )
                }
            }
            