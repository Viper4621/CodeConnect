const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

//criando função para ler arquivos
//criamos uma promessa e não sabemos o comportamente de resposta então usamos resolve se der ok e reject para falha
//fileReader = leitor de aqruivo
//dando certo vai nos entregar a url / e nome
//caso não string de texto e nome do arquivo
//depois vamos usar o leitor para ler o resultado como uma url
function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro da leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// vai pegar evento de envio e pegar o arquivo que vai ser enviado
//vamos usar async para esperar o resultado da promessa e depois executar e await antes da função
inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

//aqui vai verificar se clicou dentro do X e vai ver o elemento pai e onde tiver a tag remove tag remover no click
listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagQueQueremosRemover = evento.target.parentElement;
    listaTags.removeChild(tagQueQueremosRemover);
  }
});
//verificar para toUperCase
const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

//trim retira todos espaços entre as palavras

//abaixo criamos função para criar um novo elemento li dentro da nossa ul de tags
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(nomeDoProjeto);
    console.log(descricaoDoProjeto);
    console.log(tagsProjeto);
})

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const deuCerto = Math.random() > 0.5;
            if (deuCerto){
                resolve("Projeto publicado com sucesso")
            }else{
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}