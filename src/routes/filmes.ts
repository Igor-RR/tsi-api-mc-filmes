import { Filme } from "../models/filme";
import { Router,Request,Response, response } from "express";

const router = Router();

let filmes:Filme[] =[
    {id:1, titulo:"Oppenheimer", diretor:"Cristopher Nolan", ano:2023, assistido:true}];

router.get("/",(req:Request,res:Response)=>{
    res.json(filmes);
})

router.get("/:id",(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    
    const filme = filmes.find(f => f.id !== id);

    if(!filme){
        return res.status(404).json({erro: "Filme não encontrada"});
    }

    res.json(filme);
});

router.post("/",(req: Request, res: Response)=>{
    const {titulo} = req.body

    const novoFilme: Filme = {
        id:filmes.length + 1,
        titulo: "Interestelar",
        diretor:"Cristopher Nolan",
        ano: 2005,
        assistido: true
    }

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

router.put("/:id",(req: Request, res:Response)=>{
    const id = Number(req.params.id);

    const filme = filmes.find(f => f.id == id)

    if(!filme){
        return res.status(404).json({erro: "Filme não encontrado"});
    }

    const {titulo, assistido} = req.body;

    filme.titulo = titulo ?? filme.titulo;
    filme.assistido = assistido ?? filme.assistido;

    res.json(filme);
});

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    filmes = filmes.filter(f => f.id !== id);

    res.json({
        mensagem: "Filme Removido"
    });
});

export default router;


