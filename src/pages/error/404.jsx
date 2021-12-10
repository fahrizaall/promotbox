import { useNavigate } from "react-router-dom"
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import './404.scss'

export default function ErrorNotFound() {

    let navigate = useNavigate();

    return (
        <div>
            <div className="err-nav-wrapper">
                <button className="bg-transparent err-back-btn" onClick={_e=>navigate(-1)}>
                    <Arrowleft stroke="grey" fill="grey" width="13" height="13" /> 
                    <span className="color-grey">Back</span>
                </button>
            </div>
            <div>
                <h1>
                    Halaman tidak ditemukan!
                </h1>
                <p>
                    Halaman yang anda cari tidak ditemukan. Mohon periksa kembali alamat yang anda masukkan.
                </p>
            </div>
        </div>
    )
}