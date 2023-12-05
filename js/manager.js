const listarVendasDeServicosIndividuais = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/vendas/servicos`)
       const vendas = response.data
       // Listar vendas de serviços individuais
       const listaVendas = document.getElementById('vendas-servicos-individuais-container');
       listaVendas.innerHTML = '';
         if (vendas.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhuma venda de serviço individual encontrada.';
              listaVendas.appendChild(li);
         } else {
              for (const venda of vendas) {
                const li = document.createElement('li');
                li.innerHTML = `<p> Nome Servico: ${venda.nome_do_servico} Quantidade: ${venda.qtd_vendas}</p>`;
                listaVendas.appendChild(li);
              }
         }
        const servicosIndivi = document.getElementsByClassName('vendas-servicos-individuais');
        servicosIndivi[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar vendas de serviços individuais:', error);
        throw error;
    }
}


const listarVendasDeKits = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/vendas/kits`)
       const vendas = response.data
       // Listar vendas de kits
       const listaVendas = document.getElementById('vendas-kits-container');
       listaVendas.innerHTML = '';
         if (vendas.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhuma venda de kit encontrada.';
              listaVendas.appendChild(li);
         } else {
              for (const venda of vendas) {
                const li = document.createElement('li');
                li.innerHTML = `<p> Nome Kit: ${venda.nome_do_kit} Quantidade: ${venda.qtd_vendas}</p>`;
                listaVendas.appendChild(li);
              }
         }
        const vendasKit = document.getElementsByClassName('vendas-kits');
        vendasKit[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar vendas de kits:', error);
        throw error;
    }
}

const servicosUtilizadosTipo = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/servicos/utilizados`)
       const servicos = response.data
       // Listar serviços utilizados
       const listaServicos = document.getElementById('servicos-utilizados-tipo-container');
       listaServicos.innerHTML = '';
         if (servicos.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhum serviço utilizado encontrado.';
              listaServicos.appendChild(li);
         } else {
              for (const servico of servicos) {
                const li = document.createElement('li');
                li.innerHTML = `<p> Nome Servico: ${servico.nome_do_servico} Quantidade: ${servico.qtd_utilizados}</p>`;
                listaServicos.appendChild(li);
              }
         }
        const providerView = document.getElementsByClassName('servicos-utilizados-tipo');
        providerView[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar serviços utilizados:', error);
        throw error;
    }
}


const listarRecompensasGeradas = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/recompensas`)
       const recompensas = response.data
       // Listar recompensas geradas
       const listaRecompensas = document.getElementById('recompensas-geradas-container');
       listaRecompensas.innerHTML = '';
         if (recompensas.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhuma recompensa gerada encontrada.';
              listaRecompensas.appendChild(li);
         } else {
              for (const recompensa of recompensas) {
                const li = document.createElement('li');
                li.innerHTML = `<p>Quantidade: ${recompensa.qtd_recompensas}</p>`;
                listaRecompensas.appendChild(li);
              }
         }
        const providerView = document.getElementsByClassName('recompensas-geradas');
        providerView[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar recompensas geradas:', error);
        throw error;
    }
}

//listarServicosIndividuaisNaoUtilizados
const listarServicosIndividuaisNaoUtilizados = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/servicos/nao-utilizados`)
       const servicos = response.data
       // Listar serviços individuais não utilizados
       const listaServicos = document.getElementById('servicos-nao-utilizados-container');
       listaServicos.innerHTML = '';
         if (servicos.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhum serviço individual não utilizado encontrado.';
              listaServicos.appendChild(li);
         } else {
              for (const servico of servicos) {
                const li = document.createElement('li');
                li.innerHTML = `<p> Nome Servico: ${servico.nome_do_servico} Quantidade: ${servico.qtd_nao_utilizados}</p>`;
                listaServicos.appendChild(li);
              }
         }
        const providerView = document.getElementsByClassName('servicos-nao-utilizados');
        providerView[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar serviços individuais não utilizados:', error);
        throw error;
    }
}

//listarKitsDeServicosNaoUtilizados
const listarKitsDeServicosNaoUtilizados = async () => {
    try {
       const response = await axios.get(`http:localhost:3000/admin/kits/nao-utilizados`)
       const kits = response.data
       // Listar kits de serviços não utilizados
       const listaKits = document.getElementById('kits-nao-utilizados-container');
       listaKits.innerHTML = '';
         if (kits.length === 0) {
              const li = document.createElement('li');
              li.innerHTML = 'Nenhum kit não utilizado encontrado.';
              listaKits.appendChild(li);
         } else {
              for (const kit of kits) {
                const li = document.createElement('li');
                li.innerHTML = `<p> Nome Kit: ${kit.nome_do_kit} Quantidade: ${kit.qtd_nao_utilizados}</p>`;
                listaKits.appendChild(li);
              }
         }
        const providerView = document.getElementsByClassName('kits-nao-utilizados');
        providerView[0].style.display = 'block';
    } catch (error) {
        console.error('Erro ao listar kits de serviços não utilizados:', error);
        throw error;
    }
}