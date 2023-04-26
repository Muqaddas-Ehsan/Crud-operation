// import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/Client")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <div className="w-75 rounded bg-white border shadow p-4" style={{ marginTop: 600 }}>
          <div className="d-flex justify-content-end">
            <Link to="/Create" className='btn btn-info mb-3'>+ Create</Link>
          </div>
          <table className='table table-striped shadow rounded'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>Job_Name</th>
                <th>PO#</th>
                <th>Ship 2</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.Order}</td>
                  <td>{d.Jobname}</td>
                  <td>{d.Po}</td>
                  <td>{d.Ship2}</td>
                  <td>
                    <Link
                      to={`/Update/${d.id}`}><button className='btn btn-success btn-sm me-2'>Update</button></Link>
                    <button className='btn btn-danger btn-sm me-2' onClick={e => handleDelete(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
// =========== code for delete button ===============
  function handleDelete(id) {
    const confirm = window.confirm("Do you like to Delete");
    if (confirm) {
      axios.delete("http://localhost:3000/Client/" + id)
        .then(res => {
          alert("Record deleted");
          navigate('/')
        })
    }
  }
}

export default Home