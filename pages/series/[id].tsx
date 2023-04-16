import {useState} from "react";
import {useCustomSWRWithArgs} from "@/hooks/useCustomSWR";
import {NextRouter, useRouter} from "next/router";
import CardModal from "@/components/cardModal";
// @ts-ignore
import Tilt from 'react-vanilla-tilt';
import Loading from "@/components/loading";

export default function SeriesID(): JSX.Element {
    const router: NextRouter = useRouter();
    const [page, setPage] = useState<number>(1)
    const {data: getPokemons, error, isLoading} = useCustomSWRWithArgs(`/api/PkmnWithSeries/`, router.query.id, page)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [pokemon, setPokemon] = useState<object>({})

    const openModal = (objet: {}): void => {
        console.log(objet)
        setPokemon(objet)
        setIsOpen(true)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-around bg-gray-200 text-black">
            {isLoading && <Loading/>}

            {getPokemons &&
                <img src={getPokemons?.data[0]?.set?.images?.logo} alt="logo" height={200} width={200}/>
            }
            {getPokemons?.data[0]?.set?.name}
            {getPokemons &&
                <span
                    className="text-sm my-3 font-light text-gray-500">Ce Set possède {getPokemons?.totalCount} cartes</span>
            }
            <div className="lg:max-w-screen-lg md:max-w-screen-md">
                <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 w-full gap-10 my-10">
                    {getPokemons?.data?.map((pokemon: any) => (
                        <Tilt key={pokemon?.id} className="Tilt" style={{
                            width: "fit-content",
                            backgroundColor: "#fff", borderRadius: "20px"
                        }}>
                            <img key={pokemon?.id} onClick={() => openModal({pokemon})}
                                 className="hover:scale-125 transition drop-shadow-xl rounded-lg"
                                 src={pokemon?.images?.small} alt={pokemon?.name} height={200} width={200}/>
                        </Tilt>
                    ))}
                    <CardModal pokemon={pokemon} isOpen={isOpen} closeModal={setIsOpen}/>
                </div>
            </div>
            {getPokemons?.count > 0 &&
                <div className="flex my-8">
                    {page === 1 ?
                        <button className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l"
                                disabled>Prev</button> :
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={() => setPage(page - 1)}>Prev</button>}
                    {getPokemons?.count < 25 ?
                        <button className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r"
                                disabled>Next</button> :
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={() => setPage(page + 1)}>Next</button>}
                </div>
            }
        </main>
    )
}
