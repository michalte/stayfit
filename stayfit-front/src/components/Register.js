import React from 'react';
import axios from "axios";
import {useState} from "react";

const Register = () => {

    const [registerData, setRegisterData] = useState({
    })

    const [errors, setErrors] = useState({
    })

   const updateEmail = (e) => {
        setRegisterData({...registerData,
                email: e.target.value
            }
        )
    }
    const updatePasswd = (e) => {
        setRegisterData({...registerData,
                passwd: e.target.value
            }
        )
    }
    const updateRepeatedPasswd = (e) => {
        setRegisterData({...registerData,
                repeatedPasswd: e.target.value
            }
        )
    }
    const updateName = (e) => {
        setRegisterData({...registerData,
                name: e.target.value
            }
        )
    }
    const updateSurname = (e) => {
        setRegisterData({...registerData,
                surname: e.target.value
            }
        )
    }

    function hasNumber(t)
    {
        var regex = /\d/g;
        return regex.test(t);
    }
    const registerTheUser = (e) => {

        if(registerData.repeatedPasswd === registerData.passwd) {
            if(registerData.passwd != undefined && registerData.passwd.length >= 8) {
                if(registerData.name != undefined && registerData.name.length >= 1 && !registerData.name.includes(" ") && registerData.name.length <= 20 && !hasNumber(registerData.name)) {
                    if(registerData.surname != undefined && registerData.surname.length >= 1 && !registerData.surname.includes(" ") && registerData.surname.length <= 30 &&!hasNumber(registerData.surname)) {
                        if(registerData.email != undefined && registerData.email.includes("@")) {
                            console.log("WCHODZE");
                            axios.post("http://localhost:8080/register", {
                                email: registerData.email,
                                password: registerData.passwd,
                                firstName: registerData.name,
                                lastName: registerData.surname,
                            }).then((err) => {
                                console.log(err.data);
                                setErrors({
                                    first: err.data
                                })
                            }).catch((e) => {
                                    console.log(e.response);
                                    if (e.response.data != undefined) {
                                        if (e.response.data.errorMessages != undefined) {
                                            setErrors({
                                                first: e.response.data.errorMessages[0],
                                                second: e.response.data.errorMessages[1],
                                                third: e.response.data.errorMessages[2],
                                                fourth: e.response.data.errorMessages[4]
                                            })
                                        }
                                        if (e.response.data.message != undefined) {
                                            setErrors({
                                                first: e.response.data.message
                                            })
                                        }
                                    }
                                }
                            )
                        }
                    }
                }
            }
       }
      if(registerData.repeatedPasswd !== registerData.passwd) {
          setErrors({
              first: "Has??a nie s?? to??same!"
          })
      }else {
          setErrors({});
      }
        if(registerData.name === undefined || registerData.surname === undefined || registerData.name === "" || registerData.surname === ""
        || registerData.email === undefined || registerData.email === "" || registerData.passwd === undefined || registerData.passwd === ""
        || registerData.repeatedPasswd === undefined || registerData.repeatedPasswd === "" ) {
            setErrors({
                first: "Uzupe??nij wszystkie pola formularza!"
            })
        }

    }

    const submitMethod = (e) => {
        e.preventDefault();
    }


    return(
        <article style={{paddingTop: '5%', marginTop: '10vh', marginBottom: '13.8vh'}}>
            <form style={{textAlign: "center", width: '30%', margin: '0 auto'}} onSubmit={submitMethod}>
                <h2 style={{marginBottom: '10%'}}>Zarejestruj si??</h2>
                <label htmlFor="email">Podaj e-mail</label>
                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" id="email" className="fadeIn second form-control" name="email" placeholder="E-mail" onChange={updateEmail}/>
                <label htmlFor="repeatedPassword">Podaj has??o</label>
                <input type="password"  pattern=".{8,}" title="Has??o musi zawiera?? min. 8 znak??w" id="repeatedPassword" className="fadeIn third form-control" name="repeatedPassword" placeholder="Has??o" onChange={updatePasswd} />
                <label htmlFor="password">Powt??rz has??o</label>
                <input type="password" pattern=".{8,}" title="Has??o musi zawiera?? min. 8 znak??w" id="repeatPassword" className="fadeIn third form-control" name="login" placeholder="Powt??rz has??o" onChange={updateRepeatedPasswd} />
                <label htmlFor="name">Podaj imi??</label>
                <input type="text"pattern="[A-Za-z\W+]{1,20}" title="Imi?? musi sk??ada?? si?? z maksymalnie 20 liter!"  id="name" className="fadeIn third form-control" name="name" placeholder="Imi??" onChange={updateName}/>
                <label htmlFor="surname">Podaj nazwisko</label>
                <input type="text" pattern="[A-Za-z\W+]{1,30}" title="Nazwisko musi sk??ada?? si?? z maksymalnie 30 liter!" id="surname" className="fadeIn third form-control" name="surname" placeholder="Nazwisko" onChange={updateSurname} />
                <input style={{marginTop: '1vh', marginBottom: '5vh'}} type="submit" className="btn btn-outline-dark form-control" defaultValue="Zarejestruj" onClick={registerTheUser}/>
            </form>
            <form style={{textAlign: "center", margin: '0 auto'}}>
                <span style={{color: 'red', fontWeight: 'bold', display: 'block' }}>{errors.first}</span>
                <span style={{color: 'red', fontWeight: 'bold', display: 'block' }}>{errors.second}</span>
                <span style={{color: 'red', fontWeight: 'bold', display: 'block' }}>{errors.third}</span>
                <span style={{color: 'red', fontWeight: 'bold', display: 'block' }}>{errors.fourth}</span>
            </form>
        </article>

    )
}



export default Register;
