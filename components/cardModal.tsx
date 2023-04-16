import {ReactPortal, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Link from "next/link";
import {ItemType, useLocalStorage} from "@/hooks/useLocalStorage";
import Button from "@/components/button";
// @ts-ignore
import Tilt from 'react-vanilla-tilt'

interface ModalProps {
    isOpen: boolean;
    closeModal: any;
    children?: JSX.Element | JSX.Element[];
    title?: string;
    className?: string;
    pokemon?: any;
}

export const checkType = (type: string): string => {
    switch (type) {
        case "Colorless":
            return "/images/normal.webp";
        case "Darkness":
            return "/images/spectre.webp";
        case "Dragon":
            return "/images/dragon.webp";
        case "Fairy":
            return "/images/fairy.png";
        case "Fighting":
            return "/images/comb.webp";
        case "Fire":
            return "/images/feu.webp";
        case "Grass":
            return "/images/plante.webp";
        case "Lightning":
            return "/images/elec.webp";
        case "Metal":
            return "/images/acier.webp";
        case "Psychic":
            return "/images/psy.webp";
        case "Water":
            return "/images/eau.webp";
        default:
            return "/images/normal.webp";
    }
}

export default function CardModal({
                                      isOpen,
                                      closeModal,
                                      pokemon,
                                  }: ModalProps): ReactPortal | null {

    // Utilisation du hook useLocalStorage pour gérer les objets dans le localStorage
    const {addItem, removeItemById, isItemExistsById} = useLocalStorage("PokeFav", []);

    // Fonction pour ajouter un nouvel objet au tableau
    const handleAddItem = (newItem: ItemType): void => {
        addItem(newItem);
    };

    // Fonction pour supprimer un objet du tableau par ID
    const handleRemoveItem = (itemId: number): void => {
        removeItemById(itemId);
    };

    // Fonction pour vérifier si un objet existe dans le tableau par ID
    const handleCheckItemExists = (itemId: number) => {
        return isItemExistsById(itemId);
    };


    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }, [closeModal]);


    return isOpen
        ? ReactDOM.createPortal(
            <div className="fixed inset-0 bg-gray-400 bg-opacity-80 transition-opacity">
                <div
                    className="absolute h-fit p-6 bg-white text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition overflow-y-auto rounded-lg shadow-2xl md:grid md:grid-cols-3 min-w-[80%] max-h-[80%] z-10">
                    <div className="col-span-3 relative">
                        <button onClick={() => closeModal()}
                                className="absolute flex items-center justify-center rounded-md w-10 h-10 hover:opacity-60 bg-gray-300 -top-6 -right-6">
                            <svg width="34" height="34" fill="none" stroke="currentColor" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.25 17.25 6.75 6.75"></path>
                                <path d="m17.25 6.75-10.5 10.5"></path>
                            </svg>
                        </button>
                    </div>
                    <Tilt key={pokemon?.id} className="Tilt col-span-1 h-fit" style={{
                        width: "fit-content",
                        backgroundColor: "#fff", borderRadius: "20px", backgroundOpacity: 100
                    }}>
                        <img
                            alt="pokemon"
                            src={pokemon?.pokemon?.images?.large}
                            className="rounded-lg shadow-2xl"
                        />
                    </Tilt>
                    <div className="p-4 flex-col text-center sm:p-6 md:col-span-2 lg:p-8">
                        <div className="flex justify-between">
                            <p className="md:text-sm text-xs font-semibold uppercase tracking-widest">
                                {pokemon?.pokemon?.name}
                            </p>
                            <p className="md:text-sm text-xs font-semibold uppercase tracking-widest">
                                {pokemon?.pokemon?.hp && <span>HP</span>} {pokemon?.pokemon?.hp}
                            </p>
                        </div>
                        <div className="flex mb-5">
                            <span className="md:text-sm text-xs font-semibold uppercase tracking-widest">
                                {pokemon?.pokemon?.supertype} - {pokemon?.pokemon?.subtypes?.map((subtype: any) => (
                                <span className="md:text-sm text-xs" key={0}> {subtype}</span>
                            ))}
                            </span>
                        </div>
                        <hr/>
                        <div className="flex-col">
                            {pokemon?.pokemon?.abilities &&
                                <p className="my-3">Abilities</p>}
                            {pokemon?.pokemon?.abilities?.map((abilities: any) => (
                                <>
                                    <div key={0} className="flex justify-between my-3">
                                        <div className="inline-flex gap-x-1 items-center">
                                            <p className="font-light text-sm">{abilities.type}</p>
                                            <p>{abilities.name}</p>
                                        </div>
                                        <p>
                                            {abilities.damage}
                                        </p>
                                    </div>
                                    <p className="text-left">{abilities.text}</p>
                                </>
                            ))}
                            {pokemon?.pokemon?.attacks &&
                                <p className="text-sm font-semibold uppercase tracking-widest my-3">Attacks</p>}
                            {pokemon?.pokemon?.attacks?.map((attack: any) => (
                                <>
                                    <div key={0} className="flex justify-between my-3">
                                        <div className="inline-flex items-center">
                                            {attack?.cost && attack?.cost.map((costData: string, index: string) => (
                                                <img
                                                    key={index}
                                                    alt={`attack type ${index}`}
                                                    className="w-7 h-7 mx-1"
                                                    src={checkType(costData)}
                                                />
                                            ))}
                                            <p className="text-sm font-semibold tracking-widest">{attack.name}</p>
                                        </div>
                                        <p className="text-sm font-semibold uppercase tracking-widest">
                                            {attack.damage}
                                        </p>
                                    </div>
                                    <p className="font-light mb-10 text-left">{attack.text}</p>
                                </>
                            ))}
                            <hr/>
                            <div className="flex justify-between">
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.weaknesses &&
                                        <p className="my-3">Weaknesses</p>
                                    }
                                    <div className="flex justify-center items-center">
                                        {pokemon?.pokemon?.weaknesses?.map((weaknesses: any) => (
                                            <>
                                                <img
                                                    key={0}
                                                    alt={`${weaknesses.type}`}
                                                    className="w-7 h-7 mx-1"
                                                    src={checkType(weaknesses.type)}
                                                />
                                                <p key={0}>{weaknesses.value}</p>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.resistances &&
                                        <p className="my-3">Resistances</p>
                                    }
                                    <div className="flex justify-center items-center">
                                        {pokemon?.pokemon?.resistances?.map((resistances: any) => (
                                            <>
                                                <img
                                                    key={0}
                                                    alt={`${resistances.type}`}
                                                    className="w-7 h-7 mx-1"
                                                    src={checkType(resistances.type)}
                                                />
                                                <p key={0}>{resistances.value}</p>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.retreatCost &&
                                        <p className="my-3">RetreatCost</p>
                                    }
                                    <div className="flex justify-center items-center">
                                        {pokemon?.pokemon?.retreatCost?.map((retreatCost: any) => (
                                            <img
                                                key={0}
                                                alt={`${retreatCost}`}
                                                className="w-7 h-7 mx-1"
                                                src={checkType(retreatCost)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mb-10">
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.artist &&
                                        <p className="my-3">Artist</p>
                                    }
                                    {pokemon?.pokemon?.artist}
                                </div>
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.rarity &&
                                        <p className="my-3">Rarity</p>
                                    }
                                    {pokemon?.pokemon?.rarity}
                                </div>
                                <div className="flex-col justify-center items-center">
                                    {pokemon?.pokemon?.set &&
                                        <p className="my-3">Set</p>
                                    }
                                    <Link className="underline"
                                        href={`/series/${pokemon?.pokemon?.set?.id}`}>{pokemon?.pokemon?.set?.name}</Link>
                                </div>
                            </div>
                            <hr/>
                            <div className="my-5 flex-col">
                                <p>Number</p>
                                <p>{pokemon?.pokemon?.number} / {pokemon?.pokemon?.set?.printedTotal}</p>
                            </div>
                            {handleCheckItemExists(pokemon?.pokemon?.id) ? (
                                    <Button onClick={() => handleRemoveItem(pokemon?.pokemon?.id)}
                                            classNames="bg-red-400 hover:bg-red-500 active:bg-red-500 text-white">
                                        Remove from favorites
                                    </Button>
                                )
                                :
                                (
                                    <Button onClick={() => handleAddItem({
                                        id: pokemon?.pokemon?.id,
                                        name: pokemon?.pokemon
                                    })} classNames="bg-green-400 hover:bg-green-500 active:bg-green-500 text-white">
                                        Add to favorites
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>,

            document.body
        )
        : null;
};