import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { app, db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc
} from "firebase/firestore"
import { useAuth } from "../../contexts/authContext";

export default function LoginVerify() {
    let { user } = useAuth()
    const navigate = useNavigate()

    function verify(u) {
        if(u == null) return
        console.log(u)
        const collectionRef = collection(db, "users")
        const q = query(collectionRef, where("uid", "==", u.uid))
        onSnapshot(q, (e) => {
            e.docs.map((el) => {
            // user found
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
                    role: 1
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