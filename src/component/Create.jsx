import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Create() {
    const [inputdata, setinputdata] = useState({
        Order: '',
        Jobname: '',
        Po: '',
        Ship2: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/Client", inputdata)
            .then(res => {
                alert("data posted successfuly")
                navigate('/')
            })
    }
    return (
        <div>
            <div className="d-flex w-100 justify-content-center align-items-center bg-light vh-100">
                <div className="w-50 rounded bg-white border shadow px-5 pt-3 pb-5">
                    <h3>Create a User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label>Order</label>
                            <input type="text" className='form-control'
                                onChange={e => setinputdata({ ...inputdata, Order: e.target.value })} />
                        </div>

                        <div className="mb-2">
                            <label>Jobname:</label>
                            <input type="text" className='form-control'
                                onChange={e => setinputdata({ ...inputdata, Jobname: e.target.value })} />
                        </div>

                        <div className="mb-2">
                            <label>PO</label>
                            <input type="text" className='form-control'
                                onChange={e => setinputdata({ ...inputdata, Po: e.target.value })} />
                        </div>

                        <div className="mb-2">
                            <label>Ship2:</label>
                            <input type="text" className='form-control'
                                onChange={e => setinputdata({ ...inputdata, Ship2: e.target.value })} />
                        </div>

                        <button type='submit' className='btn btn-success'>Submit</button>
                        <Link to="/" className='btn btn-info ms-3'>Back</Link>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Create