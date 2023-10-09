
function main(){
    //ler ficheiro CSV -> comma separated value
    const data = d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vR8bn4thMy03dRlXkM_kQ0GIsSBvpFxpFPzL-uKSYoU2mjj19XcBTe7468LFntpDMD6llVHmhOXDVWO/pub?output=csv", d3.autoType);
    const places = d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTpCDJd9NZyQKV0cLg3Zh8EDmAA0OiPKeM7IB0ymTHiWRpkn7R0VcvN4Unxjt7bZlDWC3TYyGQBqlcD/pub?output=csv", d3.autoType);
    const profs = d3.csv("    https://docs.google.com/spreadsheets/d/e/2PACX-1vSZQRsquFU0Ng51nwXTjLhCaGRelHEdCMz-S-UC1gnq66Xl12prkHbJUVjBXVYLm-YlN-zwZFrmfLUJ/pub?output=csv", d3.autoType);
    var ids = []
    var idsNotOrganized = []
    var media1
    var mediaAntes
    var media2
    var mediaApos
    var width = 1300
    var height = 900
    //VISÃO GERAL
    var ratingsAntes = []
    var ratingsApos = []
    var colorAntes
    var cxAntes = 150
    var cyAntes
    var colorApos
    var cxApos = 350
    var cyApos
    //UDER INDIVIDUAL
    var ratingAntes
    var ratingApos
    var colorUserAntes
    var cx1 = 130
    var cx2 = 330
    var yUserAntes
    var colorUserApos
    var yUserApos

    var times = []


    var ratingZona1Count = 0
    var ratingZona2Count = 0
    var ratingZona3Count = 0
    var ratingZona4Count = 0
    var ratingZona5Count = 0
    
    var futures = []
    var visits = []
    var visitsZona1 = []
    var visitsZona2 = []
    var visitsZona3 = []
    var visitsZona4 = []
    var visitsZona5 = []
    var justificationsZona1 = []
    var justificationsZona2 = []
    var justificationsZona3 = []
    var justificationsZona4 = []
    var justificationsZona5 = []

    //NEW
    var ratingsZona1 = []
    var ratingsZona2 = []
    var ratingsZona3 = []
    var ratingsZona4 = []
    var ratingsZona5 = []


    var ratingUserZona1 = 0
    var ratingUserZona2 = 0
    var ratingUserZona3 = 0
    var ratingUserZona4 = 0
    var ratingUserZona5 = 0

    var countZona1 = 0
    var countZona2 = 0
    var countZona3 = 0
    var countZona4 = 0
    var countZona5 = 0

    var visitUserZona1 = 0
    var visitUserZona2 = 0
    var visitUserZona3 = 0
    var visitUserZona4 = 0
    var visitUserZona5 = 0

    var countFutureUserZona1 = 0
    var countFutureUserZona2 = 0
    var countFutureUserZona3 = 0
    var countFutureUserZona4 = 0
    var countFutureUserZona5 = 0

    //CORES INICIAIS
    var corZona1 = 'white'
    var corZona2 = 'white'
    var corZona3 = 'white'
    var corZona4 = 'white'
    var corZona5 = 'white'

    var elementsFromExcel = [];

    var nomeDoLocal
    var numeroDeZonas
    var placesForConsultas = []
    var medicalsForConsultas = []

    //Novos PROFISSIONAIS DE SAUDE
    profs.then(
        function(m){
            var totalProfissionais = 0
            medicalsForConsultas = []
            
            for(let indexm = 0; indexm < m.length; indexm++){
                totalProfissionais +=1
                elementm = m[indexm];
                medicalsForConsultas.push(elementm)
                   
                //PARA ACEDER AOS ELEMENTOS
                //se tivermos um local novo, adicionar
                if(medicalsForConsultas.length != 0){
                    const newProfissional = document.createElement("option");
                    newProfissional.value = medicalsForConsultas[indexm]["Nome do novo profissional"]
                    newProfissional.innerText = medicalsForConsultas[indexm]["Nome do novo profissional"];
                    document.getElementById("medicalProfessionals").appendChild(newProfissional);
                }     
            }

    
  
    // NOVOS LOCAIS PARA CONSULTAS
    places.then(
        function(p){
            var totalLocais = 0
            placesForConsultas = []
            
            for(let indexp = 0; indexp < p.length; indexp++){
                totalLocais +=1
                elementp = p[indexp];
                placesForConsultas.push(elementp)
                   
                //PARA ACEDER AOS ELEMENTOS
                //se tivermos um local novo, adicionar
                if(placesForConsultas.length != 0){
                    const newPlace = document.createElement("option");
                    newPlace.value = placesForConsultas[indexp]["Nome do novo local"]
                    newPlace.innerText = placesForConsultas[indexp]["Nome do novo local"];
                    document.getElementById("localConsulta").appendChild(newPlace);
                }     
            }


        //GET THE INFORMATION REGARDING THAT SPACE
        
        data.then(
            function(d){

                var countToCheck = 0

                //MEDICAL PROFESSIONAL SELECIONADO
                var selectedMedical
                var selecedLocal
                selectedMedical = d3.select("#medicalProfessionals").node().value;
                selecedLocal = d3.select("#localConsulta").node().value;

                d3.select("#medicalProfessionals").on("change", function(){
                    selectedMedical = d3.select("#medicalProfessionals").node().value;
                    deleteAll()
                    if(countToCheck == 0){
                        getElements()
                        countToCheck += 1
                    }
                    getElements()
                })

                //LOCAL SELECIONADO
                
                d3.select("#localConsulta").on("change", function(){
                    selecedLocal = d3.select("#localConsulta").node().value;
                    if(countToCheck == 0){
                        getElements()
                        countToCheck += 1
                    }
                    getElements()
                    getElementsForPlace()
                    determinePlaceToDraw()
                })


                //DESENHAR EWB VISUALIZATION
                //TITULO
                var svgTitle = d3.select("#div0")
                    .append("svgTitle")
                    .attr("width", 800)
                    .attr("height", 100)

                svgTitle.append('text')
                    .text("Consultas sem Paredes:     ")
                    .style("color", "#0d4148")
                    .style("font-weight", 600)
                    .style("font-family", "Poppins")
                    .style("font-size", '30px')
    

                var svg = d3.select("#div2")
                    .append("svg")
                    .attr('id', 'svgGeral')
                    .attr("width", width)
                    .attr("height", height)

                //EWB VISUALIZATION
                //CORES AO LONGO DO TEMPO
                var coresAntes = [] //max 4
                var coresDepois = []

                //POSIÇÕES AO LONGO DO TEMPO
                var posiAntes = [] //max 4
                var posiDepois = []

                //SE TIVERMOS MAIS DE 4 RATING
                //antes
                var pa1 = 0
                var pa2 = 0
                var pa3 = 0
                var pa4 = 0
                var ca1 = ''
                var ca2 = ''
                var ca3 = ''
                var ca4 = ''
                //depois
                var pd1 = 0
                var pd2 = 0
                var pd3 = 0
                var pd4 = 0
                var cd1 = ''
                var cd2 = ''
                var cd3 = ''
                var cd4 = ''

                //legenda users
                svg.append('text')
                    .text("Selecione um utilizador para visualizar os seus dados")
                    .attr('x', 50)
                    .attr('y', 550)
                    .style("fill", "#6E9EA4")
                    .style("font-weight", 800)
                    .style("font-family", "Roboto")
                    .style("font-size", '20px')

                //LEGENDA GRÁFICO SWB
                d3.select('#box1')
                    .text("Visualização da evolução do bem estar emocional")
                    .style("color", "#0d4148")
                    .style("font-weight", 800)
                    .style("font-family", "Poppins")
                    .style("font-size", '20px')
                    //ESCALA DE CORES GRADIENTE
                    var defs = svg.append("defs");

                    var linearGradientE = defs.append("linearGradient")
                        .attr("id", "linear-gradientE");

                    var linearGradientV = defs.append("linearGradient")
                        .attr("id", "linear-gradientV");

                    var linearGradientF = defs.append("linearGradient")
                        .attr("id", "linear-gradientF");

                    //Horizontal gradient
                    linearGradientE
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "100%")
                        .attr("y2", "0%");

                    linearGradientV
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "100%")
                        .attr("y2", "0%");

                    linearGradientF
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "100%")
                        .attr("y2", "0%");

                    //COLOR SCALE EXPERIENCIA NA SALA
                    var colorScaleZona1 = d3.scaleLinear()
                        .range(["#F60D0D", "#FF9900","#F7F054","#72FA1E","#3FD25F"]);

                    //COLOR SCALE VISITAS NA SALA
                    var colorScaleVisita = d3.scaleLinear()
                        .range(["#C7E2DCFF", "#96E2CFFF","#669BE2FF","#4049E2FF","#1D2268FF"]);

                    //COLOR SCALE FUTURO
                    var colorScaleFuturo = d3.scaleLinear()
                        .range(["#FFE2BBFF", "#E2CC96FF","#E2B266FF","#E2763DFF","#BF4E00FF"]);


                    //LEGENDA EXPERIENCIA NA SALA
                    var legendaExperienciaMenos = 'Pior experência'
                    var legendaExperienciaMais = 'Melhor experiência'
                    //LEGENDA FUTURE GERAL
                    var legendaFutureMenosGeral = 'Local com menos votos'
                    var legendaFutureMaisGeral = 'Local com mais votos'
                    //LEGENDA FUTURE USER
                    var legendaFutureMenosUser = 'Não gostaria de visitar'
                    var legendaFutureMaisUser = 'Gostaria de visitar'
                    //LEGENDA VISITAS
                    var legendaVisitaMenosGeral = 'Local com menos visitas'
                    var legendaVisitaMaisGeral = 'Local com mais visitas'
                    //LEGENDA VISITAS
                    var legendaVisitaMenosUser = 'Não visitou o local'
                    var legendaVisitaMaisUser = 'Visitou o local'

                

                //APAGAR TUDO O QUE O SVG TINHA
                d3.select("#svgGeral").empty();
                

                var timesToPrint = []

                var idToConsider = 0

                function getElements(){
                    deleteAll()
                    //Ir ao excel buscar os valores correspondentes ao medical professional escolhido
                    var allElements = []
                    var allElementsByMedical = []
                    var elementsFromExcel = []
                    for(let indexM = 0; indexM < d.length; indexM++){
                        elementM = d[indexM];
                        allElements.push(elementM)
                       
                        if(allElements[indexM]["Selecione o profissional de saúde com quem teve a consulta"] == selectedMedical){

                            allElementsByMedical.push(elementM)

                        }
                        else deleteAll()
                    }
                    
                    //Ir ao excel buscar os valores correspondentes ao local escolhido

                    var localVerificacao

                    elementsFromExcel = []

                    elementsFromExcel = allElementsByMedical  

                    //meter a zero
                    ratingsAntes = []      
                    ratingsApos = []                 
                    ids = [] 
                    idsNotOrganized = [] 
                    times = [] 
                    ratingsZona1.length = []
                    ratingsZona2 = [] 
                    ratingsZona3 = [] 
                    ratingsZona4 = [] 
                    ratingsZona5 = [] 
                    ratingZona1Count = 0 
                    ratingZona2Count = 0 
                    ratingZona3Count = 0 
                    ratingZona4Count = 0 
                    ratingZona5Count = 0 
                    futures = []
                    visits = []
                    visitsZona1 = []
                    visitsZona2 = []
                    visitsZona3 = []
                    visitsZona4 = []
                    visitsZona5 = []
                    justificationsZona1 = []
                    justificationsZona2 = []
                    justificationsZona3 = []
                    justificationsZona4 = []
                    justificationsZona5 = []
                    countZona1 = 0
                    countZona2 = 0
                    countZona3 = 0
                    countZona4 = 0
                    countZona5 = 0
                    countFutureZona1 = 0
                    countFutureZona2 = 0
                    countFutureZona3 = 0
                    countFutureZona4 = 0
                    countFutureZona5 = 0

                    for(let index = 0; index < allElementsByMedical.length; index++){


                        if(allElementsByMedical[index]["Selecione o local da consulta"] == selecedLocal){ 


                            localVerificacao = allElementsByMedical[index]["Selecione o local da consulta"]

                            ratingsAntes.push(elementsFromExcel[index]["Como se sentia antes da consulta?"]);
                            ratingsApos.push(elementsFromExcel[index]["Como se sente após a consulta?"]);
                            ids.push(elementsFromExcel[index]["Escreva o seu identificador alfanumerico"]);
                            idsNotOrganized.push(elementsFromExcel[index]["Escreva o seu identificador alfanumerico"]);

                            var novoTempo
                            var mes = elementsFromExcel[index]["Carimbo de data/hora"][5] + elementsFromExcel[index]["Carimbo de data/hora"][6] 
                            var mesPrint
                            if(mes == '01') mesPrint = 'janeiro'
                            if(mes == '02') mesPrint = 'fevereiro'
                            if(mes == '03') mesPrint = 'março'
                            if(mes == '04') mesPrint = 'abril'
                            if(mes == '05') mesPrint = 'maio'
                            if(mes == '06') mesPrint = 'junho'
                            if(mes == '07') mesPrint = 'julho'
                            if(mes == '08') mesPrint = 'agosto'
                            if(mes == '09') mesPrint = 'setembro'
                            if(mes == '10') mesPrint = 'outubro'
                            if(mes == '11') mesPrint = 'novembro'
                            if(mes == '12') mesPrint = 'dezembro'

                            novoTempo = elementsFromExcel[index]["Carimbo de data/hora"][8] + elementsFromExcel[index]["Carimbo de data/hora"][9] + ' de ' + mesPrint
                            times.push(novoTempo)

                            //RATINGS
                            //NON NULL RATINGS
                            //SE O LOCAL FOR O MAAT
                            if(selecedLocal == 'MAAT'){
                                ratingsZona1.push(elementsFromExcel[index]["1 Como classifica a sua experiência neste local?"]);
                                ratingsZona2.push(elementsFromExcel[index]["2 Como classifica a sua experiência neste local?"]);
                                ratingsZona3.push(elementsFromExcel[index]["3 Como classifica a sua experiência neste local?"]);
                                ratingsZona4.push(elementsFromExcel[index]["4 Como classifica a sua experiência neste local?"]);
                                ratingsZona5.push(elementsFromExcel[index]["5 Como classifica a sua experiência neste local?"]);

                                //non null ratings
                                if(elementsFromExcel[index]["1 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona1Count += 1
                                }
                                if(elementsFromExcel[index]["2 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona2Count += 1
                                }
                                if(elementsFromExcel[index]["3 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona3Count += 1
                                }
                                if(elementsFromExcel[index]["4 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona4Count += 1
                                }
                                if(elementsFromExcel[index]["5 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona5Count += 1
                                }

                                //FUTURES
                                futures.push(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"]);
                                //VISITS
                                if(elementsFromExcel[index]["Durante a sua consulta visitou o exterior do museu? O exterior do museu inclui, por exemplo, os jardins, perto do rio ou o Museu da Eletricidade"] == 'Sim'){
                                    visits.push('Exterior do museu')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Sala Oval?"] == 'Sim'){
                                    visits.push('Sala Oval')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Video Room?"] == 'Sim'){
                                    visits.push('Video Room')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Galeria Principal?"] == 'Sim'){
                                    visits.push('Galeria Principal')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Project Room?"] == 'Sim'){
                                    visits.push('Project Room')
                                }
                                visitsZona1.push(elementsFromExcel[index]["Durante a sua consulta visitou o exterior do museu? O exterior do museu inclui, por exemplo, os jardins, perto do rio ou o Museu da Eletricidade"])
                                visitsZona2.push(elementsFromExcel[index]["Durante a sua consulta visitou a Sala Oval?"])
                                visitsZona3.push(elementsFromExcel[index]["Durante a sua consulta visitou a Video Room?"])
                                visitsZona4.push(elementsFromExcel[index]["Durante a sua consulta visitou a Galeria Principal?"])
                                visitsZona5.push(elementsFromExcel[index]["Durante a sua consulta visitou a Project Room?"])
                                justificationsZona1.push(elementsFromExcel[index]["1 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona2.push(elementsFromExcel[index]["2 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona3.push(elementsFromExcel[index]["3 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona4.push(elementsFromExcel[index]["4 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona5.push(elementsFromExcel[index]["5 Qual a razão que o leva a escolher a opção na questão anterior?"])
    
                                //se valor dif de zero, +1 visita
                                if(elementsFromExcel[index]["Durante a sua consulta visitou o exterior do museu? O exterior do museu inclui, por exemplo, os jardins, perto do rio ou o Museu da Eletricidade"] == 'Sim'){
                                    countZona1 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Sala Oval?"] == 'Sim'){
                                    countZona2 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Video Room?"] == 'Sim'){
                                    countZona3 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Galeria Principal?"] == 'Sim'){
                                    countZona4 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a Project Room?"] == 'Sim'){
                                    countZona5 += 1
                                }
    
                                //se valor dif de zero, +1 visita
                                if(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"].includes("Exterior do museu")){
                                    countFutureZona1 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"].includes("Sala Oval")){
                                    countFutureZona2 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"].includes("Video Room")){
                                    countFutureZona3 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"].includes("Galeria Principal")){
                                    countFutureZona4 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços do MAAT gostaria de visitar numa futura consulta?"].includes("Project Room")){
                                    countFutureZona5 += 1
                                }
                            }
                            
                            //CASO CONTRARIO
                            else{
                                ratingsZona1.push(elementsFromExcel[index]["Z1 Como classifica a sua experiência neste local?"]);
                                ratingsZona2.push(elementsFromExcel[index]["Z2 Como classifica a sua experiência neste local?"]);
                                ratingsZona3.push(elementsFromExcel[index]["Z3 Como classifica a sua experiência neste local?"]);
                                ratingsZona4.push(elementsFromExcel[index]["Z4 Como classifica a sua experiência neste local?"]);
                                ratingsZona5.push(elementsFromExcel[index]["Z5 Como classifica a sua experiência neste local?"]);

                                if(elementsFromExcel[index]["Z1 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona1Count += 1
                                }
                                if(elementsFromExcel[index]["Z2 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona2Count += 1
                                }
                                if(elementsFromExcel[index]["Z3 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona3Count += 1
                                }
                                if(elementsFromExcel[index]["Z4 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona4Count += 1
                                }
                                if(elementsFromExcel[index]["Z5 Como classifica a sua experiência neste local?"] != null){
                                    ratingZona5Count += 1
                                }

                                //FUTURES
                                futures.push(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"])

                                //VISITS
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 1 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    visits.push('Zona 1')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 2 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    visits.push('Zona 2')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 3 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    visits.push('Zona 3')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 4 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    visits.push('Zona 4')
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 5 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    visits.push('Zona 5')
                                }
                                visitsZona1.push(elementsFromExcel[index]["Durante a sua consulta visitou a zona 1 do local? Para saber a zona em questão, consulte a tabela de zonas"])
                                visitsZona2.push(elementsFromExcel[index]["Durante a sua consulta visitou a zona 2 do local? Para saber a zona em questão, consulte a tabela de zonas"])
                                visitsZona3.push(elementsFromExcel[index]["Durante a sua consulta visitou a zona 3 do local? Para saber a zona em questão, consulte a tabela de zonas"])
                                visitsZona4.push(elementsFromExcel[index]["Durante a sua consulta visitou a zona 4 do local? Para saber a zona em questão, consulte a tabela de zonas"])
                                visitsZona5.push(elementsFromExcel[index]["Durante a sua consulta visitou a zona 5 do local? Para saber a zona em questão, consulte a tabela de zonas"])
                                justificationsZona1.push(elementsFromExcel[index]["Z1 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona2.push(elementsFromExcel[index]["Z2 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona3.push(elementsFromExcel[index]["Z3 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona4.push(elementsFromExcel[index]["Z4 Qual a razão que o leva a escolher a opção na questão anterior?"])
                                justificationsZona5.push(elementsFromExcel[index]["Z5 Qual a razão que o leva a escolher a opção na questão anterior?"])
    
                                //se valor dif de zero, +1 visita
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 1 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    countZona1 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 2 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    countZona2 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 3 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    countZona3 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 4 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    countZona4 += 1
                                }
                                if(elementsFromExcel[index]["Durante a sua consulta visitou a zona 5 do local? Para saber a zona em questão, consulte a tabela de zonas"] == 'Sim'){
                                    countZona5 += 1
                                }
    
                                //se valor dif de zero, +1 visita
                                if(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"].includes("Zona 1")){
                                    countFutureZona1 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"].includes("Zona 2")){
                                    countFutureZona2 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"].includes("Zona 3")){
                                    countFutureZona3 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"].includes("GZona 4")){
                                    countFutureZona4 += 1
                                }
                                if(elementsFromExcel[index]["Que espaços gostaria de visitar numa futura consulta?"].includes("Zona 5")){
                                    countFutureZona5 += 1
                                }

                            }


                        }else{
                            deleteAll()
                        } 

                        
                    }
                    if(localVerificacao != null && localVerificacao == selecedLocal){

                        //CALCULAR MEDIA ANTES
                        media1 = d3.sum(ratingsAntes);
                        mediaAntes = media1 / ratingsAntes.length;
                        //CALCULAR MEDIA Depois
                        media2 = d3.sum(ratingsApos);
                        mediaApos = media2 / ratingsApos.length;

                        drawCircleChart()
                        verFuturoSalas()
                        verNumeroSalas()
                        drawLocation()
                        determineIds()
                        drawUsersC()
                        drawUsers()

                    }

                }

                function getElementsForPlace(){
                    //APAGAR INFORMACAO 


                    //IR BUSCAR A INFORMACOES DESSE SITIO
                    //Ir ao excel buscar os valores correspondentes ao medical professional escolhido
                    var allElementsForPlace = []
                    for(let indexF = 0; indexF < placesForConsultas.length; indexF++){
                        //VER LOCAL ESCOLHIDO
                        if(placesForConsultas[indexF]["Nome do novo local"] == selecedLocal){
                            elementF = p[indexF];
                            allElementsForPlace.push(elementF)
                            
                            nomeDoLocal = placesForConsultas[indexF]["Nome do novo local"]
                            numeroDeZonas = placesForConsultas[indexF]["Número de zonas existentes no local"]
                            if(numeroDeZonas == 1){
                                nomeDaZona = placesForConsultas[indexF]["(1) Nome da zona"]   
                                justificacoesDaZona = placesForConsultas[indexF]["(1) Justificações a considerar (separar com vírgula)"]
                            } else if(numeroDeZonas == 2){
                                nomeDaZona = placesForConsultas[indexF]["(2) Nome da zona"]   
                                justificacoesDaZona = placesForConsultas[indexF]["(2) Justificações a considerar (separar com vírgula)"]
                                nomeDaZona2 = placesForConsultas[indexF]["(2) Nome da zona 2"]   
                                justificacoesDaZona2 = placesForConsultas[indexF]["(2) Justificações a considerar 2 (separar com vírgula)"]
                            } else if(numeroDeZonas == 3){
                                nomeDaZona = placesForConsultas[indexF]["(3) Nome da zona"]   
                                justificacoesDaZona = placesForConsultas[indexF]["(3) Justificações a considerar (separar com vírgula)"]
                                nomeDaZona2 = placesForConsultas[indexF]["(3) Nome da zona 2"]   
                                justificacoesDaZona2 = placesForConsultas[indexF]["(3) Justificações a considerar 2 (separar com vírgula)"]
                                nomeDaZona3 = placesForConsultas[indexF]["(3) Nome da zona 3"]   
                                justificacoesDaZona3 = placesForConsultas[indexF]["(3) Justificações a considerar 3 (separar com vírgula)"]  
                            } else if(numeroDeZonas == 4){
                                nomeDaZona = placesForConsultas[indexF]["(4) Nome da zona"]   
                                justificacoesDaZona = placesForConsultas[indexF]["(4) Justificações a considerar (separar com vírgula)"]
                                nomeDaZona2 = placesForConsultas[indexF]["(4) Nome da zona 2"]   
                                justificacoesDaZona2 = placesForConsultas[indexF]["(4) Justificações a considerar 2 (separar com vírgula)"]
                                nomeDaZona3 = placesForConsultas[indexF]["(4) Nome da zona 3"]   
                                justificacoesDaZona3 = placesForConsultas[indexF]["(4) Justificações a considerar 3 (separar com vírgula)"]  
                                nomeDaZona4 = placesForConsultas[indexF]["(4) Nome da zona 4"]   
                                justificacoesDaZona4 = placesForConsultas[indexF]["(4) Justificações a considerar 4 (separar com vírgula)"]  
                            } else if(numeroDeZonas == 5){
                                nomeDaZona = placesForConsultas[indexF]["(5) Nome da zona"]   
                                justificacoesDaZona = placesForConsultas[indexF]["(5) Justificações a considerar (separar com vírgula)"]
                                nomeDaZona2 = placesForConsultas[indexF]["(5) Nome da zona 2"]   
                                justificacoesDaZona2 = placesForConsultas[indexF]["(5) Justificações a considerar 2 (separar com vírgula)"]
                                nomeDaZona3 = placesForConsultas[indexF]["(5) Nome da zona 3"]   
                                justificacoesDaZona3 = placesForConsultas[indexF]["(5) Justificações a considerar 3 (separar com vírgula)"] 
                                nomeDaZona4 = placesForConsultas[indexF]["(5) Nome da zona 4"]   
                                justificacoesDaZona4 = placesForConsultas[indexF]["(5) Justificações a considerar 4 (separar com vírgula)"]   
                                nomeDaZona5 = placesForConsultas[indexF]["(5) Nome da zona 5"]   
                                justificacoesDaZona5 = placesForConsultas[indexF]["(5) Justificações a considerar 5 (separar com vírgula)"]
                            } 

                                      
                                
                                    
                              
                            
                        }
                    }
                }


                var usedIds = []

                var indexes = []

                var tri = d3.symbol().type(d3.symbolTriangle).size(400);

                //Get the initial elements
                getElements()

                function determineIds(){
                    //METER A ZERO PARA CONSIDERAR APENAS OS DO LOCAL EM QUESTÃO
                    usedIds = []
                    //function to remove repeated users and get the most recent responses
                    for(let index = 0; index < ids.length; index++){
                        id = ids[index];
                        
                        if(!usedIds.includes(id)){
                            usedIds.push(id)
                        }
                        else{
                            for (let index1 = 0; index1 < ids.length; index1++){
                                if(usedIds[index1] == id){
                                    usedIds[index1] = 'x'
                                }
                            }
                            usedIds.push(id)
                        }
                    }
                    
                    //GET THE INDEXES TO CONSIDER, 
                    indexes = [] //reset
                    for (let index2 = 0; index2 < usedIds.length; index2++){
                        if(usedIds[index2] != 'x'){
                            indexes.push(index2)
                        }
                    }

                } 

                svg.append('text')
                    .text("Filtros para a visualização")
                    .attr('x', 50)
                    .attr('y', 25)
                    .style("fill", "#6E9EA4")
                    .style("font-weight", 800)
                    .style("font-family", "Roboto")
                    .style("font-size", '20px')

                var yc
                var ytc

                function drawUsersC(){
                    yc = 570
                    ytc = 585
                    for(let index = 0; index < indexes.length; index++){
                        //var indexForInfo0 = indexes[index]
                        
                        id = ids[index];
        
                        //Seleção do user
                        svg.append('text')
                        .attr("id", 'labelUserc' + id)
                        .text("User: " + id)
                        .attr('x', 85)
                        .attr('y', ytc)
                        .style("font-family", "Roboto")
                        .style("fill", "#0d4148")
        
                        svg.append('circle')
                            .attr("id", 'userc' + id)
                            .attr('cx', 70)
                            .attr('cy', yc + 10)
                            .attr('r', 10)
                            .style("fill", "#6E9EA4")
                            .style('stroke', "black")
        
                            .on('click', function(e, d){
        
                             //get ratings of the selected person
        
                            var indexToGet
                           
                            for(let index2 = 0; index2 < usedIds.length; index2++){
                                if(ids[index] == usedIds[index2]){
                                    // ANTES ETSAV ASSIM: indexToGet = index2
                                    indexToGet = index2
                                }
                            }
        
                            if (!d3.select(this).classed("selected") ){
                                
                                idToConsider = ids[index]

                                ratingAntes = ratingsAntes[indexToGet]
                                ratingApos = ratingsApos[indexToGet]
        
                                //the others get lighter, deselect them, and delete from darwing
                                for(let index1 = 0; index1 < indexes.length; index1++){
                                    if(ids[indexes[index1]] != ids[indexes[index]]){
                                        var teste = 'userc' + ids[indexes[index1]]
                                        var testee = d3.select("#" + teste)
                                        testee.classed("selected", false)
                                            .style('fill', "#6E9EA4")

                                        var teste1 = 'rectuserantes' + ids[indexes[index1]]
                                        var testee1 = d3.select("#" + teste1)
                                        testee1.remove()

                                        var teste1 = 'rectuserdepois' + ids[indexes[index1]]
                                        var testee1 = d3.select("#" + teste1)
                                        testee1.remove()
                                        
                                    } 
                                }
        
                                //APAGAR OS QUE ESTAVAM LA
                                d3.select("#circle1").remove()
                                d3.select("#circle2").remove()
                                d3.select("#circle3").remove()
                                d3.select("#circle4").remove()
                                d3.select("#rect1").remove()
                                d3.select("#rect2").remove()
                                d3.select("#rect3").remove()
                                d3.select("#rect4").remove()


        
                                //get all ratings by that user
                                //get the indexes of the selected id
                                var indexesForRatings = []
                                for(let index3 = 0; index3 < idsNotOrganized.length; index3++){
                                    if(idsNotOrganized[index3] == idToConsider){
                                        indexesForRatings.push(index3)  
                                    }
                                }
                        
                                //get all the rating given
                                var allRatingsAntesByUser = []
                                var allRatingsAposByUser = []
                        
                                for(let index4 = 0; index4 < idsNotOrganized.length; index4++){
                                    if(indexesForRatings.includes(index4)){
                                        allRatingsAntesByUser.push(ratingsAntes[index4])
                                        allRatingsAposByUser.push(ratingsApos[index4]) 
                                    }
                                }   
        
                                //CORES
                                //SQUARES USER INDIVIDUAL
                                if(ratingAntes >= 0 && ratingAntes < 1.5){
                                    colorUserAntes = '#F60D0D';
                                    yUserAntes = 372;
                                } else if (ratingAntes >= 1.5 && ratingAntes < 2.5){
                                    colorUserAntes = "#FF9900";
                                    yUserAntes = 307;
                                } else if (ratingAntes >= 2.5 && ratingAntes < 3.5){
                                    colorUserAntes = '#F7F054';
                                    yUserAntes = 242;
                                } else if (ratingAntes >= 3.5 && ratingAntes < 4.5){
                                    colorUserAntes = '#72FA1E';
                                    yUserAntes = 177;
                                } else if (ratingAntes >= 5){
                                    colorUserAntes = '#3FD25F';
                                    yUserAntes = 112;
                                }
        
                                if(ratingApos >= 0 && ratingApos < 1.5){
                                    colorUserApos = '#F60D0D';
                                    yUserApos = 372;
                                } else if (ratingApos >= 1.5 && ratingApos < 2.5){
                                    colorUserApos = "#FF9900";
                                    yUserApos = 307;
                                } else if (ratingApos >= 2.5 && ratingApos < 3.5){
                                    colorUserApos = '#F7F054';
                                    yUserApos = 242;
                                } else if (ratingApos >= 3.5 && ratingApos < 4.5){
                                    colorUserApos = '#72FA1E';
                                    yUserApos = 177;
                                } else if (ratingApos >= 5){
                                    colorUserApos = '#3FD25F';
                                    yUserApos = 112;
                                }
        
                                //meter a zero
                                posiAntes = []
                                posiDepois = []
                                coresAntes = []
                                coresDepois = []
        
                                //CORES ANTES
                                for(let indexAntes = 0; indexAntes < allRatingsAntesByUser.length; indexAntes++){
                                    if(allRatingsAntesByUser[indexAntes] >= 0 && allRatingsAntesByUser[indexAntes] < 1.5){
                                        coresAntes.push('#F60D0D');
                                        posiAntes.push(385);
                                    } else if (allRatingsAntesByUser[indexAntes] >= 1.5 && allRatingsAntesByUser[indexAntes] < 2.5){
                                        coresAntes.push('#FF9900');
                                        posiAntes.push(320);
                                    } else if (allRatingsAntesByUser[indexAntes] >= 2.5 && allRatingsAntesByUser[indexAntes] < 3.5){
                                        coresAntes.push('#F7F054');
                                        posiAntes.push(255);
                                    } else if (allRatingsAntesByUser[indexAntes] >= 3.5 && allRatingsAntesByUser[indexAntes] < 4.5){
                                        coresAntes.push('#72FA1E');
                                        posiAntes.push(190);
                                    } else if (allRatingsAntesByUser[indexAntes] >= 5){
                                        coresAntes.push('#3FD25F');
                                        posiAntes.push(125);
                                    }
                                }
        
                                //CORES DEPOIS
                                for(let indexDepois = 0; indexDepois < allRatingsAposByUser.length; indexDepois++){
                                    if(allRatingsAposByUser[indexDepois] >= 0 && allRatingsAposByUser[indexDepois] < 1.5){
                                        coresDepois.push('#F60D0D');
                                        posiDepois.push(378);
                                    } else if (allRatingsAposByUser[indexDepois] >= 1.5 && allRatingsAposByUser[indexDepois] < 2.5){
                                        coresDepois.push('#FF9900');
                                        posiDepois.push(313);
                                    } else if (allRatingsAposByUser[indexDepois] >= 2.5 && allRatingsAposByUser[indexDepois] < 3.5){
                                        coresDepois.push('#F7F054');
                                        posiDepois.push(248);
                                    } else if (allRatingsAposByUser[indexDepois] >= 3.5 && allRatingsAposByUser[indexDepois] < 4.5){
                                        coresDepois.push('#72FA1E');
                                        posiDepois.push(183);
                                    } else if (allRatingsAposByUser[indexDepois] >= 5){
                                        coresDepois.push('#3FD25F');
                                        posiDepois.push(118);
                                    }
                                }
        
                                d3.select(this).classed("selected", true)
                                    d3.select(this)
                                    .style('fill', "#0d4148")
        
        
                                d3.select('#p3')
                                .attr("id","tooltip")
                                .attr('style', 'position: absolute; opacity: 0;')
                                d3.select('#p4')
                                .attr("id","tooltip2")
                                .attr('style', 'position: absolute; opacity: 0;')
        
                                //VER QUAL O GRUPO SELECIONADO: LINE VS CIRCLE CHAT
                                //CIRCLE CHART
                                if(d3.select("#ultima").classed("selected") == false){
                                    //APAGAR O ANTERIOR
                                    for(let index1 = 0; index1 < indexes.length; index1++){
                                        svg.select("#rectuserantes" + usedIds[index1]).remove()
                                        svg.select("#rectuserdepois" + usedIds[index1]).remove()
                                            
                                    }
                                
                                    //square before
                                    svg.append('rect')
                                    .attr("id","rectuserantes" + usedIds[indexToGet])
                                    .attr('x', 137)
                                    .attr('y', yUserAntes)
                                    .attr('width', 25)
                                    .attr('height', 25)
                                    .style("fill", colorUserAntes)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                    .on('mouseover', function (d, i) {
                                        a = parseInt(d3.select(this).attr('x')) + 5
                                        b = parseInt(d3.select(this).attr('y')) + 100
                                        d3.select('#tooltip')
                                        .transition().duration(200)
                                        .style('opacity', 1)
                                        .style("left", a + "px")     
                                        .style("top", b + "px")
                                        .text("User: " + usedIds[indexToGet])
                                        .style("color", "#6E9EA4")
                                        .style("font-family", "Roboto")
                                        d3.select(this)
                                        .transition()
                                        .duration('50')
                                            .attr('opacity', '.8');
                                    })
                                    .on('mouseout', function (d, i) {
                                        d3.select('#tooltip')
                                        .style('opacity', 0)
                                        d3.select(this)
                                        .transition()
                                        .duration('50')
                                        .attr('opacity', '1');
                                    })
        
                                    //square after
                                    svg.append('rect')
                                    .attr("id","rectuserdepois" + usedIds[indexToGet])
                                    .attr('x', 337)
                                    .attr('y', yUserApos)
                                    .attr('width', 25)
                                    .attr('height', 25)
                                    .style("fill", colorUserApos)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                    .on('mouseover', function (d, i) {
                                        a = parseInt(d3.select(this).attr('x')) + 5
                                        b = parseInt(d3.select(this).attr('y')) + 100
                                        d3.select('#tooltip')
                                        .transition().duration(200)
                                        .style('opacity', 1)
                                        .style("left", a + "px")     
                                        .style("top", b + "px")
                                        .text("User: " + usedIds[indexToGet])
                                        .style("color", "#6E9EA4")
                                        .style("font-family", "Roboto")
                                        d3.select(this)
                                        .transition()
                                        .duration('50')
                                            .attr('opacity', '.8');
                                    })
                                    .on('mouseout', function (d, i) {
                                        d3.select('#tooltip')
                                        .style('opacity', 0)
                                        d3.select(this)
                                        .transition()
                                        .duration('50')
                                        .attr('opacity', '1');
                                    })
                                    
                                }
                                //LINE CHART
                                else {
                                    drawLineChart()
                                    //PARA AS CORES
                                    //the others get lighter and deselect them
                                    for(let index1 = 0; index1 < indexes.length; index1++){
                                        if(ids[indexes[index1]] != ids[indexes[index]]){
                                            var teste = 'userc' + ids[indexes[index1]]
                                            var testee = d3.select("#" + teste)
                                    
                                            testee.classed("selected", false)
                                                .style('fill', "#6E9EA4")
                                        }   
                                    }
                            
                                //METER TUDO A ZERO
                                pa1 = 0
                                pa2 = 0
                                pa3 = 0
                                pa4 = 0
                                ca1 = ''
                                ca2 = ''
                                ca3 = ''
                                ca4 = ''
                                //depois
                                pd1 = 0
                                pd2 = 0
                                pd3 = 0
                                pd4 = 0
                                cd1 = ''
                                cd2 = ''
                                cd3 = ''
                                cd4 = ''
            
                                if(posiDepois.length > 4){
                                    pd1 = posiDepois[posiDepois.length -4]
                                    pd2 = posiDepois[posiDepois.length -3]
                                    pd3 = posiDepois[posiDepois.length -2]
                                    pd4 = posiDepois[posiDepois.length -1]
                                    pa1 = posiAntes[posiAntes.length -4]
                                    pa2 = posiAntes[posiAntes.length -3]
                                    pa3 = posiAntes[posiAntes.length -2]
                                    pa4 = posiAntes[posiAntes.length -1]
        
                                    cd1 = coresDepois[coresDepois.length -4]
                                    cd2 = coresDepois[coresDepois.length -3]
                                    cd3 = coresDepois[coresDepois.length -2]
                                    cd4 = coresDepois[coresDepois.length -1]
                                    ca1 = coresAntes[coresAntes.length -4]
                                    ca2 = coresAntes[coresAntes.length -3]
                                    ca3 = coresAntes[coresAntes.length -2]
                                    ca4 = coresAntes[coresAntes.length -1]
                                }
                                //MENOS DE QUATRO RATINGS
                                else{
                                    pd1 = posiDepois[0]
                                    pd2 = posiDepois[1]
                                    pd3 = posiDepois[2]
                                    pd4 = posiDepois[3]
                                    pa1 = posiAntes[0]
                                    pa2 = posiAntes[1]
                                    pa3 = posiAntes[2]
                                    pa4 = posiAntes[3]
        
                                    cd1 = coresDepois[0]
                                    cd2 = coresDepois[1]
                                    cd3 = coresDepois[2]
                                    cd4 = coresDepois[3]
                                    ca1 = coresAntes[0]
                                    ca2 = coresAntes[1]
                                    ca3 = coresAntes[2]
                                    ca4 = coresAntes[3]
        
                                }
                                //APAGAR OS QUE ESTAVAM LA
                                d3.select("#circle1").remove()
                                d3.select("#circle2").remove()
                                d3.select("#circle3").remove()
                                d3.select("#circle4").remove()
                                d3.select("#rect1").remove()
                                d3.select("#rect2").remove()
                                d3.select("#rect3").remove()
                                d3.select("#rect4").remove()
        
                                //SQUARES: VALORES ANTES
                                //FIRST SQUARE
                                if(pa1 != null){
                                    svg.append('circle')
                                    .attr('id', 'circle1')
                                    .attr('cx', 133)
                                    .attr('cy', pa1)
                                    .attr('r', 7.5)
                                    .style("fill", ca1)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }
                        
                                //SECOND SQUARE
                                if(pa2 != null){
                                    svg.append('circle')
                                    .attr('id', 'circle2')
                                    .attr('cx', 208)
                                    .attr('cy', pa2)
                                    .attr('r', 7.5)
                                    .style("fill", ca2)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }                            
        
                                //THIRD SQUARE
                                if(pa3 != null){
                                    svg.append('circle')
                                    .attr('id', 'circle3')
                                    .attr('cx', 283)
                                    .attr('cy', pa3)
                                    .attr('r', 7.5)
                                    .style("fill", ca3)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }
                            
                                //FOURTH SQUARE
                                if(pa4 != null) {
                                    svg.append('circle')
                                    .attr('id', 'circle4')
                                    .attr('cx', 358)
                                    .attr('cy', pa4)
                                    .attr('r', 7.5)
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .style("fill", ca4)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                } 
        
                                //CIRCLES: VALORES APOS
                                //FIRST SQUARE
                                if(pd1 != null){
                                    svg.append('rect')
                                    .attr("id","rect1")
                                    .attr('x', 125)
                                    .attr('y', pd1)
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .style("fill", cd1)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }
                            
                                //SECOND SQUARE
                                if(pd2 != null) {
                                    svg.append('rect')
                                    .attr("id","rect2")
                                    .attr('x', 200)
                                    .attr('y', pd2)
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .style("fill", cd2)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }
                                
                                //THIRD SQUARE
                                if (pd3 != null){
                                    svg.append('rect')
                                    .attr("id","rect3")
                                    .attr('x', 275)
                                    .attr('y', pd3)
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .style("fill", cd3)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }
                                
                                //FOURTH SQUARE
                                if(pd4 != null){
                                    svg.append('rect')
                                    .attr("id","rect4")
                                    .attr('x', 350)
                                    .attr('y', pd4)
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .style("fill", cd4)
                                    .style('stroke', "black")
                                    .attr('fill-opacity', 0.8)
                                }       
                            }  
                        }else{
                            d3.select(this).classed("selected", false);
                            d3.select(this)
                            .style('fill', "#6E9EA4")
                            for(let index1 = 0; index1 < indexes.length; index1++){
                    
                                //so quero remover o used que foi unselected
                                var teste = 'rectuserantes' + ids[indexes[index]]
                                var testee = d3.select("#" + teste)
                                testee.remove()
                                var teste1 = 'rectuserdepois' + ids[indexes[index]]
                                var testee1 = d3.select("#" + teste1)
                                testee1.remove()
                            
                                testee.classed("selected", false)
                                    .style('fill', "#6E9EA4")
        
                            }
        
                            //APAGAR OS QUE ESTAVAM LA
                            d3.select("#circle1").remove()
                            d3.select("#circle2").remove()
                            d3.select("#circle3").remove()
                            d3.select("#circle4").remove()
                            d3.select("#rect1").remove()
                            d3.select("#rect2").remove()
                            d3.select("#rect3").remove()
                            d3.select("#rect4").remove()
                        }
                    });
                    yc = yc + 30;
                    ytc = ytc + 30;
                }
                }
        drawUsersC()
        drawUsers()


        //BOTAO SWB ULTIMA CONSULTA

        var ultima = svg.append("g");
        ultima.append('rect')
        .attr("id", 'ultima')
        .attr('x', 63)
        .attr('y', 40)
        .attr('width', 190)
        .attr('height', 25)
        .style("fill", "#0d4148")
        .style('stroke', "black")
        .classed("selected", false)
        .on('click', function(e, d){
            //APAGAR OS QUE ESTAVAM LA
            d3.select("#circle1").remove()
            d3.select("#circle2").remove()
            d3.select("#circle3").remove()
            d3.select("#circle4").remove()
            d3.select("#rect1").remove()
            d3.select("#rect2").remove()
            d3.select("#rect3").remove()
            d3.select("#rect4").remove()  

            //deselect as outras
            if(d3.select("#todas").classed("selected")){
                d3.select("#todas").classed("selected", false)
                d3.select("#todas")
                    .style('fill', "#6E9EA4")
                //METER OS USERS TODOS A AZUL CLARO QUANDO VOLTO PARA OS CIRCULOS
                for(let index1 = 0; index1 < indexes.length; index1++){
                    var teste = 'userc' + ids[indexes[index1]]
                    var testee = d3.select("#" + teste)

                    testee.classed("selected", false)
                        .style('fill', "#6E9EA4")

                }
            }
            if (!d3.select(this).classed("selected") ){
                d3.select("#ultima").classed("selected", true)
                d3.select("#ultima").style('fill', "#6E9EA4")
                d3.select(this).classed("selected", true)
                d3.select(this).style('fill', "#6E9EA4")
                d3.select("#circleAntes").remove()
                d3.select("#circleDepois").remove()
                //apagar todos os quadrados criados
                for(let index1 = 0; index1 < indexes.length; index1++){
                    var teste = 'rectuserantes' + ids[indexes[index1]]
                    var testee = d3.select("#" + teste)
                    testee.remove()
                    var teste1 = 'rectuserdepois' + ids[indexes[index1]]
                    var testee1 = d3.select("#" + teste1)
                    testee1.remove()

                    var teste2 = 'userc' + ids[indexes[index1]]
                    var testee2 = d3.select("#" + teste2)
                    
                    testee2.classed("selected", false)
                    .style('fill', "#6E9EA4")
                }
                //meter quadrados a azul claro

                d3.select("#legendaCircle1").remove()
                d3.select("#legendaCircle2").remove()
                d3.select("#overall5").remove()
                d3.select("#overall2").remove()
                d3.select("#overall3").remove()
                d3.select("#overall4").remove()

            

            }else{
                d3.select(this).classed("selected", false);
                d3.select(this).style('fill', "#0d4148")
                drawCircleChart()
            }

        });

        ultima.append('text')
            .text("Bem estar na última consulta")
            .attr('x', 80)
            .attr('y', 55)
            .style("fill", "white")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '12px')
            .on('click', function(e, d){
                //APAGAR OS QUE ESTAVAM LA
                d3.select("#circle1").remove()
                d3.select("#circle2").remove()
                d3.select("#circle3").remove()
                d3.select("#circle4").remove()
                d3.select("#rect1").remove()
                d3.select("#rect2").remove()
                d3.select("#rect3").remove()
                d3.select("#rect4").remove()  
    
                //deselect as outras
                if(d3.select("#todas").classed("selected")){
                    d3.select("#todas").classed("selected", false)
                    d3.select("#todas")
                        .style('fill', "#6E9EA4")
                    //METER OS USERS TODOS A AZUL CLARO QUANDO VOLTO PARA OS CIRCULOS
                    for(let index1 = 0; index1 < indexes.length; index1++){
                        var teste = 'userc' + ids[indexes[index1]]
                        var testee = d3.select("#" + teste)
    
                        testee.classed("selected", false)
                            .style('fill', "#6E9EA4")
    
                    }
                }
                if (!d3.select("#ultima").classed("selected") ){
                    d3.select("#ultima").classed("selected", true)
                    d3.select("#ultima").style('fill', "#6E9EA4")
                    d3.select("#circleAntes").remove()
                    d3.select("#circleDepois").remove()
                    //apagar todos os quadrados criados
                    for(let index1 = 0; index1 < indexes.length; index1++){
                        var teste = 'rectuserantes' + ids[indexes[index1]]
                        var testee = d3.select("#" + teste)
                        testee.remove()
                        var teste1 = 'rectuserdepois' + ids[indexes[index1]]
                        var testee1 = d3.select("#" + teste1)
                        testee1.remove()
    
                        var teste2 = 'userc' + ids[indexes[index1]]
                        var testee2 = d3.select("#" + teste2)
                        
                        testee2.classed("selected", false)
                        .style('fill', "#6E9EA4")
                    }
                    //meter quadrados a azul claro
    
                    d3.select("#legendaCircle1").remove()
                    d3.select("#legendaCircle2").remove()
                    d3.select("#overall5").remove()
                    d3.select("#overall2").remove()
                    d3.select("#overall3").remove()
                    d3.select("#overall4").remove()
    
                
    
                }else{
                    d3.select("#ultima").classed("selected", false);
                    d3.select("#ultima").style('fill', "#0d4148")
                    drawCircleChart()
                }
    
            });

        //BOTAO SWB TODAS
        var todas = svg.append("g");
        todas.append('rect')
            .attr("id", 'todas')
            .attr('x', 280)
            .attr('y', 40)
            .attr('width', 210)
            .attr('height', 25)
            .style("fill", "#6E9EA4")
            .style('stroke', "black")
            .on('click', function(e, d){
                //meter a null para limpar o gráfico
                idToConsider = null
                //deselect as outras
                if(!d3.select("#ultima").classed("selected")){
                    d3.select("#ultima").classed("selected", true)
                    d3.select("#ultima")
                        .style('fill', "#6E9EA4")                           
                        drawLineChart()

                    //meter os users selecionados todos a nulo e epagar os quadrados
                    for(let index1 = 0; index1 < indexes.length; index1++){
                        var teste = 'userc' + ids[indexes[index1]]
                        var testee = d3.select("#" + teste)

                        testee.classed("selected", false)
                            .style('fill', "#6E9EA4")
                    }
                    

                }
                if (!d3.select(this).classed("selected") ){
                    d3.select("#todas").classed("selected", true)
                    d3.select("#todas").style('fill', "#0d4148")
                    d3.select(this).classed("selected", true)
                    d3.select(this).style('fill', "#0d4148")
                    
                    drawLineChart()
                    

                }else{
                    d3.select(this).classed("selected", false);
                    d3.select(this).style('fill', "#6E9EA4")
                    d3.select("#legendaLine1").remove()
                    d3.select("#legendaLine2").remove()
                    d3.select("#legendaLine3").remove()
                    d3.select("#legendaLine4").remove()
                    d3.select("#overallb").remove()
                    d3.select("#overallc").remove()
                    d3.select("#overalld").remove()
                    d3.select("#overalle").remove()

                }     
            
            });


        todas.append('text')
            .text("Evolução nas últimas consultas")
            .attr('x', 300)
            .attr('y', 55)
            .style("fill", "white")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '12px')
            .on('click', function(e, d){
                //meter a null para limpar o gráfico
                idToConsider = null
                //deselect as outras
                if(!d3.select("#ultima").classed("selected")){
                    d3.select("#ultima").classed("selected", true)
                    d3.select("#ultima")
                        .style('fill', "#6E9EA4")                           
                        drawLineChart()

                    //meter os users selecionados todos a nulo e epagar os quadrados
                    for(let index1 = 0; index1 < indexes.length; index1++){
                        var teste = 'userc' + ids[indexes[index1]]
                        var testee = d3.select("#" + teste)

                        testee.classed("selected", false)
                            .style('fill', "#6E9EA4")
                    }
                    

                }
                if (!d3.select(this).classed("selected") ){
                    d3.select("#todas").classed("selected", true)
                    d3.select("#todas").style('fill', "#0d4148")

                    
                    drawLineChart()
                    

                }else{
                    d3.select(this).classed("selected", false);
                    d3.select(this).style('fill', "#6E9EA4")
                    d3.select("#legendaLine1").remove()
                    d3.select("#legendaLine2").remove()
                    d3.select("#legendaLine3").remove()
                    d3.select("#legendaLine4").remove()
                    d3.select("#overallb").remove()
                    d3.select("#overallc").remove()
                    d3.select("#overalld").remove()
                    d3.select("#overalle").remove()

                }     
            
            });


        //linha dos x
        svg.append('line')
        .attr('x1', 70)
        .attr('x2', 475)
        .attr('y1', 417)
        .attr('y2', 417)
        .style("stroke", "black")
        .style("stroke-width", 2.5)
        .style("color", "#0d4148FF")



        //linha dos y
        svg.append('line')
        .attr('x1', 70)
        .attr('x2', 70)
        .attr('y1', 90)
        .attr('y2', 418)
        .style("stroke", "black")
        .style("stroke-width", 2.5)
        .style("color", "#0d4148")

        //caixas linha x
        svg.append('rect')
        .attr("id", id)
        .attr('x', 59)
        .attr('y', 90)
        .attr('width', 10)
        .attr('height', 65)
        .style("fill", "#3FD25F")
        .style('stroke', "black")
        svg.append('rect')
        .attr("id", id)
        .attr('x', 59)
        .attr('y', 155)
        .attr('width', 10)
        .attr('height', 65)
        .style("fill", "#72FA1E")
        .style('stroke', "black")
        svg.append('rect')
        .attr("id", id)
        .attr('x', 59)
        .attr('y', 220)
        .attr('width', 10)
        .attr('height', 65)
        .style("fill", "#F7F054")
        .style('stroke', "black")
        svg.append('rect')
        .attr("id", id)
        .attr('x', 59)
        .attr('y', 285)
        .attr('width', 10)
        .attr('height', 65)
        .style("fill", "#FF9900")
        .style('stroke', "black")
        svg.append('rect')
        .attr("id", id)
        .attr('x', 59)
        .attr('y', 350)
        .attr('width', 10)
        .attr('height', 67)
        .style("fill", "#F60D0D")
        .style('stroke', "black")


        //legenda linha y
        svg.append('text')
        .text("5")
        .attr('x', 45)
        .attr('y', 125)
        .style("font-family", "Roboto")
        .style("color", "#0d4148")

        svg.append('text')
        .text("4")
        .attr('x', 45)
        .attr('y', 190)
        .style("font-family", "Roboto")
        .style("color", "#0d4148")

        svg.append('text')
        .text("3")
        .attr('x', 45)
        .attr('y', 255)
        .style("font-family", "Roboto")
        .style("color", "#0d4148")

        svg.append('text')
        .text("2")
        .attr('x', 45)
        .attr('y', 320)
        .style("font-family", "Roboto")
        .style("color", "#0d4148")

        svg.append('text')
        .text("1")
        .attr('x', 45)
        .attr('y', 385)
        .style("font-family", "Roboto")
        .style("color", "#0d4148")



        function drawCircleChart(){
            svg.select("#legendaLine1").remove()
            svg.select("#legendaLine2").remove()
            svg.select("#legendaLine3").remove()
            svg.select("#legendaLine4").remove()
            svg.select("#overalla").remove()
            svg.select("#overallb").remove()
            svg.select("#overallc").remove()
            svg.select("#overalld").remove()
            svg.select("#overalle").remove()
            d3.select("#overall2").remove()
            d3.select("#overall3").remove()
            d3.select("#overall4").remove()
            d3.select("#overall5").remove()

            //legenda quadrados e circulos
            svg.append('text')
                .attr('id', 'overall1')
                .text("Legenda")
                .attr('x', 50)
                .attr('y', 475)
                .style("fill", "#6E9EA4")
                .style("font-weight", 800)
                .style("font-family", "Roboto")
            .style("font-size", '20px')

            var sym = d3.symbol().type(d3.symbolTriangle).size(200);

            svg.append("path")
            .attr('id', 'overall2')
                .attr("d", sym)
                .style("fill", "white")
                .style('stroke', "black")
                .attr("transform", "translate(65, 506)");

        svg.append('text')
        .attr('id', 'overall3')
            .text("Média geral de todos os utilizadores")
            .attr('x', 85)
            .attr('y', 510)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148")
        svg.append('rect')
        .attr('id', 'overall4')
            .attr('x', 360)
            .attr('y', 495)
            .attr('width', 17)
            .attr('height', 17)
            .style("fill", "white")
            .style('stroke', "black")
        svg.append('text')
        .attr('id', 'overall5')
            .text("Utilizador individual")
            .attr('x', 387)
            .attr('y', 510)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148")

        //legenda linha x
        svg.append('text')
            .attr('id', 'legendaCircle1')
            .text("Antes da consulta")
            .attr('x', 90)
            .attr('y', 440)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148FF")

        //legenda linha x
        svg.append('text')
            .attr('id', 'legendaCircle2')
            .text("Após a consulta")
            .attr('x', 300)
            .attr('y', 440)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148FF")

        //CIRCLES GERAL
        if(mediaAntes >= 0 && mediaAntes < 1.5){
            colorAntes = '#F60D0D';
            cyAntes = 385;
        } else if (mediaAntes >= 1.5 && mediaAntes < 2.5){
            colorAntes = "#FF9900";
            cyAntes = 320;
        } else if (mediaAntes >= 2.5 && mediaAntes < 3.5){
            colorAntes = '#F7F054';
            cyAntes = 255;
        } else if (mediaAntes >= 3.5 && mediaAntes < 4.5){
            colorAntes = '#72FA1E';
            cyAntes = 190;
        } else if (mediaAntes >= 4.5){
            colorAntes = '#3FD25F';
            cyAntes = 125;
        }

        if(mediaApos >= 0 && mediaApos < 1.5){
            colorApos = '#F60D0D';
            cyApos = 385;
        } else if (mediaApos >= 1.5 && mediaApos < 2.5){
            colorApos = "#FF9900";
            cyApos = 320;
        } else if (mediaApos >= 2.5 && mediaApos < 3.5){
            colorApos = '#F7F054';
            cyApos = 255;
        } else if (mediaApos >= 3.5 && mediaApos < 4.5){
            colorApos = '#72FA1E';
            cyApos = 190;
        } else if (mediaApos >= 4.5){
            colorApos = '#3FD25F';
            cyApos = 125;
        }

        //CIRCLE ANTES GERAL
        if(colorAntes != null){
            svg.append("path")
                .attr('id', 'circleAntes')
                .attr("d", tri)
                .style("fill", colorAntes)
                .style('stroke', "black")
                .attr("transform", "translate(" + cxAntes + ", " + cyAntes + ")");
            

        //CIRCLE APOS GERAL
            svg.append("path")
                .attr('id', 'circleDepois')
                .attr("d", tri)
                .style("fill", colorApos)
                .style('stroke', "black")
                .attr("transform", "translate(" + cxApos + ", " + cyApos + ")");
        }

        }



        function drawLineChart(){
        d3.select("#legendaLine1").remove()
        d3.select("#legendaLine2").remove()
        d3.select("#legendaLine3").remove()
        d3.select("#legendaLine4").remove()
        d3.select("#overallb").remove()
        d3.select("#overallc").remove()
        d3.select("#overalld").remove()
        d3.select("#overalle").remove()


        svg.select("#legendaCircle1").remove()
        svg.select("#legendaCircle2").remove()
        svg.select("#circleAntes").remove()
        svg.select("#circleDepois").remove()
        for(let index1 = 0; index1 < indexes.length; index1++){
            var teste = 'rectuserantes' + ids[indexes[index1]]
            var testee = d3.select("#" + teste)
            testee.remove()
            var teste1 = 'rectuserdepois' + ids[indexes[index1]]
            var testee1 = d3.select("#" + teste1)
            testee1.remove()
        }

        svg.select("#overall1").remove()
        svg.select("#overall2").remove()
        svg.select("#overall3").remove()
        svg.select("#overall4").remove()
        svg.select("#overall5").remove()

        //legenda quadrados e circulos
        svg.append('text')
            .attr('id', 'overalla')
            .text("Legenda")
            .attr('x', 50)
            .attr('y', 475)
            .style("fill", "#6E9EA4")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
        .style("font-size", '20px')
        svg.append('circle')
        .attr('id', 'overallb')
            .attr('cx', 70)
            .attr('cy', 505)
            .attr('r', 10)
            .style("fill", "white")
            .style('stroke', "black")
        svg.append('text')
        .attr('id', 'overallc')
            .text("Valores antes da consulta")
            .attr('x', 85)
            .attr('y', 510)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148")
        svg.append('rect')
        .attr('id', 'overalld')
            .attr('x', 360)
            .attr('y', 495)
            .attr('width', 17)
            .attr('height', 17)
            .style("fill", "white")
            .style('stroke', "black")
        svg.append('text')
        .attr('id', 'overalle')
            .text("Valores após a consulta")
            .attr('x', 387)
            .attr('y', 510)
            .style("font-family", "Roboto")
            .style("fill", "#0d4148")


        //ver as ultimas 4 consultas
        //legenda linha x

        //Meter a zero
        timesToPrint = []

        var indexesForRatings = []
        for(let index3 = 0; index3 < idsNotOrganized.length; index3++){
            if(idsNotOrganized[index3] == idToConsider){
                indexesForRatings.push(index3)  
            }
        }
        for(let index4 = 0; index4 < idsNotOrganized.length; index4++){
            if(indexesForRatings.includes(index4)){
                timesToPrint.push(times[index4])
            }  
        }


        //SE TIVER QUATRO OU MENOS
        if(timesToPrint.length < 5){
            if(timesToPrint[0] != null){
                svg.append('text')
                    .attr('id', 'legendaLine1') 
                    .text(timesToPrint[0])
                    .attr('x', 100)
                    .attr('y', 440)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[1] != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine2') 
                    .text(timesToPrint[1])
                    .attr('x', 180)
                    .attr('y', 460)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[2] != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine3')
                    .text(timesToPrint[2])
                    .attr('x', 260)
                    .attr('y', 440)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[3] != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine4') 
                    .text(timesToPrint[3])
                    .attr('x', 340)
                    .attr('y', 460)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }

        } else { 
            if(timesToPrint[timesToPrint.length - 4]  != null){
                svg.append('text')
                    .attr('id', 'legendaLine1') 
                    .text(timesToPrint[timesToPrint.length - 4])
                    .attr('x', 80)
                    .attr('y', 440)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[timesToPrint.length - 3]  != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine2') 
                    .text(timesToPrint[timesToPrint.length - 3])
                    .attr('x', 160)
                    .attr('y', 460)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[timesToPrint.length - 2]  != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine3')
                    .text(timesToPrint[timesToPrint.length - 2])
                    .attr('x', 240)
                    .attr('y', 440)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }
            if(timesToPrint[timesToPrint.length - 1] != null){
                //legenda linha x
                svg.append('text')
                    .attr('id', 'legendaLine4') 
                    .text(timesToPrint[timesToPrint.length - 1])
                    .attr('x', 320)
                    .attr('y', 460)
                    .style("font-family", "Roboto")
                    .style("font-size", '12px')
                    .style("fill", "#0d4148FF")
            }

        }
            
    }            
    //MAPAS

    //LEGENDA MAPA
    d3.select('#box2')
    .text("Visualização da informação relativa ao espaço")
    .style("color", "#0d4148")
    .style("font-weight", 800)
    .style("font-family", "Poppins")
    .style("font-size", '20px')

        //CORES PARA NUMERO DE PESSOAS NAS SALAS GERAL
        var corVisitaZona1
        var corVisitaZona2
        var corVisitaZona3
        var corVisitaZona4
        var corVisitaZona5

        //CORES PARA FUTURAS CONSULTAS GERAL
        var corFutureZona1
        var corFutureZona2
        var corFutureZona3
        var corFutureZona4
        var corFutureZona5

        //CORES PARA NUMERO DE PESSOAS NAS SALAS USER
        var corUserVisitaZona1
        var corUserVisitaZona2
        var corUserVisitaZona3
        var corUserVisitaZona4
        var corUserVisitaZona5

        //CORES PARA FUTURAS CONSULTAS USER
        var corUserFutureZona1
        var corUserFutureZona2
        var corUserFutureZona3
        var corUserFutureZona4
        var corUserFutureZona5

        //CORES PARA UM USER INDIVIDUAL
        var corUserZona1
        var corUserZona2
        var corUserZona3
        var corUserZona4
        var corUserZona5

        //JUSTIFICACOES DE UM USER INDIVIDUAL PARA A SALA
        var justificationUserZona1 = ''
        var justificationUserZona2 = ''
        var justificationUserZona3 = ''
        var justificationUserZona4 = ''
        var justificationUserZona5 = ''

        function sortBy(key) {
            return function (a, b) {
                return a[key] - b[key];
            };
        }
        
        var counts
        
        function verNumeroSalas(){     
            counts = []
            counts = [{ id: 'e', count: countZona1 }, { id: 'o', count: countZona2 }, { id: 'v', count: countZona3 }, { id: 'g', count: countZona4 }, { id: 'p', count: countZona5 }];
            counts.sort(sortBy('count'))
            
            getVisitsInfo()     
                //SE OS COUNTS FOREM IGUAIS PARA TODOS OS ELEMENTOS, METER A COR MÁXIMA EM TODOS

                if(countZona1 == countZona2 && countZona1 == countZona3 && countZona1 == countZona4 && countZona1 == countZona5){
                    corVisitaZona1 = "#1D2268FF"
                    corVisitaZona2 = "#1D2268FF"
                    corVisitaZona3 = "#1D2268FF"
                    corVisitaZona4 = "#1D2268FF"
                    corVisitaZona5 = "#1D2268FF"
                }
                //CASO CONTRÁRIO, O ELEMENTO MAIS ALTO FICA COM A MAXIMA COR
                else{
                    //SE APENAS existir um user
                    if(ids.length == 1){
                        corVisitaZona1 = corUserVisitaZona1
                        corVisitaZona2 = corUserVisitaZona2
                        corVisitaZona3 = corUserVisitaZona3
                        corVisitaZona4 = corUserVisitaZona4
                        corVisitaZona5 = corUserVisitaZona5

                    }
                    
                    else{                                        
                    //MENOR COUNT
                    if(counts[0]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                    if(counts[0]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                    if(counts[0]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                    if(counts[0]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                    if(counts[0]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
                    //MAIOR COUNT
                    if(counts[4]['id'] == 'e') corVisitaZona1 = "#1D2268FF"
                    if(counts[4]['id'] == 'o') corVisitaZona2 = "#1D2268FF"
                    if(counts[4]['id'] == 'v') corVisitaZona3 = "#1D2268FF"
                    if(counts[4]['id'] == 'g') corVisitaZona4 = "#1D2268FF"
                    if(counts[4]['id'] == 'p') corVisitaZona5 = "#1D2268FF"
                    //MEDIO
                    if(counts[1]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                    if(counts[1]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                    if(counts[1]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                    if(counts[1]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                    if(counts[1]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
            
                    if(counts[2]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                    if(counts[2]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                    if(counts[2]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                    if(counts[2]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                    if(counts[2]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
            
                    if(counts[3]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                    if(counts[3]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                    if(counts[3]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                    if(counts[3]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                    if(counts[3]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"

                    //VER SE NO MEIO NAO HA NADA: dar a cor do meio
                    if(counts[1]['count'] > counts[0]['count'] && counts[1]['count'] < counts[4]['count']){
                        if(counts[1]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                        if(counts[1]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                        if(counts[1]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                        if(counts[1]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                        if(counts[1]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                    }
                    if(counts[2]['count'] > counts[0]['count'] && counts[2]['count'] < counts[4]['count']){
                        if(counts[2]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                        if(counts[2]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                        if(counts[2]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                        if(counts[2]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                        if(counts[2]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                    }
                    if(counts[3]['count'] > counts[0]['count'] && counts[3]['count'] < counts[4]['count']){
                        if(counts[3]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                        if(counts[3]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                        if(counts[3]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                        if(counts[3]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                        if(counts[3]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                    }

                    //VAMOS VER OS ELEMENTOS DO MEIO
                    //CASO SEJAM IGUAiS AO PRIMEIRO
                    if(counts[1]['count'] == counts[0]['count']){
                
                        if(counts[1]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                        if(counts[1]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                        if(counts[1]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                        if(counts[1]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                        if(counts[1]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
                
                    }
                    if(counts[2]['count'] == counts[0]['count']){
                        if(counts[2]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                        if(counts[2]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                        if(counts[2]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                        if(counts[2]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                        if(counts[2]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
                
                    }
                    if(counts[3]['count'] == counts[0]['count']){
                        if(counts[3]['id'] == 'e') corVisitaZona1 = "#C7E2DCFF"
                        if(counts[3]['id'] == 'o') corVisitaZona2 = "#C7E2DCFF"
                        if(counts[3]['id'] == 'v') corVisitaZona3 = "#C7E2DCFF"
                        if(counts[3]['id'] == 'g') corVisitaZona4 = "#C7E2DCFF"
                        if(counts[3]['id'] == 'p') corVisitaZona5 = "#C7E2DCFF"
                
                    }
                    else{
                        //CASO SEJAM IGUAiS AO ULTIMO
                        if(counts[1]['count'] == counts[4]['count']){
                            if(counts[1]['id'] == 'e') corVisitaZona1 = "#1D2268FF"
                            if(counts[1]['id'] == 'o') corVisitaZona2 = "#1D2268FF"
                            if(counts[1]['id'] == 'v') corVisitaZona3 = "#1D2268FF"
                            if(counts[1]['id'] == 'g') corVisitaZona4 = "#1D2268FF"
                            if(counts[1]['id'] == 'p') corVisitaZona5 = "#1D2268FF"
                        }
                        if(counts[2]['count'] == counts[4]['count']){
                            if(counts[2]['id'] == 'e') corVisitaZona1 = "#1D2268FF"
                            if(counts[2]['id'] == 'o') corVisitaZona2 = "#1D2268FF"
                            if(counts[2]['id'] == 'v') corVisitaZona3 = "#1D2268FF"
                            if(counts[2]['id'] == 'g') corVisitaZona4 = "#1D2268FF"
                            if(counts[2]['id'] == 'p') corVisitaZona5 = "#1D2268FF"
                        }
                        if(counts[3]['count'] == counts[4]['count']){
                            if(counts[3]['id'] == 'e') corVisitaZona1 = "#1D2268FF"
                            if(counts[3]['id'] == 'o') corVisitaZona2 = "#1D2268FF"
                            if(counts[3]['id'] == 'v') corVisitaZona3 = "#1D2268FF"
                            if(counts[3]['id'] == 'g') corVisitaZona4 = "#1D2268FF"
                            if(counts[3]['id'] == 'p') corVisitaZona5 = "#1D2268FF"
                        }
                        //SE AO FOREM IGUAIS NEM AO ULTIMO NEM AO PRIMEIRO, VAO TER VALORES INTERMEDIOS
                        else{
                            //SE OS TRES FOREM IGUAIS ENTRE SI, VAO TER O VALOR DO MEIO
                            if(counts[1]['count'] == counts[2]['count'] && counts[1]['count'] == counts[3]['count']){
                                if(counts[1]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                                if(counts[1]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                                if(counts[1]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                                if(counts[1]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                                if(counts[1]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                
                
                                if(counts[2]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                                if(counts[2]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                                if(counts[2]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                                if(counts[2]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                                if(counts[2]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                
                                if(counts[3]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                                if(counts[3]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                                if(counts[3]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                                if(counts[3]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                                if(counts[3]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                
                            }
                            else{
                                //SE OS DOIS PRIMEIROS FOREM IGUAIS
                                if(counts[1]['count'] == counts[2]['count'] && counts[1]['count'] != counts[3]['count']){
                                    if(counts[1]['id'] == 'e') corVisitaZona1 = "#96E2CFFF"
                                    if(counts[1]['id'] == 'o') corVisitaZona2 = "#96E2CFFF"
                                    if(counts[1]['id'] == 'v') corVisitaZona3 = "#96E2CFFF"
                                    if(counts[1]['id'] == 'g') corVisitaZona4 = "#96E2CFFF"
                                    if(counts[1]['id'] == 'p') corVisitaZona5 = "#96E2CFFF"
                
                
                                    if(counts[2]['id'] == 'e') corVisitaZona1 = "#96E2CFFF"
                                    if(counts[2]['id'] == 'o') corVisitaZona2 = "#96E2CFFF"
                                    if(counts[2]['id'] == 'v') corVisitaZona3 = "#96E2CFFF"
                                    if(counts[2]['id'] == 'g') corVisitaZona4 = "#96E2CFFF"
                                    if(counts[2]['id'] == 'p') corVisitaZona5 = "#96E2CFFF"
                
                                    if(counts[3]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                    if(counts[3]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                    if(counts[3]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                    if(counts[3]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                    if(counts[3]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                                }
                                else{
                                    //SE OS DOIS ULTIMOS FOREM IGUAIS
                                    if(counts[1]['count'] != counts[2]['count'] && counts[2]['count'] == counts[3]['count']){
                                        if(counts[1]['id'] == 'e') corVisitaZona1 = "#96E2CFFF"
                                        if(counts[1]['id'] == 'o') corVisitaZona2 = "#96E2CFFF"
                                        if(counts[1]['id'] == 'v') corVisitaZona3 = "#96E2CFFF"
                                        if(counts[1]['id'] == 'g') corVisitaZona4 = "#96E2CFFF"
                                        if(counts[1]['id'] == 'p') corVisitaZona5 = "#96E2CFFF"
                
                
                                        if(counts[2]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                        if(counts[2]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                        if(counts[2]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                        if(counts[2]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                        if(counts[2]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                                        if(counts[3]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                        if(counts[3]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                        if(counts[3]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                        if(counts[3]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                        if(counts[3]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                                    }
                                    //SE PONTAS DO MEIO IGUAIS
                                    else {
                                        if(counts[1]['count'] == counts[3]['count'] && counts[1]['count'] != counts[2]['count']){
                                            if(counts[1]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                            if(counts[1]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                            if(counts[1]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                            if(counts[1]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                            if(counts[1]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                
                                            if(counts[2]['id'] == 'e') corVisitaZona1 = "#96E2CFFF"
                                            if(counts[2]['id'] == 'o') corVisitaZona2 = "#96E2CFFF"
                                            if(counts[2]['id'] == 'v') corVisitaZona3 = "#96E2CFFF"
                                            if(counts[2]['id'] == 'g') corVisitaZona4 = "#96E2CFFF"
                                            if(counts[2]['id'] == 'p') corVisitaZona5 = "#96E2CFFF"
                
                                            if(counts[3]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                            if(counts[3]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                            if(counts[3]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                            if(counts[3]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                            if(counts[3]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                                        }
                                        //SE FOREM OS TRES DIFERENTES
                                        else{
                                            if(counts[1]['id'] == 'e') corVisitaZona1 = "#96E2CFFF"
                                            if(counts[1]['id'] == 'o') corVisitaZona2 = "#96E2CFFF"
                                            if(counts[1]['id'] == 'v') corVisitaZona3 = "#96E2CFFF"
                                            if(counts[1]['id'] == 'g') corVisitaZona4 = "#96E2CFFF"
                                            if(counts[1]['id'] == 'p') corVisitaZona5 = "#96E2CFFF"
                
                
                                            if(counts[2]['id'] == 'e') corVisitaZona1 = "#669BE2FF"
                                            if(counts[2]['id'] == 'o') corVisitaZona2 = "#669BE2FF"
                                            if(counts[2]['id'] == 'v') corVisitaZona3 = "#669BE2FF"
                                            if(counts[2]['id'] == 'g') corVisitaZona4 = "#669BE2FF"
                                            if(counts[2]['id'] == 'p') corVisitaZona5 = "#669BE2FF"
                
                                            if(counts[3]['id'] == 'e') corVisitaZona1 = "#4049E2FF"
                                            if(counts[3]['id'] == 'o') corVisitaZona2 = "#4049E2FF"
                                            if(counts[3]['id'] == 'v') corVisitaZona3 = "#4049E2FF"
                                            if(counts[3]['id'] == 'g') corVisitaZona4 = "#4049E2FF"
                                            if(counts[3]['id'] == 'p') corVisitaZona5 = "#4049E2FF"
                
                                        }
                
                                    }
                        
                                    
                                }    
                            }
                        }
                    }
                }
            }
 
             
        }
        verNumeroSalas()

        
        var countsFuture

        //verFuturoSalas(countsFuture, countFutureZona1, countFutureZona2, countFutureZona3, countFutureZona4, countFutureZona5, corFutureZona1, corFutureZona2, corFutureZona3, corFutureZona4, corFutureZona5);
        function verFuturoSalas(){
            countsFuture = []
            countsFuture = [{ id: 'e', count: countFutureZona1 }, { id: 'o', count: countFutureZona2 }, { id: 'v', count: countFutureZona3 }, { id: 'g', count: countFutureZona4 }, { id: 'p', count: countFutureZona5 }];
            countsFuture.sort(sortBy('count'));


            getFutureInfo()
            //SE OS COUNTS FOREM IGUAIS PARA TODOS OS ELEMENTOS, METER A COR MÁXIMA EM TODOS
            if(countFutureZona1 == countFutureZona2 && countFutureZona1 == countFutureZona3 && countFutureZona1 == countFutureZona4 && countFutureZona1 == countFutureZona5){
                corFutureZona1 = "#BF4E00FF"
                corFutureZona2 = "#BF4E00FF"
                corFutureZona3 = "#BF4E00FF"
                corFutureZona4 = "#BF4E00FF"
                corFutureZona5 = "#BF4E00FF"
            }
            
            //CASO CONTRÁRIO, O ELEMENTO MAIS ALTO COM A MAXIMA COR
            else{
                //SE APENAS existir um user
                if(ids.length == 1){
                    corFutureZona1 = corUserFutureZona1
                    corFutureZona2 = corUserFutureZona2
                    corFutureZona3 = corUserFutureZona3
                    corFutureZona4 = corUserFutureZona4
                    corFutureZona5 = corUserFutureZona5

                }
                else{
                    //MENOR COUNT
                    if(countsFuture[0]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                    if(countsFuture[0]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                    if(countsFuture[0]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                    if(countsFuture[0]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                    if(countsFuture[0]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
                    //MAIOR COUNT
                    if(countsFuture[4]['id'] == 'e') corFutureZona1 = "#BF4E00FF"
                    if(countsFuture[4]['id'] == 'o') corFutureZona2 = "#BF4E00FF"
                    if(countsFuture[4]['id'] == 'v') corFutureZona3 = "#BF4E00FF"
                    if(countsFuture[4]['id'] == 'g') corFutureZona4 = "#BF4E00FF"
                    if(countsFuture[4]['id'] == 'p') corFutureZona5 = "#BF4E00FF"
                    //MEDIO
                    if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                    if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                    if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                    if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                    if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
            
                    if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                    if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                    if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                    if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                    if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
            
                    if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                    if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                    if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                    if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                    if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"

                    //VER SE NO MEIO NAO HA NADA: dar a cor do meio
                    if(countsFuture[1]['count'] > countsFuture[0]['count'] && countsFuture[1]['count'] < countsFuture[4]['count']){
                        if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                        if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                        if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                        if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                        if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                    }
                    if(countsFuture[2]['count'] > countsFuture[0]['count'] && countsFuture[2]['count'] < countsFuture[4]['count']){
                        if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                        if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                        if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                        if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                        if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                    }
                    if(countsFuture[3]['count'] > countsFuture[0]['count'] && countsFuture[3]['count'] < countsFuture[4]['count']){
                        if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                        if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                        if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                        if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                        if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                    }

                    //VAMOS VER OS ELEMENTOS DO MEIO
                    //CASO SEJAM IGUAiS AO PRIMEIRO
                    if(countsFuture[1]['count'] == countsFuture[0]['count']){
                        if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                        if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                        if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                        if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                        if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
                
                    }
                    if(countsFuture[2]['count'] == countsFuture[0]['count']){
                        if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                        if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                        if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                        if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                        if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
                
                    }
                    if(countsFuture[3]['count'] == countsFuture[0]['count']){
                        if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#FFE2BBFF"
                        if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#FFE2BBFF"
                        if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#FFE2BBFF"
                        if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#FFE2BBFF"
                        if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#FFE2BBFF"
                
                    }
                    else{
                        //CASO SEJAM IGUAiS AO ULTIMO
                        if(countsFuture[1]['count'] == countsFuture[4]['count']){
                            if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#BF4E00FF"
                            if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#BF4E00FF"
                            if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#BF4E00FF"
                            if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#BF4E00FF"
                            if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#BF4E00FF"
                        }
                        if(countsFuture[2]['count'] == countsFuture[4]['count']){
                            if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#BF4E00FF"
                            if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#BF4E00FF"
                            if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#BF4E00FF"
                            if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#BF4E00FF"
                            if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#BF4E00FF"
                        }
                        if(countsFuture[3]['count'] == countsFuture[4]['count']){
                            if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#BF4E00FF"
                            if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#BF4E00FF"
                            if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#BF4E00FF"
                            if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#BF4E00FF"
                            if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#BF4E00FF"
                        }
                        //SE NAO FOREM IGUAIS NEM AO ULTIMO NEM AO PRIMEIRO, VAO TER VALORES INTERMEDIOS
                        else{
                            //SE OS TRES FOREM IGUAIS ENTRE SI, VAO TER O VALOR DO MEIO
                            if(countsFuture[1]['count'] == countsFuture[2]['count'] && countsFuture[1]['count'] == countsFuture[3]['count']){
                                if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                                if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                                if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                                if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                                if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                
                
                                if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                                if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                                if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                                if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                                if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                
                                if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                                if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                                if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                                if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                                if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                
                            }
                            else{
                                //SE OS DOIS PRIMEIROS FOREM IGUAIS
                                if(countsFuture[1]['count'] == countsFuture[2]['count'] && countsFuture[1]['count'] != countsFuture[3]['count']){
                                    if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#E2CC96FF"
                                    if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#E2CC96FF"
                                    if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#E2CC96FF"
                                    if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#E2CC96FF"
                                    if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#E2CC96FF"
                
                
                                    if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#E2CC96FF"
                                    if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#E2CC96FF"
                                    if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#E2CC96FF"
                                    if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#E2CC96FF"
                                    if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#E2CC96FF"
                
                                    if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#E2763DFF"
                                    if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#E2763DFF"
                                    if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#E2763DFF"
                                    if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#E2763DFF"
                                    if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#E2763DFF"
                
                                }
                                else{
                                    //SE OS DOIS ULTIMOS FOREM IGUAIS
                                    if(countsFuture[1]['count'] != countsFuture[2]['count'] && countsFuture[2]['count'] == countsFuture[3]['count']){
                                        if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#E2CC96FF"
                
                
                                        if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#E2763DFF"
                                        if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#E2763DFF"
                                        if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#E2763DFF"
                                        if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#E2763DFF"
                                        if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#E2763DFF"
                
                                        if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#E2763DFF"
                                   
                
                                    }                        
                                    //SE FOREM OS TRES DIFERENTES
                                    else{
                                        if(countsFuture[1]['id'] == 'e') corFutureZona1 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'o') corFutureZona2 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'v') corFutureZona3 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'g') corFutureZona4 = "#E2CC96FF"
                                        if(countsFuture[1]['id'] == 'p') corFutureZona5 = "#E2CC96FF"
                
                
                                        if(countsFuture[2]['id'] == 'e') corFutureZona1 = "#E2B266FF"
                                        if(countsFuture[2]['id'] == 'o') corFutureZona2 = "#E2B266FF"
                                        if(countsFuture[2]['id'] == 'v') corFutureZona3 = "#E2B266FF"
                                        if(countsFuture[2]['id'] == 'g') corFutureZona4 = "#E2B266FF"
                                        if(countsFuture[2]['id'] == 'p') corFutureZona5 = "#E2B266FF"
                
                                        if(countsFuture[3]['id'] == 'e') corFutureZona1 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'o') corFutureZona2 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'v') corFutureZona3 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'g') corFutureZona4 = "#E2763DFF"
                                        if(countsFuture[3]['id'] == 'p') corFutureZona5 = "#E2763DFF"
                
                                    }
                                }    
                            }
                        }
                    }
                }
            }     
        }
        verFuturoSalas()

        

        //LEGENDA INICIAL
        linearGradientE.selectAll("stop")
            .data( colorScaleZona1.range() )
            .enter().append("stop")
            .attr("offset", function(d,i) { return i/(colorScaleZona1.range().length-1); })
            .attr("stop-color", function(d) { return d; });
        //RETANGULO LEGENDA
        svg.append("rect")
            .attr("id", 'colores')
            .attr('x', 720)
            .attr('y', 485)
            .attr('width', 530)
            .attr('height', 25)
            .style("fill", "url(#linear-gradientE)");

            
        var idOfClickedUser = 0

        d3.select('#p3')
            .attr("id","tooltip")
            .attr('style', 'position: absolute; opacity: 0;')

        svg.append('text')
            .text("Filtros para o mapa")
            .attr('x', 700)
            .attr('y', 25)
            .style("fill", "#6E9EA4")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '20px')

        //BOTAO EXPERIENCIA NO LOCAL
        var group1 = svg.append("g");
        group1.append('rect')
            .attr("id", 'g1')
            .attr('x', 710)
            .attr('y', 40)
            .attr('width', 150)
            .attr('height', 25)
            .style("fill", "#0d4148")
            .style('stroke', "black")
            .classed("selected", false)
            .on('click', function(e, d){
                //deselect as outras
                if(d3.select("#g2").classed("selected") || d3.select("#g3").classed("selected")){
                    d3.select("#g2").classed("selected", false)
                    d3.select("#g2")
                        .style('fill', "#6E9EA4")
                    d3.select("#g3").classed("selected", false)
                    d3.select("#g3")
                        .style('fill', "#6E9EA4")
                }
                if (!d3.select('#g1').classed("selected") ){
                    d3.select('#g1').classed("selected", true)
                    d3.select('#g1').style('fill', "#6E9EA4")
                    d3.select(this).classed("selected", true)
                    d3.select(this).style('fill', "#6E9EA4")
                    d3.select("#colores").remove()
                                
                }else{
                    d3.select('#g1').classed("selected", false)
                    d3.select('#g1').style('fill', "#0d4148")
                    d3.select(this).classed("selected", false)
                    d3.select(this).style('fill', "#0d4148")
                    if(selecedLocal == 'MAAT'){
                        colorir();
                    }
                    else colorir2();
                    

                }
            
            });

        group1.append('text')
            .text("Experiência no local")
            .attr('x', 730)
            .attr('y', 55)
            .style("fill", "white")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '12px')
            .on('click', function(e, d){
                //deselect as outras
                if(d3.select("#g2").classed("selected") || d3.select("#g3").classed("selected")){
                    d3.select("#g2").classed("selected", false)
                    d3.select("#g2")
                        .style('fill', "#6E9EA4")
                    d3.select("#g3").classed("selected", false)
                    d3.select("#g3")
                        .style('fill', "#6E9EA4")
                }
                if (!d3.select('#g1').classed("selected") ){
                    d3.select('#g1').classed("selected", true)
                    d3.select('#g1').style('fill', "#6E9EA4")
                    d3.select("#colores").remove()
                                
                }else{
                    d3.select('#g1').classed("selected", false)
                    d3.select('#g1').style('fill', "#0d4148")
                    if(selecedLocal == 'MAAT'){
                        colorir();
                    }
                    else colorir2();
                    

                }
            
            });


        //BOTAO SALAS MAIS VISITADAS
        
        var group2 = svg.append("g");
        group2.append('rect')
            .attr("id", 'g2')
            .attr('x', 880)
            .attr('y', 40)
            .attr('width', 150)
            .attr('height', 25)
            .style("fill", "#6E9EA4")
            .style('stroke', "black")
            .on('click', function(e, d){  
                //deselect as outras
                if(!d3.select("#g1").classed("selected") || d3.select("#g3").classed("selected")){
                    d3.select("#g1").classed("selected", true)
                    d3.select("#g1").style('fill', '#6E9EA4')
                    d3.select("#g3").classed("selected", false)
                    d3.select("#g3").style('fill', '#6E9EA4')                        
                }
                if (!d3.select('#g2').classed("selected") ){
                    d3.select('#g2').classed("selected", true)
                    d3.select('#g2').style('fill', "#0d4148")
                    d3.select(this).classed("selected", true)
                    d3.select(this).style('fill', "#0d4148")
                    verNumeroSalas()
                    if(selecedLocal == 'MAAT'){
                        colorir();
                    }
                    else colorir2();

                }else{
                    d3.select('#g2').classed("selected", false);
                    d3.select('#g2').style('fill', "#6E9EA4")
                    d3.select(this).classed("selected", false);
                    d3.select(this).style('fill', "#6E9EA4")
                    d3.select("#colores").remove()   
                }
            });


        group2.append('text')
            .text("Salas mais visitadas")
            .attr('x', 900)
            .attr('y', 55)
            .style("fill", "white")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '12px')
            .on('click', function(e, d){  
                //deselect as outras
                if(!d3.select("#g1").classed("selected") || d3.select("#g3").classed("selected")){
                    d3.select("#g1").classed("selected", true)
                    d3.select("#g1").style('fill', '#6E9EA4')
                    d3.select("#g3").classed("selected", false)
                    d3.select("#g3").style('fill', '#6E9EA4')                        
                }
                if (!d3.select('#g2').classed("selected") ){
                    d3.select('#g2').classed("selected", true)
                    d3.select('#g2').style('fill', "#0d4148")
                    verNumeroSalas()
                    if(selecedLocal == 'MAAT'){
                        colorir();
                    }
                    else colorir2();

                }else{
                    d3.select('#g2').classed("selected", false);
                    d3.select('#g2').style('fill', "#6E9EA4")

                    d3.select("#colores").remove()   
                }
            });

            group2.raise()
            


        //BOTAO FUTURAS CONSULTAS
        var group3 = svg.append("g");

        group3.append('rect')
            .attr("id", 'g3')
            .attr('x', 1050)
            .attr('y', 40)
            .attr('width', 195)
            .attr('height', 25)
            .style("fill", "#6E9EA4")
            .style('stroke', "black")
            .on('click', function(e, d){

                if(!d3.select("#g1").classed("selected") || d3.select("#g2").classed("selected")){
                    d3.select("#g1").classed("selected", true)
                    d3.select("#g1")
                        .style('fill', "#6E9EA4")
                    d3.select("#g2").classed("selected", false)
                    d3.select("#g2")
                        .style('fill', "#6E9EA4")
                }
                
                if (!d3.select('#g3').classed("selected") ){
                    d3.select('#g3').classed("selected", true)
                    d3.select('#g3').style('fill', "#0d4148")  
                    d3.select(this).classed("selected", true)
                    d3.select(this).style('fill', "#0d4148")  
                    if(selecedLocal == 'MAAT'){
                        colorir();
                    }
                    else colorir2();

                }else{
                    d3.select('#g3').classed("selected", false)
                    d3.select('#g3').style('fill', "#6E9EA4")
                    d3.select(this).classed("selected", false)
                    d3.select(this).style('fill', "#6E9EA4")
                    d3.select("#colores").remove()

                }
                
            });

        group3.append('text')
        .text("Salas para futuras consultas")
        .attr('x', 1070)
        .attr('y', 55)
        .style("fill", "white")
        .style("font-weight", 800)
        .style("font-family", "Roboto")
        .style("font-size", '12px')
        .on('click', function(e, d){

            if(!d3.select("#g1").classed("selected") || d3.select("#g2").classed("selected")){
                d3.select("#g1").classed("selected", true)
                d3.select("#g1")
                    .style('fill', "#6E9EA4")
                d3.select("#g2").classed("selected", false)
                d3.select("#g2")
                    .style('fill', "#6E9EA4")
            }
            
            if (!d3.select('#g3').classed("selected") ){
                d3.select('#g3').classed("selected", true)
                d3.select('#g3').style('fill', "#0d4148")   
                if(selecedLocal == 'MAAT'){
                    colorir();
                }
                else colorir2();

            }else{
                d3.select('#g3').classed("selected", false)
                d3.select('#g3').style('fill', "#6E9EA4")
                d3.select("#colores").remove()

            }
            
        });

        //legenda mapa
        svg.append('text')
            .text("Legenda")
            .attr('x', 700)
            .attr('y', 475)
            .style("fill", "#6E9EA4")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '20px')

        svg.append('text')
            .attr('id', 'legenda1')
            .text(legendaExperienciaMenos)
            .attr('x', 700)
            .attr('y', 525)
            .style("fill", "#0d4148FF")
            .style("font-family", "Roboto")
            .style("font-size", '14px')

        svg.append('text')
            .attr('id', 'legenda2')
            .text(legendaExperienciaMais)
            .attr('x', 1150)
            .attr('y', 525)
            .style("fill", "#0d4148FF")
            .style("font-family", "Roboto")
            .style("font-size", '14px')

        //SELECÃO DO USER PARA VER O MAPA
        //legenda users
        svg.append('text')
            .text("Selecione um utilizador para visualizar os seus dados")
            .attr('x', 700)
            .attr('y', 550)
            .style("fill", "#6E9EA4")
            .style("font-weight", 800)
            .style("font-family", "Roboto")
            .style("font-size", '20px')

        function getVisitsInfo(){
            var indexToGet
            var indexForInfo

            //SE TIVERMOS APENAS UM USER
            for(let index = 0; index < indexes.length; index++){

                //indexForInfo = indexes[index]
                
                id = ids[index];
                
         
                for(let index2 = 0; index2 < usedIds.length; index2++){

                    if(ids[indexes[index]] == usedIds[index2]){
                        indexToGet = index
                    }
                }
            }


                //ROOMS VISITED
                //AND GET THE JUSTIFICATIONS
                if(visitsZona1[indexToGet] == 'Sim'){
                    visitUserZona1 = 1;
                    justificationUserZona1 = justificationsZona1[indexToGet]
                } else{
                    visitUserZona1 = 0;
                    justificationUserZona1 = "Espaço não visitado"
                } 
                if(visitsZona2[indexToGet] == 'Sim'){                                
                    visitUserZona2 = 1;
                    justificationUserZona2 = justificationsZona2[indexToGet]
                } else{
                    visitUserZona2 = 0;
                    justificationUserZona2 = "Espaço não visitado"
                } 
                if(visitsZona3[indexToGet] == 'Sim'){                                
                    visitUserZona3 = 1;
                    justificationUserZona3 = justificationsZona3[indexToGet]
                } else{
                    visitUserZona3 = 0;
                    justificationUserZona3 = "Espaço não visitado"
                } 
                if(visitsZona4[indexToGet] == 'Sim'){                                
                    visitUserZona4 = 1;
                    justificationUserZona4 = justificationsZona4[indexToGet]
                } else{
                    visitUserZona4 = 0;
                    justificationUserZona4 = "Espaço não visitado"
                } 
                if(visitsZona5[indexToGet] == 'Sim'){                                
                    visitUserZona5 = 1;
                    justificationUserZona5 = justificationsZona5[indexToGet]
                } else{
                    visitUserZona5 = 0;
                    justificationUserZona5 = "Espaço não visitado"
                } 


                //CORES PARA VISITA: CONSIDERAR APENAS A MAIS ESCURA E MAIS CLARA  
                if(visitUserZona1 == 1){
                    corUserVisitaZona1 = '#1D2268FF';
                } else corUserVisitaZona1 = '#C7E2DCFF';
                if(visitUserZona2 == 1){
                    corUserVisitaZona2 = '#1D2268FF';
                } else corUserVisitaZona2 = '#C7E2DCFF';
                if(visitUserZona3 == 1){
                    corUserVisitaZona3 = '#1D2268FF';
                } else corUserVisitaZona3 = '#C7E2DCFF';
                if(visitUserZona4 == 1){
                    corUserVisitaZona4 = '#1D2268FF';
                } else corUserVisitaZona4 = '#C7E2DCFF';
                if(visitUserZona5 == 1){
                    corUserVisitaZona5 = '#1D2268FF';
                } else corUserVisitaZona5 = '#C7E2DCFF';
                
                
        }

        function getFutureInfo(){
            
            //VOTES FOR FUTURE

            if(selecedLocal == 'MAAT'){
                if(futures.includes('Exterior do museu')){
                    countFutureZona1 = 1;
                } else countFutureZona1 = 0;
                if(futures.includes('Sala Oval')){
                    countFutureZona2 = 1;
                } else countFutureZona2 = 0;
                if(futures.includes('Video Room')){
                    countFutureZona3 = 1;
                } else countFutureZona3 = 0;
                if(futures.includes('Galeria Principal')){
                    countFutureZona4 = 1;
                } else countFutureZona4 = 0;
                if(futures.includes('Project Room')){
                    countFutureZona5 = 1;
                } else countFutureZona5 = 0; 

            }
            else{
                if(futures[0].includes('1')){
                    countFutureZona1 = 1;
                } else countFutureZona1 = 0;
                if(futures[0].includes('Zona 2')){
                    countFutureZona2 = 1;
                } else countFutureZona2 = 0;
                if(futures[0].includes('Zona 3')){
                    countFutureZona3 = 1;
                } else countFutureZona3 = 0;
                if(futures[0].includes('Zona 4')){
                    countFutureZona4 = 1;
                } else countFutureZona4 = 0;
                if(futures[0].includes('Zona 5')){
                    countFutureZona5 = 1;
                } else countFutureZona5 = 0; 
            }
        

            //CORES PARA FUTURO: CONSIDERAR APENAS A MAIS ESCURA E MAIS CLARA

            if(countFutureZona1 == 1){
                corUserFutureZona1 = '#BF4E00FF';
            } else corUserFutureZona1 = '#FFE2BBFF';
            if(countFutureZona2 == 1){
                corUserFutureZona2 = '#BF4E00FF';
            } else corUserFutureZona2 = '#FFE2BBFF';
            if(countFutureZona3 == 1){
                corUserFutureZona3 = '#BF4E00FF';
            } else corUserFutureZona3 = '#FFE2BBFF';
            if(countFutureZona4 == 1){
                corUserFutureZona4 = '#BF4E00FF';
            } else corUserFutureZona4 = '#FFE2BBFF';
            if(countFutureZona5 == 1){
                corUserFutureZona5 = '#BF4E00FF';
            } else corUserFutureZona5 = '#FFE2BBFF';
            
            
        }

        var y1
        var yt
        var firstTime = 0
        function drawUsers(){
            y1 = 580
            yt = 585
            
            for(let index = 0; index < indexes.length; index++){

                //var indexForInfo = indexes[index]
                
                id = ids[index];                

                //Seleção do user
                svg.append('text')
                .attr("id", 'labelUser' + id)
                .text("User: " + id)
                .attr('x', 735)
                .attr('y', yt)
                .style("font-family", "Roboto")
                .style("fill", "#0d4148")


                svg.append('circle')
                    .attr("id", 'user' + id)
                    .attr('cx', 720)
                    .attr('cy', y1)
                    .attr('r', 10)
                    .style("fill", "#6E9EA4")
                    .style('stroke', "black")
                    .classed("selected", false)
                    .on('click', function(e, d){


                    idOfClickedUser = ids[indexes[index]]

                    if (!d3.select(this).classed("selected") ){
                        firstTime = 1
                        d3.select(this).classed("selected", true)
                        d3.select(this)
                        .style('fill', "#0d4148")


                        //the others get lighter and deselect them
                        for(let index1 = 0; index1 < indexes.length; index1++){
                            if(ids[indexes[index1]] != ids[indexes[index]]){
                                var teste = 'user' + ids[indexes[index1]]
                                var testee = d3.select("#" + teste)
                        
                                testee.classed("selected", false)
                                    .style('fill', "#6E9EA4")
                            }   
                        }

                        var indexToGet


                        for(let index2 = 0; index2 < usedIds.length; index2++){
                            if(ids[index] == usedIds[index2]){
                                indexToGet = index
                            }
                        }
                        
                        //VOTES FOR FUTURE

                        if(selecedLocal == 'MAAT'){
                            if(futures[indexToGet].includes('Exterior do museu')){
                                countFutureUserZona1 = 1;
                            } else countFutureUserZona1 = 0;
                            if(futures[indexToGet].includes('Sala Oval')){
                                countFutureUserZona2 = 1;
                            } else countFutureUserZona2 = 0;
                            if(futures[indexToGet].includes('Video Room')){
                                countFutureUserZona3 = 1;
                            } else countFutureUserZona3 = 0;
                            if(futures[indexToGet].includes('Galeria Principal')){
                                countFutureUserZona4 = 1;
                            } else countFutureUserZona4 = 0;
                            if(futures[indexToGet].includes('Project Room')){
                                countFutureUserZona5 = 1;
                            } else countFutureUserZona5 = 0;

                        }
                        else{
                            if(futures[indexToGet].includes('Zona 1')){
                                countFutureUserZona1 = 1;
                            } else countFutureUserZona1 = 0;
                            if(futures[indexToGet].includes('Zona 2')){
                                countFutureUserZona2 = 1;
                            } else countFutureUserZona2 = 0;
                            if(futures[indexToGet].includes('Zona 3')){
                                countFutureUserZona3 = 1;
                            } else countFutureUserZona3 = 0;
                            if(futures[indexToGet].includes('Zona 4')){
                                countFutureUserZona4 = 1;
                            } else countFutureUserZona4 = 0;
                            if(futures[indexToGet].includes('Zona 5')){
                                countFutureUserZona5 = 1;
                            } else countFutureUserZona5 = 0;

                        }

                        //ROOMS VISITED
                        //AND GET THE JUSTIFICATIONS


                        if(visitsZona1[indexToGet] == 'Sim'){

                            visitUserZona1 = 1;
                            justificationUserZona1 = justificationsZona1[indexToGet]
                        } else{
                            visitUserZona1 = 0;
                            justificationUserZona1 = "Espaço não visitado"
                        } 
                        if(visitsZona2[indexToGet] == 'Sim'){                                
                            visitUserZona2 = 1;
                            justificationUserZona2 = justificationsZona2[indexToGet]
                        } else{
                            visitUserZona2 = 0;
                            justificationUserZona2 = "Espaço não visitado"
                        } 
                        if(visitsZona3[indexToGet] == 'Sim'){                                
                            visitUserZona3 = 1;
                            justificationUserZona3 = justificationsZona3[indexToGet]
                        } else{
                            visitUserZona3 = 0;
                            justificationUserZona3 = "Espaço não visitado"
                        } 
                        if(visitsZona4[indexToGet] == 'Sim'){                                
                            visitUserZona4 = 1;
                            justificationUserZona4 = justificationsZona4[indexToGet]
                        } else{
                            visitUserZona4 = 0;
                            justificationUserZona4 = "Espaço não visitado"
                        } 
                        if(visitsZona5[indexToGet] == 'Sim'){                                
                            visitUserZona5 = 1;
                            justificationUserZona5 = justificationsZona5[indexToGet]
                        } else{
                            visitUserZona5 = 0;
                            justificationUserZona5 = "Espaço não visitado"
                        } 


                        //GET COLORS

                        idToConsider = this.id
                        ratingUserZona1 = ratingsZona1[indexToGet]
                        ratingUserZona2 = ratingsZona2[indexToGet]
                        ratingUserZona3 = ratingsZona3[indexToGet]
                        ratingUserZona4 = ratingsZona4[indexToGet]
                        ratingUserZona5 = ratingsZona5[indexToGet]


                        //USER INDIVIDUAL EXTERIOR
                        //CASO DE SER VAZIO
                        if(ratingUserZona1 == null){
                            corUserZona1 = 'white';
                        } else if(ratingUserZona1 >= 0 && ratingUserZona1 < 1.5){
                            corUserZona1 = '#F60D0D';
                        } else if (ratingUserZona1 >= 1.5 && ratingUserZona1 < 2.5){
                            corUserZona1 = "#FF9900";
                        } else if (ratingUserZona1 >= 2.5 && ratingUserZona1 < 3.5){
                            corUserZona1 = '#F7F054';
                        } else if (ratingUserZona1 >= 3.5 && ratingUserZona1 < 4.5){
                            corUserZona1 = '#72FA1E';
                        } else if (ratingUserZona1 >= 5){
                            corUserZona1 = '#3FD25F';
                        }

                        //USER INDIVIDUAL OVAL
                        //CASO DE SER VAZIO
                        if(ratingUserZona2 == null){
                            corUserZona2 = 'white';
                        } else if(ratingUserZona2 >= 0 && ratingUserZona2 < 1.5){
                            corUserZona2 = '#F60D0D';
                        } else if (ratingUserZona2 >= 1.5 && ratingUserZona2 < 2.5){
                            corUserZona2 = "#FF9900";
                        } else if (ratingUserZona2 >= 2.5 && ratingUserZona2 < 3.5){
                            corUserZona2 = '#F7F054';
                        } else if (ratingUserZona2 >= 3.5 && ratingUserZona2 < 4.5){
                            corUserZona2 = '#72FA1E';
                        } else if (ratingUserZona2 >= 5){
                            corUserZona2 = '#3FD25F';
                        }

                        //USER INDIVIDUAL VIDEO
                        //CASO DE SER VAZIO
                        if(ratingUserZona3 == null){
                            corUserZona3 = 'white';
                        } else if(ratingUserZona3 >= 0 && ratingUserZona3 < 1.5){
                            corUserZona3 = '#F60D0D';
                        } else if (ratingUserZona3 >= 1.5 && ratingUserZona3 < 2.5){
                            corUserZona3 = "#FF9900";
                        } else if (ratingUserZona3 >= 2.5 && ratingUserZona3 < 3.5){
                            corUserZona3 = '#F7F054';
                        } else if (ratingUserZona3 >= 3.5 && ratingUserZona3 < 4.5){
                            corUserZona3 = '#72FA1E';
                        } else if (ratingUserZona3 >= 5){
                            corUserZona3 = '#3FD25F';
                        }

                        //USER INDIVIDUAL GALERIA
                        //CASO DE SER VAZIO
                        if(ratingUserZona4 == null){
                            corUserZona4 = 'white';
                        } else if(ratingUserZona4 >= 0 && ratingUserZona4 < 1.5){
                            corUserZona4 = '#F60D0D';
                        } else if (ratingUserZona4 >= 1.5 && ratingUserZona4 < 2.5){
                            corUserZona4 = "#FF9900";
                        } else if (ratingUserZona4 >= 2.5 && ratingUserZona4 < 3.5){
                            corUserZona4 = '#F7F054';
                        } else if (ratingUserZona4 >= 3.5 && ratingUserZona4 < 4.5){
                            corUserZona4 = '#72FA1E';
                        } else if (ratingUserZona4 >= 5){
                            corUserZona4 = '#3FD25F';
                        }

                        //USER INDIVIDUAL PROJECT
                        //CASO DE SER VAZIO
                        if(ratingUserZona5 == null){
                            corUserZona5 = 'white';
                        } else if(ratingUserZona5 >= 0 && ratingUserZona5 < 1.5){
                            corUserZona5 = '#F60D0D';
                        } else if (ratingUserZona5 >= 1.5 && ratingUserZona5 < 2.5){
                            corUserZona5 = "#FF9900";
                        } else if (ratingUserZona5 >= 2.5 && ratingUserZona5 < 3.5){
                            corUserZona5 = '#F7F054';
                        } else if (ratingUserZona5 >= 3.5 && ratingUserZona5 < 4.5){
                            corUserZona5 = '#72FA1E';
                        } else if (ratingUserZona5 >= 5){
                            corUserZona5 = '#3FD25F';
                        }

                        //CORES PARA FUTURO: CONSIDERAR APENAS A MAIS ESCURA E MAIS CLARA

                        if(countFutureUserZona1 == 1){
                            corUserFutureZona1 = '#BF4E00FF';
                        } else corUserFutureZona1 = '#FFE2BBFF';
                        if(countFutureUserZona2 == 1){
                            corUserFutureZona2 = '#BF4E00FF';
                        } else corUserFutureZona2 = '#FFE2BBFF';
                        if(countFutureUserZona3 == 1){
                            corUserFutureZona3 = '#BF4E00FF';
                        } else corUserFutureZona3 = '#FFE2BBFF';
                        if(countFutureUserZona4 == 1){
                            corUserFutureZona4 = '#BF4E00FF';
                        } else corUserFutureZona4 = '#FFE2BBFF';
                        if(countFutureUserZona5 == 1){
                            corUserFutureZona5 = '#BF4E00FF';
                        } else corUserFutureZona5 = '#FFE2BBFF';
                        

                        //CORES PARA VISITA: CONSIDERAR APENAS A MAIS ESCURA E MAIS CLARA  
                        if(visitUserZona1 == 1){
                            corUserVisitaZona1 = '#1D2268FF';
                        } else corUserVisitaZona1 = '#C7E2DCFF';
                        if(visitUserZona2 == 1){
                            corUserVisitaZona2 = '#1D2268FF';
                        } else corUserVisitaZona2 = '#C7E2DCFF';
                        if(visitUserZona3 == 1){
                            corUserVisitaZona3 = '#1D2268FF';
                        } else corUserVisitaZona3 = '#C7E2DCFF';
                        if(visitUserZona4 == 1){
                            corUserVisitaZona4 = '#1D2268FF';
                        } else corUserVisitaZona4 = '#C7E2DCFF';
                        if(visitUserZona5 == 1){
                            corUserVisitaZona5 = '#1D2268FF';
                        } else corUserVisitaZona5 = '#C7E2DCFF';

                        if(selecedLocal == 'MAAT'){
                            colorir();
                        }
                        else colorir2();

                    }else{
                        d3.select(this).classed("selected", false);
                        d3.select(this)
                        .style('fill', "#6E9EA4")
                        if(selecedLocal == 'MAAT'){
                            colorir();
                        }
                        else colorir2();
                        
                    }
                
                });
            y1 = y1 + 30;
            yt = yt + 30;
            }

        }

        //MAPAS
        function drawLocation(){
            //CALCULAR MEDIA ZONA 1 - EXTERIOR
            mediaE = d3.sum(ratingsZona1);
            var mediaZona1 = mediaE / ratingZona1Count;

            //CALCULAR MEDIA ZONA 2 - OVAL
            mediaO = d3.sum(ratingsZona2);
            var mediaZona2 = mediaO / ratingZona2Count;

            //CALCULAR MEDIA ZONA 3 - VIDEO
            mediaV = d3.sum(ratingsZona3);
            var mediaZona3 = mediaV / ratingZona3Count;
            
            //CALCULAR MEDIA ZONA 4 - GALERIA
            mediaG = d3.sum(ratingsZona4);
            var mediaZona4 = mediaG / ratingZona4Count;

            //CALCULAR MEDIA ZONA 5 - PROJECT
            mediaP = d3.sum(ratingsZona5);
            var mediaZona5 = mediaP / ratingZona5Count;

            //CORES ZONA 1 - EXTERIOR            
            if(mediaZona1 == null){
                corZona1 = 'white'
            }
            if(mediaZona1 > 0 && mediaZona1 < 1.5){
                corZona1 = '#F60D0D';
            } else if (mediaZona1 >= 1.5 && mediaZona1 < 2.5){
                corZona1 = "#FF9900";
            } else if (mediaZona1 >= 2.5 && mediaZona1 < 3.5){
                corZona1 = '#F7F054';
            } else if (mediaZona1 >= 3.5 && mediaZona1 < 4.5){
                corZona1 = '#72FA1E';
            } else if (mediaZona1 >= 4.5){
                corZona1 = '#3FD25F';
            }

            //CORES ZONA 2 - OVAL
            if(mediaZona2 > 0 && mediaZona2 < 1.5){
                corZona2 = '#F60D0D';
            } else if (mediaZona2 >= 1.5 && mediaZona2 < 2.5){
                corZona2 = "#FF9900";
            } else if (mediaZona2 >= 2.5 && mediaZona2 < 3.5){
                corZona2 = '#F7F054';
            } else if (mediaZona2 >= 3.5 && mediaZona2 < 4.5){
                corZona2 = '#72FA1E';
            } else if (mediaZona2 >= 4.5){
                corZona2 = '#3FD25F';
            }

            //CORES ZONA 3 - VIDEO
            if(mediaZona3> 0 && mediaZona3 < 1.5){
                corZona3 = '#F60D0D';
            } else if (mediaZona3 >= 1.5 && mediaZona3 < 2.5){
                corZona3 = "#FF9900";
            } else if (mediaZona3 >= 2.5 && mediaZona3 < 3.5){
                corZona3 = '#F7F054';
            } else if (mediaZona3 >= 3.5 && mediaZona3 < 4.5){
                corZona3 = '#72FA1E';
            } else if (mediaZona3 >= 4.5){
                corZona3 = '#3FD25F';
            }

            //CORES ZONA 4 - GALERIA
            if(mediaZona4 > 0 && mediaZona4 < 1.5){
                corZona4 = '#F60D0D';
            } else if (mediaZona4 >= 1.5 && mediaZona4 < 2.5){
                corZona4 = "#FF9900";
            } else if (mediaZona4 >= 2.5 && mediaZona4 < 3.5){
                corZona4 = '#F7F054';
            } else if (mediaZona4 >= 3.5 && mediaZona4 < 4.5){
                corZona4 = '#72FA1E';
            } else if (mediaZona4 >= 4.5){
                corZona4 = '#3FD25F';
            }


            //CORES ZONA 5 - PROJECT
            if(mediaZona5 > 0 && mediaZona5 < 1.5){
                corZona5 = '#F60D0D';
            } else if (mediaZona5 >= 1.5 && mediaZona5 < 2.5){
                corZona5 = "#FF9900";
            } else if (mediaZona5 >= 2.5 && mediaZona5 < 3.5){
                corZona5 = '#F7F054';
            } else if (mediaZona5 >= 3.5 && mediaZona5 < 4.5){
                corZona5 = '#72FA1E';
            } else if (mediaZona5 >= 4.5){
                corZona5 = '#3FD25F';
            }

            determinePlaceToDraw()
        }    
        
        var a
        
        function determinePlaceToDraw(){
            if(selecedLocal == 'MAAT'){
                //MAPA INICIAL
                    //DESENHAR MAPA
                    //EXTERIOR
                        svg.append('rect')
                        .attr("id", 'exterior')
                        .attr('x', 720)
                        .attr('y', 150)
                        .attr('width', 530)
                        .attr('height', 250)
                        .style("fill", corZona1)
                        .style('stroke', "black")
                        .on('mouseover', function (d, i) {
                            a = corZona1
                            a = parseInt(d3.select(this).attr('x')) + 320
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Exterior do museu")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corZona1)
                        })
    
    
    
                    var innerSVG = svg.append('svg')
                        .attr('x', 700)
                        .attr('y', 100)
                        .attr('width',600)
                        .attr('height',550);
    
    
                    innerSVG.append("path")
                        .attr("id", 'caminho')
                        .attr('d',caminho)
                        .attr("fill", "black")
                        .raise()
                                    
    
                    innerSVG.append("path")
                        .attr("id", 'caminho2')
                        .attr('d',caminho2)
                        .attr("fill", "white")
                        .raise()

                    innerSVG.append("path")
                        .attr("id", 'mapaGaleriaPrincipal')
                        .attr('d',mapaGaleriaPrincipal)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corZona5)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Galeria Principal")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corZona5)
                        })
    
                    innerSVG.append("path")
                    .attr("id", 'mapaVideoRoom')
                        .attr('d',mapaVideoRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corZona3)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Video Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corZona3)
                        })
    
                    innerSVG.append("path")
                    .attr("id", 'mapaSalaOval')
                        .attr('d',mapaSalaOval)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corZona2)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Sala Oval")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corZona2)
                        })
    
                        
    
                    innerSVG.append("path")
                    .attr("id", 'mapaProjectRoom')
                        .attr('d',mapaProjectRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corZona4)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Project Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corZona4)
                        })
    
                    innerSVG.raise()
            }
            else{
                //desenhar a nova vis
                //COM BASE NO NUMERO DE ZONAS, DIVIDIR A VISUALIZACAO
                if(numeroDeZonas == 1){ 
                    drawZone(corZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                } else if (numeroDeZonas == 2){
                    drawZone(corZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                } else if (numeroDeZonas == 3){
                    drawZone(corZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                } else if (numeroDeZonas == 4){
                    drawZone(corZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                    drawZone(corZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                } else if (numeroDeZonas == 5){
                    drawZone(corZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                    drawZone(corZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                    drawZone(corZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                }

                

            }

        }

        function drawZone(colorToUse, idToUse, xToUse, yToUse, widthToUse, heightToUse, justificationToUse, nameToUse){     
            if(nameToUse == null) nameToUse = ""
            svg.append('rect')
            .attr('id', idToUse)
            .attr('x', xToUse)
            .attr('y', yToUse)
            .attr('width', widthToUse)
            .attr('height', heightToUse)
            .style("fill", colorToUse)
            .style('stroke', "black")
            .on('mouseover', function (d, i) {
                a = parseInt(d3.select(this).attr('x')) + 100
                if(selecedLocal == 'MAAT') b = parseInt(d3.select(this).attr('y')) + 15
                else b = parseInt(d3.select(this).attr('y')) + 50
                c = parseInt(d3.select(this).attr('y')) + 60
                if(justificationToUse != ""){
                    d3.select('#tooltip')
                    .transition().duration(200)
                    .style('opacity', 1)
                    .style("left", a + "px")     
                    .style("top", b + "px")
                    .style("width", 250 + "px")
                    .text(idToUse + " " + nameToUse + "Justificação: " + justificationToUse)
                    .style("color", "#6E9EA4")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
                    d3.select(this)
                    .transition()
                    .style('fill', '#72839e')
                    .duration('50')
    
                }
                else{
                    d3.select('#tooltip')
                    .transition().duration(200)
                    .style('opacity', 1)
                    .style("left", a + "px")     
                    .style("top", c + "px")
                    .style("width", 300 + "px")
                    .text(idToUse + ": " +  nameToUse + " " + justificationToUse)
                    .style("color", "#6E9EA4")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
                    d3.select(this)
                    .transition()
                    .style('fill', '#6E9EA4')
                    .duration('50')
                }
                    
            })
            .on('mouseout', function (d, i) {
                if(justificationToUse != ""){
                    d3.select('#tooltip')
                    .style('opacity', 0)
                    d3.select(this)
                    .transition()
                    .style('fill', colorToUse)
                    .duration('50')
                    .attr('opacity', '1');
                }
                else{
                    d3.select('#tooltip')
                    .style('opacity', 0)
                    d3.select(this)
                    .transition()
                    .style('fill', colorToUse)
                    .duration('50')
                    .attr('opacity', '1');
                }
            })  
        }

        function deleteAll(){
            //LEGENDA INICIAL
            linearGradientE.selectAll("stop")
            .data( colorScaleZona1.range() )
            .enter().append("stop")
            .attr("offset", function(d,i) { return i/(colorScaleZona1.range().length-1); })
            .attr("stop-color", function(d) { return d; });
            //RETANGULO LEGENDA
            svg.append("rect")
                .attr("id", 'colores')
                .attr('x', 720)
                .attr('y', 485)
                .attr('width', 530)
                .attr('height', 25)
                .style("fill", "url(#linear-gradientE)");


            //apagar triang gerais
            d3.select('#overall2').remove()
            d3.select('#overall3').remove()
            d3.select('#overall4').remove()
            d3.select('#overall5').remove()

            //METER OS BOTOES NO INICIO
            d3.select("#ultima").classed("selected", false)
            d3.select("#ultima").style('fill', "#0d4148")   
            d3.select("#todas").classed("selected", false)
            d3.select("#todas").style('fill', "#6E9EA4") 
            d3.select("#g1").classed("selected", false)
            d3.select("#g1").style('fill', "#0d4148") 
            d3.select("#g2").classed("selected", false)
            d3.select("#g2").style('fill', "#6E9EA4") 
            d3.select("#g3").classed("selected", false)
            d3.select("#g3").style('fill', "#6E9EA4") 

            //APAGAR O MAPA
            d3.select('zona1').remove()
            d3.select('zona2').remove()
            d3.select('zona3').remove()
            d3.select('zona4').remove()
            d3.select('zona4').remove()

            //APAGAR OS CIRCULOS E QUADRADOS
            d3.select("#circleAntes").remove()
            d3.select("#circleDepois").remove()

            d3.select("#legendaLine1").remove()
            d3.select("#legendaLine2").remove()
            d3.select("#legendaLine3").remove()
            d3.select("#legendaLine4").remove()

            for(let index1 = 0; index1 < indexes.length; index1++){
                svg.select("#rectuserantes" + usedIds[index1]).remove()
                svg.select("#rectuserdepois" + usedIds[index1]).remove()
                    
            }
            d3.select("#circle1").remove()
            d3.select("#circle2").remove()
            d3.select("#circle3").remove()
            d3.select("#circle4").remove()
            d3.select("#rect1").remove()
            d3.select("#rect2").remove()
            d3.select("#rect3").remove()
            d3.select("#rect4").remove()

            //apagar salas
            d3.select("#exterior").remove()
            d3.select("#mapaVideoRoom").remove()
            d3.select("#mapaSalaOval").remove()
            d3.select("#mapaGaleriaPrincipal").remove()
            d3.select("#mapaProjectRoom").remove()
            d3.select("#caminho").remove()
            d3.select("#caminho2").remove()


            d3.select("#zona1").remove()
            d3.select("#zona2").remove()
            d3.select("#zona3").remove()
            d3.select("#zona4").remove()
            d3.select("#zona5").remove()

            //Apagar os users que estavam no ecra: ewb
            for(let index = 0; index < indexes.length; index++){
                //var indexForInfo0 = indexes[index]
                id = ids[index];

                d3.select('#user' + id).remove()
                d3.select('#labelUser' + id).remove()
                
            }

            //Apagar os users que estavam no ecra: ewb
            for(let index = 0; index < indexes.length; index++){
                //var indexForInfo0 = indexes[index]
                id = ids[index];
                d3.select('#userc' + id).remove()
                d3.select('#labelUserc' + id).remove()
                
            }

            //meter as variaveis a zero ewb:
            mediaAntes = 0
            mediaApos = 0
            colorAntes = 0
            colorApos = 0
            cyAntes = 0
            cyApos = 0

            //meter as variaveis a zero mapa:
            mediaZona1 = 0
            mediaZona2 = 0
            mediaZona3 = 0
            mediaZona4 = 0
            mediaZona5 = 0
            corZona1 = 'white'
            corZona2 = 'white'
            corZona3 = 'white'
            corZona4 = 'white'
            corZona5 = 'white'

        } 
        
        function colorir(){
            drawLocation()
            if(!d3.select("#g1").classed("selected")){     
                linearGradientE.selectAll("stop")
                .data( colorScaleZona1.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleZona1.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientE)");   

                //DESENHAR MAPA
                //EXTERIOR
                svg.append('rect')
                    .attr("id", 'exterior')
                    .attr('x', 720)
                    .attr('y', 150)
                    .attr('width', 530)
                    .attr('height', 250)
                    .style("fill", corZona1)
                    .style('stroke', "black")
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 320
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Exterior do museu")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .style('fill', '#72839e')
                        .duration('50')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corZona1)
                    })

                    var innerSVG = svg.append('svg')
                    .attr('x', 700)
                    .attr('y', 100)
                    .attr('width',600)
                    .attr('height',550);


                innerSVG.append("path")
                    .attr("id", 'caminho')
                    .attr('d',caminho)
                    .attr("fill", "black")
                    .raise()
                                

                innerSVG.append("path")
                    .attr("id", 'caminho2')
                    .attr('d',caminho2)
                    .attr("fill", "white")
                    .raise()


                innerSVG.append("path")
                    .attr("id", 'mapaGaleriaPrincipal')
                    .attr('d',mapaGaleriaPrincipal)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corZona5)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Galeria Principal")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')                    
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corZona5)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaVideoRoom')
                    .attr('d',mapaVideoRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corZona3)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Video Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corZona3)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaSalaOval')
                    .attr('d',mapaSalaOval)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corZona2)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Sala Oval")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corZona2)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaProjectRoom')
                    .attr('d',mapaProjectRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corZona4)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Project Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corZona4)
                    })

                innerSVG.raise()

                var verificar = 'user' + idOfClickedUser
                var client = d3.select("#" + verificar)

                    
                if(client.classed("selected") || firstTime != 0){
                    firstTime = 0
                    //DESENHAR MAPA
                    //EXTERIOR
                    svg.append('rect')
                        .attr("id", 'exterior')
                        .attr('x', 720)
                        .attr('y', 150)
                        .attr('width', 530)
                        .attr('height', 250)
                        .style("fill", corUserZona1)
                        .style('stroke', "black")
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 320
                            b = parseInt(d3.select(this).attr('y')) + 15
                            c = parseInt(d3.select(this).attr('y')) + 60
                            if(justificationUserZona1 != ""){
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 250 + "px")
                                .text("Exterior do museu\n" + "Justificação: " + justificationUserZona1)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', '#72839e')

                            }
                            else{
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 300 + "px")
                                .text("Exterior do museu: " + justificationUserZona1)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .style('fill', '#6E9EA4')
                                .duration('50')
                                
                            }
                                
                        })
                        .on('mouseout', function (d, i) {
                            if(justificationUserZona1 != ""){
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', corUserZona1)
                            }
                            else{
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .style('fill', 'white')
                                .duration('50')
                                .attr('opacity', '1');
                            }
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaGaleriaPrincipal')
                        .attr('d',mapaGaleriaPrincipal)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserZona5)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 15
                            c = parseInt(d3.select(this).attr('y')) + 60
                
                            if(justificationUserZona5 != ""){
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 250 + "px")
                                .text("Galeria Principal\n" + "Justificação: " + justificationUserZona5)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', '#72839e')

                            }
                            else{
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 230 + "px")
                                .text("Galeria Principal: " + justificationUserZona5)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .style('fill', '#6E9EA4')
                                .duration('50')
                                
                            }
                                
                        })
                        .on('mouseout', function (d, i) {
                            if(justificationUserZona5 != ""){
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .attr('opacity', '1')
                                .style('fill', corUserZona5)
                            }
                            else{
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .style('fill', 'white')
                                .duration('50')
                                .attr('opacity', '1');
                            }
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaVideoRoom')
                        .attr('d',mapaVideoRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserZona3)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 15
                            c = parseInt(d3.select(this).attr('y')) + 60
                            if(justificationUserZona3 != ""){
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 250 + "px")
                                .text("Video Room\n" + "Justificação: " + justificationUserZona3)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', '#72839e')

                            }
                            else{
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 200 + "px")
                                .text("Video Room: " + justificationUserZona3)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .style('fill', '#6E9EA4')
                                .duration('50')
                            }
                                
                        })
                        .on('mouseout', function (d, i) {
                            if(justificationUserZona3 != ""){
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', corUserZona3)
                            }
                            else{
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .style('fill', 'white')
                                .duration('50')
                                .attr('opacity', '1');
                            }
                            
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaSalaOval')
                        .attr('d',mapaSalaOval)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserZona2)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 15
                            c = parseInt(d3.select(this).attr('y')) + 60
                            
                            if(justificationUserZona2 != ""){
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 250 + "px")
                                .text("Sala Oval\n" + "Justificação: " + justificationUserZona2)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', '#72839e')

                            }
                            else{
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 200 + "px")
                                .text("Sala Oval: " + justificationUserZona2)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .style('fill', '#6E9EA4')
                                .duration('50')
                                 
                            }
                                
                        })
                        .on('mouseout', function (d, i) {
                            if(justificationUserZona2 != ""){
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .attr('opacity', '1')
                                .style('fill', corUserZona2);
                            }
                            else{
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .style('fill', 'white')
                                .duration('50')
                                .attr('opacity', '1');
                            }
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaProjectRoom')
                        .attr('d',mapaProjectRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserZona4)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 15
                            c = parseInt(d3.select(this).attr('y')) + 60
                            if(justificationUserZona4 != ""){
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 250 + "px")
                                .text("Project Room\n" + "Justificação: " + justificationUserZona4)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .style('fill', '#72839e')

                            }
                            else{
                                d3.select('#tooltip')
                                .transition().duration(200)
                                .style('opacity', 1)
                                .style("left", a + "px")     
                                .style("top", c + "px")
                                .style("width", 200 + "px")
                                .text("Project Room: " + justificationUserZona4)
                                .style("color", "#6E9EA4")
                                .style("font-family", "Roboto")
                                .style("font-size", '14px')
                                d3.select(this)
                                .transition()
                                .style('fill', '#6E9EA4')
                                .duration('50')
                                
                            }
                            
                                
                        })
                        .on('mouseout', function (d, i) {
                            if(justificationUserZona4 != ""){
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .duration('50')
                                .attr('opacity', '1')
                                .style('fill', corUserZona4)
                            }
                            else{
                                d3.select('#tooltip')
                                .style('opacity', 0)
                                d3.select(this)
                                .transition()
                                .style('fill', 'white')
                                .duration('50')
                                .attr('opacity', '1');
                            }
                        })

                    innerSVG.raise()

                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()

                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaExperienciaMenos)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
    
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaExperienciaMais)
                        .attr('x', 1160)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')

                }

            }
            if(d3.select("#g2").classed("selected")){
    
                linearGradientV.selectAll("stop")
                .data( colorScaleVisita.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleVisita.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                qual = "url(#linear-gradientV)"

                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientV)");

                //DESENHAR MAPA
                //EXTERIOR
                drawLocation()
                verFuturoSalas()
                verNumeroSalas()

                svg.append('rect')
                    .attr("id", 'exterior')
                    .attr('x', 720)
                    .attr('y', 150)
                    .attr('width', 530)
                    .attr('height', 250)
                    .style("fill", corVisitaZona1)
                    .style('stroke', "black")
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 320
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Exterior do museu")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corVisitaZona1)
                    })

                var innerSVG = svg.append('svg')
                    .attr('x', 700)
                    .attr('y', 100)
                    .attr('width',600)
                    .attr('height',550);


                innerSVG.append("path")
                    .attr("id", 'caminho')
                    .attr('d',caminho)
                    .attr("fill", "black")
                    .raise()
                                    
    
                innerSVG.append("path")
                    .attr("id", 'caminho2')
                    .attr('d',caminho2)
                    .attr("fill", "white")
                    .raise()


                innerSVG.append("path")
                    .attr("id", 'mapaGaleriaPrincipal')
                    .attr('d',mapaGaleriaPrincipal)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corVisitaZona5)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Galeria Principal")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corVisitaZona5)
                    })


                innerSVG.append("path")
                    .attr("id", 'mapaVideoRoom')
                    .attr('d',mapaVideoRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corVisitaZona3)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Video Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corVisitaZona3)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaSalaOval')
                    .attr('d',mapaSalaOval)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corVisitaZona2)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Sala Oval")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corVisitaZona2)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaProjectRoom')
                    .attr('d',mapaProjectRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corVisitaZona4)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Project Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corVisitaZona4)
                    })

                innerSVG.raise()

                svg.select("#legenda1").remove()
                svg.select("#legenda2").remove()

                svg.append('text')
                    .attr('id', 'legenda1')
                    .text(legendaVisitaMenosGeral)
                    .attr('x', 700)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
    
                svg.append('text')
                    .attr('id', 'legenda2')
                    .text(legendaVisitaMaisGeral)
                    .attr('x', 1120)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')

                    var verificar = 'user' + idOfClickedUser
                    var client = d3.select("#" + verificar)


                if(client.classed("selected")){
                    //DESENHAR MAPA
                    //EXTERIOR
                    svg.append('rect')
                        .attr("id", 'exterior')
                        .attr('x', 720)
                        .attr('y', 150)
                        .attr('width', 530)
                        .attr('height', 250)
                        .style("fill", corUserVisitaZona1)
                        .style('stroke', "black")
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 320
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Exterior do museu")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserVisitaZona1)
                        })
           

                    innerSVG.append("path")
                        .attr("id", 'mapaGaleriaPrincipal')
                        .attr('d',mapaGaleriaPrincipal)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserVisitaZona5)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Galeria Principal")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserVisitaZona5)
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaVideoRoom')
                        .attr('d',mapaVideoRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserVisitaZona3)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Video Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserVisitaZona3)
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaSalaOval')
                        .attr('d',mapaSalaOval)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserVisitaZona2)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Sala Oval")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserVisitaZona2)
                        })

                    innerSVG.append("path")
                        .attr("id", 'mapaProjectRoom')
                        .attr('d',mapaProjectRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserVisitaZona4)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Project Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona4)
                        })

                    innerSVG.raise()

                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()

                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaVisitaMenosUser)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
    
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaVisitaMaisUser)
                        .attr('x', 1160)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
    
                }

            }
            if(d3.select("#g3").classed("selected")){
                linearGradientF.selectAll("stop")
                .data( colorScaleFuturo.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleFuturo.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                
                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientF)");

                //DESENHAR MAPA
                //EXTERIOR
                svg.append('rect')
                    .attr("id", 'exterior')
                    .attr('x', 720)
                    .attr('y', 150)
                    .attr('width', 530)
                    .attr('height', 250)
                    .style("fill", corFutureZona1)
                    .style('stroke', "black")
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 320
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Exterior do museu")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corFutureZona1)
                    })

                    var innerSVG = svg.append('svg')
                    .attr('x', 700)
                    .attr('y', 100)
                    .attr('width',600)
                    .attr('height',550);


                innerSVG.append("path")
                    .attr("id", 'caminho')
                    .attr('d',caminho)
                    .attr("fill", "black")
                    .raise()
                                

                innerSVG.append("path")
                    .attr("id", 'caminho2')
                    .attr('d',caminho2)
                    .attr("fill", "white")
                    .raise()


                innerSVG.append("path")
                    .attr("id", 'mapaGaleriaPrincipal')
                    .attr('d',mapaGaleriaPrincipal)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corFutureZona5)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Galeria Principal")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corFutureZona5)
                    })
                innerSVG.append("path")
                    .attr("id", 'mapaVideoRoom')
                    .attr('d',mapaVideoRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corFutureZona3)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Video Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corFutureZona3)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaSalaOval')
                    .attr('d',mapaSalaOval)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corFutureZona2)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Sala Oval")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corFutureZona2)
                    })

                innerSVG.append("path")
                    .attr("id", 'mapaProjectRoom')
                    .attr('d',mapaProjectRoom)
                    .attr('x', 1030)
                    .attr('y', 150)
                    .attr("fill", corFutureZona4)
                    .on('mouseover', function (d, i) {
                        a = parseInt(d3.select(this).attr('x')) + 5
                        b = parseInt(d3.select(this).attr('y')) + 60
                        d3.select('#tooltip')
                        .transition().duration(200)
                        .style('opacity', 1)
                        .style("left", a + "px")     
                        .style("top", b + "px")
                        .text("Project Room")
                        .style("color", "#6E9EA4")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', '#72839e')
                    })
                    .on('mouseout', function (d, i) {
                        d3.select('#tooltip')
                        .style('opacity', 0)
                        d3.select(this)
                        .transition()
                        .duration('50')
                        .style('fill', corFutureZona4)
                    })

                innerSVG.raise()

                svg.select("#legenda1").remove()
                svg.select("#legenda2").remove()

                svg.append('text')
                    .attr('id', 'legenda1')
                    .text(legendaFutureMenosGeral)
                    .attr('x', 700)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')

                svg.append('text')
                    .attr('id', 'legenda2')
                    .text(legendaFutureMaisGeral)
                    .attr('x', 1120)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')

                var verificar = 'user' + idOfClickedUser
                var client = d3.select("#" + verificar)

                if(client.classed("selected")){
                            
                    //DESENHAR MAPA
                    //EXTERIOR
                    
                    svg.append('rect')
                        .attr("id", 'exterior')
                        .attr('x', 720)
                        .attr('y', 150)
                        .attr('width', 530)
                        .attr('height', 250)
                        .style("fill", corUserFutureZona1)
                        .style('stroke', "black")
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 320
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Exterior do museu")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona1)
                        })

  
                    //GALERIA
                    innerSVG.append("path")
                        .attr("id", 'mapaGaleriaPrincipal')
                        .attr('d',mapaGaleriaPrincipal)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserFutureZona5)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Galeria Principal")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona5)
                        })

                    //VIDEO ROOM
                    innerSVG.append("path")
                        .attr("id", 'mapaVideoRoom')
                        .attr('d',mapaVideoRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserFutureZona3)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Video Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona3)
                        })

                    //SALA OVAL
                    innerSVG.append("path")
                        .attr("id", 'mapaSalaOval')
                        .attr('d',mapaSalaOval)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserFutureZona2)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Sala Oval")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona2)
                        })
                                
                    //PROJECT ROOM
                    innerSVG.append("path")
                        .attr("id", 'mapaProjectRoom')
                        .attr('d',mapaProjectRoom)
                        .attr('x', 1030)
                        .attr('y', 150)
                        .attr("fill", corUserFutureZona4)
                        .on('mouseover', function (d, i) {
                            a = parseInt(d3.select(this).attr('x')) + 5
                            b = parseInt(d3.select(this).attr('y')) + 60
                            d3.select('#tooltip')
                            .transition().duration(200)
                            .style('opacity', 1)
                            .style("left", a + "px")     
                            .style("top", b + "px")
                            .text("Project Room")
                            .style("color", "#6E9EA4")
                            .style("font-family", "Roboto")
                            .style("font-size", '14px')
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', '#72839e')
                        })
                        .on('mouseout', function (d, i) {
                            d3.select('#tooltip')
                            .style('opacity', 0)
                            d3.select(this)
                            .transition()
                            .duration('50')
                            .style('fill', corUserFutureZona4)
                        })

                    innerSVG.raise()

                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()

                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaFutureMenosUser)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
    
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaFutureMaisUser)
                        .attr('x', 1150)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
    
                }

            } 

        }
        function colorir2(){                                   
            if(!d3.select("#g1").classed("selected")){     
                linearGradientE.selectAll("stop")
                .data( colorScaleZona1.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleZona1.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientE)");   
        
                //DESENHAR MAPA
                if(numeroDeZonas == 1){  
                    drawZone(corZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                } else if (numeroDeZonas == 2){
                    drawZone(corZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                } else if (numeroDeZonas == 3){
                    drawZone(corZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                } else if (numeroDeZonas == 4){
                    drawZone(corZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                    drawZone(corZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                } else if (numeroDeZonas == 5){
                    drawZone(corZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                    drawZone(corZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                    drawZone(corZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                    drawZone(corZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                    drawZone(corZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                }
                
        
        
        
                var verificar = 'user' + idOfClickedUser
                var client = d3.select("#" + verificar)
                    
                if(client.classed("selected")){
                    //DESENHAR MAPA
                    if(numeroDeZonas == 1){  
                        drawZone(corUserZona1, 'zona1', 720, 150, 540, 250, justificationUserZona1, nomeDaZona)
                    } else if (numeroDeZonas == 2){
                        drawZone(corUserZona1, 'zona1', 720, 150, 270, 250, justificationUserZona1, nomeDaZona)
                        drawZone(corUserZona2, 'zona2', 990, 150, 270, 250, justificationUserZona2, nomeDaZona2)
                    } else if (numeroDeZonas == 3){
                        drawZone(corUserZona1, 'zona1', 720, 150, 180, 250, justificationUserZona1, nomeDaZona)
                        drawZone(corUserZona2, 'zona2', 900, 150, 180, 250, justificationUserZona2, nomeDaZona2)
                        drawZone(corUserZona3, 'zona3', 1080, 150, 180, 250, justificationUserZona3, nomeDaZona3)                        
                    } else if (numeroDeZonas == 4){
                        drawZone(corUserZona1, 'zona1', 720, 150, 270, 125, justificationUserZona1, nomeDaZona)
                        drawZone(corUserZona2, 'zona2', 990, 150, 270, 125, justificationUserZona2, nomeDaZona2)
                        drawZone(corUserZona3, 'zona3', 720, 275, 270, 125, justificationUserZona3, nomeDaZona3)
                        drawZone(corUserZona4, 'zona4', 990, 275, 270, 125, justificationUserZona4, nomeDaZona4)
                    } else if (numeroDeZonas == 5){
                        drawZone(corUserZona1, 'zona1', 720, 150, 180, 125, justificationUserZona1, nomeDaZona)
                        drawZone(corUserZona2, 'zona2', 720, 275, 180, 125, justificationUserZona2, nomeDaZona2)
                        drawZone(corUserZona3, 'zona3', 900, 150, 180, 250, justificationUserZona3, nomeDaZona3)
                        drawZone(corUserZona4, 'zona4', 1080, 150, 180, 125, justificationUserZona4, nomeDaZona4)
                        drawZone(corUserZona5, 'zona5', 1080, 275, 180, 125, justificationUserZona5, nomeDaZona5)                        
                    }
                    
        
                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()
        
                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaExperienciaMenos)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaExperienciaMais)
                        .attr('x', 1160)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                }
        
            }
            if(d3.select("#g2").classed("selected")){
        
                linearGradientV.selectAll("stop")
                .data( colorScaleVisita.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleVisita.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                qual = "url(#linear-gradientV)"
        
                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientV)");
        
                //DESENHAR MAPA
                if(numeroDeZonas == 1){  
                    drawZone(corVisitaZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                } else if (numeroDeZonas == 2){
                    drawZone(corVisitaZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                    drawZone(corVisitaZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                } else if (numeroDeZonas == 3){
                    drawZone(corVisitaZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                    drawZone(corVisitaZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                    drawZone(corVisitaZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                } else if (numeroDeZonas == 4){
                    drawZone(corVisitaZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                    drawZone(corVisitaZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                    drawZone(corVisitaZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                    drawZone(corVisitaZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                } else if (numeroDeZonas == 5){
                    drawZone(corVisitaZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                    drawZone(corVisitaZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                    drawZone(corVisitaZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                    drawZone(corVisitaZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                    drawZone(corVisitaZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                }
                
        
                svg.select("#legenda1").remove()
                svg.select("#legenda2").remove()
        
                svg.append('text')
                    .attr('id', 'legenda1')
                    .text(legendaVisitaMenosGeral)
                    .attr('x', 700)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
        
                svg.append('text')
                    .attr('id', 'legenda2')
                    .text(legendaVisitaMaisGeral)
                    .attr('x', 1120)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
        
                    var verificar = 'user' + idOfClickedUser
                    var client = d3.select("#" + verificar)
        
        
                if(client.classed("selected")){
                    //DESENHAR MAPA
                    if(numeroDeZonas == 1){  
                        drawZone(corUserVisitaZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                    } else if (numeroDeZonas == 2){
                        drawZone(corUserVisitaZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                        drawZone(corUserVisitaZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                    } else if (numeroDeZonas == 3){
                        drawZone(corUserVisitaZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                        drawZone(corUserVisitaZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                        drawZone(corUserVisitaZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                    } else if (numeroDeZonas == 4){
                        drawZone(corUserVisitaZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                        drawZone(corUserVisitaZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                        drawZone(corUserVisitaZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                        drawZone(corUserVisitaZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                    } else if (numeroDeZonas == 5){
                        drawZone(corUserVisitaZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                        drawZone(corUserVisitaZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                        drawZone(corUserVisitaZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                        drawZone(corUserVisitaZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                        drawZone(corUserVisitaZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                    }
                    
        
                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()
        
                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaVisitaMenosUser)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaVisitaMaisUser)
                        .attr('x', 1160)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                }
        
            }
            if(d3.select("#g3").classed("selected")){
                linearGradientF.selectAll("stop")
                .data( colorScaleFuturo.range() )
                .enter().append("stop")
                .attr("offset", function(d,i) { return i/(colorScaleFuturo.range().length-1); })
                .attr("stop-color", function(d) { return d; });
                
                //RETANGULO LEGENDA
                svg.append("rect")
                    .attr('x', 720)
                    .attr('y', 485)
                    .attr('width', 530)
                    .attr('height', 25)
                    .style("fill", "url(#linear-gradientF)");
        
                //DESENHAR MAPA
                if(numeroDeZonas == 1){  
                    drawZone(corFutureZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                } else if (numeroDeZonas == 2){
                    drawZone(corFutureZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                    drawZone(corFutureZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                } else if (numeroDeZonas == 3){
                    drawZone(corFutureZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                    drawZone(corFutureZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                    drawZone(corFutureZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                } else if (numeroDeZonas == 4){
                    drawZone(corFutureZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                    drawZone(corFutureZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                    drawZone(corFutureZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                    drawZone(corFutureZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                } else if (numeroDeZonas == 5){
                    drawZone(corFutureZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                    drawZone(corFutureZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                    drawZone(corFutureZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                    drawZone(corFutureZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                    drawZone(corFutureZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                }
                
        
                svg.select("#legenda1").remove()
                svg.select("#legenda2").remove()
        
                svg.append('text')
                    .attr('id', 'legenda1')
                    .text(legendaFutureMenosGeral)
                    .attr('x', 700)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
        
                svg.append('text')
                    .attr('id', 'legenda2')
                    .text(legendaFutureMaisGeral)
                    .attr('x', 1120)
                    .attr('y', 525)
                    .style("fill", "#0d4148FF")
                    .style("font-family", "Roboto")
                    .style("font-size", '14px')
        
                var verificar = 'user' + idOfClickedUser
                var client = d3.select("#" + verificar)
        
                if(client.classed("selected")){
                            
                    //DESENHAR MAPA
                    if(numeroDeZonas == 1){  
                        drawZone(corUserFutureZona1, 'zona1', 720, 150, 540, 250, "", nomeDaZona)
                    } else if (numeroDeZonas == 2){
                        drawZone(corUserFutureZona1, 'zona1', 720, 150, 270, 250, "", nomeDaZona)
                        drawZone(corUserFutureZona2, 'zona2', 990, 150, 270, 250, "", nomeDaZona2)
                    } else if (numeroDeZonas == 3){
                        drawZone(corUserFutureZona1, 'zona1', 720, 150, 180, 250, "", nomeDaZona)
                        drawZone(corUserFutureZona2, 'zona2', 900, 150, 180, 250, "", nomeDaZona2)
                        drawZone(corUserFutureZona3, 'zona3', 1080, 150, 180, 250, "", nomeDaZona3)                        
                    } else if (numeroDeZonas == 4){
                        drawZone(corUserFutureZona1, 'zona1', 720, 150, 270, 125, "", nomeDaZona)
                        drawZone(corUserFutureZona2, 'zona2', 990, 150, 270, 125, "", nomeDaZona2)
                        drawZone(corUserFutureZona3, 'zona3', 720, 275, 270, 125, "", nomeDaZona3)
                        drawZone(corUserFutureZona4, 'zona4', 990, 275, 270, 125, "", nomeDaZona4)
                    } else if (numeroDeZonas == 5){
                        drawZone(corUserFutureZona1, 'zona1', 720, 150, 180, 125, "", nomeDaZona)
                        drawZone(corUserFutureZona2, 'zona2', 720, 275, 180, 125, "", nomeDaZona2)
                        drawZone(corUserFutureZona3, 'zona3', 900, 150, 180, 250, "", nomeDaZona3)
                        drawZone(corUserFutureZona4, 'zona4', 1080, 150, 180, 125, "", nomeDaZona4)
                        drawZone(corUserFutureZona5, 'zona5', 1080, 275, 180, 125, "", nomeDaZona5)                        
                    }
                    
        
                    svg.select("#legenda1").remove()
                    svg.select("#legenda2").remove()
        
                    svg.append('text')
                        .attr('id', 'legenda1')
                        .text(legendaFutureMenosUser)
                        .attr('x', 700)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                    svg.append('text')
                        .attr('id', 'legenda2')
                        .text(legendaFutureMaisUser)
                        .attr('x', 1150)
                        .attr('y', 525)
                        .style("fill", "#0d4148FF")
                        .style("font-family", "Roboto")
                        .style("font-size", '14px')
        
                }
        
            } 
        
        }





                }    
            )
        }
    ) 
        }
    )    
}





