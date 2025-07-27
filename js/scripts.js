
// Menu lateral com transição para as páginas
const nav = document.querySelector(".itens-menu"), 
    navList = nav.querySelectorAll("li"), 
    totalNavList =  navList.length, 
    allSection = document.querySelectorAll(".section"), 
    totalSection = allSection.length;

for(let i=0; i < totalNavList; i++){
    const a = navList[i].querySelector("a"); 
    console.log(a)
    a.addEventListener("click", function(e){
        
        // Verifica se é um link externo (target="_blank" ou não começa com #)
        const href = this.getAttribute("href");
        if(this.getAttribute("target") === "_blank" || !href.startsWith("#")){
            // Se for externo, apenas deixa o navegador seguir o link normalmente
            return;
        }
        
        // Previne o comportamento padrão apenas para links internos
        e.preventDefault();
        e.stopPropagation();
        
        // Force remove active from all links first
        for(let j=0; j<totalNavList; j++){
            navList[j].querySelector("a").classList.remove("active"); 
        }
        
        //Removendo a classe back-ection
        for (let i=0; i < totalSection; i++){
            allSection[i].classList.remove("back-section");
            allSection[i].classList.remove("active");
        }

        // Add active to current link
        this.classList.add("active");
        
        // Show the target section
        const target = href.split("#")[1];
        const targetSection = document.querySelector("#" + target);
        if(targetSection){
            targetSection.classList.add("active");
        }

        //Para quando selecionado um botão do menu lateral, o mini-menu feche automaticamente
        if(window.innerWidth < 1200){
            lateralSectionBtn();
        }
    })
}

function showSection(element){
    // Esta função agora é apenas para compatibilidade
    // A lógica principal está no event listener acima
    console.log("showSection called for:", element);
}   


// Mini Menu responsivo
const miniMenu = document.querySelector(".mini-menu-button"), 
      lateral = document.querySelector(".lateral");

miniMenu.addEventListener("click", lateralSectionBtn)

function  lateralSectionBtn(){
    lateral.classList.toggle("open");
    miniMenu.classList.toggle("open");
    
    for (let i=0; i < totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}