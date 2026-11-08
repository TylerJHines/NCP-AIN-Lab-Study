import {firebaseConfig} from './firebase-config.js';
const banner=document.getElementById('cloud-status');
const login=document.getElementById('cloud-login');
const logout=document.getElementById('cloud-logout');
const ready=Boolean(firebaseConfig.apiKey&&firebaseConfig.authDomain&&firebaseConfig.projectId&&firebaseConfig.appId);
const api={user:null,saveLab:()=>{},saveExam:()=>{}};
window.CFCloud=api;
function status(msg){if(banner)banner.textContent=msg}
if(!ready){status('Guest mode · Configure Firebase to enable Google sign-in');login.disabled=true;login.title='Add Firebase web configuration first';}
else{
  try{
    const [{initializeApp},{getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,setPersistence,browserLocalPersistence},{getFirestore,doc,getDoc,setDoc,collection,addDoc,query,getDocs,orderBy,limit}]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')]);
    const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
    await setPersistence(auth,browserLocalPersistence);
    let busy=false;
    const profileRef=uid=>doc(db,'users',uid,'profile','progress');
    const examRef=(uid,id)=>doc(db,'users',uid,'exams',id);
    const labRef=(uid,id)=>doc(db,'users',uid,'labs',id);
    const cloudSave=async(uid,snapshot)=>{
      const completed=Array.from(new Set(snapshot.completed||[]));
      await setDoc(profileRef(uid),{completed,updatedAt:new Date().toISOString()},{merge:true});
    };
    api.saveLab=async record=>{if(!api.user||busy)return;try{await setDoc(labRef(api.user.uid,record.labId),record);await cloudSave(api.user.uid,window.CFApp.localSnapshot());status('Signed in · Lab completion synced')}catch(e){status('Cloud save failed: '+e.message)}};
    api.saveExam=async record=>{if(!api.user||busy)return;try{await setDoc(examRef(api.user.uid,record.id),record);status('Signed in · Exam saved to cloud')}catch(e){status('Cloud save failed: '+e.message)}};
    login.addEventListener('click',async()=>{try{status('Opening Google sign-in…');await signInWithPopup(auth,new GoogleAuthProvider())}catch(e){status('Sign-in failed: '+e.message)}});
    logout.addEventListener('click',async()=>{try{await signOut(auth)}catch(e){status('Sign-out failed: '+e.message)}});
    onAuthStateChanged(auth,async user=>{
      login.hidden=Boolean(user);logout.hidden=!user;api.user=user;
      if(!user){status('Guest mode · Sign in to sync progress');window.CFApp?.render();return}
      busy=true;status('Loading saved progress…');
      try{
        const priorOwner=localStorage.getItem('cf-cloud-owner-v10');
        // Do not merge one account's locally cached achievements into a different account.
        if(priorOwner&&priorOwner!==user.uid)window.CFApp.resetForAccount();
        const [profile,exams,labs]=await Promise.all([
          getDoc(profileRef(user.uid)),
          getDocs(query(collection(db,'users',user.uid,'exams'),orderBy('finishedAt','desc'),limit(100))),
          getDocs(collection(db,'users',user.uid,'labs'))]);
        const remote={completed:profile.exists()?(profile.data().completed||[]):[],examHistory:exams.docs.map(d=>d.data()),labHistory:labs.docs.map(d=>d.data())};
        window.CFApp.applyCloud(remote);
        localStorage.setItem('cf-cloud-owner-v10',user.uid);
        const local=window.CFApp.localSnapshot();
        await cloudSave(user.uid,local);
        // Import unsynced guest records on first sign-in; preserve previously saved cloud records.
        await Promise.all([
          ...local.examHistory.filter(x=>!remote.examHistory.some(y=>y.id===x.id)).map(x=>setDoc(examRef(user.uid,x.id),x)),
          ...local.labHistory.filter(x=>!remote.labHistory.some(y=>y.labId===x.labId)).map(x=>setDoc(labRef(user.uid,x.labId),x))
        ]);
        status('Signed in as '+(user.displayName||user.email)+' · Progress synced');
      }catch(e){status('Signed in, but sync failed: '+e.message)}finally{busy=false;window.CFApp?.render()}
    });
  }catch(e){status('Firebase initialization failed: '+e.message)}
}
