import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'

const TrackingTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(`${config.baseUrl}/user/tracking`)
      .then(res => setData(res.data))
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.baseUrl}/user/tracking/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  if (!data.length) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        No trackings found
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-[#8b5cf6] text-left text-white tracking-wider text-[1.1rem]">
          <tr>
            <th style={{padding:"1rem 2rem"}}>Tracking ID</th>
            <th>Status</th>
            <th>Service</th>
            <th>Created</th>
            <th>Action</th> {/* New Column */}
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr
              key={item.tracking_id}
              className="border-t border-[#e5e7eb]"
            >
              <td style={{padding:"1rem 2rem"}} className="px-5 py-3 font-medium text-gray-800">
                {item.tracking_id}
              </td>

              <td>
                <span
                  style={{padding:"0.5rem 1rem"}}
                  className={`rounded-md text-md font-medium
                    ${item.status === 'used'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                    }
                  `}
                >
                  {item.status?.replace(/^\w/, c => c.toUpperCase())?.replace("_", " ")}
                </span>
              </td>

              <td className="text-gray-600">{item.service_type}</td>

              <td className="text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </td>

              <td>
                <button
                  style={{paddingLeft:"10px",paddingRight:"10px",paddingTop:"5px",paddingBottom:"5px"}}
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
