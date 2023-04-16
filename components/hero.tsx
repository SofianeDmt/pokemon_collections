import {ChangeEvent, FormEvent, useState} from "react";
import {useCustomSWRWithArgs} from "@/hooks/useCustomSWR";
import CardModal from "@/components/cardModal";
// @ts-ignore
import Tilt from 'react-vanilla-tilt'
import Loading from "@/components/loading";

export default function Hero(): JSX.Element {

    const [search, setSearch] = useState<string>('')
    const [pokemonName, setPokemonName] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const {data: getPokemons, isLoading} = useCustomSWRWithArgs('/api/PkmnWithName/', search, page)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [pokemon, setPokemon] = useState<object>({})


    const HandleSubmit = (e: any): void => {
        e.preventDefault()
        setPage(1)
        setSearch(pokemonName)
    }

    const openModal = (objet: {}): void => {
        console.log(objet)
        setPokemon(objet)
        setIsOpen(true)
    }

    return (
            <section className="text-gray-600 body-font bg-gray-200 w-full flex justify-center">
                <div className="py-24 lg:max-w-screen-lg md:max-w-screen-md">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="text-5xl font-bold title-font mb-4 text-gray-900">Collectionner toutes les cartes
                            Pokémon</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed lg:text-xl md:text-md text-xs">Grâce à cet outil, vous pourrez faire vos recherches sur les cartes {"qu'il"} vous manque a la collection et les ajouter en favoris pour ne plus les oublier</p>
                    </div>
                    <div
                        className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div className="relative flex-grow w-full">
                            <form onSubmit={(e: FormEvent<HTMLFormElement>) => HandleSubmit(e)}>
                                <div
                                    className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden my-2">
                                    <div className="grid place-items-center h-full w-12 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </div>

                                    <input
                                        className="peer h-full w-full outline-none border-white text-sm text-gray-700 pr-2"
                                        type="text"
                                        id="search"
                                        placeholder="Charizard" onChange={(e: ChangeEvent<HTMLInputElement>) => setPokemonName(e.target.value)}/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 mx-10 max-w-screen justify-center items-center gap-10 my-10">
                        {isLoading && <Loading/>}
                        {getPokemons?.data?.map((pokemon: any) => (
                            <Tilt key={pokemon?.id} className="Tilt" style={{
                                width: "fit-content",
                                backgroundColor: "#fff", borderRadius: "20px"
                            }}>
                                <img key={pokemon?.id} onClick={() => openModal({pokemon})}
                                     className="hover:scale-125 transition drop-shadow-xl" src={pokemon?.images?.small}
                                     alt={pokemon?.name} height={200} width={200}/>
                            </Tilt>
                        ))}
                        {getPokemons?.data?.length === 0 &&
                            <p className="col-span-10 text-center text-md font-light text-black">Aucun Pokémon
                                trouvé</p>}
                        <CardModal pokemon={pokemon} isOpen={isOpen} closeModal={setIsOpen}/>
                    </div>
                    {getPokemons?.count > 0 &&
                        <div className="flex justify-center items-center my-8">
                            {page === 1 ?
                                <button
                                    className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l"
                                    disabled>Prev</button> :
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                    onClick={() => setPage(page - 1)}>Prev</button>}
                            {getPokemons?.count < 25 ?
                                <button
                                    className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r"
                                    disabled>Next</button> :
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                    onClick={() => setPage(page + 1)}>Next</button>}
                        </div>
                    }
                </div>
            </section>
    )
}
