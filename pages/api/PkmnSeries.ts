import type {NextApiRequest, NextApiResponse} from 'next';

function getSeries(req: NextApiRequest, res: NextApiResponse): void {

        fetch(`https://api.pokemontcg.io/v2/sets?orderBy=series,releaseDate`)
            .then(response => response.json())
            .then(data => res.status(200).json(data))
            .catch(error => {
                    res.status(500).json({error: "error"});
                }
            )
}


export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    if (req.method === 'GET') {
        getSeries(req, res);
    } else {
        res.status(404).send('error');
    }
}
