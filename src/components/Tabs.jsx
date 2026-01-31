const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { key: 'list', label: 'Trackings' },
        { key: 'upload', label: 'Upload Trackings' },
    ]

    return (
        <div style={{marginBottom:"1rem"}} className="border-b border-[#f3f4f6]">
            <div className="flex gap-8">
                {tabs.map(tab => {
                    const isActive = activeTab === tab.key

                    return (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`pb-3 text-lg font-medium transition cursor-pointer ${isActive ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}>
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs
