import React from 'react'
import BlotterHeader from './blotterHeader/BlotterHeader'

const Blotter = () => {
    return (
        <>
            <div className="row m-0 mt-3">
                <div className="col-12 ps-1 pe-1 mb-2 col-blotter-table">
                    <div className="card-box p-2 h-410">
                        <BlotterHeader />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blotter