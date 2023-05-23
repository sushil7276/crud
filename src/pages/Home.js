import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import axios from 'axios';
import { toast } from 'react-toastify';


const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };


  const onDeleteUser = async (id) => {

    if (window.confirm("Are you sure...")) {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      if (response.status === 200) {
        toast.success("Successfully Deleted");

        getUser();
      }
    }
  }



  return (
    <div style={{ marginTop: "150px" }}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Password</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => {
            return (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td><Link to={`/update/${item._id}`}><button className='btn btn-edit'>Edit</button></Link>
                  <button className='btn btn-delete' onClick={() => onDeleteUser(item._id)}>Delete</button>
                  <Link to={`/view/${item._id}`}><button className='btn btn-view'>View</button></Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home