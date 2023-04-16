import type {NextApiRequest, NextApiResponse} from 'next';

function advancedSearch(req: NextApiRequest, res: NextApiResponse): void {
    const searchQuery: string = req.query.q as string;
    const pages: string = req.query.page as string;

        fetch(`https://api.pokemontcg.io/v2/cards?q=${searchQuery}&page=${pages}&pageSize=30`)
            .then(response => response.json())
            .then(data => res.status(200).json(data))
            .catch(error => {
                    res.status(500).json({error: "error"});
                }
            )
    }
export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    if (req.method === 'GET') {
        advancedSearch(req, res);
    } else {
        res.status(404).send('error');
    }
}