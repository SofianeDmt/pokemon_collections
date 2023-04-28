import {useCustomSWR} from "@/hooks/useCustomSWR";
import Loading from "@/components/loading";

export default function Series(): JSX.Element {
    const {data: Series, isLoading} = useCustomSWR('/api/PkmnSeries/')

    //Je trie les cartes par set
    function sortBySeries(serie: any) {
        let sortedCards: any = {};
        serie?.forEach((serie: any): void => {
            if (!sortedCards.hasOwnProperty(serie.series)) {
                sortedCards[serie.series] = [];
            }
            sortedCards[serie.series].push(serie);
        });
        return sortedCards;
    }

    const sortedCardsBySeries: any = sortBySeries(Series?.data);

    return (
        <main className="flex min-h-screen flex-wrap items-center justify-around p-10 bg-gray-200 text-black">
            {sortedCardsBySeries &&
            <div>
                <h2 className="text-4xl font-black text-center">Tous les sets disponibles</h2>
            </div>
            }
            <div className="flex flex-col w-full h-full">
                {isLoading && <Loading/>}
            </div>
            {Object.keys(sortedCardsBySeries).map(series => (
                <div className="flex-col w-full my-14" key={series}>
                    <div className="my-10">
                        <h3 className="text-lg font-semibold uppercase tracking-widest mb-2">{series}</h3>
                        <div className="w-full bg-gray-500 h-0.5 mt-4"></div>
                    </div>
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-10">
                        {sortedCardsBySeries[series].map((card: any) => (
                            <a key={card?.id} href={`/series/${card?.id}`}>
                            <article className="group rounded-xl bg-white hover:scale-110 transition  shadow-xl group-hover:grayscale-[50%] p-6">
                            <img
                                src={card?.images?.logo} alt={card?.name}
                                className="h-28 object-contain w-full"
                            />

                            <div className="p-4">
                            <h3 className="text-sm text-center font-medium text-gray-900 truncate">
                                {card?.name}
                            </h3>
                                <p className="lg:text-xs text-[6px] text-center font-light text-gray-900 truncate">Release at {card?.releaseDate}</p>
                            </div>
                            </article>
                            </a>
                        ))}
                    </div>

                </div>
            ))}
        </main>
    )
}
