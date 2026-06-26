const Progress = ({ value = 0, className = "" }) => {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
            <div
                className="h-full bg-black rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    )
}

export { Progress }