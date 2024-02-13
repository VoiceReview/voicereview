import { useRouter } from 'next/router';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

function RestaurantDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    // Ici, vous devriez récupérer les données du restaurant en fonction de l'id
    // Pour l'exemple, nous utilisons des données statiques
    const restaurant = {
        id: id,
        name: "ECE Restauration",
        address: "1 quai de Grenelle",
        type: "Cuisine française",
        image: "/ece_restaurant.png"
    };

    // Affichage conditionnel si le restaurant n'est pas trouvé
    if (!restaurant) {
        return <p>Restaurant non trouvé</p>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center mb-6">{restaurant.name}</h1>
                {/* Affichage des détails du restaurant */}
                {/* ... */}
            </main>
            <Footer />
        </div>
    );
}

export default RestaurantDetailPage;
