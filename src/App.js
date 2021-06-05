import React, { Component } from "react";
import { Alert, Button, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import Persons from "./components/Person/Persons";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import httpGet from "./AxiosHelper"

const axios = require('axios')

class App extends Component {
    state = {
        
        userName:"",
        userRole:"",


        persons: [],
        person: "",
        showPersons: true,

        name:"",
        family:"",
        gender:"",
        position:"",

        isShowAddPerson:false
        

        

    };

    componentDidMount(){

        this.getPrsons()

        let userName = Cookies.get("name")
        let userRole = Cookies.get("role")

        this.setState({userName,userRole})
    }

       


        getPrsons=(txtSearch="")=>{
            var url = `http://localhost:52185/api/Person?txtSearch=${txtSearch}`
            const then = res => this.setState({persons:res.data})
            httpGet(url,then)

            console.log(this.state.persons)
            }





        


        handleSearch = e =>{
            console.log(e)


            if(e.target.value ==null){

                this.getPrsons()
            }
            else{
                var url =`http://localhost:52185/api/Person?txtSearch=${e.target.value}`  
                const then = res => this.setState({persons:res.data})
                httpGet(url,then)
                
            }
            
          
    
    
        }






        handleEdit= p =>{

            let persons = [...this.state.persons];

            let index = persons.findIndex(a => a.id == p.id);

            if(p.isEdit !==undefined ){
                persons[index].isEdit = !p.isEdit;
            }
            else{
                persons[index].isEdit = true;

            }

           
         

            this.setState({persons})

            console.log(this.state.persons)



        }

    handleShowPerson = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    handleDeletePerson = p => {
        console.log(p)
        
        //filter
        const persons = [...this.state.persons];
        const filteredPersons = persons.filter(a => a.id !== p.id); //! = =
        this.setState({ persons: filteredPersons });

        // const personIndex = persons.findIndex(p => p.id === id);
        // const person = persons[personIndex];

        toast.error(`${p.name + " " + p.family} با موفقیت حذف شد`, {
            position: "top-right",
            closeOnClick: true
        });

        axios.delete(`http://localhost:52185/api/Person/${p.id}`)
    };

    handleSaveChange = (person) => {
        const { persons } = this.state;

        const personIndex = persons.findIndex(p => p.id === person.id);
     
      

        const list = [...persons];
        person.isEdit =false;

        list[personIndex] = person;
        this.setState({ persons:list });

        axios.put(`http://localhost:52185/api/Person/${person.id}` , person).then(toast.success("ویرایش با موفقیت انجام شد!"))
    };


    handleUserPicChange=(person)=>{
        const { persons } = this.state;

        const personIndex = persons.findIndex(p => p.id === person.id);
        const list = [...persons];
        list[personIndex] = person;
        this.setState({ persons:list });


        let token = Cookies.get('token')
        const data = new FormData();
        data.append("file", person.image);
        axios({
            method: 'post',
            url: `http://localhost:52185/api/Person/${person.id}`,
            data: data, 

            headers: {
                "Authorization": `Bearer ${token}`
              }


           
          }).then(res =>{ 
            toast.success("عکس با موفقیت عوض شد!.", {
                position: "bottom-right",
                closeButton: true,
                closeOnClick: true
            });
              
            } 
          
          ).catch(error => {
              if(error.response.status == 403){
                toast.error("سطح دسترسی شما محدود است!.", {
                    position: "bottom-right",
                    closeButton: true,
                    closeOnClick: true
                });

              }
            console.log(error.response)
         })
       


    }

    handleNewPerson = () => {
        const persons = [...this.state.persons];
        ;

    

        var obj = {
            name: this.state.name  ,
            family:this.state.family,
            gender:this.state.gender,
            position: this.state.position,
            
        }

        if (obj.fullname !== "" && obj.fullname !== " ") {

           
                let token = Cookies.get('token')
                axios({
                    method: 'post',
                    url: 'http://localhost:52185/api/Person',
                    data: obj,
                    headers: {
                        "Authorization": `Bearer ${token}`
                      }
    
    
                   
                  }).then(res =>{ 
                    
                      if(res.data != null ||  res.data != undefined )

                     
                      {obj.id = res.data
                        persons.push(obj);
                
                        this.setState({ persons });
                        
                       
                        toast.success("شخصی با موفقیت اضافه شد.", {
                            position: "bottom-right",
                            closeButton: true,
                            closeOnClick: true
                        });
                    }
                    } 
                  
                  ).catch(error => {
                      if(error.response.status == 403){
                        toast.error("سطح دسترسی شما محدود است!.", {
                            position: "bottom-right",
                            closeButton: true,
                            closeOnClick: true
                        });

                      }
                    console.log(error.response)
                 })
    
              
            
            


           
        }



      


    };

    setName = event => {
        this.setState({ name: event.target.value });
        console.log(this.state.name)
    };
    setFamily = event => {
        this.setState({ family: event.target.value });
        console.log(this.state.family)
    };
    setGender = event => {
        this.setState({ gender: event.target.value });
    };
    setPosition = event => {
        this.setState({ position: event.target.value });
    };

    render() {
        const { persons, showPersons } = this.state;

        let person = null;

        let badgeStyle = "";

        if (persons.length >= 3) badgeStyle = "success";
        if (persons.length <= 2) badgeStyle = "warning";
        if (persons.length <= 1) badgeStyle = "danger";

        if (showPersons) {

           
            person = (
                <Persons
                    persons={persons}
                    personDelete={this.handleDeletePerson}
                    personChange={this.handleSaveChange}
                    personEdit={this.handleEdit}
                    handleUserPicChange={this.handleUserPicChange}
                />
            );
        }

        return (
            <div className="rtl text-center bg-light">
                <Alert variant="info">
                    <div className="col-12 row">
                    <div className="col-2">{this.state.userName + " " + "با نقش" + " " +this.state.userRole}</div>
                        <div className="col-9">
                            <h2>مدیریت کننده اشخاص</h2></div>
                            <div className="col-1"> <Link to="" >خروج</Link></div>
                            </div>
                            
                    
                   
                </Alert>
                <Alert variant="light">
                    تعداد اشخاص{" "}
                    <Badge pill variant={badgeStyle}>
                        {persons.length}
                    </Badge>{" "}
                    نفر می باشد
                </Alert>

                <button className="btn btn-sm btn-primary" style={{display:this.state.isShowAddPerson ==true ? "none": ""}} onClick={()=>this.setState({isShowAddPerson:true})} >افزودن شخص</button>

                <div className="m-2 p-2"> 
                
                
                 <form style={{display:this.state.isShowAddPerson ==false ? "none": ""}}
                        className="form-inline justify-content-center"
                        onSubmit={event => event.preventDefault()}
                    >
                        <div className="input-group w-40">
                            <input
                                type="text"
                                placeholder="نام"
                                className="form-control"
                                onChange={this.setName}
                                value={this.state.name}
                            />
                            <input
                                type="text"
                                placeholder="نام خانوادگی"
                                className="form-control"
                                onChange={this.setFamily}
                                value={this.state.family}
                            />
                             <select
                                type="text"
                                placeholder="جنسیت"
                                className="form-control"
                                onChange={this.setGender}
                               
                               
                            >
                                  <option value="مرد">مرد</option>
  <option value="زن">زن</option>
                                </select>

                             <input
                                type="text"
                                placeholder="سمت"
                                className="form-control"
                                onChange={this.setPosition}
                                value={this.state.position}
                            />
                            <div className="input-group-prepend">
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="sm"
                                    className="fa fa-plus-square"
                                    onClick={this.handleNewPerson}
                                />
                            </div>
                        </div>
                    </form>
               
                    
                </div>
                <hr/>

               
                <div className="m-2 p-2">
            <form
                className="form-inline justify-content-center"
                onSubmit={event => event.preventDefault()}
            >
                <div className="input-group w-25">
                    <i className="fa fa-search mr-1 mt-2"   style={{display:showPersons? "":"none"}} ></i>
                    <input
                        type="text"
                        placeholder="جستجوی شخص"
                        className="form-control "
                        onChange={(e)=>this.handleSearch(e)}
                        style={{display:showPersons? "":"none"}}
                       
                    />
                   
                </div>
            </form>
        </div>
       

                {person}
                <ToastContainer />
                <Button
                    onClick={this.handleShowPerson}
                    variant={showPersons ? "info" : "danger"}
                    className="mb-3"
                >
                   {showPersons ? " عدم نمایش" : " نمایش اشخاص"}
                </Button>
                <Alert variant="light">
                    <p>Copyright 2021 by Mohammad Sepahi. All Rights Reserved.</p>
                </Alert>
            </div>
        );
    }
}

export default App;
