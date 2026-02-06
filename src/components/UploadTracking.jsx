import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import config from '../config'

const UploadTracking = () => {
    const [text, setText] = useState('')
    const [service, setService] = useState('')
    const [loading, setLoading] = useState(false)
    const [allServices, setAllServices] = useState([])
    const isDisabled = !text.trim() || !service || loading

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const content = event.target.result
            // Split by newline, comma, or space
            const newTrackings = content
                .split(/[\n, ]+/)
                .map(t => t.trim())
                .filter(Boolean)
            // Append to existing textarea content
            setText(prev => (prev ? prev + '\n' : '') + newTrackings.join('\n'))
        }
        reader.readAsText(file)
    }

    const handleUpload = async () => {
        const trackings = text
            .split('\n')
            .map(t => t.trim())
            .filter(Boolean)

        try {
            setLoading(true)

            await axios.post(`${config.baseUrl}/user/tracking/upload`, {
                service_type: service,
                trackings,
            })

            toast.success('Trackings uploaded successfully')
            setText('')
            setService('')
        } catch (err) {
            toast.error('Upload failed')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        axios
            .get(`${config.baseUrl}/admin/get-all-services-without-permission`)
            .then(res => setAllServices(res.data?.data || []))
    }, [])

    return (
        <div className="max-w-xl space-y-6">
            <div>
                <h2 className="text-base font-semibold text-gray-900">
                    Upload Trackings
                </h2>
                <p className="text-sm text-gray-500">
                    One tracking ID per line or upload a file
                </p>
            </div>

            <div style={{ marginTop: '1rem' }} className="space-y-1">
                <label style={{ marginBottom: '0.5rem' }} className="block text-sm font-medium text-gray-700">
                    Service Type
                </label>
                <select
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        backgroundColor: '#fff',
                        color: '#333',
                    }}
                    className="outline-none"
                    value={service}
                    onChange={e => setService(e.target.value)}
                >
                    <option value="" disabled>
                        Select a service
                    </option>
                    {allServices.map((s) => (
                        <option key={s.id} value={s.service_key}>
                            {s.name} - ${s.price}
                        </option>
                    ))}
                </select>
            </div>

            {/* File Upload */}
            <div style={{ marginTop: '1rem' }} className="space-y-1">
                <label style={{ marginBottom: '0.5rem' }} className="block text-sm font-medium text-gray-700">
                    Upload Text File
                </label>
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white"
                    style={{padding:"8px"}}
                />
            </div>

            {/* Textarea */}
            <div style={{ marginTop: '1rem' }} className="space-y-1">
                <label style={{ marginBottom: '0.5rem' }} className="block text-sm font-medium text-gray-700">
                    Tracking IDs
                </label>
                <textarea
                    rows={6}
                    className="w-full rounded-md border outline-none border-gray-300 text-sm"
                    placeholder="1234567890"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{
                        padding: '1rem',
                    }}
                />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isDisabled}
                    onClick={handleUpload}
                    className={`rounded-md px-5 py-2 text-sm font-medium transition
                        ${isDisabled
                            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    {loading ? 'Uploading...' : 'Upload Trackings'}
                </button>
            </div>
        </div>
    )
}

export default UploadTracking
