import { Component } from "react";


class Video extends Component {
    render() {
        return(
            <div>
                <video controls>
                    <source src="http://127.0.0.1:1234/" type="video/mp4"/>
                </video>
                <button>play</button>
                <button>pause</button>
                <p>this is video player</p>
            </div>
        )
    }
}

export default Video