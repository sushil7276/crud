import React, { useEffect, useState } from 'react'
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';



const initialState = {
    name: "",
    email: "",
    username: "",
    password: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();

    // const { name, email, username, password } = initialState;

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);


    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        if (response.status === 200) {
            setState({ ...response.data })
        }
    }



    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/users", data);
        console.log(response.data)
        if (response.status === 200) {
            toast.success("Successfully Added");
        }
    }

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/users/${id}`, data);
        if (response.status === 200) {
            toast.success("Successfully Updated");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.name || !state.email || !state.username || !state.password) {
            toast.error("Please provide value into field");
        }
        else {

            if (!id) {
                addUser(state);
            }
            else {
                updateUser(state, id);
            }
            navigate("/");
        }



    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    return (
        <div style={{ marginTop: "100px" }} onSubmit={handleSubmit}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' placeholder='Enter Name...' onChange={handleInputChange} value={state.name} />

                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='Enter email...' onChange={handleInputChange} value={state.email} />

                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' placeholder='Enter username...' onChange={handleInputChange} value={state.username} />

                <label htmlFor='password'>Password</label>
                <input type='text' id='password' name='password' placeholder='Enter password...' onChange={handleInputChange} value={state.password} />
                <input type='submit' value={id ? "Update" : "Add"}></input>
            </form>

        </div>
    )
}

export default AddEdit