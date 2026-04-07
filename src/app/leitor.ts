import Papa from 'papaparse';

export class Leitor {
    
    lerCsv(file: File): Promise<Record<string, string>[]> {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (resultado) => {
                    resolve(resultado.data as Record<string, string>[]);
                },
                error: (erro) =>{
                    reject(erro)
                }
            })
        });
    }

    obterHeader(file: File): Promise<string[]>{
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                preview: 1,
                complete: (colunas) => {
                    resolve(colunas.data[0] as string[]);
                },
                error: (erro) => {
                    reject(erro)
                }
            })
        })
    }

}
