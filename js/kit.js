const listaKits = async () => {
    const listaKits = document.getElementById('list-kits-cards');
    listaKits.innerHTML = '';
    const kits = await axios.get('http://localhost:3000/kits')
    if(kits.data.length === 0){
        const li = document.createElement('li');
        li.innerHTML = 'Nenhum kit cadastrado.';
        listaKits.appendChild(li);
        const listaKitsCards = document.getElementsByClassName('lista-kits');
        listaKitsCards[0].style.display = 'block';
        return;
    } else {
        kits.data.forEach((kits) => {
            const li = document.createElement('li');
            li.innerHTML = `Serviço: ${kits.nome_do_kit}`;
            li.setAttribute('kit-id', kits.id)
            li.addEventListener('click', handleKitLiClick)
            listaKits.appendChild(li);
            const listaKitsCards = document.getElementsByClassName('lista-kits');
            listaKitsCards[0].style.display = 'block';

            // Remover o botão "Realizar Compra" do container de serviços (se existir)
            const comprarButtonContainer = document.querySelector('.comprar-button-container');
            if (comprarButtonContainer) {
                comprarButtonContainer.innerHTML = '';
            }


        })
    }
}

const handleKitLiClick = (event) => {
    const kitId= event.currentTarget.getAttribute('kit-id')
    let selectedKits = sessionStorage.getItem('selectedKits');
    selectedKits = selectedKits ? JSON.parse(selectedKits) : [];
    let selectedServicos = sessionStorage.getItem('selectedServicos');

    if(selectedServicos) {
        sessionStorage.removeItem('selectedServicos');
        selectedServicos = [];
        const servicoElements = document.querySelectorAll('#list-service-cards li');
        servicoElements.forEach(elem => elem.classList.remove('selected-card'));
        // Remover o botão "Realizar Compra" do container de serviços (se existir)
        const comprarButtonContainer = document.querySelector('.comprar-button-container');
        if (comprarButtonContainer) {
            comprarButtonContainer.innerHTML = '';
        }
    }
    if (selectedKits.includes(kitId)) {
        selectedKits = selectedKits.filter(id => id !== kitId);
        event.currentTarget.classList.remove('selected-card');
    } else {
        selectedKits.push(kitId);
        event.currentTarget.classList.add('selected-card');
    }

    sessionStorage.setItem('selectedKits', JSON.stringify(selectedKits));

    const comprarButtonContainerKits = document.querySelector('.comprar-button-container-kits');
    if (selectedKits.length > 0) {
        comprarButtonContainerKits.innerHTML = '';
        const comprarButton = document.createElement('button');
        comprarButton.textContent = 'Realizar Compra';
        comprarButton.addEventListener('click', handleCompraButtonKitsClick);
        comprarButtonContainerKits.appendChild(comprarButton);
    } else {
        comprarButtonContainerKits.innerHTML = '';
    }
}

const handleCompraButtonKitsClick= async (event) => {
    // Obtenha os valores do Session Storage
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    const selectedCartaoId = sessionStorage.getItem('selectedCartaoId');
    const selectedKits = sessionStorage.getItem('selectedKits');

    // Verifique se os valores necessários estão presentes
    if (!selectedUserId || !selectedCartaoId || !selectedKits) {
        alert('Valores ausentes no Session Storage. Não é possível realizar a compra.');
        return;
    }

    const kitsIds = JSON.parse(selectedKits).map(id => parseInt(id));

    const requestBody = {
        id_usuario: parseInt(selectedUserId),
        id_cartao_de_servicos: parseInt(selectedCartaoId),
        kits: kitsIds,
        valor_total: 150.0 // Fixo por enquanto não estamos considerando valor
    };

    try {
        const result = await axios.post('http://localhost:3000/kits/comprar', requestBody)
        if (result.status === 200) {
            alert('Compra realizada com sucesso.');
            sessionStorage.removeItem('selectedCartaoId');
            sessionStorage.removeItem('selectedKits');
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