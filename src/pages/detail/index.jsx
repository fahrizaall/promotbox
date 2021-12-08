import React, { useRef, useState, useEffect } from "react";
import "./detail.scss";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import { ReactComponent as Morehorizontal } from "../../assets/icon/morehorizontal.svg";
import { poster1, poster2, poster3, user1 } from "../../assets";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const node = useRef();

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setShowMore(!showMore);
    }
    // outside click
    setShowMore(false);
  };

  // get click outside
  useEffect(() => {
    if (showMore) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMore]);

  return (
    <div className="detail-container">
      <Header />

      <div className="navigation">
        <Arrowleft stroke="grey" fill="grey" onClick={() => navigate("/")} />
        <div className="more">
          <Morehorizontal
            stroke="grey"
            fill="grey"
            onClick={() => setShowMore(!showMore)}
          />
          {showMore ? (
            <div className="more-detail" ref={node}>
              <p>Download Poster</p>
              <p>Share</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <main>
        <div className="img-wrapper">
          <img src={poster3} alt="" />
        </div>
        <div className="info">
          <div className="account">
            <div className="p-pic">
              <img src={user1} alt="" />
            </div>
            <p>Sherlock Holmes</p>
          </div>

          <div className="desc">
            <p>
              [7th INTERNATIONAL MALANG ANNUAL CODER CONVENTION] . Hello Medical
              Recorders👋 . Student Association of Medical Record and Health
              Information State Health Polytechnic of Malang Proudly Present: .
              ✨ 7th International Malang Annual Coder Convention (IMACC)✨ "ICD
              11 For Medical Record Development Innovations Towards the 5.0 Era"
              .<br /> 👨‍💼1st SPEAKER Dr. Karim Jessa (Chief Medical Information
              Officer and Chair, Health Record Committee) .<br /> 👩‍💼2nd SPEAKER
              Ibu Shinta Kumala, S.ST. MIK. (Secretary's Representative of
              Central Executive Board at Indonesian Professionals on Medical
              Records and Health Information Organization) . <br />
              👨‍💼3rd SPEAKER Bpk. Aris Susanto, A.Md. Perkes., S.T., M.MRS (Head
              of West Java Regional Leadership Council at Indonesian
              Professionals on Medical Records and Health Information
              Organization) . <br />
              👩‍💼4th SPEAKER Dr. Hosna Salmani (PhD Student in Health Information
              Management IRAN University of Medical Sciences) . <br />
              <br />
              Save The Date!!
              <br /> 📆 Saturday, December 4th 2021 📌 Via ZOOM and YouTube Live
              Streaming .<br /> 💵 Registration Fee 📍 East Java Region <br />-
              General (active KTA PORMIKI) : Rp 75.000 <br />- General (non KTA
              PORMIKI) : Rp 100.000 <br />- College Student : Rp 50.000 📍 Non
              East Java Region <br />- General / PMIK : Rp 120.000 - College
              Student : Rp 120.000 .<br />
              <br /> 💳 Payment Bank Account Number : FA IKA AGUSTYA A / C :
              6578-01-022462-53-0 (BRI) . <br />
              🔗 Link Registration http://bit.ly/RegistrationOfIMACC2021 .
              <br />
              📱Contact Person <br />
              1. GENERAL http://wa.me//6285157551065 (SHERLY) <br />
              2. COLLEGE STUDENT http://wa.me//6287850806895 (EALINE) .<br />
              <br /> Prepare yourself and get your chance!
              <br />
              <br />
              ========================
              <br /> For Further Information
              <br /> IG: @macc_polkesma <br />
              IG: @hmprmik_polkesma <br />
              Web: maccpolkesma.blogspot.com <br />
              Email: macc_polkesma@gmail.com
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;
