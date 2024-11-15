const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", ()=>{
    inputUpload.click();
})

//criando função para ler arquivos
//criamos uma promessa e não sabemos o comportamente de resposta então usamos resolve se der ok e reject para falha
//fileReader = leitor de aqruivo
//dando certo vai nos entregar a url / e nome
//caso não string de texto e nome do arquivo
//depois vamos usar o leitor para ler o resultado como uma url
function lerConteudoDoArquivo(arquivo){
  return new Promise((resolve, reject) =>{
    const leitor = new FileReader();
    leitor.onload = () =>{
        resolve({url: leitor.result, nome: arquivo.name})
    }
    leitor.onerror = () =>{
        reject(`Erro da leitura do arquivo ${arquivo.name}`)
    }

    leitor.readAsDataURL(arquivo)
  })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

// vai pegar evento de envio e pegar o arquivo que vai ser enviado
//vamos usar async para esperar o resultado da promessa e depois executar e await antes da função
inputUpload.addEventListener("change", async (evento) =>{
    const arquivo = evento.target.files[0];

    if(arquivo){
        try{
            const conteudoDoArquivo =  await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }catch (erro){
             console.error("Erro na leitura do arquivo")
        }
    }
})