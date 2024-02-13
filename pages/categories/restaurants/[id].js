import { useRouter } from 'next/router';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import { useState, useRef } from 'react';

function RestaurantDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const mediaRecorderRef = useRef(null);

    // Données du restaurant (à remplacer par une requête à l'API)
    const restaurant = {
        id: id,
        name: "ECE Restauration",
        address: "1 quai de Grenelle",
        type: "Cuisine française",
        image: "/ece_restaurant.png"
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
               
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Could not start recording', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.ondataavailable = event => {
                const audioBlob = event.data;
                setAudioBlob(audioBlob);
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            };
            setIsRecording(false);
        }
    };
    

    if (!restaurant) {
        return <p>Restaurant non trouvé</p>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center mb-6">{restaurant.name}</h1>
                {}
                <div>
                    {isRecording ? (
                        <button onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Arrêter l'enregistrement</button>
                    ) : (
                        <button onClick={startRecording} className="bg-green-500 text-white p-2 rounded">Commencer l'enregistrement</button>
                    )}
                    {audioUrl && <audio src={audioUrl} controls className="mt-4"/>}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default RestaurantDetailPage;
