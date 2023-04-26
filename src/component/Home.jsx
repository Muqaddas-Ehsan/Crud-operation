import React, { useState } from 'react'
import "../css/home.css"
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

  // use state for fitering in search bar
  const [searchTerm, setsearchTerm] = useState("")

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="Side-menu">
              <div className="top-section">
                <div className="text mt-5">
                  <p>BrowseApp Logo</p>
                </div>
              </div>
              <nav className='mt-1'>
                <label for="btn" class="button">Search
                  <span class="bi bi-chevron-down"></span>
                </label>
                <input className='input-field' type="checkbox" id="btn" />
                <ul class="menu">
                  <li>
                    <label for="btn-2" class="first">Primary
                      <span class="bi bi-chevron-down"></span>
                    </label>
                    <input className='input-field' type="checkbox" id="btn-2" />
                    <ul>
                      <li><a href="#" className='pl-1'>New Order/Material Search</a></li>
                      <li><a href="#">Material on Hold</a></li>
                      <li><a href="#">Material Sold</a></li>
                      <li><a href="#">On Delivery</a></li>
                    </ul>
                  </li>
                  <li>
                    <label for="btn-3" class="second">Secondary
                      <span class="bi bi-chevron-down"></span>
                    </label>
                    <input className='input-field' type="checkbox" id="btn-3" />
                    <ul>
                      <li><a href="#">New Estimate</a></li>
                      <li><a href="#">New Quote</a></li>
                      <li><a href="#">New Return</a></li>
                      <li><a href="#">Pending Back Order/Quote</a></li>
                      <li><a href="#">Pending Estimate</a></li>
                      <li><a href="#">Current Offers/Promos</a></li>
                      <li><a href="#">Intel</a></li>
                    </ul>
                  </li>
                  <li>
                    <label for="btn-4" class="second">Detail
                      <span class="bi bi-chevron-down"></span>
                    </label>
                    <input className='input-field' type="checkbox" id="btn-4" />
                    <ul>
                      <li><a href="#">Info</a></li>
                      <li><a href="#">New Note</a></li>
                      <li><a href="#">Marketing</a></li>
                    </ul>
                  </li>
                  <li>
                    <label for="btn-5" class="second">Accounting
                      <span class="bi bi-chevron-down"></span>
                    </label>
                    <input className='input-field' type="checkbox" id="btn-5" />
                    <ul>
                      <li><a href="#">AR</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/*============= table ===============  */}
          <div className="col-md-9">
            <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
              <div className="w-100 rounded bg-white border shadow p-4" style={{ marginTop: 600 }}>
                <div className="main-heading">
                  <div className="text">
                    Alpha Stone Design,inc.<i class="bi bi-chevron-down"></i>
                  </div>
                </div>

                <div className="search-bar mt-4 ml-4">
                  <input type="text" placeholder='Search' className='p-2'
                    onChange={(e) => {
                      setsearchTerm(e.target.value);
                    }}
                  />
                  <i class="bi bi-search"></i>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to="/Create" className='btn btn-info mb-3'>+ Create</Link>
                </div>
                <table className='table shadow rounded'>
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
                    {data.filter(val => {
                      if (searchTerm === "") {
                        return val;
                      }
                      else if (
                        val.Po.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.Order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.Jobname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.Ship2.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    }).map((d, i) => (
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

export default Home;