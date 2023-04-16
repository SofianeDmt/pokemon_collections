import Option from "@/components/option";
import {ChangeEvent, FormEvent, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {useCustomSWR} from "@/hooks/useCustomSWR";
import Loading from "@/components/loading";

export default function Search(): JSX.Element {
    const {data: Series, error, isLoading} = useCustomSWR('/api/PkmnSeries/')

    const [subtype, setSubtype] = useState<string>();
    const [type, setType] = useState<string>()
    const [rarity, setRarity] = useState<string>()
    const [artist, setArtist] = useState<string>()
    const [name, setName] = useState<string>()
    const [set, setSet] = useState<string>()
    const [typeVisible, setTypeVisible] = useState<boolean>(true)
    const [rarityVisible, setRarityVisible] = useState<boolean>(true)
    const [setsVisible, setSetsVisible] = useState<boolean>(true)

    const router: NextRouter = useRouter()
    const arrow: JSX.Element = <svg className="ml-2" width="10" height="10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m4.594 8.912 6.553 7.646a1.126 1.126 0 0 0 1.708 0l6.552-7.646c.625-.73.107-1.857-.854-1.857H5.447c-.961 0-1.48 1.127-.853 1.857Z"></path>
    </svg>

    const rarities: {data: string[]} = {
        "data": [
            "Amazing",
            "Common",
            "LEGEND",
            "Promo",
            "Rare",
            "ACE",
            "BREAK",
            "Holo",
            "EX",
            "GX",
            "LV.X",
            "Star",
            "V",
            "VMAX",
            "Prime",
            "Star",
            "Rainbow",
            "Secret",
            "Shining",
            "Shiny",
            "Ultra",
            "Uncommon"
        ]
    }
    const types: {data: string[]} = {
        "data": [
            "Colorless",
            "Darkness",
            "Dragon",
            "Fairy",
            "Fighting",
            "Fire",
            "Grass",
            "Lightning",
            "Metal",
            "Psychic",
            "Water"
        ]
    }
    const subtypes: {data: string[]} = {
        "data": [
            "Energy",
            "Pokemon",
            "Trainer"
        ]
    }

    //Fonction qui trie le tableau d'objet series.data par leur name et par ordre alphabétique
    const SortedSeriesByName = Series?.data?.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name)
    })

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        // Construit l'objet de données à partir des valeurs du formulaire
        const data  = {
            supertype: subtype,
            types: type,
            rarity: rarity,
            name: name,
            set: set,
            artist: artist
        };

        // Filtre les clés dont les valeurs sont undefined et ne pas les inclure dans la chaine de caractère
        const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]): boolean => value !== undefined));

        // Construire la chaîne de requête de l'URL en utilisant les valeurs filtrées et utilise '%20' pour représenter un espace dans la chaîne de requête
        const queryString = Object.keys(filteredData).map((key: string) => {
            if (key === 'set') {
                return encodeURIComponent(key) + '.id:' + filteredData[key] as string;
            } else {
                return encodeURIComponent(key) + ':' + filteredData[key] as string;
            }
        }).join('%20');

        // Redirige vers la page de recherche avec la chaîne de requête en tant que paramètre
        router.push(`/search/${queryString}`)
    };


    return (
        <div>
            <section className="bg-gray-200 text-black">
                <div className="mx-auto max-w-screen-xl h-fit px-4 py-16 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 h-full">
                        <form action="" onSubmit={handleSubmit} className="space-y-12 h-full">
                            <div>
                                <label className="my-2 w-full flex" htmlFor="name">Nom</label>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Recherche"
                                    type="text"
                                    id="name"
                                />
                            </div>

                            <div>
                                <label className="my-2 flex">Cartes</label>
                                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                    {subtypes.data.map((subtypes: string, index: number) => {
                                        return (
                                            <Option key={index} name="subtypes" id={subtypes} label={subtypes}
                                                    onClick={() => setSubtype(subtypes)}/>
                                        )
                                    })
                                    }
                                </div>
                            </div>

                            <div>
                                <label onClick={()=> setTypeVisible(!typeVisible)} className="my-2 flex items-center w-full cursor-pointer">Types {arrow}</label>
                                {typeVisible &&
                                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                    {types.data.map((types: string, index: number) => {
                                        return (
                                            <Option key={index} name="types" id={types} image={types}
                                                    onClick={() => setType(types)}/>
                                        )
                                    })
                                    }
                                </div>
                                }
                            </div>

                            <div>
                                <label onClick={()=> setRarityVisible(!rarityVisible)} className="my-2 flex items-center w-full cursor-pointer">Rareté {arrow}</label>
                                {rarityVisible &&
                                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-7">
                                    {rarities.data.map((rarities: string, index: number) => {
                                        return (
                                            <Option key={index} name="rarity" id={rarities} label={rarities}
                                                    onClick={() => setRarity(rarities)}/>
                                        )
                                    })
                                    }
                                </div>
                                }
                            </div>

                            <div>
                                <label onClick={()=> setSetsVisible(!setsVisible)} className="my-2 flex items-center w-full cursor-pointer">Sets {arrow}</label>
                                {setsVisible &&
                                <div className="grid grid-cols-1 gap-4 text-center lg:grid-cols-6 md:grid-cols-5">
                                    {isLoading && <Loading />}
                                    {SortedSeriesByName?.map((series: string | any, index: number) => {
                                        return (
                                            <Option
                                                key={index}
                                                name="series"
                                                id={series.name}
                                                label={series.name}
                                                onClick={() => setSet(series.id)}
                                            />
                                        );
                                    })}
                                </div>
                                }
                            </div>



                            <div>
                                <label className="my-2 flex" htmlFor="artist">Artiste</label>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setArtist(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Artist"
                                    type="text"
                                    id="artist"
                                />
                            </div>


                            <div className="mt-4 w-full">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
                                >
                                    Rechercher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
        ;
}