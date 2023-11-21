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
        } else {
            alert('Erro ao realizar a compra: ' + result.status);
        }
    } catch (error) {
        alert('Erro ao realizar a compra: ' + error.message);
    }
}