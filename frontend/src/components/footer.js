import React from "react";
import {withRouter} from "react-router-dom";

import '../assert/css/footer.css';

class Footer extends React.Component{
render() {
    return(
        <>
            <footer className="page-footer custom-footer">
                <div className="footer-copyright">
                    <div className="container footer-container">
                        © {new Date().getUTCFullYear()} GRITS (PVT) LTD. ALL RIGHTS RESERVED
                    </div>
                </div>
            </footer>
        </>
    )
}
}

export default withRouter(Footer)