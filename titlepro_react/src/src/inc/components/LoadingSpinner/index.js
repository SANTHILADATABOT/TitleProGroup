const LoadingSpinner = () => {
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "300px", margin: "0", fontFamily: "Arial, sans-serif"}}>
            <style>
            {`
                .loader {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .loader-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: pulse 1.5s ease-in-out infinite;
                }
                .loader-circle:before {
                    content: "";
                    display: block;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    border: 8px solid #7e3af2;
                    border-color: #7e3af2 transparent #7e3af2 transparent;
                    animation: loader 1.2s linear infinite;
                }
                .loader-text {
                    color: #7e3af2;
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 16px;
                }
                @keyframes loader {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes pulse {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                }
            `}
            </style>
            <div className="loader">
                <div className="loader-circle"></div>
                <span className="loader-text" style={{color: "#7e3af2", fontSize: "24px", fontWeight: "bold", marginTop: "16px"}}>Loading...</span>
            </div>
        </div>
        {/* <div className="spinner">🔄 Loading...</div> */}
        </>
    );
};

export default LoadingSpinner;
  