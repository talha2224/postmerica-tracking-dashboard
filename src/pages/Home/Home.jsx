import { useState } from 'react'
import TrackingTable from '../../components/TrackingTable'
import UploadTracking from '../../components/UploadTracking'
import Tabs from '../../components/Tabs'

const Home = () => {
    const [activeTab, setActiveTab] = useState('list')

    return (
        <div  className="min-h-screen p-40 bg-white">
            <h1 style={{padding:"1rem"}} className="text-xl font-semibold text-white p-5 bg-[#4f46e5]">
                Tracking Management
            </h1>

            <div style={{margin:"1rem",padding:"1rem"}} className="rounded-md bg-white shadow-sm space-y-6 border border-[#e5e7eb]">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === 'list' && <TrackingTable />}
                {activeTab === 'upload' && <UploadTracking />}
            </div>
        </div>
    )
}

export default Home
