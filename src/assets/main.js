//const fetch = require('node-fetch'); //Esta linea arroja error
import fetch from "node-fetch";

//Traer de index.html el div con el id=content
const content= null || document.getElementById('content');

const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCYp3rk70ACGXQ4gFAiMr1SQ&part=snippet%2Cid&order=date&maxResults=10";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "66d00d427emshc41460273a79be4p1bb79djsn772ba066b04f", //Esta key hay que esconderla con dotenv, checar variables de entorno y .env
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

//Codigo de prueba, para saber si el existe un request
// fetch(API, options)
// 	.then(res => res.json())
// 	.then(json => console.log(json))
// 	.catch(err => console.error('error:' + err));

//
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//Funcion que se ejecuta automaticamente y es recursiva solo se agrega () al final pero la misma funcion flecha va en parentesis
(async () => {
  try {
    const videos = await fetchData(API);
    //El codigo HTML de view me lo traje de index.html de la etiqueta quedice content, es para poner ahi los videos que da la api
    //La instruccion videos.item.map(video=>`etc`).slice(0,4).join('') lo que hace es del json el atributo items manda un array de objetos con los videos que nos interesan
    //este array lo pasa a un map y hace una funcion anonima por cada elemento del map, agregando los atreibutos que nos intersan de cada video a una parte del html
    let view = `
    ${videos.items.map(video=>`
    <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnail.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
            </h3>
        </div>
    </div>
    `).slice(0,4).join('')}
    `;
  } catch {}
})();