'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, Trash2, Upload, Eye, Save, Lock } from 'lucide-react';
// import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
// import { db, storage, auth } from '@/lib/firebase';
import { parseImageText } from '@/lib/ocrHelper';
import styles from './redakcja.module.css';

const SECRET_CODE = NEXT_PUBLIC_ADMIN_PASSCODE; 

interface EventFormData {
  title: string;
  description: string;
  dateDay: string;
  dateMonth: string;
  dateWeekday: string;
  time: string;
  ticketLink: string;
  type: 'open' | 'members-only';
  status: 'open' | 'last-places' | 'sold-out';
  imageUrl: string;
}

interface EventItem extends EventFormData {
  id: string;
}

const INITIAL_FORM: EventFormData = {
  title: '',
  description: '',
  dateDay: '',
  dateMonth: '',
  dateWeekday: '',
  time: '18:00',
  ticketLink: '',
  type: 'open',
  status: 'open',
  imageUrl: '',
};

const DEMO_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Spotkanie Testowe',
    description: 'To jest przykładowe wydarzenie widoczne w trybie offline.',
    dateDay: '15',
    dateMonth: 'GRUDZIEŃ',
    dateWeekday: 'PT',
    time: '19:00',
    ticketLink: '#',
    type: 'open',
    status: 'open',
    imageUrl: '',
  }
];

export default function RedakcjaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [events, setEvents] = useState<EventItem[]>(DEMO_EVENTS); 
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processingOCR, setProcessingOCR] = useState(false);
  const [formData, setFormData] = useState<EventFormData>(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [user, setUser] = useState<{uid: string} | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('cmwbc_admin_auth') === 'true') {
      setIsAuthenticated(true);
      setUser({ uid: 'demo-user' }); 
    }
  }, []);

  /*
  const fetchEvents = async () => {
    try {
      const q = query(
        collection(db, 'artifacts', 'cmwbc-app', 'public', 'data', 'events'), 
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventItem)));
    } catch (error) {
      console.error("Błąd pobierania:", error);
    }
  };
  */

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === SECRET_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('cmwbc_admin_auth', 'true');
      setUser({ uid: 'demo-user' });
      // fetchEvents(); 
    } else {
      setAuthError('Nieprawidłowe hasło');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setImageFile(file);
    setProcessingOCR(true);
    
    try {
        const ocr = await parseImageText(file);
        setFormData(prev => ({
        ...prev,
        title: ocr.title || prev.title,
        description: ocr.description || prev.description,
        dateMonth: ocr.dateStr ? ocr.dateStr.toUpperCase() : prev.dateMonth
        }));
    } catch (err) {
        console.error("OCR error", err);
    }
    setProcessingOCR(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, accept: {'image/*': []}, maxFiles: 1 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    setTimeout(() => {
        const newEvent: EventItem = {
            ...formData,
            id: Date.now().toString(),
            imageUrl: imageFile ? URL.createObjectURL(imageFile) : ''
        };
        setEvents([newEvent, ...events]);
        setFormData(INITIAL_FORM);
        setImageFile(null);
        alert('Dodano (Tryb Demo - bez zapisu do bazy)!');
        setLoading(false);
    }, 1000);

    /*
    try {
      let imgUrl = formData.imageUrl;
      if (imageFile) {
        setUploading(true);
        const fileRef = ref(storage, `artifacts/cmwbc-app/public/events/${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        imgUrl = await getDownloadURL(fileRef);
        setUploading(false);
      }
      await addDoc(collection(db, 'artifacts', 'cmwbc-app', 'public', 'data', 'events'), {
        ...formData,
        imageUrl: imgUrl,
        createdAt: serverTimestamp(),
        authorId: user.uid
      });
      fetchEvents();
    } catch (e) { ... }
    */
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Na pewno usunąć?')) return;
    setEvents(events.filter(ev => ev.id !== id));
    
    // await deleteDoc(doc(db, 'artifacts', 'cmwbc-app', 'public', 'data', 'events', id));
    // fetchEvents();
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <div className={styles.loginIcon}>
            <Lock size={28} color="#5e1c1c" />
          </div>
          <h1 className={styles.headerTitle} style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Redakcja CMWBC</h1>
          <p className={styles.headerSubtitle} style={{ marginBottom: '2rem' }}>Panel zarządzania wydarzeniami</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={passcode} 
              onChange={e => setPasscode(e.target.value)}
              className={styles.loginInput}
              placeholder="Wpisz kod dostępu"
            />
            {authError && <p className={styles.errorMsg}>{authError}</p>}
            <button className={styles.submitBtn}>Zaloguj</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Panel Redakcyjny</h1>
          <p className={styles.headerSubtitle}>Witaj w centrum dowodzenia (Tryb Demo).</p>
        </div>
        <button 
          onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('cmwbc_admin_auth'); }}
          className={styles.logoutBtn}
        >
          Wyloguj
        </button>
      </header>

      <div className={styles.mainGrid}>
        
        <div>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <Upload size={22} color="#5e1c1c" /> Dodaj Nowe Wydarzenie
            </h2>
            
            <div 
              {...getRootProps()} 
              className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
            >
              <input {...getInputProps()} />
              {processingOCR ? (
                <div className="flex flex-col items-center text-[#5e1c1c]">
                  <Loader2 className="animate-spin mb-3 w-8 h-8" />
                  <span className="font-bold">Analizuję screena...</span>
                  <span className="text-xs mt-1">Wyciągam datę i treść</span>
                </div>
              ) : imageFile ? (
                <div className={styles.dropzoneHighlight}>
                  <span className="text-2xl mb-2 block">📸</span>
                  Gotowe do wysłania: {imageFile.name}
                  <span className="block text-xs font-normal text-gray-500 mt-2">(Kliknij, aby zmienić plik)</span>
                </div>
              ) : (
                <div className={styles.dropzoneText}>
                  <p className="font-bold text-lg mb-2 text-[#3d1a14]">Wrzuć screena z Instagrama tutaj</p>
                  <p>Automatycznie odczytam datę i opis!</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tytuł Spotkania</label>
                <input className={styles.input} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="np. Czytanie przy winie" required />
              </div>
              
              <div className={styles.row3}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Dzień</label>
                  <input className={styles.input} value={formData.dateDay} onChange={e => setFormData({...formData, dateDay: e.target.value})} placeholder="06" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Miesiąc</label>
                  <input className={styles.input} value={formData.dateMonth} onChange={e => setFormData({...formData, dateMonth: e.target.value})} placeholder="LISTOPAD" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Dzień tyg.</label>
                  <input className={styles.input} value={formData.dateWeekday} onChange={e => setFormData({...formData, dateWeekday: e.target.value})} placeholder="Czw" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Opis Wydarzenia</label>
                <textarea 
                  className={styles.textarea} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="O czym będzie to spotkanie..."
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Link do zapisów (Lu.ma)</label>
                <input className={styles.input} value={formData.ticketLink} onChange={e => setFormData({...formData, ticketLink: e.target.value})} placeholder="https://lu.ma/..." />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Dostępność</label>
                  <select 
                    className={styles.select} 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value as EventFormData['status']})}
                  >
                    <option value="open">Dostępne</option>
                    <option value="last-places">Ostatnie miejsca</option>
                    <option value="sold-out">Wyprzedane</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Typ</label>
                  <select 
                    className={styles.select} 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value as EventFormData['type']})}
                  >
                    <option value="open">Wstęp Wolny</option>
                    <option value="members-only">Dla Klubowiczów</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading || uploading} className={styles.submitBtn}>
                {(loading || uploading) ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {uploading ? 'Wysyłanie zdjęcia...' : 'Opublikuj na Stronie'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className={styles.stickyWrapper}>
            <h2 className={styles.sectionTitle}>Aktywne na stronie</h2>
            <div>
              {events.map(ev => (
                <div key={ev.id} className={styles.listItem}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '1rem' }}>
                    <div className={styles.itemTitle}>{ev.title}</div>
                    <div className={styles.itemMeta}>
                      {ev.dateDay} {ev.dateMonth} • {ev.time}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <a 
                      href={ev.ticketLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`${styles.actionBtn} ${styles.btnView}`}
                      title="Podgląd linku"
                    >
                      <Eye size={18}/>
                    </a>
                    <button 
                      onClick={() => handleDelete(ev.id)} 
                      className={`${styles.actionBtn} ${styles.btnDelete}`}
                      title="Usuń"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className={styles.emptyState}>
                  <p>Brak wydarzeń.</p>
                  <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Dodaj pierwsze po lewej stronie!</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}