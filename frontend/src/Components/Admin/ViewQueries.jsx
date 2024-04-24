import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewQueries(){
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try{
            const response = await axios.get("http://localhost:4000/plateform/query-list");
            console.log("Fetched queries:", response.data);
            setQueries(response.data.data);
        } catch(error){
            console.error("Error fetching queries: ", error);
        }
    }

    console.log("Queries:", queries);
    return(
        <div className="order-history" style={{marginTop: "6%"}}>
            <h2>Help Requests</h2>
            <table>
                <thead>
                    <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Message</td>
                    </tr>
                </thead>
                <tbody>
                    {queries.length > 0 ? (
                        queries.map(query => (
                            <tr key={query.id}>
                                <td>{query.name}</td>
                                <td>{query.email}</td>
                                <td>{query.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )

}
export default ViewQueries;