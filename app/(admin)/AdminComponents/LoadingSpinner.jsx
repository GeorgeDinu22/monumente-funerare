export default function LoadingSpinner({text}){
    return(
             <span style={{ display: 'flex', alignItems: 'center', justifyContent:"center", gap: '8px' }}>
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                animation: 'spin 1s linear infinite', 
                            }}
                        >
                            <style>
                                {`
                                    @keyframes spin {
                                        to { transform: rotate(360deg); }
                                    }
                                `}
                            </style>
                            <circle 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                style={{ opacity: 0.2 }} 
                            />
                            <path 
                                d="M12 2a10 10 0 0 1 10 10" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        {text ? text : "Se incarca ..."}
                    </span>
    )
}