

function Home() {
    return (
        <div className="card-columns p-3 col-md-4 ">
            <div className="card h-150  text-dark" style={{ width: 350 }}>
                <img className="card-img-top" />
                <div className="card-body text-left">
                    <h4 className="card-title text-center">Destination: Maldives</h4>
                    <div className="card-text">description:Relaxing beach and environment <br />
                        Start Date :22-10-22
                        <br />
                        End Date : 28-10-22
                        <br />
                        Price :3000
                        <br />
                        <button>Follow</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;