let carrinho = [];
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal-burger');
const closeModal = document.querySelector('.close-modal');
const listaIngredientes = document.getElementById('lista-ingredientes');
const modalImg = document.getElementById('modal-img');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricao = document.getElementById('modal-descricao');
const abaPedido = document.getElementById('aba-pedido');
const itensPedidoContainer = document.getElementById('itens-pedido');
const overlay = document.getElementById('overlay-pedido');
const cards = document.querySelectorAll('.card');

function destaques() {
    var abaDestaque = document.getElementById("destaque");
    
    if (abaDestaque.style.display === "none" || abaDestaque.style.display === "") {
        abaDestaque.style.display = "block";
    } else {
        abaDestaque.style.display = "none";
    }
}

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    if (value.length > 0) searchInput.classList.add('has-text');
    else searchInput.classList.remove('has-text');

    cards.forEach(card => {
        const content = card.textContent.toLowerCase();
        card.style.display = content.includes(value) ? 'block' : 'none';
    });
});

function garçom(){
  Swal.fire({
  title: "🍔 Opa! Já estamos indo. O garçom já foi notificado e está a caminho da sua mesa.",
  icon: "success",
  draggable: true
});
}

const informacoesLanches = {
    "Burger": { descricao: "Pão de hambúrguer, burger 160 gramas, queijo mussarela e maionese artesanal", itens: ["Pão", "Hambúrguer", "Queijo", "Maionese"], preco: 25.00 },
    "Burger cheddar": { descricao: "Pão de hambúrger,burger 160 gramas, queijo cheddar em fatias, e maionese", itens: ["Pão", "Hambúrguer", "Cheddar", "Maionase"], preco: 25.00 },
    "Cheese milho": { descricao: "Pão de hamburger australiano, burger 160 gramas, milho, queijo mussarela, tomate e maionese artesanal", itens: ["Pão", "Hambúrguer", "Queijo", "Milho", "Maionese"], preco: 26.00 },
    "Salada burger": { descricao: "Pão de hamburger australiano, burger 160 gramas, queijo mussarela, tomate e maionese artesanal", itens: ["Pão", "Hambúrguer", "Alface e Tomate", "Maionese"], preco: 27.00 },
    "Burger bacon": { descricao: "Pão de hamburger australiano, burger 160 gramas, fatias de bacon, queijo mussarela, tomate e maionese artesanal", itens: ["Pão", "Hambúrguer", "Bacon", "Queijo", "Tomate", "Maionese"], preco: 28.00 },
    "Mortz": { descricao: "Pão de brioche, 2 smashs de 80g cada disco, queijo cheddar, cebola roxa e maionese artesanal", itens: ["Pão de brioche", "Hambúrguer (1)","Hambúrger(2)", "Queijo", "Cebola roxa"], preco: 33.00 },
    "Paulista": { descricao: "Pão de brioche, 2 smashs de 80g cada disco, queijo cheddar em fatias, ovo, fatias de bacon e maionese artesanal", itens: ["Pão","Hambúrguer (1)","Hambúrger(2)", "Cheddar", "Ovo", "Bacon"], preco: 34.00 },
    "Cadillac": { descricao: "Pão de brioche, 2 smashs de 80g cada disco, queijo mussarela,sticks de queijo mussarela, molho barbecue, fatias de bacon e maionese artesanal", itens: ["Pão","Hambúrguer (1)","Hambúrger(2)", "Mussarela", "Sticks de mussarela","Molho barbecue", "Bacon"], preco: 37.00 },
    "New cheddar": { descricao: "Pão de brioche, 2 smashs de 80g cada disco, fatias de bacon, queijo cheddar, onions rings e maionese artesanal", itens: ["Pão", "Hambúrguer(1)", "Hambúger(2)", "Bacon","Cheddar", "Onions rings"], preco: 34.00 },
    "Batata M": { descricao: "Batatas crocantes, 150 gramas", itens: ["Batata Palito","Batata Rústica", "Batata Chips", "Batata Smiles"], todosDesmarcados: true, preco: 27.00 },
    "Coca lata zero": { descricao: "Refrigerante Coca-Cola 350ml em lata: sabor zero açúcar", itens: ["Gelo", "Limão"], todosDesmarcados: true, preco: 7.00 },
    "Coca lata": { descricao: "Refrigerante Coca-Cola 350ml em lata: sabor original", itens: ["Gelo", "Limão"], todosDesmarcados: true, preco: 7.00 },
    "Best bacon": { descricao: "Pão de brioche, 2 smashs de 80g cada disco, fatias de bacon, queijo cheddar, picle e maionese artesanal", itens: ["Pão", "Hambúrguer", "Bacon", "Queijo", "Picles"], preco: 34.00 }
};

const botoesAbrirModal = document.querySelectorAll('#add');
botoesAbrirModal.forEach((botao) => {
    botao.addEventListener('click', (event) => {
        const cardPai = event.target.closest('.card');
        const headerCard = cardPai.querySelector('.card-cima, .card-cimaA');
        const nomeLanche = headerCard.querySelector('p').innerText;
        const imagemSrc = headerCard.querySelector('img').src;

        modalTitulo.innerText = nomeLanche;
        modalImg.src = imagemSrc;

        const info = informacoesLanches[nomeLanche];
        listaIngredientes.innerHTML = "";

        if (info) {
            modalDescricao.innerText = info.descricao;
            const statusCheck = info.todosDesmarcados ? "" : "checked";

            info.itens.forEach(item => {
                const label = document.createElement('label');
                label.className = 'item-ingrediente';
                label.innerHTML = `
                    <span>${item}</span>
                    <input type="checkbox" ${statusCheck} class="ingrediente-checkbox">
                    <div class="check-box-visual"></div>
                `;
                
                const input = label.querySelector('input');
                input.addEventListener('change', () => {
                    if (nomeLanche === "Batata M" && input.checked) {
                        listaIngredientes.querySelectorAll('.ingrediente-checkbox').forEach(cb => {
                            if (cb !== input) cb.checked = false;
                        });
                    }
                });
                listaIngredientes.appendChild(label);
            });
        }
        modal.style.display = 'block';
    });
});

const fecharModal = () => modal.style.display = 'none';
closeModal.onclick = fecharModal;
window.onclick = (e) => { if (e.target == modal) fecharModal(); };

const fecharPedido = () => {
    abaPedido.classList.remove('active');
    overlay.classList.remove('active');
};
document.querySelector('.close-sidebar').onclick = fecharPedido;
overlay.onclick = fecharPedido;

document.querySelector('a[href=""]').addEventListener('click', (e) => {
    e.preventDefault();
    abaPedido.classList.add('active');
    overlay.classList.add('active');
});

function atualizarVisualizacaoPedido() {
    itensPedidoContainer.innerHTML = "";
    let totalGeral = 0;

    if (carrinho.length === 0) {
        itensPedidoContainer.innerHTML = '<p class="pedido-vazio">Seu carrinho está vazio.</p>';
        document.getElementById('total-pedido').innerText = "R$ 0,00";
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const div = document.createElement('div');
        div.className = 'card-item-pedido';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #444;">
                <div>
                    <strong style="color: #ff0000;">${item.nome}</strong>
                    <ul style="font-size: 0.75rem; color: #ccc; margin: 5px 0; list-style: none; padding-left: 5px;">
                        ${item.ingredientes.length > 0 ? item.ingredientes.map(ing => `<li>- ${ing}</li>`).join('') : '<li>- S/ adicionais</li>'}
                    </ul>
                    <span style="color: #25d366; font-weight: bold;">R$ ${subtotal.toFixed(2)}</span>
                </div>
                <div class="item-controles" style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="alterarQuantidadeCarrinho(${index}, -1)" style="background:#ff0000; color:white; border:none; width:25px; cursor:pointer;">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidadeCarrinho(${index}, 1)" style="background:#ff0000; color:white; border:none; width:25px; cursor:pointer;">+</button>
                </div>
            </div>
        `;
        itensPedidoContainer.appendChild(div);
    });

    document.getElementById('total-pedido').innerText = `R$ ${totalGeral.toFixed(2)}`;
}

window.alterarQuantidadeCarrinho = (index, delta) => {
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) carrinho.splice(index, 1);
    atualizarVisualizacaoPedido();
};

document.getElementById('btn-fechar-pedido').addEventListener('click', () => {
    const nomeLanche = modalTitulo.innerText;
    const info = informacoesLanches[nomeLanche];
    
    const escolhidos = [];
    document.querySelectorAll('.ingrediente-checkbox:checked').forEach(check => {
        escolhidos.push(check.previousElementSibling.innerText);
    });

    const novoItem = {
        nome: nomeLanche,
        preco: info ? info.preco : 0,
        quantidade: 1,
        ingredientes: escolhidos
    };

    carrinho.push(novoItem);
    atualizarVisualizacaoPedido();
    fecharModal();
    
    abaPedido.classList.add('active');
    overlay.classList.add('active');
});

document.getElementById('btn-enviar-cozinha').addEventListener('click', () => {
    if (carrinho.length === 0) {
      Swal.fire({
        title: "Adicione itens ao pedido antes de enviar!",
        icon: "error",
        draggable: true
      });
      fecharPedido();
      return;
    }
    Swal.fire({
        title: "👨‍🍳 Pedido enviado com sucesso para a cozinha!",
        icon: "success",
        draggable: true
      });
    carrinho = [];
    atualizarVisualizacaoPedido();
    fecharPedido();
});

listaIngredientes.addEventListener('wheel', (event) => {
    event.preventDefault();
    listaIngredientes.scrollTop += event.deltaY > 0 ? 40 : -40;
}, { passive: false });