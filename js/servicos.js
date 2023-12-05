const listaServicos = async () => {
    const listaServicos = document.getElementById('list-service-cards');
    listaServicos.innerHTML = '';
    const servicos = await axios.get('http://localhost:3000/servicos')
    if(servicos.data.length === 0){
        const li = document.createElement('li');
        li.innerHTML = 'Nenhum serviço cadastrado.';
        listaServicos.appendChild(li);
        const listaServices = document.getElementsByClassName('lista-servicos');
        listaServices[0].style.display = 'block';
        return;
    } else {
        servicos.data.forEach((servico) => {
            const li = document.createElement('li');
            li.innerHTML = `Serviço: ${servico.nome_do_servico}`;
            li.setAttribute('servico-id', servico.id)
            li.addEventListener('click', handleServicoLiClick)
            listaServicos.appendChild(li);
            const listaServices = document.getElementsByClassName('lista-servicos');
            listaServices[0].style.display = 'block';

            // Remover o botão "Realizar Compra" do container de kits (se existir)
            const comprarButtonContainerKits = document.querySelector('.comprar-button-container-kits');
            if (comprarButtonContainerKits) {
                comprarButtonContainerKits.innerHTML = '';
            }
        })
    }
}

const listarTodasAsComprasDoUsuario = async () => {
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    const acordeaoContainer = document.getElementById('acordeao-container');
    acordeaoContainer.innerHTML = '';
    const response = await axios.get(`http://localhost:3000/compras/${selectedUserId}`);

    if (response.status === 200) {
        for (const compra of response.data) {
            const itemAcordeao = document.createElement('button');
            itemAcordeao.classList.add('acordeao-item');
            itemAcordeao.textContent = `Compra ${compra.id} - Data Da Compra ${new Date(compra.data_da_compra).toLocaleDateString()}`

            // Adicionando o item do acordeão ao container
            acordeaoContainer.appendChild(itemAcordeao);

            const responseDetalhes = await axios.get(`http://localhost:3000/compras/${compra.id}/detalhes`);
            const conteudoAcordeao = document.createElement('div');
            conteudoAcordeao.classList.add('acordeao-content');

            let detalhesHTML = '';
            for (const detalhe of responseDetalhes.data) {
                if(detalhe.id_servico) {
                detalhesHTML += `<p>ID do Serviço: ${detalhe.id_servico}, Quantidade: ${detalhe.quantidade}, Preço Unitário: ${detalhe.preco_unitario}, Utilizado: ${detalhe.utilizado}</p>`;
                } else if (detalhe.id_kit) {
                    detalhesHTML += `<p>ID do Kit: ${detalhe.id_kit}, Quantidade: ${detalhe.quantidade}, Preço Unitário: ${detalhe.preco_unitario}, Utilizado: ${detalhe.utilizado}</p>`;
                }
            }
            conteudoAcordeao.innerHTML = detalhesHTML;

            // Adicionando o conteúdo do acordeão ao container
            acordeaoContainer.appendChild(conteudoAcordeao);

            itemAcordeao.addEventListener('click', function() {
                this.classList.toggle('active');
                const conteudo = this.nextElementSibling;
                if (conteudo.style.display === 'block') {
                    conteudo.style.display = 'none';
                } else {
                    conteudo.style.display = 'block';
                }
            });
        }

        document.querySelector('.acordeao-servicos').style.display = 'block';
    }
}


const listarTodasAsRecompensasDoUsuario = async () => {
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    const acordeaoContainer = document.getElementById('acordeao-recompensas-container');
    acordeaoContainer.innerHTML = '';
    const response = await axios.get(`http://localhost:3000/recompensas/${selectedUserId}`);

    if (response.status === 200) {
        for (const recompensa of response.data) {
            const itemAcordeao = document.createElement('button');
            itemAcordeao.classList.add('acordeao-item');
            itemAcordeao.textContent = `Recompensa ${recompensa.id} Ativa: ${recompensa.ativa}`

            // Adicionando o item do acordeão ao container
            acordeaoContainer.appendChild(itemAcordeao);

            itemAcordeao.addEventListener('click', function() {
                this.classList.toggle('active');
                const conteudo = this.nextElementSibling;
                if (conteudo.style.display === 'block') {
                    conteudo.style.display = 'none';
                } else {
                    conteudo.style.display = 'block';
                }
            });
        }

        document.querySelector('.acordeao-recompensas').style.display = 'block';
    }
}


const handleServicoLiClick = (event) => {
    const servicoId= event.currentTarget.getAttribute('servico-id')
    let selectedServicos = sessionStorage.getItem('selectedServicos');
    selectedServicos = selectedServicos ? JSON.parse(selectedServicos) : [];
    let selectedKits  = sessionStorage.getItem('selectedKits');


    if(selectedKits) {
        sessionStorage.removeItem('selectedKits');
        selectedKits = [];
        const kitElements = document.querySelectorAll('#list-kits-cards li');
        kitElements.forEach(elem => elem.classList.remove('selected-card'))
        // Remover o botão "Realizar Compra" do container de serviços (se existir)
        const comprarButtonContainer = document.querySelector('.comprar-button-container-kits');
        if (comprarButtonContainer) {
            comprarButtonContainer.innerHTML = '';
        }
    }

    if (selectedServicos.includes(servicoId)) {
        selectedServicos = selectedServicos.filter(id => id !== servicoId);
        event.currentTarget.classList.remove('selected-card');
    } else {
        selectedServicos.push(servicoId);
        event.currentTarget.classList.add('selected-card');
    }

    sessionStorage.setItem('selectedServicos', JSON.stringify(selectedServicos));

    const comprarButtonContainer = document.querySelector('.comprar-button-container');
    if (selectedServicos.length > 0) {
        comprarButtonContainer.innerHTML = '';
        const comprarButton = document.createElement('button');
        comprarButton.textContent = 'Realizar Compra';
        comprarButton.addEventListener('click', handleCompraButtonServicosClick);
        comprarButtonContainer.appendChild(comprarButton);
    } else {
        comprarButtonContainer.innerHTML = '';
    }

}

const handleCompraButtonServicosClick= async (event) => {
    // Obtenha os valores do Session Storage
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    const selectedCartaoId = sessionStorage.getItem('selectedCartaoId');
    const selectedServicos = sessionStorage.getItem('selectedServicos');

    // Verifique se os valores necessários estão presentes
    if (!selectedUserId || !selectedCartaoId || !selectedServicos) {
        alert("Você deve selecionar um cartão de serviço, um serviço ou um kit para realizar a compra");
        return;
    }
    const servicosIds = JSON.parse(selectedServicos).map(id => parseInt(id));

    const requestBody = {
        id_usuario: parseInt(selectedUserId),
        id_cartao_de_servicos: parseInt(selectedCartaoId),
        servicos: servicosIds,
        valor_total: 150.0 // Fixo por enquanto não estamos considerando valor
    };
    try {
        const result = await axios.post('http://localhost:3000/servicos/comprar', requestBody)
        if (result.status === 200) {
            alert('Compra realizada com sucesso.');
            sessionStorage.removeItem('selectedCartaoId');
            sessionStorage.removeItem('selectedServicos');
            await listaCartoes()
            await listaServicos()
            await listaKits()
            await listarTodasAsComprasDoUsuario()
            await listarTodasAsRecompensasDoUsuario
        } else {
            alert('Erro ao realizar a compra: ' + result.status);
        }
    } catch (error) {
        alert('Erro ao realizar a compra: ' + error.message);
    }
}