import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'

const TrackingTable = () => {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    axios
      .get(`${config.baseUrl}/user/tracking`)
      .then(res => setData(res.data))
  }, [])

  // Toggle single checkbox
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  // Select all
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.map(item => item.tracking_id))
    }
  }

  // Bulk delete
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return

    try {
      await axios.delete(`${config.baseUrl}/user/tracking`, {
        data: { ids: selectedIds } // body in delete
      })

      // Remove deleted from UI
      setData(prev =>
        prev.filter(item => !selectedIds.includes(item.tracking_id))
      )

      setSelectedIds([])
    } catch (error) {
      console.error("Bulk delete failed:", error)
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
    <div className="overflow-hidden rounded-md border border-gray-200 p-4">

      {/* Bulk Delete Button */}
      {selectedIds.length > 0 && (
        <button style={{marginBottom:"1rem",marginLeft:"1rem",marginTop:"1rem",paddingLeft:"10px",paddingRight:"10px",paddingTop:"5px",paddingBottom:"5px"}}
          onClick={handleBulkDelete}
          className="mb-4 bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md text-sm"
        >
          Delete Selected ({selectedIds.length})
        </button>
      )}

      <table className="w-full text-sm">
        <thead className="bg-[#8b5cf6] text-left text-white tracking-wider text-[1.1rem]">
          <tr>
            <th style={{padding:"1rem"}}>
              <input
                type="checkbox"
                checked={selectedIds.length === data.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Service</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr
              key={item.tracking_id}
              className="border-t border-[#e5e7eb]"
            >
              <td style={{padding:"1rem"}}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.tracking_id)}
                  onChange={() => toggleSelect(item.tracking_id)}
                />
              </td>

              <td className="font-medium text-gray-800">
                {item.tracking_id}
              </td>

              <td>
                <span style={{paddingLeft:"10px",paddingRight:"10px",paddingTop:"5px",paddingBottom:"5px"}}
                  className={`px-3 py-1 rounded-md text-md font-medium
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
