import CardModal from "@/components/cardModal";
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
// @ts-ignore
import Tilt from 'react-vanilla-tilt';

export default function Favoris(): JSX.Element {
    const {items, addItem, removeItemById, isItemExistsById} = useLocalStorage("PokeFav", []); // Rem
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [localFav, setLocalFav] = useState<never[]>([])
    const [pokemon, setPokemon] = useState<object>({})

    // Fonction pour ouvrir la modal
    const openModal = (objet: any): void => {
        console.log(objet)
        setPokemon(objet)
        setIsOpen(true)
    }

    useEffect(() => {
        const storedItems: any = localStorage.getItem("PokeFav");
        const items = JSON.parse(storedItems);

        const modifiedItems = items.map((item: any) => {
            // Créer une nouvelle clé "pokemon" avec la valeur de la clé "name"
            item.pokemon = item.name;

            // Supprimer la clé "id" et "name"
            delete item.id;
            delete item.name;

            return item;
        });
        //Modifier le state localFav avec les données du localstorage
        return setLocalFav(modifiedItems)
    }, [])



    return (
        <main className="flex-col min-h-screen items-center justify-between h-screen text-center bg-gray-200 text-black">
            <div>
                <h2 className="text-4xl font-black py-5">Mes favoris</h2>
                <p className="my-2 text-xs font-light">Les favoris utilisent le local storage du navigateur car aucune base de données {"n'est"} disponible, veuillez ne pas clear la clé "PokeFav" de celui-ci.</p>
            </div>
            <div className="md:grid lg:grid-cols-8 md:grid-cols-5 flex flex-col w-full justify-center items-center gap-10 mb-10 mt-20 p-10 rounded-lg">
                {localFav === null || localFav === undefined || localFav.length === 0 ?
                    (
                        <p className="col-span-10 mt-28 text-xl">Vous ne possédez aucun favori pour le moment</p>
                    ) :
                        (
                            <>
                {localFav?.map((pokemon: any) => (
                    <>
                        <Tilt key={pokemon?.pokemon?.id} className="Tilt" style={{width: "fit-content",
                            backgroundColor: "#fff", borderRadius: "20px"}}>
                        <img key={pokemon?.pokemon?.id} onClick={() => openModal(pokemon)}
                             className="hover:scale-125 transition drop-shadow-xl" src={pokemon?.pokemon?.images?.small}
                             alt={pokemon?.pokemon?.name} height={200} width={200}/>
                        </Tilt>
                    </>
                ))}
                </>
                            )}
                <CardModal pokemon={pokemon} isOpen={isOpen} closeModal={setIsOpen}/>
            </div>
        </main>
    )
}