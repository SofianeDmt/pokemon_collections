import {useCustomSWRWithArgs} from "@/hooks/useCustomSWR";
import {NextRouter, useRouter} from "next/router";
// @ts-ignore
import Tilt from 'react-vanilla-tilt'
import {useState} from "react";
import CardModal from "@/components/cardModal";
import Loading from "@/components/loading";

export default function AdvancedSearch(): JSX.Element {
    const [page, setPage] = useState<number>(1)
    const [pokemon, setPokemon] = useState<object>({})
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router: NextRouter = useRouter()
    const search: string | string[] | undefined = router.query.id;

    const {data: getCards, isLoading} = useCustomSWRWithArgs('/api/AdvancedSearch/', search, page)


    const openModal = (objet: {}): void => {
        console.log(objet)
        setPokemon(objet)
        setIsOpen(true)
    }

    return (
        <div className="flex flex-col justify-center items-center bg-gray-200 text-black">
            <h2 className="my-10 text-4xl font-black text-center">Résultats de votre recherche</h2>
            <div className="min-h-screen md:max-w-screen-md lg:max-w-screen-lg">
                <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 w-full max-w-screen justify-center items-center gap-10 my-10">
                {isLoading && <Loading/>}
                {getCards && getCards?.count === 0 && <div className="col-span-5 mx-auto">Aucun résultat</div>}
                    {getCards?.data?.map((pokemon: any) => (
                        <Tilt key={pokemon?.id} className="Tilt" style={{
                            width: "fit-content",
                            backgroundColor: "#fff", borderRadius: "20px"
                        }}>
                            <img key={pokemon?.id} className="hover:scale-125 transition drop-shadow-xl"
                                 onClick={() => openModal({pokemon})}
                                 src={pokemon?.images?.small}
                                 alt={pokemon?.name} height={200} width={200}/>
                        </Tilt>
                    ))}
                    <CardModal pokemon={pokemon} isOpen={isOpen} closeModal={setIsOpen}/>
                </div>
                {getCards?.count > 0 &&
                    <div className="flex justify-center items-center my-8">
                        {page === 1 ?
                            <button
                                className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l"
                                disabled>Prev</button> :
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={() => setPage(page - 1)}>Prev</button>}
                        {getCards?.count < 25 ?
                            <button
                                className="bg-gray-100 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r"
                                disabled>Next</button> :
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={() => setPage(page + 1)}>Next</button>}
                    </div>
                }
            </div>
        </div>
    )
}