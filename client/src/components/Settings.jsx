import { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'

function Settings() {
    return (
        <div className="settings-container d-flex flex-column">
            <div className="d-flex flex-column align-items-center pb-4">
                <p className="h5 pb-1"> Work Minutes </p>
                <ReactSlider className={'slider'} 
                thumbClassName ={'thumb'}
                trackClassName={'track'}
                value={45}
                min={1}
                max={120} />
            </div>
            <div className="d-flex flex-column align-items-center">
                <p className="h5 pb-1"> Break Minutes </p>
                <ReactSlider className={'slider green'} 
                thumbClassName ={'thumb'}
                trackClassName={'track'}
                value={45}
                min={1}
                max={120} />
            </div>
        </div>
    );
}

export default Settings;
