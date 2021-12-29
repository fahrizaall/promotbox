import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore"
import { useAuth } from "../../contexts/authContext";

export default function LoginVerify() {
    let { user } = useAuth()
    const navigate = useNavigate()

    const config_flags = {
        testGroup: Math.random() > 0.5 ? "A" : "B"
    }

    function verify(u) {
        if(u == null) return
        console.log(u)
        const collectionRef = collection(db, "users")
        const q = query(collectionRef, where("uid", "==", u.uid))
        onSnapshot(q, (e) => {
            e.docs.map((el) => {
            // user found
                setDoc(doc(db, "users", el.id), {
                    ...el.data(),
                    lastLoginAt: u.metadata.lastSignInTime,
                    photoURL: u.photoURL,
                    providerData: u.providerData,
                    flags : el.data().flags ? el.data().flags : config_flags,
                })
                navigate("/")
            })

            if(e.docs.length == 0) {
            // user not found in firestore
                addDoc(collectionRef, {
                    displayName: u.displayName,
                    email: u.email,
                    emailVerified: u.emailVerified,
                    createdAt: u.metadata.creationTime,
                    lastLoginAt: u.metadata.lastSignInTime,
                    phoneNumber: u.phoneNumber,
                    providerId: u.providerId,
                    providerData: u.providerData,
                    uid: u.uid,
                    photoURL: u.photoURL,
                    isSuspended: false,
                    isBanned: false,
                    isVerifiedUser: false,
                    userLevel: "standard", // standard, business, mediapartner
                    role: 1,
                    flags: config_flags,
                })
                .then(() => {
                    navigate("/")
                })
            }
        })
          
    }

    useEffect(() => {
        if(user) {
            verify(user)
        }
    }, [user])

    return (
        <div>Verifying...</div>
    )
}